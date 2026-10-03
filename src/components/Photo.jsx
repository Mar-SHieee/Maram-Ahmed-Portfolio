import { createContext, useContext, useEffect, useState } from "react";
import { profile } from "../data/profile.js";

// Reads a file, shrinks it, returns a data URL (so localStorage doesn't overflow).
export function fileToDataUrl(file, max = 900) {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const k = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      resolve(c.toDataURL("image/jpeg", 0.85));
    };
    img.src = url;
  });
}

// ?edit in the address bar turns on the owner tools. They only change YOUR browser.
export const isEdit = () => new URLSearchParams(window.location.search).has("edit");
const read = (k) => { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } };
const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

const Ctx = createContext(null);
export const usePhoto = () => useContext(Ctx);

export function PhotoProvider({ children }) {
  const edit = isEdit();
  // Saved tweaks apply only in edit mode, so visitors always see profile.js.
  const [cfg, setCfg] = useState(() => ({ ...profile.photo, ...(edit ? read("photo-cfg") : null) }));
  const [preview, setPreview] = useState(() => (edit ? read("photo-preview") : null));
  useEffect(() => { if (edit) write("photo-cfg", cfg); }, [cfg, edit]);
  const choose = async (file) => {
    if (!file) return;
    const url = await fileToDataUrl(file);
    setPreview(url); write("photo-preview", url);
  };
  const reset = () => { setCfg(profile.photo); setPreview(null); write("photo-preview", null); };
  return <Ctx.Provider value={{ cfg, setCfg, preview, choose, reset, edit }}>{children}</Ctx.Provider>;
}

export function Photo() {
  const { cfg, preview } = usePhoto();
  const [missing, setMissing] = useState(false);
  const src = preview || (missing ? null : cfg.src);
  const ratio = cfg.shape === "circle" ? 1 : cfg.ratio;
  const radius = cfg.shape === "circle" ? "50%" : cfg.shape === "rounded" ? "28px" : "6px";
  return (
    <div className="photo" style={{ width: cfg.size, aspectRatio: ratio, borderRadius: radius }}>
      {src ? (
        <img src={src} alt={profile.name} onError={() => setMissing(true)}
          style={{ objectPosition: `${cfg.x}% ${cfg.y}%`, transform: `scale(${cfg.zoom})`, transformOrigin: `${cfg.x}% ${cfg.y}%` }} />
      ) : (
        <span className="photo-empty">{profile.name[0]}</span>
      )}
    </div>
  );
}

const Row = ({ label, children }) => <label className="tuner-row"><span>{label}</span>{children}</label>;

export function PhotoTuner() {
  const { cfg, setCfg, choose, reset, edit } = usePhoto();
  const [done, setDone] = useState(false);
  if (!edit) return null;
  const set = (k) => (e) => setCfg({ ...cfg, [k]: e.target.type === "range" ? +e.target.value : e.target.value });
  const copy = async () => {
    const { src, size, ratio, shape, zoom, x, y } = cfg;
    const text = `photo: ${JSON.stringify({ src, size, ratio: +ratio, shape, zoom, x, y }, null, 2)},`;
    try { await navigator.clipboard.writeText(text); setDone(true); setTimeout(() => setDone(false), 1800); } catch {}
  };
  return (
    <aside className="tuner">
      <strong>Photo settings (only you see this)</strong>
      <Row label={`Size ${cfg.size}px`}><input type="range" min="120" max="360" value={cfg.size} onChange={set("size")} /></Row>
      <Row label="Shape">
        <select value={cfg.shape} onChange={set("shape")}>
          <option value="circle">Circle</option><option value="rounded">Rounded</option><option value="square">Square</option>
        </select>
      </Row>
      <Row label="Ratio (w:h)">
        <select value={cfg.ratio} onChange={set("ratio")} disabled={cfg.shape === "circle"}>
          <option value="1">1:1 square</option><option value="0.8">4:5 portrait</option>
          <option value="0.75">3:4 portrait</option><option value="1.25">5:4 wide</option>
        </select>
      </Row>
      <Row label={`Zoom ${(+cfg.zoom).toFixed(2)}x`}><input type="range" min="1" max="2.5" step="0.05" value={cfg.zoom} onChange={set("zoom")} /></Row>
      <Row label={`Left-right ${cfg.x}`}><input type="range" min="0" max="100" value={cfg.x} onChange={set("x")} /></Row>
      <Row label={`Up-down ${cfg.y}`}><input type="range" min="0" max="100" value={cfg.y} onChange={set("y")} /></Row>
      <label className="btn tuner-btn">Try another photo<input type="file" accept="image/*" hidden onChange={(e) => choose(e.target.files?.[0])} /></label>
      <div className="tuner-actions">
        <button className="btn solid tuner-btn" onClick={copy}>{done ? "Copied!" : "Copy settings"}</button>
        <button className="btn tuner-btn" onClick={reset}>Reset</button>
      </div>
      <small>Paste the copied block into <code>profile.js</code>. Put the real file in <code>public/images/profile.jpg</code>.</small>
    </aside>
  );
}
