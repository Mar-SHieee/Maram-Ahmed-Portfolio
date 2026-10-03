import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Page from "../components/Page.jsx";
import { profile } from "../data/profile.js";
import { services } from "../data/services.js";

export default function Contact() {
  const [params] = useSearchParams();
  const [service, setService] = useState(params.get("service") || "");
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
    <Page className="container section contact">
      <div>
        <h1>Let's work together</h1>
        <p className="lead">Tell me what you need and I'll reply by email.</p>
        <ul className="contact-links">
          <li><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
          <li><a href={profile.whatsapp} target="_blank" rel="noopener">WhatsApp {profile.phone}</a></li>
          <li><a href={profile.linkedin} target="_blank" rel="noopener">LinkedIn</a></li>
          <li><a href={profile.github} target="_blank" rel="noopener">GitHub</a></li>
        </ul>
      </div>
      <form onSubmit={send} className="form">
        <label>Your name
          <input required value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>What do you need?
          <select value={service} onChange={(e) => setService(e.target.value)}>
            <option value="">Something else</option>
            {services.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
          </select>
        </label>
        <label>Message
          <textarea required rows="5" value={message} onChange={(e) => setMessage(e.target.value)} />
        </label>
        <button className="btn solid" type="submit">Send email</button>
      </form>
    </Page>
  );
}
