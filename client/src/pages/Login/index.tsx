import type { SubmitEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  Header,
  Footer,
  Container,
  SectionHeading,
  Button,
  Input,
} from "../../components";
import { useAuth } from "../../hooks/useAuth";
import styles from "./Login.module.scss";

const AREA = "/area-do-aluno";

export default function LoginPage() {
  const { loggedIn, login } = useAuth();
  const navigate = useNavigate();
  const from = (useLocation().state as { from?: string } | null)?.from ?? AREA;

  if (loggedIn) return <Navigate to={from} replace />;

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email"));
    login(email);
    navigate(from, { replace: true });
  };

  return (
    <>
      <Header solid />
      <main className={styles.main}>
        <Container className={styles.container}>
          <SectionHeading
            as="h1"
            eyebrow="Área do aluno"
            title="Acesse sua conta"
            description="Protótipo: qualquer e-mail e senha entram com um aluno fictício."
          />

          <form className={styles.form} onSubmit={handleSubmit}>
            <Input
              label="E-mail"
              name="email"
              type="email"
              autoComplete="email"
              defaultValue="joao.silva@email.com"
              required
            />
            <Input
              label="Senha"
              name="password"
              type="password"
              autoComplete="current-password"
              defaultValue="123456"
              required
            />
            <Button as="button" type="submit" variant="dark" withArrow>
              Entrar
            </Button>
          </form>
        </Container>
      </main>
      <Footer />
    </>
  );
}
