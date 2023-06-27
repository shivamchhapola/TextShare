import './Navbar.css';
import { SiGithub, SiInstagram, SiTwitter, SiLinkedin } from 'react-icons/si';

export default function Navbar() {
  return (
    <div className="Navbar">
      <div className="Title">TextShare</div>
      <div className="Socials">
        <div
          className="Social"
          onClick={() =>
            window.open('https://github.com/shivamchhapola', '_blank')
          }>
          <div className="SocialIcon">
            <SiGithub size="1.5rem" />
          </div>
        </div>
        <div
          className="Social"
          onClick={() =>
            window.open('https://instagram.com/shiv.bruh', '_blank')
          }>
          <div className="SocialIcon">
            <SiInstagram size="1.5rem" />
          </div>
        </div>
        <div
          className="Social"
          onClick={() =>
            window.open('https://twitter.com/shiv_chhapola', '_blank')
          }>
          <div className="SocialIcon">
            <SiTwitter size="1.5rem" />
          </div>
        </div>
        <div
          className="Social"
          onClick={() =>
            window.open('https://www.linkedin.com/in/shivamchhapola/', '_blank')
          }>
          <div className="SocialIcon">
            <SiLinkedin size="1.5rem" />
          </div>
        </div>
      </div>
    </div>
  );
}
