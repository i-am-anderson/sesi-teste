import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Header,
  Footer,
  Container,
  SectionHeading,
  Button,
  Tabs,
  ProfileCard,
  EnrolledCourseCard,
  CertificateList,
} from "../../components";
import { useAuth } from "../../hooks/useAuth";
import { useStudentData } from "../../hooks/useStudent";
import type { Enrollment } from "../../services/studentStorage";
import styles from "./StudentArea.module.scss";

const TABS = ["resumo", "cursos", "certificados", "perfil"] as const;
type Tab = (typeof TABS)[number];

export default function StudentAreaPage() {
  const { student, logout } = useAuth();
  const { enrollments } = useStudentData();
  const navigate = useNavigate();

  const [params, setParams] = useSearchParams();
  const param = params.get("aba");
  const tab: Tab = TABS.includes(param as Tab) ? (param as Tab) : "resumo";

  const all = Object.values(enrollments).sort((a, b) =>
    b.updatedAt.localeCompare(a.updatedAt),
  );
  const inProgress = all.filter((e) => e.completedAt === null);
  const finished = all.filter((e) => e.completedAt !== null);
  const lessonsDone = all.reduce((sum, e) => sum + e.progress.completed, 0);

  if (!student) return null;

  const stats = [
    ["Em andamento", inProgress.length],
    ["Concluídos", finished.length],
    ["Aulas concluídas", lessonsDone],
  ] as const;

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const empty = (text: string) => (
    <div className={styles.empty}>
      <p>{text}</p>
      <Button href="/cursos" variant="dark" size="sm" withArrow>
        Ver cursos
      </Button>
    </div>
  );

  const grid = (list: Enrollment[]) => (
    <ul className={styles.grid}>
      {list.map((enrollment) => (
        <li key={enrollment.slug}>
          <EnrolledCourseCard enrollment={enrollment} />
        </li>
      ))}
    </ul>
  );

  const items = [
    {
      id: "resumo",
      label: "Resumo",
      panel: (
        <div className={styles.stack}>
          <dl className={styles.stats}>
            {stats.map(([label, value]) => (
              <div key={label} className={styles.stat}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          <section aria-labelledby="continue">
            <h2 id="continue" className={styles.sectionTitle}>
              Continue de onde parou
            </h2>
            {inProgress.length
              ? grid(inProgress.slice(0, 1))
              : empty("Você não tem cursos em andamento.")}
          </section>
        </div>
      ),
    },
    {
      id: "cursos",
      label: "Meus cursos",
      panel: (
        <div className={styles.stack}>
          <section aria-labelledby="in-progress">
            <h2 id="in-progress" className={styles.sectionTitle}>
              Em andamento
            </h2>
            {inProgress.length
              ? grid(inProgress)
              : empty("Você não tem cursos em andamento.")}
          </section>

          <section aria-labelledby="finished">
            <h2 id="finished" className={styles.sectionTitle}>
              Concluídos
            </h2>
            {finished.length
              ? grid(finished)
              : empty("Os cursos que você concluir aparecem aqui.")}
          </section>
        </div>
      ),
    },
    {
      id: "certificados",
      label: "Certificados",
      panel: finished.length ? (
        <CertificateList enrollments={finished} />
      ) : (
        empty("Conclua um curso para receber o seu certificado.")
      ),
    },
    {
      id: "perfil",
      label: "Perfil",
      panel: <ProfileCard student={student} onLogout={handleLogout} />,
    },
  ];

  return (
    <>
      <Header solid />
      <main className={styles.main}>
        <Container className={styles.content}>
          <SectionHeading
            className={styles.heading}
            as="h1"
            eyebrow="Área do aluno"
            title={`Olá, ${student.name.split(" ")[0]}!`}
            description="Acompanhe seus cursos e continue de onde parou."
          />

          <Tabs
            label="Área do aluno"
            items={items}
            value={tab}
            onChange={(id) => setParams({ aba: id }, { replace: true })}
          />
        </Container>
      </main>
      <Footer />
    </>
  );
}
