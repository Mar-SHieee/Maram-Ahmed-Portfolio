import Page from "../components/Page.jsx";
import Photo from "../components/Photo.jsx";
import { profile } from "../data/profile.js";
import { experience, education } from "../data/experience.js";

function Item({ e }) {
  return (
    <li className="tl-item">
      <span className="tl-date">{e.date}</span>
      <div>
        <h3>{e.title}</h3>
        <p className="muted">{e.org}</p>
        <ul>{e.points.map((p) => <li key={p}>{p}</li>)}</ul>
      </div>
    </li>
  );
}

export default function About() {
  return (
    <Page className="container section">
      <div className="about-top">
        <Photo />
        <div>
          <h1>About me</h1>
          {profile.about.map((p) => <p key={p} className="lead">{p}</p>)}
          <p className="muted">{profile.location}</p>
        </div>
      </div>
      <h2>Experience & training</h2>
      <ol className="timeline">{experience.map((e) => <Item key={e.title} e={e} />)}</ol>
      <h2>Education</h2>
      <ol className="timeline"><Item e={education} /></ol>
    </Page>
  );
}
