import Container from "../Container/Container";
import { contact, footerColumns } from "../../data/footer";
import logoWhite from "../../assets/icons/logo-sesi-industria-white.svg";
import logoSesi from "../../assets/icons/logo-sesi.svg";
import iconLinkedin from "../../assets/icons/icon-linkedIn-24px.svg";
import iconInstagram from "../../assets/icons/icon-instagram-24px.svg";
import iconFacebook from "../../assets/icons/icon-facebook-24px.svg";
import styles from "./Footer.module.scss";

const socials = [
  { label: "LinkedIn", icon: iconLinkedin, href: "#" },
  { label: "Instagram", icon: iconInstagram, href: "#" },
  { label: "Facebook", icon: iconFacebook, href: "#" },
];

type FooterLink = {
  label: string;
  href: string;
};

type FooterColumnProps = {
  title: string;
  links: FooterLink[];
};

export function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h3 className={styles.columnTitle}>{title}</h3>
      <ul className={styles.links}>
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} className={styles.link}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.top}>
          <div className={styles.brand}>
            <img src={logoWhite} alt="SESI Indústria" width="188" height="19" />
            <p className={styles.contact}>{contact.email}</p>
            <p className={styles.contact}>{contact.address}</p>
          </div>

          {footerColumns.map((column) => (
            <FooterColumn key={column.title} {...column} />
          ))}
        </div>

        <div className={styles.bottom}>
          <div className={styles.copy}>
            <img src={logoSesi} alt="SESI" width="57" height="19" />
            <span>Todos os direitos reservados.</span>
          </div>

          <ul className={styles.socials}>
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  aria-label={social.label}
                  className={styles.social}
                >
                  <img src={social.icon} alt="" width="24" height="24" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
