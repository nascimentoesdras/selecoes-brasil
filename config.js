export const CONFIG = {
    brand: {
        name: "Seleções Brasil",
        shortName: "Seleções Brasil",
        tagline: "Conectando talentos ao futuro do Brasil.",
        description: "Encontre oportunidades profissionais em empresas que estão construindo o futuro.",
        logo: "EB",
        social: {
            linkedin: "https://www.linkedin.com",
            instagram: "https://www.instagram.com",
            facebook: "https://www.facebook.com"
        }
    },
    theme: {
        primary: "#5546F5",
        primaryDark: "#4034D9",
        background: "#FFFFFF",
        section: "#F5F6FC",
        text: "#171923",
        muted: "#777B8C",
        border: "#E9EAF2",
        success: "#28A879"
    },
    navigation: [
        { label: "Encontrar vagas", href: "#vagas" },
        { label: "Empresas", href: "#empresas" },
        { label: "Para recrutadores", href: "#recrutadores" },
        { label: "Blog", href: "#blog" },
        { label: "Currículos", href: "#curriculos" }
    ],
    categories: [
        { name: "Tecnologia", icon: "bi-code-slash", count: 248 },
        { name: "Administração", icon: "bi-kanban", count: 126 },
        { name: "Saúde", icon: "bi-heart-pulse", count: 98 },
        { name: "Construção", icon: "bi-building", count: 76 },
        { name: "Educação", icon: "bi-mortarboard", count: 64 },
        { name: "Marketing", icon: "bi-megaphone", count: 53 },
        { name: "Design", icon: "bi-palette", count: 42 },
        { name: "Engenharia", icon: "bi-gear", count: 38 },
        { name: "Atendimento", icon: "bi-headset", count: 34 },
        { name: "Logística", icon: "bi-truck", count: 29 }
    ],
    companies: [
        { name: "Nubank", category: "Fintech e tecnologia", location: "São Paulo, SP", jobs: 18, description: "Tecnologia para simplificar a vida financeira de milhões de pessoas.", initials: "Nu", color: "#7A28CB" },
        { name: "VivaTech", category: "Software e inovação", location: "Remoto", jobs: 12, description: "Soluções digitais para negócios mais inteligentes e humanos.", initials: "VT", color: "#5546F5" },
        { name: "Amazon", category: "E-commerce e cloud", location: "São Paulo, SP", jobs: 24, description: "Inovação centrada no cliente em escala global.", initials: "a", color: "#111827" },
        { name: "Globo", category: "Mídia e comunicação", location: "Rio de Janeiro, RJ", jobs: 9, description: "Conteúdo, criatividade e tecnologia que conectam o Brasil.", initials: "g", color: "#E65125" },
        { name: "iFood", category: "Tecnologia e delivery", location: "Osasco, SP", jobs: 16, description: "Transformando a forma como o Brasil se alimenta.", initials: "if", color: "#EA1D2C" },
        { name: "Stone", category: "Serviços financeiros", location: "São Paulo, SP", jobs: 11, description: "Parceria para tornar o empreendedor brasileiro mais forte.", initials: "st", color: "#00A868" }
    ],
    jobs: [
        { id: 1, title: "Desenvolvedor Full Stack Júnior", company: "VivaTech", category: "Tecnologia", contract: "CLT", mode: "Remoto", location: "Brasil", salary: "R$ 2.500 - R$ 4.000", salaryValue: 3250, posted: "2 dias atrás", postedDays: 2, tags: ["Python", "Flask", "JavaScript", "SQL"], initials: "VT", color: "#5546F5", featured: true, description: "Buscamos uma pessoa desenvolvedora para criar experiências digitais escaláveis em um time colaborativo.", responsibilities: ["Construir e manter APIs e interfaces web", "Participar de decisões técnicas e code reviews", "Trabalhar em parceria com produto e design"], requirements: ["Experiência com JavaScript e Python", "Conhecimento de bancos de dados relacionais", "Boa comunicação e vontade de aprender"], benefits: ["Vale-refeição", "Plano de saúde", "Horário flexível"] },
        { id: 2, title: "Product Designer Pleno", company: "Nubank", category: "Design", contract: "CLT", mode: "Híbrido", location: "São Paulo, SP", salary: "R$ 6.000 - R$ 8.500", salaryValue: 7250, posted: "4 dias atrás", postedDays: 4, tags: ["Figma", "UX Research", "Design System"], initials: "Nu", color: "#7A28CB", featured: true, description: "Faça parte de uma equipe multidisciplinar que desenha produtos financeiros simples e acessíveis.", responsibilities: ["Conduzir pesquisas e testes de usabilidade", "Criar fluxos e protótipos de alta fidelidade"], requirements: ["Portfólio de produtos digitais", "Domínio de Figma", "Perfil colaborativo"], benefits: ["Plano de saúde", "Auxílio-creche", "Gympass"] },
        { id: 3, title: "Analista de Marketing Digital", company: "Globo", category: "Marketing", contract: "PJ", mode: "Híbrido", location: "Rio de Janeiro, RJ", salary: "R$ 4.500 - R$ 6.000", salaryValue: 5250, posted: "1 semana atrás", postedDays: 7, tags: ["SEO", "Google Ads", "Analytics"], initials: "g", color: "#E65125", featured: false, description: "Atue na estratégia digital de marcas que alcançam milhões de brasileiros todos os dias.", responsibilities: ["Planejar campanhas digitais", "Acompanhar métricas e gerar relatórios"], requirements: ["Experiência em mídia de performance", "Conhecimento de Google Analytics"], benefits: ["Vale-alimentação", "Desconto em produtos"] },
        { id: 4, title: "Enfermeiro(a) Assistencial", company: "Hospital Vida", category: "Saúde", contract: "CLT", mode: "Presencial", location: "Belo Horizonte, MG", salary: "R$ 3.800 - R$ 5.200", salaryValue: 4500, posted: "3 dias atrás", postedDays: 3, tags: ["Enfermagem", "UTI", "COREN"], initials: "HV", color: "#28A879", featured: false, description: "Venha cuidar de pessoas em um ambiente acolhedor e com estrutura de excelência.", responsibilities: ["Prestar assistência integral aos pacientes", "Registrar evolução e administrar medicações"], requirements: ["Graduação em Enfermagem", "COREN ativo"], benefits: ["Plano odontológico", "Adicional noturno"] },
        { id: 5, title: "Analista de Dados", company: "Amazon", category: "Tecnologia", contract: "CLT", mode: "Remoto", location: "Brasil", salary: "R$ 7.000 - R$ 10.000", salaryValue: 8500, posted: "5 dias atrás", postedDays: 5, tags: ["SQL", "Python", "Power BI"], initials: "a", color: "#111827", featured: true, description: "Transforme dados em decisões que impactam milhões de clientes.", responsibilities: ["Construir dashboards e análises", "Comunicar insights para áreas de negócio"], requirements: ["SQL avançado", "Experiência com ferramentas de BI"], benefits: ["Stock options", "Plano de saúde", "Auxílio home office"] },
        { id: 6, title: "Assistente Administrativo", company: "Stone", category: "Administração", contract: "Estágio", mode: "Presencial", location: "São Paulo, SP", salary: "R$ 1.500 - R$ 2.000", salaryValue: 1750, posted: "1 dia atrás", postedDays: 1, tags: ["Excel", "Organização", "Rotinas"], initials: "st", color: "#00A868", featured: false, description: "Uma oportunidade para começar sua carreira em um time dinâmico e acolhedor.", responsibilities: ["Apoiar rotinas administrativas", "Organizar documentos e planilhas"], requirements: ["Cursando Administração ou áreas correlatas", "Conhecimento básico de Excel"], benefits: ["Bolsa-auxílio", "Vale-transporte"] }
    ],
    seo: { title: "Seleções Brasil | Encontre sua próxima oportunidade", description: "Portal de vagas e carreiras da Seleções Brasil." }
};
