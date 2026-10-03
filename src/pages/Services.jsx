import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import Page from "../components/Page.jsx";
import { services } from "../data/services.js";

export default function Services() {
  const [open, setOpen] = useState(null);
  return (
    <Page className="container section">
      <h1>Services</h1>
      <p className="lead">What I can build for you. Select one to see what you get.</p>
      <div className="grid">
        {services.map((s) => (
          <motion.article layout key={s.id} className="card">
            <button className="card-head" aria-expanded={open === s.id}
              onClick={() => setOpen(open === s.id ? null : s.id)}>
              <h3>{s.title}</h3>
              <p>{s.short}</p>
            </button>
            <AnimatePresence initial={false}>
              {open === s.id && (
                <motion.ul className="card-more" initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                  {s.gets.map((g) => <li key={g}>{g}</li>)}
                </motion.ul>
              )}
            </AnimatePresence>
            <div className="tags">{s.tools.map((t) => <span key={t}>{t}</span>)}</div>
            <Link className="link" to={`/contact?service=${s.id}`}>Ask about this</Link>
          </motion.article>
        ))}
      </div>
    </Page>
  );
}
