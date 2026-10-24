import { createElement } from "react";
import { Target, Eye, Heart } from "lucide-react";
import heroImage from "../assets/images/hero-image.png";
import bannerImage from "../assets/images/banner-ava.png";
import videoThumb from "../assets/images/video-thumb.png";

export const aboutIntro = {
  eyebrow: "Sobre nós",
  title: "Educação que move a indústria",
  paragraphs: [
    "O SESI Indústria reúne cursos online e presenciais para formar profissionais mais preparados, seguros e produtivos.",
    "Aproximamos a capacitação das necessidades reais do chão de fábrica, com professores especialistas e acompanhamento do início ao fim.",
  ],
  cta: { label: "Conhecer cursos", href: "/cursos" },
  image: heroImage,
};

export const aboutPillars = {
  title: "Missão, visão e valores",
  items: [
    {
      icon: createElement(Target, { size: 24, strokeWidth: 1.5 }),
      title: "Missão",
      description:
        "Ampliar o acesso à educação de qualidade e fortalecer a carreira de quem trabalha na indústria.",
    },
    {
      icon: createElement(Eye, { size: 24, strokeWidth: 1.5 }),
      title: "Visão",
      description:
        "Ser a principal referência em capacitação profissional para a indústria brasileira.",
    },
    {
      icon: createElement(Heart, { size: 24, strokeWidth: 1.5 }),
      title: "Valores",
      description:
        "Excelência, acessibilidade, segurança e compromisso com o resultado de cada aluno.",
    },
  ],
};

export const aboutVideo = {
  eyebrow: "Institucional",
  title: "Conheça o SESI Indústria",
  image: videoThumb,
};

export const aboutHistory = {
  eyebrow: "Nossa história",
  title: "Do chão de fábrica para a sala de aula",
  paragraphs: [
    "Nascemos para apoiar o desenvolvimento de quem faz a indústria acontecer, levando conteúdo técnico de qualidade para perto do trabalhador.",
    "Hoje, a plataforma une aulas gravadas, atividades práticas e certificação reconhecida, para que cada pessoa evolua no seu próprio ritmo.",
  ],
  image: bannerImage,
};
