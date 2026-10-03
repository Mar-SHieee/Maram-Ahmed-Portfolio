import { useEffect, useRef } from "react";

// Drifting red "neurons" in the banner. Cursor = input neuron; click adds one.
export default function NeuralCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf, nodes = [];
    const mouse = { x: -999, y: -999 };
    const spawn = (x = Math.random() * w, y = Math.random() * h) => ({ x, y, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35 });
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes = Array.from({ length: Math.round(Math.min(70, (w * h) / 9000)) }, () => spawn());
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      nodes.forEach((a, i) => {
        if (!still) {
          a.x += a.vx; a.y += a.vy;
          if (a.x < 0 || a.x > w) a.vx *= -1;
          if (a.y < 0 || a.y > h) a.vy *= -1;
        }
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 110) {
            ctx.strokeStyle = `rgba(255,150,170,${0.28 * (1 - d / 110)})`;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (dm < 160) {
          ctx.strokeStyle = `rgba(255,70,100,${0.8 * (1 - dm / 160)})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
        ctx.fillStyle = dm < 160 ? "#ff3b5c" : "#f4a3b4";
        ctx.beginPath(); ctx.arc(a.x, a.y, dm < 160 ? 3.2 : 2, 0, 7); ctx.fill();
      });
      if (!still) raf = requestAnimationFrame(draw);
    };
    const move = (e) => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; if (still) draw(); };
    const click = (e) => { const r = canvas.getBoundingClientRect(); if (nodes.length < 110) nodes.push(spawn(e.clientX - r.left, e.clientY - r.top)); if (still) draw(); };
    const host = canvas.parentElement;
    resize(); draw();
    addEventListener("resize", resize);
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerdown", click);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerdown", click);
    };
  }, []);
  return <canvas ref={ref} className="neural" aria-hidden="true" />;
}
