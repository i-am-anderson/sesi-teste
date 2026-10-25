import type { CourseDto } from '../services/courses'
import type { CourseCardProps } from '../components/CourseCard/CourseCard'
import cover from '../assets/images/banner-ava.png'
import iconNatureza from '../assets/icons/icon-ciencias-natureza-20px.svg'
import iconMatematica from '../assets/icons/icon-matematica-20px.svg'
import iconLinguagens from '../assets/icons/icon-linguagens-20px.svg'

export const categories = {
  natureza: { label: 'Ciências da natureza', icon: iconNatureza, color: '#E2D3F8' },
  matematica: { label: 'Matemática', icon: iconMatematica, color: '#FCD19C' },
  linguagens: { label: 'Linguagens', icon: iconLinguagens, color: '#CFE3FA' },
}

export const courses = [
  {
    id: 'estatistica',
    category: 'matematica',
    title: 'Estatística e Controle de Qualidade na Produção',
    description: 'Análise e interpretação de dados e controle de qualidade e produtividade.',
    image: cover,
    href: '#',
  },
  {
    id: 'fisica',
    category: 'natureza',
    title: 'Física do Movimento e da Energia na Metalurgia',
    description: 'Estudo de forças, atrito, calor e energia em máquinas, fornos e prensas.',
    image: cover,
    href: '#',
  },
  {
    id: 'quimica',
    category: 'natureza',
    title: 'Química e Sustentabilidade',
    description: 'Estudo das reações químicas envolvidas na tinturaria e acabamento de tecidos.',
    image: cover,
    href: '#',
  },
  {
    id: 'materiais',
    category: 'natureza',
    title: 'Ciência dos Materiais na Metalurgia',
    description: 'Conceitos básicos de estrutura, resistência e propriedades dos metais.',
    image: cover,
    href: '#',
  },
  {
    id: 'comunicacao',
    category: 'linguagens',
    title: 'Comunicação Assertiva',
    description: 'Técnicas de comunicação clara e objetiva para o ambiente industrial.',
    image: cover,
    href: '#',
  },
]

// id da categoria da API -> chave em `categories` (ícone e cor da tag)
export const categoryById: Record<number, keyof typeof categories> = {
  1: 'natureza',
  2: 'matematica',
  3: 'linguagens',
}

export const modalityLabels: Record<CourseDto['modality'], string> = {
  Online: 'Online',
  InPerson: 'Presencial',
}

export const statusLabels: Record<CourseDto['status'], string> = {
  Open: 'Matrículas abertas',
  ComingSoon: 'Em breve',
  Finished: 'Encerrado',
}

export const toCourseCardProps = (course: CourseDto): CourseCardProps => ({
  title: course.fullName,
  description: course.description,
  image: course.imageUrl,
  category: categoryById[course.category.id],
  href: `/curso/${course.slug}`,
})

export const EMPTY_FILTERS = { categoryId: '', modality: '', status: '' }
