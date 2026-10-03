import { motion } from "motion/react";
// Every portfolio section: anchor id, title, fade-in on scroll.
export default function Section({ id, title, lead, children }) {
  return (
    <motion.section id={id} className="container section"
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.45, ease: "easeOut" }}>
      <h2>{title}</h2>
      {lead && <p className="lead">{lead}</p>}
      {children}
    </motion.section>
  );
}
