import { useState } from "react";

type Category = "fullstack" | "aws";
type Lang = "es" | "en";

interface Project {
  id: number;
  title: { es: string; en: string };
  description: { es: string; en: string };
  tags: string[];
  year: string;
  status: "production" | "open-source" | "archived";
  category: Category;
  repo?: string;
}

const t = {
  es: {
    nav: { projects: "Proyectos", contact: "Contacto" },
    hero: {
      available: "Disponible para proyectos — 2026",
      bio: "Arquitecto de software y soluciones cloud. Construyo productos de extremo a extremo e infraestructura escalable en AWS.",
      stats: [
        { value: "2+", label: "Años de experiencia" },
        { value: "10+", label: "Proyectos entregados" },
        { value: "1×", label: "AWS Certified" }
      ]
    },
    projects: {
      selected: (n: number) => `${n} proyectos seleccionados`,
      sorted: "Ordenado por fecha"
    },
    certs: { title: "Certificaciones AWS", level: "Associate" },
    stack: { title: "Stack tecnológico" },
    contact: {
      label: "Contacto",
      heading: "Trabajemos juntos",
      body: "Abierto a roles full-time, contratos freelance y proyectos de consultoría en arquitectura cloud o desarrollo de producto."
    },
    footer: "Full Stack · AWS Cloud",
    status: { production: "PROD", "open-source": "OSS", archived: "ARCH" }
  },
  en: {
    nav: { projects: "Projects", contact: "Contact" },
    hero: {
      available: "Available for projects — 2026",
      bio: "Software and cloud solutions architect. I build end-to-end products and scalable infrastructure on AWS.",
      stats: [
        { value: "2+", label: "Years of experience" },
        { value: "10+", label: "Projects delivered" },
        { value: "1×", label: "AWS Certified" }
      ]
    },
    projects: {
      selected: (n: number) => `${n} projects selected`,
      sorted: "Sorted by date"
    },
    certs: { title: "Certifications", level: "Associate" },
    stack: { title: "Tech stack" },
    contact: {
      label: "Contact",
      heading: "Let's work together",
      body: "Open to full-time roles, freelance contracts, and consulting projects in cloud architecture or product development."
    },
    footer: "Full Stack · AWS Cloud",
    status: { production: "PROD", "open-source": "OSS", archived: "ARCH" }
  }
};

const categoryConfig = {
  fullstack: {
    label: { es: "Full Stack Developer", en: "Full Stack Developer" },
    accent: "#00a85a",
    accentDim: "rgba(0,168,90,0.07)",
    accentBorder: "rgba(0,168,90,0.22)",
    accentText: "#007a40",
    tagBg: "rgba(0,168,90,0.08)",
    tagBorder: "rgba(0,168,90,0.2)",
    index: "01"
  },
  aws: {
    label: { es: "AWS Cloud Engineer", en: "AWS Cloud Engineer" },
    accent: "#0284c7",
    accentDim: "rgba(2,132,199,0.07)",
    accentBorder: "rgba(2,132,199,0.22)",
    accentText: "#0369a1",
    tagBg: "rgba(2,132,199,0.08)",
    tagBorder: "rgba(2,132,199,0.2)",
    index: "02"
  }
};

const projects: Project[] = [
  {
    id: 1,
    title: {
      es: "Plataforma de Reseñas de Concesionarios",
      en: "Dealership Review Platform"
    },
    description: {
      es: "Aplicación cloud full-stack enfocada en la construcción de una plataforma de reseñas de concesionarios utilizando Django, IBM Cloud, servicios serverless y despliegues contenerizados. La solución integra autenticación de usuarios, APIs backend, servicios nativos de la nube y prácticas de CI/CD para ofrecer una aplicación web moderna y escalable.",
      en: "Full-stack cloud application focused on building a dealership review platform using Django, IBM Cloud, serverless services, and containerized deployments. The solution integrates user authentication, backend APIs, cloud-native services, and CI/CD practices to deliver a scalable and modern web application."
    },
    tags: ["Python", "Django", "IBM Cloud", "HTML", "CSS", "JavaScript"],
    year: "2023",
    status: "open-source",
    category: "fullstack",
    repo: "https://github.com/Kwilliams4/agfzb-CloudAppDevelopment_Capstone"
  },
  {
    id: 2,
    title: {
      es: "Aplicación de Aprendizaje en Línea",
      en: "Online Learning App"
    },
    description: {
      es: "Plataforma de aprendizaje en línea desarrollada con Django y ampliada con un sistema de evaluaciones para gestionar cursos, lecciones y evaluaciones de estudiantes. La aplicación integra modelos respaldados por base de datos, vistas y templates web, además de capacidades de despliegue en la nube.",
      en: "A Django-based online learning platform enhanced with an assessment system for managing courses, lessons, and student evaluations. The application integrates database-backed models, web views and templates, and cloud deployment capabilities."
    },
    tags: ["Python", "Django", "JavaScript", "HTML", "CSS"],
    year: "2023",
    status: "open-source",
    category: "fullstack",
    repo: "https://github.com/Kwilliams4/final-cloud-app-with-database"
  },
  {
    id: 3,
    title: {
      es: "Reseña de Libros",
      en: "Book Reviews"
    },
    description: {
      es: "A RESTful backend built with Node.js and Express for managing and reviewing books, including API endpoints for retrieving books, submitting reviews, and managing review data.",
      en: "Content management system with real-time editing, document versioning, and multi-team approval workflows."
    },
    tags: ["Node.js", "Express"],
    year: "2023",
    status: "open-source",
    category: "fullstack",
    repo: "https://github.com/Kwilliams4/expressBookReviews/tree/main/final_project"
  },
  {
    id: 4,
    title: { es: "Dashboard de Presupuesto", en: "Budget Dashboard" },
    description: {
      es: "Aplicación de gestión de presupuesto que ayuda a los usuarios a registrar gastos, monitorear sus desembolso y visualizar el presupuesto restante.",
      en: "Budget management application that helps users track expenses, monitor spending, and view their remaining budget."
    },
    tags: ["React", "HTML", "CSS"],
    year: "2023",
    status: "open-source",
    category: "fullstack",
    repo: "https://github.com/Kwilliams4/ejtos-react_budget_app"
  },
  {
    id: 5,
    title: {
      es: "Blessed Box",
      en: "Blessed Box"
    },
    description: {
      es: "BlessedBox es una plataforma de gestión de donaciones diseñada para optimizar la recolección, el seguimiento y la generación de reportes de cajas de donación destinadas a apoyar a niños necesitados a través de iniciativas benéficas y ministeriales. La aplicación combina tecnologías web modernas, actualizaciones en tiempo real y servicios de AWS para mejorar la eficiencia operativa y la visibilidad de los datos.",
      en: "BlessedBox is a cloud-enabled donation management platform designed to streamline the collection, tracking, and reporting of donation boxes that support children in need through charitable and ministry initiatives. The application combines modern web technologies, real-time updates, and AWS cloud services to improve operational efficiency and data visibility."
    },
    tags: ["React Native", "Expo", "Node.js", "Express", "MySQL"],
    year: "2025",
    status: "production",
    category: "fullstack",
    repo: "https://github.com/BlessedBox-DevTeam/CODENAME-Blessed-Box"
  },
  {
    id: 6,
    title: {
      es: "Blessed Box IaC",
      en: "Blessed Box IaC"
    },
    description: {
      es: "Repositorio de Infraestructura como Código (IaC) para BlessedBox, utilizado para aprovisionar y administrar recursos de AWS mediante despliegues automatizados y repetibles. El proyecto define componentes clave de infraestructura como redes, cómputo, bases de datos, seguridad y monitoreo para respaldar una plataforma de gestión de donaciones escalable y confiable.",
      en: "Infrastructure as Code (IaC) repository for BlessedBox, used to provision and manage AWS cloud resources through automated and repeatable deployments. The project defines core infrastructure components such as networking, compute, databases, security, and monitoring to support a scalable and reliable donation management platform."
    },
    tags: ["AWS", "EC2", "DynamoDB", "Route53", "Terraform", "IAM", "CI/CD"],
    year: "2026",
    status: "production",
    category: "aws",
    repo: "https://github.com/Kwilliams4/blessed_box_IaC"
  },
  {
    id: 7,
    title: {
      es: "Pagina de Boda Serverless",
      en: "Serverless Wedding Website"
    },
    description: {
      es: "Arquitectura serverless que aloja una pagina web para una boda, utilizando Lambda para RSVP y DynamoDB para almacenar las respuestas de los invitados.",
      en: "Serverless architecture that hosts a wedding website, using Lambda for RSVP and DynamoDB for storing the guest responses."
    },
    tags: ["Lambda", "S3", "Cloudfront", "DynamoDB", "API Gateway", "CI/CD"],
    year: "2026",
    status: "production",
    category: "aws",
    repo: "https://github.com/Kwilliams4/Wedding-C-K-IaC"
  },
  {
    id: 8,
    title: { es: "Arquitectura de Data Lake", en: "Data Lake Architecture" },
    description: {
      es: "Lake moderno con ingesta desde 15 fuentes, catalogación automática con Glue y capa analítica sobre Athena + QuickSight.",
      en: "Modern data lake with ingestion from 15 sources, automatic cataloging via Glue, and an analytics layer on Athena + QuickSight."
    },
    tags: ["S3", "Glue", "Athena", "Lake Formation", "Kinesis"],
    year: "2024",
    status: "production",
    category: "aws"
  },
  {
    id: 9,
    title: {
      es: "Disaster Recovery Automatizado",
      en: "Automated Disaster Recovery"
    },
    description: {
      es: "Sistema de DR cross-region con RTO de 15 minutos y RPO de 5 minutos. Failover automatizado con Route 53 y health checks.",
      en: "Cross-region DR system with 15-minute RTO and 5-minute RPO. Automated failover via Route 53 and health checks."
    },
    tags: ["Route 53", "RDS", "Aurora", "CloudFormation", "Systems Manager"],
    year: "2023",
    status: "production",
    category: "aws",
    repo: "https://github.com/tuusuario/aws-dr-automation"
  },
  {
    id: 10,
    title: { es: "Plataforma ML en SageMaker", en: "SageMaker ML Platform" },
    description: {
      es: "Infraestructura de entrenamiento y serving de modelos con pipelines automatizados, monitoreo de drift y A/B testing de endpoints.",
      en: "Model training and serving infrastructure with automated pipelines, drift monitoring, and endpoint A/B testing."
    },
    tags: ["SageMaker", "ECR", "EKS", "MLflow", "CloudWatch"],
    year: "2023",
    status: "production",
    category: "aws",
    repo: "https://github.com/tuusuario/sagemaker-platform"
  }
];

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function ProjectCard({
  project,
  cfg,
  lang
}: {
  project: Project;
  cfg: typeof categoryConfig.fullstack;
  lang: Lang;
}) {
  return (
    <div
      className="group relative flex flex-col gap-4 border p-6 transition-all duration-300"
      style={{ borderColor: "rgba(0,0,0,0.08)", backgroundColor: "#ffffff" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor =
          cfg.accentBorder;
        (e.currentTarget as HTMLDivElement).style.backgroundColor =
          cfg.accentDim;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor =
          "rgba(0,0,0,0.08)";
        (e.currentTarget as HTMLDivElement).style.backgroundColor = "#ffffff";
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <h3
          className="text-base font-semibold leading-snug tracking-tight"
          style={{ color: "#1a1a1c" }}
        >
          {project.title[lang]}
        </h3>
        <div className="flex shrink-0 items-center gap-2">
          <span
            className="font-mono text-[10px] font-medium tracking-widest"
            style={{ color: cfg.accentText }}
          >
            {t[lang].status[project.status]}
          </span>
          <span
            className="font-mono text-[10px] tracking-widest"
            style={{ color: "rgba(0,0,0,0.3)" }}
          >
            {project.year}
          </span>
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              title="GitHub"
              className="transition-colors duration-200"
              style={{ color: "rgba(0,0,0,0.2)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = cfg.accentText)
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color =
                  "rgba(0,0,0,0.2)")
              }
            >
              <GitHubIcon />
            </a>
          )}
        </div>
      </div>

      <p
        className="text-sm leading-relaxed"
        style={{ color: "rgba(0,0,0,0.5)" }}
      >
        {project.description[lang]}
      </p>

      <div className="flex flex-wrap gap-1.5 pt-1">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-sm px-2 py-0.5 font-mono text-[10px] font-medium tracking-wide"
            style={{
              backgroundColor: cfg.tagBg,
              border: `1px solid ${cfg.tagBorder}`,
              color: cfg.accentText
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      <div
        className="absolute bottom-0 left-0 h-px w-0 transition-all duration-500 group-hover:w-full"
        style={{ backgroundColor: cfg.accent }}
      />
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState<Category>("fullstack");
  const [lang, setLang] = useState<Lang>("es");
  const cfg = categoryConfig[active];
  const tx = t[lang];
  const filtered = projects
    .sort((a, b) => parseInt(b.year) - parseInt(a.year))
    .filter((p) => p.category === active);

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#f5f5f0",
        fontFamily: "'Inter', system-ui, sans-serif"
      }}
    >
      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-4 md:px-16"
        style={{
          borderBottom: "1px solid rgba(0,0,0,0.07)",
          backgroundColor: "rgba(245,245,240,0.88)",
          backdropFilter: "blur(12px)"
        }}
      >
        <span
          className="font-mono text-xs tracking-[0.2em] uppercase"
          style={{ color: "rgba(0,0,0,0.35)" }}
        >
          Portfolio
        </span>

        <div className="flex items-center gap-4 md:gap-6">
          <a
            href="#projects"
            className="hidden text-xs tracking-wide transition-colors md:block"
            style={{ color: "rgba(0,0,0,0.4)" }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.color = "#1a1a1c")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.color = "rgba(0,0,0,0.4)")
            }
          >
            {tx.nav.projects}
          </a>
          <a
            href="#contact"
            className="hidden text-xs tracking-wide transition-colors md:block"
            style={{ color: "rgba(0,0,0,0.4)" }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.color = "#1a1a1c")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.color = "rgba(0,0,0,0.4)")
            }
          >
            {tx.nav.contact}
          </a>

          {/* Language toggle */}
          <div
            className="flex overflow-hidden"
            style={{
              border: "1px solid rgba(0,0,0,0.12)",
              borderRadius: "4px"
            }}
          >
            {(["es", "en"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className="px-2.5 py-1 font-mono text-[10px] font-medium tracking-widest uppercase transition-all duration-150"
                style={{
                  background: lang === l ? "#1a1a1c" : "transparent",
                  color: lang === l ? "#f5f5f0" : "rgba(0,0,0,0.4)",
                  border: "none",
                  cursor: "pointer",
                  letterSpacing: "0.08em"
                }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative px-8 pb-24 pt-32 md:px-16 md:pt-40">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
            backgroundSize: "80px 80px"
          }}
        />

        <div className="relative max-w-5xl">
          <div
            className="mb-6 inline-block font-mono text-[10px] tracking-[0.3em] uppercase"
            style={{ color: "rgba(0,0,0,0.35)" }}
          >
            {tx.hero.available}
          </div>

          <h1
            className="mb-8 text-5xl font-bold leading-none tracking-tight md:text-7xl lg:text-8xl"
            style={{ color: "#1a1a1c", letterSpacing: "-0.03em" }}
          >
            Dev &{" "}
            <span
              style={{
                color: "transparent",
                WebkitTextStroke: "1px rgba(0,0,0,0.2)"
              }}
            >
              Cloud
            </span>
          </h1>

          <p
            className="mb-12 max-w-xl text-base leading-relaxed md:text-lg"
            style={{ color: "rgba(0,0,0,0.5)" }}
          >
            {tx.hero.bio}
          </p>

          <div className="flex flex-wrap gap-10">
            {tx.hero.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span
                  className="font-mono text-2xl font-light"
                  style={{ color: "#1a1a1c" }}
                >
                  {stat.value}
                </span>
                <span className="text-xs" style={{ color: "rgba(0,0,0,0.4)" }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="px-8 pb-32 md:px-16">
        <div className="max-w-5xl">
          <div
            className="mb-12 flex"
            style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}
          >
            {(Object.keys(categoryConfig) as Category[]).map((cat) => {
              const c = categoryConfig[cat];
              const isActive = active === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className="relative flex flex-col gap-1 px-0 pb-5 pr-10 text-left transition-all duration-200"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  <span
                    className="font-mono text-[10px] tracking-[0.25em] uppercase transition-colors duration-200"
                    style={{
                      color: isActive ? c.accentText : "rgba(0,0,0,0.25)"
                    }}
                  >
                    {c.index}
                  </span>
                  <span
                    className="text-sm font-medium tracking-tight transition-colors duration-200"
                    style={{ color: isActive ? "#1a1a1c" : "rgba(0,0,0,0.35)" }}
                  >
                    {c.label[lang]}
                  </span>
                  {isActive && (
                    <div
                      className="absolute bottom-0 left-0 h-px"
                      style={{ width: "100%", backgroundColor: c.accent }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mb-8 flex items-end justify-between">
            <div>
              <div
                className="mb-2 font-mono text-[10px] tracking-[0.3em] uppercase"
                style={{ color: cfg.accentText }}
              >
                {cfg.label[lang]}
              </div>
              <p className="text-sm" style={{ color: "rgba(0,0,0,0.35)" }}>
                {tx.projects.selected(filtered.length)}
              </p>
            </div>
            <div
              className="hidden font-mono text-xs md:block"
              style={{ color: "rgba(0,0,0,0.2)" }}
            >
              {tx.projects.sorted}
            </div>
          </div>

          <div
            className="grid md:grid-cols-2 lg:grid-cols-3"
            style={{ gap: "1px", backgroundColor: "rgba(0,0,0,0.07)" }}
          >
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                cfg={cfg}
                lang={lang}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section
        className="px-8 py-20 md:px-16"
        style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}
      >
        <div className="max-w-5xl">
          <div
            className="mb-10 font-mono text-[10px] tracking-[0.3em] uppercase"
            style={{ color: "rgba(0,0,0,0.35)" }}
          >
            {tx.certs.title}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                code: "SAA-C03",
                name: {
                  es: "AWS Solutions Architect",
                  en: "AWS Solutions Architect"
                },
                year: "2026",
                icon: (
                  <svg viewBox="0 0 40 40" fill="none" width="36" height="36">
                    <rect
                      width="40"
                      height="40"
                      rx="6"
                      fill="rgba(2,132,199,0.08)"
                    />
                    <path
                      d="M20 8 L32 14 L32 26 L20 32 L8 26 L8 14 Z"
                      stroke="#0284c7"
                      strokeWidth="1.5"
                      fill="none"
                    />
                    <path
                      d="M20 14 L26 17 L26 23 L20 26 L14 23 L14 17 Z"
                      fill="rgba(2,132,199,0.15)"
                      stroke="#0284c7"
                      strokeWidth="1"
                    />
                  </svg>
                )
              },
              {
                code: "Coursera",
                name: {
                  es: "IBM Full Stack Developer",
                  en: "IBM Full Stack Developer"
                },
                year: "2023",
                icon: (
                  <svg viewBox="0 0 40 40" fill="none" width="36" height="36">
                    <rect
                      width="40"
                      height="40"
                      rx="6"
                      fill="rgba(2,132,199,0.08)"
                    />
                    <path
                      d="M12 20 L18 14 L18 18 L28 18 L28 22 L18 22 L18 26 Z"
                      fill="#0284c7"
                      opacity="0.8"
                    />
                    <rect
                      x="10"
                      y="10"
                      width="20"
                      height="20"
                      rx="3"
                      stroke="#0284c7"
                      strokeWidth="1.5"
                      fill="none"
                    />
                  </svg>
                )
              },
              {
                code: "Udemy",
                name: {
                  es: "Figma for Mobile App Design",
                  en: "Figma for Mobile App Design"
                },
                year: "2025",
                icon: (
                  <svg viewBox="0 0 40 40" fill="none" width="36" height="36">
                    <rect
                      width="40"
                      height="40"
                      rx="6"
                      fill="rgba(2,132,199,0.08)"
                    />
                    <circle
                      cx="20"
                      cy="20"
                      r="8"
                      stroke="#0284c7"
                      strokeWidth="1.5"
                      fill="none"
                    />
                    <circle
                      cx="20"
                      cy="20"
                      r="3"
                      fill="#0284c7"
                      opacity="0.8"
                    />
                    <path
                      d="M20 8 L20 12 M20 28 L20 32 M8 20 L12 20 M28 20 L32 20"
                      stroke="#0284c7"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                )
              }
            ].map((cert) => (
              <div
                key={cert.code}
                className="flex items-start gap-4 border p-5 transition-all duration-300"
                style={{
                  borderColor: "rgba(2,132,199,0.15)",
                  backgroundColor: "#ffffff"
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "rgba(2,132,199,0.35)";
                  (e.currentTarget as HTMLDivElement).style.backgroundColor =
                    "rgba(2,132,199,0.05)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "rgba(2,132,199,0.15)";
                  (e.currentTarget as HTMLDivElement).style.backgroundColor =
                    "#ffffff";
                }}
              >
                <div className="mt-0.5 shrink-0">{cert.icon}</div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="font-mono text-[10px] font-medium tracking-widest"
                      style={{ color: "#0369a1" }}
                    >
                      {cert.code}
                    </span>
                    <span
                      className="font-mono text-[10px] tracking-widest"
                      style={{ color: "rgba(0,0,0,0.25)" }}
                    >
                      {cert.year}
                    </span>
                  </div>
                  <p
                    className="text-sm font-semibold leading-tight"
                    style={{ color: "#1a1a1c" }}
                  >
                    {cert.name[lang]}
                  </p>
                  <p className="text-xs" style={{ color: "rgba(0,0,0,0.4)" }}>
                    {tx.certs.level}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack */}
      <section
        className="px-8 py-20 md:px-16"
        style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}
      >
        <div className="max-w-5xl">
          <div
            className="mb-12 font-mono text-[10px] tracking-[0.3em] uppercase"
            style={{ color: "rgba(0,0,0,0.35)" }}
          >
            {tx.stack.title}
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div
                  className="h-px flex-1"
                  style={{ backgroundColor: categoryConfig.fullstack.accent }}
                />
                <span
                  className="font-mono text-[10px] tracking-widest uppercase"
                  style={{ color: categoryConfig.fullstack.accentText }}
                >
                  Full Stack
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "TypeScript",
                  "React",
                  "Node.js",
                  "PostgreSQL",
                  "Docker",
                  "PHP",
                  "Python",
                  "Django",
                  "MySQL",
                  "Git"
                ].map((s) => (
                  <span
                    key={s}
                    className="rounded-sm px-3 py-1 font-mono text-[11px]"
                    style={{
                      backgroundColor: categoryConfig.fullstack.tagBg,
                      border: `1px solid ${categoryConfig.fullstack.tagBorder}`,
                      color: "rgba(0,0,0,0.55)"
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-4 flex items-center gap-3">
                <div
                  className="h-px flex-1"
                  style={{ backgroundColor: categoryConfig.aws.accent }}
                />
                <span
                  className="font-mono text-[10px] tracking-widest uppercase"
                  style={{ color: categoryConfig.aws.accentText }}
                >
                  AWS Cloud
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "EC2",
                  "Lambda",
                  "EKS",
                  "RDS",
                  "S3",
                  "CloudFormation",
                  "Terraform",
                  "SageMaker",
                  "CDK",
                  "IAM"
                ].map((s) => (
                  <span
                    key={s}
                    className="rounded-sm px-3 py-1 font-mono text-[11px]"
                    style={{
                      backgroundColor: categoryConfig.aws.tagBg,
                      border: `1px solid ${categoryConfig.aws.tagBorder}`,
                      color: "rgba(0,0,0,0.55)"
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="px-8 py-24 md:px-16"
        style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}
      >
        <div className="max-w-5xl">
          <div
            className="mb-4 font-mono text-[10px] tracking-[0.3em] uppercase"
            style={{ color: "rgba(0,0,0,0.35)" }}
          >
            {tx.contact.label}
          </div>
          <h2
            className="mb-8 text-3xl font-bold tracking-tight md:text-5xl"
            style={{ color: "#1a1a1c", letterSpacing: "-0.025em" }}
          >
            {tx.contact.heading}
          </h2>
          <p
            className="mb-10 max-w-lg text-base leading-relaxed"
            style={{ color: "rgba(0,0,0,0.5)" }}
          >
            {tx.contact.body}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:kennepo23@email.com"
              className="flex items-center gap-3 border px-6 py-3 text-sm font-medium tracking-wide transition-all duration-200"
              style={{
                borderColor: "rgba(0,168,90,0.4)",
                color: "#007a40",
                backgroundColor: "transparent"
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                  "rgba(0,168,90,0.07)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                  "transparent";
              }}
            >
              <span>Email</span>
              <span className="font-mono text-xs opacity-50">↗</span>
            </a>
            <a
              href="https://www.linkedin.com/in/kenneth-williams-garcia-ba4441232/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 border px-6 py-3 text-sm font-medium tracking-wide transition-all duration-200"
              style={{
                borderColor: "rgba(0,0,0,0.12)",
                color: "rgba(0,0,0,0.45)",
                backgroundColor: "transparent"
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  "rgba(0,0,0,0.3)";
                (e.currentTarget as HTMLAnchorElement).style.color = "#1a1a1c";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  "rgba(0,0,0,0.12)";
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "rgba(0,0,0,0.45)";
              }}
            >
              <span>LinkedIn</span>
              <span className="font-mono text-xs opacity-50">↗</span>
            </a>
            <a
              href="https://github.com/Kwilliams4"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 border px-6 py-3 text-sm font-medium tracking-wide transition-all duration-200"
              style={{
                borderColor: "rgba(0,0,0,0.12)",
                color: "rgba(0,0,0,0.45)",
                backgroundColor: "transparent"
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  "rgba(0,0,0,0.3)";
                (e.currentTarget as HTMLAnchorElement).style.color = "#1a1a1c";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  "rgba(0,0,0,0.12)";
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "rgba(0,0,0,0.45)";
              }}
            >
              <span>GitHub</span>
              <span className="font-mono text-xs opacity-50">↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="px-8 py-8 md:px-16"
        style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}
      >
        <div className="flex max-w-5xl items-center justify-between">
          <span
            className="font-mono text-[10px] tracking-widest"
            style={{ color: "rgba(0,0,0,0.25)" }}
          >
            © 2026
          </span>
          <span
            className="font-mono text-[10px] tracking-widest"
            style={{ color: "rgba(0,0,0,0.25)" }}
          >
            {tx.footer}
          </span>
        </div>
      </footer>
    </div>
  );
}
