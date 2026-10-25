import { Award } from "lucide-react";
import Button from "../Button/Button";
import type { Enrollment } from "../../services/studentStorage";
import styles from "./CertificateList.module.scss";

export default function CertificateList({ enrollments }: { enrollments: Enrollment[] }) {
  return (
    <ul className={styles.list}>
      {enrollments.map((enrollment) => (
        <li key={enrollment.slug} className={styles.item}>
          <Award size={28} strokeWidth={1.5} aria-hidden="true" className={styles.icon} />
          <div className={styles.text}>
            <h3 className={styles.title}>{enrollment.title}</h3>
            <p className={styles.date}>
              Emitido em {new Date(enrollment.completedAt!).toLocaleDateString("pt-BR")}
            </p>
          </div>
          <Button href="#" size="sm" variant="outline">
            Baixar certificado
          </Button>
        </li>
      ))}
    </ul>
  );
}
