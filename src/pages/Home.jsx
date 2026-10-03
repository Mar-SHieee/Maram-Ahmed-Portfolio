import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import Page from "../components/Page.jsx";
import NeuralCanvas from "../components/NeuralCanvas.jsx";
import { profile } from "../data/profile.js";

export default function Home() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % profile.roles.length), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <Page>
      <section className="hero">
        <NeuralCanvas />
        <div className="container hero-body">
          <p className="hello">Hi, I'm</p>
          <h1>{profile.name}</h1>
          <div className="role">
            <AnimatePresence mode="wait">
              <motion.span key={i} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.3 }}>
                {profile.roles[i]}
              </motion.span>
            </AnimatePresence>
          </div>
          <p className="lead">{profile.tagline}</p>
          <div className="actions">
            <Link className="btn solid" to="/projects">See my projects</Link>
            <Link className="btn" to="/contact">Work with me</Link>
          </div>
          <p className="hint">Move your cursor: you're the input layer. Click to grow a new neuron.</p>
        </div>
      </section>
    </Page>
  );
}
