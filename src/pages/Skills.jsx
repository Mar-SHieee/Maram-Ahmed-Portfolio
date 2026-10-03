import { useState } from "react";
import { motion } from "motion/react";
import Page from "../components/Page.jsx";
import { skills } from "../data/skills.js";

export default function Skills() {
  const [tab, setTab] = useState(skills[0].name);
  const current = skills.find((s) => s.name === tab);
  return (
    <Page className="container section">
      <h1>Skills</h1>
      <p className="lead">Pick a group to see what's inside.</p>
      <div className="tabs" role="tablist">
        {skills.map((s) => (
          <button key={s.name} role="tab" aria-selected={s.name === tab}
            className={"tab" + (s.name === tab ? " on" : "")} onClick={() => setTab(s.name)}>
            {s.name}
            {s.name === tab && <motion.i layoutId="tabline" className="tabline" />}
          </button>
        ))}
      </div>
      <motion.ul key={tab} className="chips" initial="hide" animate="show"
        variants={{ show: { transition: { staggerChildren: 0.04 } } }}>
        {current.items.map((x) => (
          <motion.li key={x} whileHover={{ y: -3, scale: 1.05 }}
            variants={{ hide: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1 } }}>
            {x}
          </motion.li>
        ))}
      </motion.ul>
    </Page>
  );
}
