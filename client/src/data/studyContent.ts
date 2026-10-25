import type { CourseDetailDto, TopicDto } from "../services/courses";
import type {
  CourseProgress,
  ModuleProgress,
} from "../services/studentStorage";
import { modalityLabels } from "./courses";

export type LessonSection = {
  title?: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type StudyLesson = {
  id: string;
  slug: string;
  title: string;
  heading: string;
  sections: LessonSection[];
};

export type StudyModule = {
  id: string;
  title: string;
  lessons: StudyLesson[];
};

export type StudyItem = {
  lesson: StudyLesson;
  module: StudyModule;
  moduleIndex: number;
  lessonIndex: number;
  label: string;
};

export const studyPath = (slug: string, lessonSlug?: string) =>
  `/curso/${slug}/estudar${lessonSlug ? `?aula=${lessonSlug}` : ""}`;

export function slugify(text: string): string {
  return (
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60)
      .replace(/-+$/, "") || "aula"
  );
}

const lowerFirst = (text: string) =>
  text.charAt(0).toLowerCase() + text.slice(1);
const minutesLabel = (n: number) => `${n} ${n === 1 ? "minuto" : "minutos"}`;
const percentOf = (done: number, total: number) =>
  total ? Math.round((done / total) * 100) : 0;

function buildIntroModule(course: CourseDetailDto): StudyModule {
  const name = course.shortName;

  return {
    id: "intro",
    title: "Introdução",
    lessons: [
      {
        id: "intro-introducao",
        slug: "introducao",
        title: "Introdução",
        heading: "Introdução",
        sections: [
          {
            paragraphs: [
              `Boas-vindas ao curso ${course.fullName}! ${course.description}`,
              `O curso tem carga horária de ${course.workloadHours} horas, na modalidade ${modalityLabels[course.modality].toLowerCase()}, e foi pensado para ${lowerFirst(course.targetAudience)}.`,
            ],
          },
          {
            title: "Como estudar nesta plataforma",
            paragraphs: [
              "O conteúdo está organizado em módulos e aulas. Use o menu lateral para acompanhar o seu progresso e navegar entre as aulas.",
              "As aulas são liberadas em sequência: ao marcar uma aula como concluída, a próxima é liberada. Você pode voltar às aulas já concluídas sempre que quiser.",
            ],
          },
        ],
      },
      {
        id: "intro-boas-praticas",
        slug: "boas-praticas",
        title: "Boas práticas",
        heading: "Boas práticas",
        sections: [
          {
            paragraphs: [
              `Se você está interessado em se aprofundar em ${name}, aqui estão algumas dicas para maximizar sua experiência online. Primeiro, crie um espaço de estudo livre de distrações, onde você possa se concentrar totalmente no material.`,
              "Estabeleça uma rotina de estudos, reservando horários específicos para assistir às aulas e realizar as atividades. Além disso, interaja com seus colegas e instrutores nos fóruns e chats disponíveis, pois isso enriquece o aprendizado e ajuda a esclarecer dúvidas. Não se esqueça de revisar o conteúdo regularmente e aplicar os conhecimentos em situações práticas sempre que possível.",
              "Por fim, mantenha-se atualizado sobre as novas técnicas e normas da área, já que ela está sempre evoluindo. Com dedicação e as estratégias corretas, você estará preparado para se destacar no setor!",
            ],
          },
          {
            title: "Recomendações",
            paragraphs: [
              `Se você está interessado em se aprofundar em ${name}, aqui estão algumas dicas valiosas. Primeiro, escolha um curso que ofereça uma abordagem prática, com aulas que incluam exercícios e estudos de caso. Isso ajudará a entender como aplicar os conceitos na prática. Além disso, verifique se o curso é reconhecido por instituições relevantes, pois isso pode impactar sua formação e carreira.`,
              "Outro aspecto importante é a experiência dos instrutores. Procure cursos que tenham profissionais com experiência no setor, pois eles podem compartilhar insights valiosos que vão além da teoria.",
              "Considere também a carga horária e a flexibilidade do curso. Se você trabalha, um curso que ofereça aulas noturnas ou aos finais de semana pode ser mais conveniente.",
              `Por fim, não se esqueça de se conectar com outros alunos e profissionais da área. Isso pode abrir portas e proporcionar um aprendizado ainda mais enriquecedor. Investir em um bom curso de ${name} é essencial para garantir qualidade e eficiência no trabalho.`,
            ],
          },
        ],
      },
      {
        id: "intro-extras",
        slug: "extras",
        title: "Extras",
        heading: "Extras",
        sections: [
          {
            title: "Materiais complementares",
            paragraphs: [
              "Aprender vai além das aulas. Reserve um tempo para revisar os conteúdos e registrar as dúvidas que surgirem pelo caminho.",
            ],
            bullets: [
              "Revise as aulas anteriores antes de começar uma nova.",
              "Faça anotações com as suas próprias palavras.",
              "Aplique o que aprendeu em situações reais do seu trabalho.",
              "Compartilhe dúvidas e experiências com colegas e instrutores.",
            ],
          },
          {
            title: "Certificação",
            paragraphs: [
              `Ao concluir todas as aulas do curso ${name}, você recebe o certificado SESI, que comprova a sua capacitação e pode ser compartilhado em redes profissionais.`,
            ],
          },
        ],
      },
    ],
  };
}

function buildTopicModule(topic: TopicDto): StudyModule {
  const lessons = [...topic.lessons].sort((a, b) => a.order - b.order);
  const totalMinutes = lessons.reduce(
    (sum, lesson) => sum + lesson.durationMinutes,
    0,
  );
  const moduleId = `t${topic.id}`;

  const intro: StudyLesson = {
    id: `${moduleId}-intro`,
    slug: "introducao",
    title: "Introdução",
    heading: topic.title,
    sections: [
      {
        paragraphs: [
          topic.description ??
            `Neste módulo você vai estudar ${lowerFirst(topic.title)}.`,
          lessons.length
            ? `O módulo reúne ${lessons.length} ${lessons.length === 1 ? "aula" : "aulas"}, com cerca de ${minutesLabel(totalMinutes)} de conteúdo.`
            : "As aulas deste módulo serão disponibilizadas em breve.",
        ],
      },
      ...(lessons.length
        ? [
            {
              title: "O que você vai ver",
              bullets: lessons.map((lesson) => lesson.title),
            },
          ]
        : []),
    ],
  };

  return {
    id: moduleId,
    title: topic.title,
    lessons: [
      intro,
      ...lessons.map((lesson) => ({
        id: `${moduleId}-l${lesson.id}`,
        slug: slugify(lesson.title),
        title: lesson.title,
        heading: lesson.title,
        sections: [
          {
            paragraphs: [
              lesson.description ??
                `Nesta aula você vai estudar ${lowerFirst(lesson.title)}.`,
              `Duração estimada: ${minutesLabel(lesson.durationMinutes)}.`,
            ],
          },
          {
            title: "Como aproveitar esta aula",
            paragraphs: [
              "Acompanhe o conteúdo com atenção, faça anotações e procure relacionar os conceitos com situações do seu dia a dia de trabalho. Quando terminar, marque a aula como concluída para liberar a próxima.",
            ],
          },
        ],
      })),
    ],
  };
}

export function buildCurriculum(course: CourseDetailDto): StudyModule[] {
  const topics = [...course.topics].sort((a, b) => a.order - b.order);
  const modules = [buildIntroModule(course), ...topics.map(buildTopicModule)];

  // Slug único por curso
  const used = new Set<string>();
  return modules.map((module) => ({
    ...module,
    lessons: module.lessons.map((lesson) => {
      let slug = lesson.slug;
      for (let n = 2; used.has(slug); n++) slug = `${lesson.slug}-${n}`;
      used.add(slug);
      return { ...lesson, slug };
    }),
  }));
}

/** Todas as aulas em ordem, com módulo e numeração. */
export function flattenLessons(curriculum: StudyModule[]): StudyItem[] {
  return curriculum.flatMap((module, moduleIndex) =>
    module.lessons.map((lesson, lessonIndex) => ({
      lesson,
      module,
      moduleIndex,
      lessonIndex,
      label: `${moduleIndex + 1}.${lessonIndex + 1}`,
    })),
  );
}

export function computeProgress(
  curriculum: StudyModule[],
  completedIds: Iterable<string>,
): CourseProgress {
  const done = new Set(completedIds);
  const modules: Record<string, ModuleProgress> = {};
  let completed = 0;
  let total = 0;

  for (const module of curriculum) {
    const moduleDone = module.lessons.filter((lesson) =>
      done.has(lesson.id),
    ).length;
    modules[module.id] = {
      title: module.title,
      completed: moduleDone,
      total: module.lessons.length,
      percent: percentOf(moduleDone, module.lessons.length),
    };
    completed += moduleDone;
    total += module.lessons.length;
  }

  return { percent: percentOf(completed, total), completed, total, modules };
}
