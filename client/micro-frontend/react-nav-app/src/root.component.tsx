import './style.css';

export default function Root(props) {
  return (
    <nav className="nav-bar">
      <span className="nav-bar__title">LOGO</span>
      <ul>
        <li>Services</li>
        <li>Projects</li>
        <li>About</li>
        <li className="nav-bar__contact">Contact</li>
      </ul>
    </nav>
  );
}
