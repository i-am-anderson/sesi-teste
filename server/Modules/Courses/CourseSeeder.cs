using Microsoft.EntityFrameworkCore;
using SesiTeste.Shared.Data;

namespace SesiTeste.Modules.Courses;

public static class CourseSeeder
{
    public static async Task SeedAsync(AppDbContext db)
    {
        if (await db.Courses.AnyAsync()) return;

        var tech = new Category { Name = "Tecnologia" };
        var business = new Category { Name = "Negócios" };
        var design = new Category { Name = "Design" };

        db.Courses.AddRange(
            new Course
            {
                FullName = "Desenvolvimento Web com JavaScript Moderno",
                ShortName = "JavaScript Moderno",
                Description = "Aprenda a construir páginas interativas com JavaScript, DOM e consumo de APIs.",
                Category = tech,
                Modality = Modality.Online,
                WorkloadHours = 60,
                TargetAudience = "Iniciantes em programação e estudantes de áreas técnicas",
                Status = CourseStatus.Open,
                ImageUrl = "https://res.cloudinary.com/dijfvfciv/image/upload/c_fill,w_800,h_450/v1792796184/banner-ava_zsburk.png",
                Topics =
                [
                    T(1, "Fundamentos da linguagem",
                        ("Variáveis e tipos", "Declaração com let e const e os tipos primitivos.", 25),
                        ("Funções e escopo", "Funções, arrow functions e como o escopo funciona.", 35)),
                    T(2, "Manipulando o DOM",
                        ("Selecionando elementos", "Como localizar e alterar elementos da página.", 30),
                        ("Eventos", "Reagindo a cliques, teclado e formulários.", 40)),
                    T(3, "Consumindo APIs",
                        ("Fetch e Promises", "Requisições HTTP e tratamento de respostas.", 45),
                        ("Async/await na prática", "Código assíncrono legível e tratamento de erros.", 50))
                ]
            },
            new Course
            {
                FullName = "Introdução à Análise de Dados com Python",
                ShortName = "Python para Dados",
                Description = "Do básico da linguagem à análise de planilhas e bases reais com pandas.",
                Category = tech,
                Modality = Modality.Online,
                WorkloadHours = 80,
                TargetAudience = "Analistas, estudantes de exatas e profissionais em transição de carreira",
                Status = CourseStatus.Open,
                ImageUrl = "https://res.cloudinary.com/dijfvfciv/image/upload/c_fill,w_800,h_450/v1792796184/banner-ava_zsburk.png",
                Topics =
                [
                    T(1, "Python essencial",
                        ("Estruturas de dados", "Listas, dicionários e tuplas aplicados a dados.", 40),
                        ("Ambientes e pacotes", "Criação de ambientes virtuais e instalação de bibliotecas.", 30)),
                    T(2, "Análise com pandas",
                        ("DataFrames", "Leitura de arquivos CSV e operações básicas.", 50),
                        ("Limpeza de dados", "Tratamento de valores ausentes e duplicados.", 55))
                ]
            },
            new Course
            {
                FullName = "Gestão de Projetos com Metodologias Ágeis",
                ShortName = "Projetos Ágeis",
                Description = "Planeje, acompanhe e entregue projetos com Scrum e Kanban.",
                Category = business,
                Modality = Modality.InPerson,
                WorkloadHours = 40,
                TargetAudience = "Gerentes de projeto, líderes de equipe e analistas",
                Status = CourseStatus.Finished,
                ImageUrl = "https://res.cloudinary.com/dijfvfciv/image/upload/c_fill,w_800,h_450/v1792796184/banner-ava_zsburk.png",
                Topics =
                [
                    T(1, "Princípios ágeis",
                        ("Manifesto Ágil", "Valores e princípios que guiam as equipes ágeis.", 30),
                        ("Scrum em detalhes", "Papéis, eventos e artefatos do Scrum.", 60)),
                    T(2, "Planejamento e entrega",
                        ("Backlog e priorização", "Como organizar e priorizar o trabalho.", 45),
                        ("Métricas de fluxo", "Lead time, throughput e quadros Kanban.", 40))
                ]
            },
            new Course
            {
                FullName = "Finanças Pessoais e Empresariais para Empreendedores",
                ShortName = "Finanças para Empreendedores",
                Description = "Controle de caixa, precificação e decisões financeiras para pequenos negócios.",
                Category = business,
                Modality = Modality.Online,
                WorkloadHours = 30,
                TargetAudience = "Pequenos empreendedores e microempreendedores individuais",
                Status = CourseStatus.ComingSoon,
                AvailableFrom = new DateOnly(2027, 2, 1),
                ImageUrl = "https://res.cloudinary.com/dijfvfciv/image/upload/c_fill,w_800,h_450/v1792796184/banner-ava_zsburk.png",
                Topics =
                [
                    T(1, "Organização financeira",
                        ("Fluxo de caixa", "Como registrar entradas e saídas do negócio.", 35),
                        ("Separando as contas", "Por que separar finanças pessoais e empresariais.", 25)),
                    T(2, "Precificação e lucro",
                        ("Custos fixos e variáveis", "Identificando e classificando os custos.", 40),
                        ("Formação de preço", "Do custo à margem de lucro desejada.", 45))
                ]
            },
            new Course
            {
                FullName = "Fundamentos de Experiência do Usuário (UX Design)",
                ShortName = "UX Design",
                Description = "Pesquisa, prototipação e testes para criar produtos centrados nas pessoas.",
                Category = design,
                Modality = Modality.InPerson,
                WorkloadHours = 45,
                TargetAudience = "Designers iniciantes, desenvolvedores e profissionais de produto",
                Status = CourseStatus.ComingSoon,
                AvailableFrom = new DateOnly(2027, 3, 15),
                ImageUrl = "https://res.cloudinary.com/dijfvfciv/image/upload/c_fill,w_800,h_450/v1792796184/banner-ava_zsburk.png",
                Topics =
                [
                    T(1, "Pesquisa com usuários",
                        ("Entrevistas", "Como planejar e conduzir entrevistas.", 40),
                        ("Personas e jornadas", "Sintetizando a pesquisa em artefatos de design.", 45)),
                    T(2, "Prototipação",
                        ("Wireframes", "Esboços de baixa e média fidelidade.", 50)),
                    T(3, "Testes de usabilidade",
                        ("Planejando um teste", "Roteiro, tarefas e recrutamento.", 35),
                        ("Analisando resultados", "Transformando observações em melhorias.", 40))
                ]
            },
            new Course
            {
                FullName = "Design de Interfaces com Figma",
                ShortName = "Figma na Prática",
                Description = "Crie telas, componentes e design systems com uma das ferramentas mais usadas do mercado.",
                Category = design,
                Modality = Modality.Online,
                WorkloadHours = 24,
                TargetAudience = "Designers, desenvolvedores front-end e estudantes de design",
                Status = CourseStatus.Open,
                ImageUrl = "https://res.cloudinary.com/dijfvfciv/image/upload/c_fill,w_800,h_450/v1792796184/banner-ava_zsburk.png",
                Topics =
                [
                    T(1, "Primeiros passos",
                        ("Interface e ferramentas", "Conhecendo o espaço de trabalho.", 30),
                        ("Auto layout", "Telas flexíveis e responsivas.", 40)),
                    T(2, "Design systems",
                        ("Componentes e variantes", "Criando elementos reutilizáveis.", 45),
                        ("Estilos e bibliotecas", "Organizando cores, tipografia e compartilhamento.", 35))
                ]
            });

        await db.SaveChangesAsync();
    }

    // Cria um Topic com suas aulas; a ordem das aulas segue a posição na lista
    private static Topic T(int order, string title,
        params (string Title, string Description, int Minutes)[] lessons) => new()
        {
            Order = order,
            Title = title,
            Lessons = lessons.Select((l, i) => new Lesson
            {
                Order = i + 1,
                Title = l.Title,
                Description = l.Description,
                DurationMinutes = l.Minutes
            }).ToList()
        };
}