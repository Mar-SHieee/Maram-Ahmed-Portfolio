import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Section from "./components/Section.jsx";
import NeuralCanvas from "./components/NeuralCanvas.jsx";
import { PhotoProvider, Photo, PhotoTuner, usePhoto, isEdit, fileToDataUrl } from "./components/Photo.jsx";
import { profile } from "./data/profile.js";
import { experience, education } from "./data/experience.js";
import { skills } from "./data/skills.js";
import { services } from "./data/services.js";
import { projects } from "./data/projects.js";
import { achievements } from "./data/achievements.js";
import { testimonials } from "./data/testimonials.js";

/* ---------- Cover: banner + photo + name, About directly below ---------- */
function Cover() {
    const { cfg } = usePhoto();
    const [i, setI] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setI((n) => (n + 1) % profile.roles.length), 2600);
        return () => clearInterval(t);
    }, []);
    return (
        <header id="top" className="cover" style={{ "--photo": cfg.size + "px" }}>
            <div className="banner"><NeuralCanvas /></div>
            <div className="container cover-grid">
                <Photo />
                <div className="identity">
                    <h1>{profile.name}</h1>
                    <div className="role">
                        <AnimatePresence mode="wait">
                            <motion.span key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                                {profile.roles[i]}
                            </motion.span>
                        </AnimatePresence>
                    </div>
                    <p className="headline">{profile.headline}</p>
                    <ul className="pills">{profile.pills.map((p) => <li key={p}>{p}</li>)}</ul>
                </div>
            </div>
        </header>
    );
}

/* ---------- Timeline item ---------- */
const Item = ({ e }) => (
    <li className="tl-item">
        <span className="tl-date">{e.date}</span>
        <div>
            <h3>{e.title}</h3>
            <p className="muted">{e.org}</p>
            <ul>{e.points.map((p) => <li key={p}>{p}</li>)}</ul>
        </div>
    </li>
);

/* ---------- Skills tabs ---------- */
function Skills() {
    const [tab, setTab] = useState(skills[0].name);
    const current = skills.find((s) => s.name === tab);
    return (
        <>
            <div className="tabs" role="tablist">
                {skills.map((s) => (
                    <button key={s.name} role="tab" aria-selected={s.name === tab} className={"tab" + (s.name === tab ? " on" : "")} onClick={() => setTab(s.name)}>
                        {s.name}
                        {s.name === tab && <motion.i layoutId="tabline" className="tabline" />}
                    </button>
                ))}
            </div>
            <motion.ul key={tab} className="chips" initial="hide" animate="show" variants={{ show: { transition: { staggerChildren: 0.04 } } }}>
                {current.items.map((x) => (
                    <motion.li key={x} whileHover={{ y: -3, scale: 1.05 }} variants={{ hide: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1 } }}>{x}</motion.li>
                ))}
            </motion.ul>
        </>
    );
}

/* ---------- Offered services ---------- */
function Services({ onAsk }) {
    const [open, setOpen] = useState(null);
    return (
        <div className="grid">
            {services.map((s) => (
                <motion.article layout key={s.id} className="card">
                    <button className="card-head" aria-expanded={open === s.id} onClick={() => setOpen(open === s.id ? null : s.id)}>
                        <h3>{s.title}</h3><p>{s.short}</p>
                    </button>
                    <AnimatePresence initial={false}>
                        {open === s.id && (
                            <motion.ul className="card-more" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                                {s.gets.map((g) => <li key={g}>{g}</li>)}
                            </motion.ul>
                        )}
                    </AnimatePresence>
                    <div className="tags">{s.tools.map((t) => <span key={t}>{t}</span>)}</div>
                    <a className="link" href="#contact" onClick={() => onAsk(s.id)}>Ask about this</a>
                </motion.article>
            ))}
        </div>
    );
}

/* ---------- Projects ---------- */
const filters = ["All", "ML", "App", "IoT"];

function Cover_({ p }) {
    const edit = isEdit();
    const list = p.images?.length ? p.images : [p.image];
    const [i, setI] = useState(0);
    const [bad, setBad] = useState({});
    const [local, setLocal] = useState({});
    const key = `cover-${p.id}-${i}`;
    useEffect(() => {
        if (!edit) return;
        try { const v = localStorage.getItem(key); if (v) setLocal((l) => ({ ...l, [key]: v })); } catch { }
    }, [key, edit]);
    const src = local[key] || (bad[i] ? null : list[i]);
    const pick = async (e) => {
        const f = e.target.files?.[0]; if (!f) return;
        const url = await fileToDataUrl(f);
        setLocal((l) => ({ ...l, [key]: url }));
        try { localStorage.setItem(key, url); } catch { }
    };
    const img = src
        ? <img className="card-img" style={{ objectFit: p.fit || "cover" }} src={src} alt={`${p.title} screenshot ${i + 1}`} loading="lazy" onError={() => setBad((b) => ({ ...b, [i]: true }))} />
        : <div className="card-img empty">{p.title[0]}</div>;
    const go = (d) => setI((n) => (n + d + list.length) % list.length);
    return (
        <div className="gallery">
            {edit ? (
                <label className="cover-edit" title="Preview another image">{img}<span>Try another image</span><input type="file" accept="image/*" hidden onChange={pick} /></label>
            ) : img}
            {list.length > 1 && (
                <>
                    <button className="g-arrow prev" aria-label="Previous image" onClick={() => go(-1)}>‹</button>
                    <button className="g-arrow next" aria-label="Next image" onClick={() => go(1)}>›</button>
                    <div className="g-dots">
                        {list.map((_, n) => <button key={n} aria-label={`Image ${n + 1}`} className={n === i ? "on" : ""} onClick={() => setI(n)} />)}
                    </div>
                </>
            )}
        </div>
    );
}

function Projects() {
    const [filter, setFilter] = useState("All");
    const [open, setOpen] = useState(null);
    const list = projects.filter((p) => filter === "All" || p.kind === filter);
    return (
        <>
            <div className="filters">
                {filters.map((f) => <button key={f} className={"chip-btn" + (f === filter ? " on" : "")} onClick={() => setFilter(f)}>{f}</button>)}
            </div>
            <motion.div layout className="grid">
                <AnimatePresence>
                    {list.map((p) => (
                        <motion.article layout key={p.id} className="card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                            <Cover_ p={p} />
                            <button className="card-head" aria-expanded={open === p.id} onClick={() => setOpen(open === p.id ? null : p.id)}>
                                <h3>{p.title}</h3><p>{p.blurb}</p>
                            </button>
                            <AnimatePresence initial={false}>
                                {open === p.id && (
                                    <motion.ul className="card-more" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                                        {p.points.map((x) => <li key={x}>{x}</li>)}
                                    </motion.ul>
                                )}
                            </AnimatePresence>
                            <div className="tags">{p.tech.map((t) => <span key={t}>{t}</span>)}</div>
                            <div className="card-links">
                                {p.github ? <a className="link" href={p.github} target="_blank" rel="noopener">View on GitHub</a> : <span className="soon">GitHub link coming soon</span>}
                                {p.demo && <a className="link" href={p.demo} target="_blank" rel="noopener">Watch demo</a>}
                            </div>
                        </motion.article>
                    ))}
                </AnimatePresence>
            </motion.div>
        </>
    );
}

/* ---------- Call to action + contact ---------- */
function Contact({ service, setService }) {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const send = (e) => {
        e.preventDefault();
        const topic = services.find((s) => s.id === service)?.title || "General";
        const subject = encodeURIComponent(`Portfolio inquiry: ${topic}`);
        const body = encodeURIComponent(`${message}\n\n${name}`);
        window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    };
    return (
        <div className="contact">
            <div>
                <p className="lead">Tell me what you need and I'll reply by email.</p>
                <ul className="contact-links">
                    <li><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
                    <li><a href={profile.whatsapp} target="_blank" rel="noopener">WhatsApp {profile.phone}</a></li>
                    <li><a href={profile.linkedin} target="_blank" rel="noopener">LinkedIn</a></li>
                    <li><a href={profile.github} target="_blank" rel="noopener">GitHub</a></li>
                </ul>
            </div>
            <form onSubmit={send} className="form">
                <label>Your name<input required value={name} onChange={(e) => setName(e.target.value)} /></label>
                <label>What do you need?
                    <select value={service} onChange={(e) => setService(e.target.value)}>
                        <option value="">Something else</option>
                        {services.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
                    </select>
                </label>
                <label>Message<textarea required rows="5" value={message} onChange={(e) => setMessage(e.target.value)} /></label>
                <button className="btn solid" type="submit">Send email</button>
            </form>
        </div>
    );
}

/* ---------- Page: sections follow the Portfolio Building handout ---------- */
export default function App() {
    const [service, setService] = useState("");
    const nav = [
        ["about", "About"], ["education", "Education"], ["skills", "Skills"], ["experience", "Experience"],
        ["services", "Services"], ["projects", "Projects"],
        ...(achievements.length ? [["achievements", "Achievements"]] : []),
        ...(testimonials.length ? [["testimonials", "Testimonials"]] : []),
        ["contact", "Contact"],
    ];
    return (
        <PhotoProvider>
            <Navbar items={nav} />
            <Cover />
            <Section id="about" title="About me">
                <p className="usp">{profile.usp}</p>
                {profile.about.map((p) => <p key={p} className="lead">{p}</p>)}
                <p className="muted">{profile.location}</p>
            </Section>
            <Section id="education" title="Education">
                <ol className="timeline"><Item e={education} /></ol>
            </Section>
            <Section id="skills" title="Skills" lead="Pick a group to see what's inside."><Skills /></Section>
            <Section id="experience" title="Work experience & training">
                <ol className="timeline">{experience.map((e) => <Item key={e.title} e={e} />)}</ol>
            </Section>
            <Section id="services" title="Offered services" lead="What I can build for you. Select one to see what you get."><Services onAsk={setService} /></Section>
            <Section id="projects" title="Projects" lead="Select a project to see what I built and how."><Projects /></Section>
            {achievements.length > 0 && (
                <Section id="achievements" title="Achievements">
                    <ul className="grid plain">
                        {achievements.map((a) => (
                            <li key={a.title} className="card">
                                <h3>{a.title}</h3>
                                <p className="muted">{[a.org, a.date].filter(Boolean).join(" · ")}</p>
                                {a.link && <a className="link" href={a.link} target="_blank" rel="noopener">View</a>}
                            </li>
                        ))}
                    </ul>
                </Section>
            )}
            {testimonials.length > 0 && (
                <Section id="testimonials" title="Testimonials">
                    <div className="grid">
                        {testimonials.map((t) => (
                            <blockquote key={t.name} className="card quote">
                                <p>“{t.quote}”</p>
                                <footer><strong>{t.name}</strong><span className="muted"> {t.role}</span></footer>
                            </blockquote>
                        ))}
                    </div>
                </Section>
            )}
            <Section id="contact" title="Let's work together"><Contact service={service} setService={setService} /></Section>
            <Footer />
            <PhotoTuner />
        </PhotoProvider>
    );
}

