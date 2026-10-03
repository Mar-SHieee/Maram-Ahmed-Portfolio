import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { profile } from "../data/profile.js";

export default function Navbar({ items }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("top");
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ["top", ...items.map(([id]) => id)].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [items]);
  return (
    <header className="nav">
      <div className="container nav-inner">
        <a href="#top" className="brand" onClick={() => setOpen(false)}>{profile.name}</a>
        <button className="nav-toggle" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}</button>
        <nav className={"nav-links" + (open ? " open" : "")}>
          {items.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className={active === id ? "active" : ""}>
              {label}
              {active === id && <motion.span layoutId="nav-underline" className="underline" />}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
