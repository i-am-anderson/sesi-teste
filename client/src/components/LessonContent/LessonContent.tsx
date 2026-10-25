import Button from "../Button/Button";
import { studyPath, type StudyItem } from "../../data/studyContent";
import logo from "../../assets/icons/logo-sesi-industria-white.svg";
import banner from "../../assets/images/banner-ava.png";
import styles from "./LessonContent.module.scss";

type LessonContentProps = {
  slug: string;
  item: StudyItem;
  nextItem?: StudyItem;
  isCompleted: boolean;
  isCourseDone: boolean;
  onComplete: () => void;
};

export default function LessonContent({
  slug,
  item,
  nextItem,
  isCompleted,
  isCourseDone,
  onComplete,
}: LessonContentProps) {
  const { lesson, module } = item;

  return (
    <article className={styles.lesson}>
      <div className={styles.banner}>
        <img src={banner} alt="" className={styles.bannerImage} />
        <img src={logo} alt="SESI Indústria" className={styles.logo} />
      </div>

      <div className={styles.body}>
        <p className={styles.eyebrow}>
          {item.label} · {module.title}
        </p>
        <h1 className={styles.heading}>{lesson.heading}</h1>

        {lesson.sections.map((section, index) => (
          <section key={index} className={styles.section}>
            {section.title && <h2 className={styles.subheading}>{section.title}</h2>}
            {section.paragraphs?.map((text, i) => <p key={i}>{text}</p>)}
            {section.bullets && (
              <ul className={styles.bullets}>
                {section.bullets.map((text) => <li key={text}>{text}</li>)}
              </ul>
            )}
          </section>
        ))}

        <div className={styles.actions}>
          {!isCompleted && (
            <Button as="button" variant="dark" onClick={onComplete}>
              Marcar como concluído
            </Button>
          )}

          {isCompleted && nextItem && (
            <Button href={studyPath(slug, nextItem.lesson.id)} variant="dark" withArrow>
              Próxima aula
            </Button>
          )}

          {isCompleted && !nextItem && isCourseDone && (
            <p className={styles.done} role="status">
              Curso concluído! Parabéns pela conquista.
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
