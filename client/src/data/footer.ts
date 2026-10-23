export const contact = {
  email: 'contato@sesindustria.com.br',
  address: 'Av. Paulista, 1313',
}

export const footerColumns = [
  {
    title: 'Navegação',
    links: ['Início', 'Certificação', 'Cursos', 'Sobre', 'Blog'].map((label) => ({ label, href: '#' })),
  },
  {
    title: 'Cursos populares',
    links: [
      'Cultura Organizacional',
      'Ferramentas Google para Produtividade',
      'Excel Básico ao Avançado',
      'Trabalho em Equipe e Colaboração',
      'Gestão do Tempo e Produtividade',
      'Comunicação Assertiva',
      'Inteligência Emocional no Trabalho',
    ].map((label) => ({ label, href: '#' })),
  },
  {
    title: 'Suporte',
    links: [
      'Termos de Uso',
      'Política de Privacidade',
      'Trabalhe Conosco',
      'Fale Conosco',
      'Central de Ajuda',
    ].map((label) => ({ label, href: '#' })),
  },
]
