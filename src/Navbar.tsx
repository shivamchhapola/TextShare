import { SiGithub, SiInstagram, SiTwitter, SiLinkedin } from 'react-icons/si';

export default function Navbar() {
  return (
    <div className="Navbar">
      <div className="Title">TextShare</div>
      <div className="Socials">
        <div>
          <SiGithub />
        </div>
        <div>
          <SiInstagram />
        </div>
        <div>
          <SiTwitter />
        </div>
        <div>
          <SiLinkedin />
        </div>
      </div>
    </div>
  );
}
