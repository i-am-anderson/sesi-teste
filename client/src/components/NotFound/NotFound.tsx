import { Container, Button } from "../../components";
import styles from "./NotFound.module.scss";

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <Container className={styles.content}>
        <span className={styles.code}>404</span>
        <h1 className={styles.title}>Página não encontrada</h1>
        <p className={styles.description}>
          O endereço que você acessou não existe ou foi movido. Volte para o
          início e continue explorando os nossos cursos.
        </p>
        <Button href="/" withArrow>
          Voltar ao início
        </Button>
      </Container>
    </div>
  );
}
