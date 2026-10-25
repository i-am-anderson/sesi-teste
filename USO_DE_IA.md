# Uso de Inteligência Artificial

Registro do uso de IA no desenvolvimento do projeto SESI Indústria — Plataforma de Cursos.

## 1. Ferramenta utilizada

| Ferramenta | Versão / modelo | Etapas em que foi usada |
|---|---|---|
| Claude | Sonnet 5.5 | FrontEnd, Backend e Documentação |
| GitHub Copilot | Auto | FrontEnd e BackEnd |

## 2. Objetivo do uso

- **FrontEnd:** 
  - Facilidade no preenchimento de código repetitivo, nomes de variáveis, funções e componentes
  - Sugestão de código para componentes React
  - Sugestão de código para estilização CSS
  - Sugestão de tipagem TypeScript
  - Geração de código para funcionalidades específicas (ex.: acessibilidade)
- **BackEnd:**
  - Facilidade no preenchimento de código repetitivo, nomes de variáveis, funções e componentes
  - Correção de de bugs (como problema de CORS)
  - Sugestão de tipagens
  - Sugestão de código para integração com banco de dados
  - Validação da arquitetura do banco de dados
- **Documentação:**
  - Sugestão de textos para documentação
  - Sugestão de estruturação de documentação
  - Criação de "componentes" de documentação, conforme especificações no prompt (ex.: mermaid, tabelas, listas)

## 3. Prompts relevantes: o que foi aproveitado ou descartado

### Prompt 1 — Slug no lugar do courseId (backend e front)

**Prompt:**

> Minha referência courseId já não existe mais, agora tudo vem do slug; preciso alterar em todos os lugares.

| Aproveitado | Descartado |
|---|---|
| Rota `GET /api/courses/{slug}` com `/{id:int}` mantida, índice único do slug, migration AddCourseSlug, matrícula e progresso no localStorage indexados pelo slug | - |

### Prompt 2 — Slug de aula: banco ou front?

**Prompt:**

> Não seria melhor criarmos um slug para aulas também? (?aula=bancos-relacionais em vez de ?aula=t67-l199). Mas no backend não consigo criar uma chave primária composta para ter apenas um slug de aula por curso?

| Aproveitado | Descartado |
|---|---|
| Slug gerado no front a partir do título, único por curso, com o id interno mantido para o progresso | Coluna slug em lessons com índice único, por exigir migration, seed e DTO novos |

### Prompt 3 — Busca sem acentos

**Prompt:**

> Preciso corrigir de forma simples a “busca não ignora acentos”?

| Aproveitado | Descartado |
|---|---|
| Função unaccent do PostgreSQL no AppDbContext, extensão criada por migration e RemoveAccents no CourseService | - |

### Prompt 4 — Análise do projeto contra o escopo

**Prompt:**

> [Escopo do teste] Analisando o Front e o Back, me responda: atende?

| Aproveitado | Descartado |
|---|---|
| Lista de lacunas (busca sem acentos, botão Limpar, limitações do README), que virou correções e a seção “Limitações conhecidas” | - |

### Prompt 5 — Painel de acessibilidade (para o front)

**Prompt:**

> Altere o componente em anexo para um componente de acessibilidade mais completo: botão flutuante à direita que abre um painel, com aumento de fonte, daltonismo etc. Sugira algumas coisas antes de fazer. Siga as diretrizes de acessibilidade e WCAG.

| Aproveitado | Descartado |
|---|---|
| Versão enxuta: fonte, daltonismo, contraste, régua de leitura, tudo salvo no localStorage | Leitura em voz alta e as outras sugestões |

## 4. Como o conteúdo foi validado

- Teste manual: cada funcionalidade foi testada manualmente para verificar se o comportamento estava de acordo com o esperado.
- Build: o código foi compilado e executado para garantir que não houvesse erros de sintaxe ou de execução.
- Lint: ferramentas de linting foram utilizadas para verificar a qualidade do código e aderência às boas práticas.
- Comparação com o Figma: o layout e a interface foram comparados com os designs fornecidos no Figma para garantir consistência visual.
- Revisão do código: o código gerado foi revisado atentamente para identificar possíveis problemas ou melhorias.

## 5. Um exemplo de erro ou inadequação identificado

- **Contexto:** foi pedido o ambiente de estudo do curso, com matrícula, progresso salvo no navegador e acesso restrito a quem fez login (simulado).
- **O que a IA gerou:** a página de estudo matriculava o aluno automaticamente na primeira visita ao curso. A proteção por login estava no componente de rota (`ProtectedRoute`), mas a rota de estudo não estava dentro dele.
- **Problema identificado:** um visitante deslogado que clicava em "Matricule-se" era matriculado e entrava no ambiente de estudo sem passar pela tela de login. O curso ficava salvo no `localStorage` sem existir um aluno.
- **Como foi percebido:** em teste manual, navegando deslogado pelo detalhe de um curso e clicando em "Matricule-se". A IA não havia testado esse caminho, só o fluxo de quem já estava logado.

## 6. Correção realizada

A página `CourseStudy` passou a verificar se há aluno logado antes de renderizar qualquer coisa. Sem login, ela redireciona para `/login` e, depois do login, volta para `/curso/:slug/estudar`. Como a matrícula só acontece dentro do hook de estudo, que só roda com o aluno logado, ela não é mais criada sem login. A verificação ficou na própria página, e não só na rota, para a regra continuar valendo se a rota for movida de lugar. O fluxo foi testado de novo, deslogado e logado.