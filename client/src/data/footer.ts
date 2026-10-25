export const contact = {
  email: 'contato@sesindustria.com.br',
  address: 'Av. Paulista, 1313',
}

// Quantidade de cursos na coluna "Cursos populares" (vem da API)
export const POPULAR_COURSES_COUNT = 7

export const footerNavigation = {
  title: 'Navegação',
  links: [
    { label: 'Início', href: '/' },
    { label: 'Certificação', href: '#' },
    { label: 'Cursos', href: '/cursos' },
    { label: 'Sobre', href: '/sobre' },
    { label: 'Blog', href: '#' },
  ],
}

export const footerSupport = {
  title: 'Suporte',
  links: [
    'Termos de Uso',
    'Política de Privacidade',
    'Trabalhe Conosco',
    'Fale Conosco',
    'Central de Ajuda',
  ].map((label) => ({ label, href: '#' })),
}
