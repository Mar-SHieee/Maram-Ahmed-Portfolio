import { profile } from "../data/profile.js";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>
          <a href={profile.github} target="_blank" rel="noopener">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noopener">LinkedIn</a>
        </span>
      </div>
    </footer>
  );
}
