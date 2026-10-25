import Button from "../Button/Button";
import type { StudentProfile } from "../../services/studentStorage";
import styles from "./ProfileCard.module.scss";

type ProfileCardProps = {
  student: StudentProfile;
  onLogout: () => void;
};

const initials = (name: string) =>
  name.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();

export default function ProfileCard({ student, onLogout }: ProfileCardProps) {
  const groups = [
    {
      title: "Dados pessoais",
      rows: [
        ["Nome", student.name],
        ["E-mail", student.email],
        ["Telefone", student.phone],
        ["Cidade", student.city],
      ],
    },
    {
      title: "Dados profissionais",
      rows: [
        ["Empresa", student.company],
        ["Cargo", student.jobTitle],
        ["Matrícula", student.registration],
        ["Aluno desde", new Date(student.memberSince).toLocaleDateString("pt-BR")],
      ],
    },
  ];

  return (
    <div className={styles.profile}>
      <div className={styles.header}>
        <span className={styles.avatar} aria-hidden="true">
          {initials(student.name)}
        </span>
        <div>
          <p className={styles.name}>{student.name}</p>
          <p className={styles.email}>{student.email}</p>
        </div>
      </div>

      <div className={styles.groups}>
        {groups.map((group) => (
          <section key={group.title} className={styles.group}>
            <h3 className={styles.groupTitle}>{group.title}</h3>
            <dl className={styles.details}>
              {group.rows.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>

      <Button as="button" variant="outline" size="sm" onClick={onLogout}>
        Sair da conta
      </Button>
    </div>
  );
}
