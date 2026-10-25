import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Container from "../Container/Container";
import { getCourses } from "../../services/courses";
import {
  contact,
  footerNavigation,
  footerSupport,
  POPULAR_COURSES_COUNT,
} from "../../data/footer";
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

/** "/cursos" é rota interna (Link); "#" e links externos continuam <a>. */
const isInternal = (href: string) => href.startsWith("/") && !href.startsWith("//");

export function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h3 className={styles.columnTitle}>{title}</h3>
      <ul className={styles.links}>
        {links.map((link) => (
          <li key={link.label}>
            {isInternal(link.href) ? (
              <Link to={link.href} className={styles.link}>
                {link.label}
              </Link>
            ) : (
              <a href={link.href} className={styles.link}>
                {link.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Coluna "Cursos populares", vinda da API. */
function PopularCoursesColumn() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["popularCourses"],
    queryFn: () => getCourses(POPULAR_COURSES_COUNT),
    staleTime: 5 * 60 * 1000,
  });

  const title = "Cursos populares";

  if (isLoading) {
    return (
      <div aria-busy="true">
        <h3 className={styles.columnTitle}>{title}</h3>
        <ul className={styles.links} aria-label="Carregando cursos">
          {Array.from({ length: POPULAR_COURSES_COUNT }, (_, i) => (
            <li key={i} className={styles.skeleton} aria-hidden="true" />
          ))}
        </ul>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div>
        <h3 className={styles.columnTitle}>{title}</h3>
        <p className={styles.message}>Não foi possível carregar os cursos.</p>
      </div>
    );
  }

  return (
    <FooterColumn
      title={title}
      links={data.items.map((course) => ({
        label: course.shortName,
        href: `/curso/${course.slug}`,
      }))}
    />
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

          <FooterColumn {...footerNavigation} />
          <PopularCoursesColumn />
          <FooterColumn {...footerSupport} />
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
