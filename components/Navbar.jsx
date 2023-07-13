import Styles from '../styles/Navbar.module.css';
import { SiGithub, SiInstagram, SiTwitter, SiLinkedin } from 'react-icons/si';

export default function Navbar() {
  return (
    <div className={Styles.Navbar}>
      <div className={Styles.Title}>TextShare</div>
      <div className={Styles.Socials}>
        <div
          className={Styles.Social}
          onClick={() =>
            window.open('https://github.com/shivamchhapola', '_blank')
          }>
          <div className={Styles.SocialIcon}>
            <SiGithub size="1.5rem" />
          </div>
        </div>
        <div
          className={Styles.Social}
          onClick={() =>
            window.open('https://instagram.com/shiv.bruh', '_blank')
          }>
          <div className={Styles.SocialIcon}>
            <SiInstagram size="1.5rem" />
          </div>
        </div>
        <div
          className={Styles.Social}
          onClick={() =>
            window.open('https://twitter.com/shiv_chhapola', '_blank')
          }>
          <div className={Styles.SocialIcon}>
            <SiTwitter size="1.5rem" />
          </div>
        </div>
        <div
          className={Styles.Social}
          onClick={() =>
            window.open('https://www.linkedin.com/in/shivamchhapola/', '_blank')
          }>
          <div className={Styles.SocialIcon}>
            <SiLinkedin size="1.5rem" />
          </div>
        </div>
      </div>
    </div>
  );
}
