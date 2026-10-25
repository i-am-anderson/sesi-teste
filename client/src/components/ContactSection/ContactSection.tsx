import { useState, type FormEvent } from "react";
import Container from "../Container/Container";
import SectionHeading from "../SectionHeading/SectionHeading";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Select from "../Select/Select";
import Textarea from "../Textarea/Textarea";
import { contact } from "../../data/footer";
import styles from "./ContactSection.module.scss";

type ContactSectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  subjects?: string[];
};

type Status = "idle" | "sending" | "sent";

export default function ContactSection({
  eyebrow = "Contato",
  title = "Fale com a gente",
  description = "Tem dúvidas sobre os cursos ou quer saber mais? Envie uma mensagem e nossa equipe retorna em breve.",
  subjects = [
    "Dúvidas sobre os cursos",
    "Matrículas",
    "Parcerias com empresas",
    "Outros assuntos",
  ],
}: ContactSectionProps) {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");

    // Simula o envio.
    setTimeout(() => {
      form.reset();
      setStatus("sent");
    }, 800);
  };

  return (
    <section className={styles.section}>
      <Container className={styles.grid}>
        <div className={styles.info}>
          <SectionHeading eyebrow={eyebrow} title={title} />
          <p className={styles.description}>{description}</p>
          <p className={styles.contact}>
            {contact.email}
            <br />
            {contact.address}
          </p>
        </div>

        <form
          className={styles.form}
          onSubmit={handleSubmit}
          onChange={() => status === "sent" && setStatus("idle")}
        >
          <Input name="name" label="Nome" autoComplete="name" required />
          <Input
            name="email"
            type="email"
            label="E-mail"
            autoComplete="email"
            required
          />
          <Select
            name="subject"
            label="Assunto"
            placeholder="Selecione"
            required
            options={subjects.map((subject) => ({
              value: subject,
              label: subject,
            }))}
          />
          <Textarea name="message" label="Mensagem" required />

          <div className={styles.actions}>
            <Button
              as="button"
              type="submit"
              variant="dark"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Enviando…" : "Enviar mensagem"}
            </Button>
            <p className={styles.feedback} role="status">
              {status === "sent" &&
                "Mensagem enviada! Em breve entraremos em contato."}
            </p>
          </div>
        </form>
      </Container>
    </section>
  );
}
