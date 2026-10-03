import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Page from "../components/Page.jsx";
import { projects } from "../data/projects.js";

const filters = ["All", "ML", "App", "IoT"];

// Shows the project image; falls back to a letter block if the file isn't there yet.
function Cover({ src, title }) {
  const [bad, setBad] = useState(false);
  if (!src || bad) return <div className="card-img empty">{title[0]}</div>;
  return <img className="card-img" src={src} alt={`${title} screenshot`} loading="lazy" onError={() => setBad(true)} />;
}

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState(null);
  const list = projects.filter((p) => filter === "All" || p.kind === filter);
  return (
    <Page className="container section">
      <h1>Projects</h1>
      <p className="lead">Select a project to see what I built and how.</p>
      <div className="filters">
        {filters.map((f) => (
          <button key={f} className={"chip-btn" + (f === filter ? " on" : "")} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>
      <motion.div layout className="grid">
        <AnimatePresence>
          {list.map((p) => (
            <motion.article layout key={p.id} className="card"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
              <Cover src={p.image} title={p.title} />
              <button className="card-head" aria-expanded={open === p.id}
                onClick={() => setOpen(open === p.id ? null : p.id)}>
                <h3>{p.title}</h3>
                <p>{p.blurb}</p>
              </button>
              <AnimatePresence initial={false}>
                {open === p.id && (
                  <motion.ul className="card-more" initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                    {p.points.map((x) => <li key={x}>{x}</li>)}
                  </motion.ul>
                )}
              </AnimatePresence>
              <div className="tags">{p.tech.map((t) => <span key={t}>{t}</span>)}</div>
              {p.github ? (
                <a className="link" href={p.github} target="_blank" rel="noopener">View on GitHub</a>
              ) : (
                <span className="soon">GitHub link coming soon</span>
              )}
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </Page>
  );
}
