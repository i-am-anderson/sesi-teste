import type { TopicDto } from "../../services/courses";
import type { TextSection } from "../../data/courseInfo";
import styles from "./CourseContent.module.scss";

export function ModulesList({ topics }: { topics: TopicDto[] }) {
  return (
    <ol className={styles.modules}>
      {[...topics]
        .sort((a, b) => a.order - b.order)
        .map((topic) => (
          <li key={topic.id}>
            <h4 className={styles.subtitle}>
              {topic.order}. {topic.title}
            </h4>
            <ul className={styles.bullets}>
              {[...topic.lessons]
                .sort((a, b) => a.order - b.order)
                .map((lesson) => (
                  <li key={lesson.id}>{lesson.title}</li>
                ))}
            </ul>
          </li>
        ))}
    </ol>
  );
}

export function TextSections({ sections }: { sections: TextSection[] }) {
  return (
    <div className={styles.stack}>
      {sections.map((section) => (
        <div key={section.title}>
          <h4 className={styles.subtitle}>{section.title}</h4>
          <p className={styles.text}>{section.text}</p>
          <ul className={`${styles.bullets} ${styles.spaced}`}>
            {section.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          <p className={styles.text}>{section.closing}</p>
        </div>
      ))}
    </div>
  );
}

export function FaqList({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <ol className={styles.stack}>
      {items.map((item, index) => (
        <li key={item.question}>
          <h4 className={styles.subtitle}>
            {index + 1}. {item.question}
          </h4>
          <p className={styles.text}>{item.answer}</p>
        </li>
      ))}
    </ol>
  );
}
