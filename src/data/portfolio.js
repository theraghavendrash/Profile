export const portfolioData = {
  personal: {
    name: "Raghavendra S H",
    shortName: "Raghav",
    role: "2nd Year B.Tech Student in AI & ML",
    eyebrow: "PORTFOLIO / B.TECH AI & ML",
    headlineWords: [
      "Building",
      "practical",
      "projects,",
      "strengthening",
      "fundamentals,",
      "and",
      "exploring",
      "AI/ML."
    ],
    bio: "Second-year B.Tech student in Artificial Intelligence and Machine Learning. Passionate about software fundamentals in C, data exploration with Python, and building web applications. Focused on learning by building and teamwork.",
    location: "Bengaluru, IN",
    email: "raghavendracsh@gmail.com",
    availability: "Available for internships & collaborative student projects",
    stats: [
      { label: "Completed Works", value: 3, suffix: " Projects", isNumeric: true },
      { label: "Core Foundation", value: 4, suffix: " Languages", isNumeric: true },
      { label: "Current Focus", value: "Year 2", suffix: " · B.Tech AI/ML", isNumeric: false }
    ],
    links: {
      github: "https://github.com/theraghavendrash",
      linkedin: "https://linkedin.com/in/raghavendracsh",
      email: "mailto:raghavendracsh@gmail.com",
      resume: "#contact"
    }
  },

  about: {
    eyebrow: "STUDENT PROFILE",
    title: "Learning computer science through hands-on practice.",
    paragraphs: [
      "I am a second-year undergraduate student pursuing B.Tech in Artificial Intelligence and Machine Learning. I believe the best way to understand technology is by building working software from the ground up.",
      "My journey began with low-level logic and graphics in C, expanded into team-based data analysis and GUI development with Python, and led to building web applications like Loan 360. Currently, I am deepening my knowledge in machine learning and generative AI concepts."
    ],
    principles: [
      {
        code: "01",
        title: "Hands-on Practice",
        desc: "Write code to understand how it works, from C memory and graphics to Python data pipelines."
      },
      {
        code: "02",
        title: "Team Collaboration",
        desc: "Enjoy collaborating on modular group projects, coordinating code, and solving problems together."
      },
      {
        code: "03",
        title: "Continuous Curiosity",
        desc: "Always exploring new topics including modern ML libraries, generative AI workflows, and web tools."
      }
    ]
  },

  skills: {
    eyebrow: "TECHNICAL SKILLS",
    title: "Languages, Libraries & Learning",
    categories: [
      {
        id: "languages",
        name: "Languages",
        desc: "Core programming and web markup languages used in coursework and projects.",
        items: [
          {
            name: "C",
            category: "languages",
            level: "Coursework & Labs",
            tooltip: "C: used in coursework labs and 2D graphics editor"
          },
          {
            name: "C++",
            category: "languages",
            level: "Coursework",
            tooltip: "C++: coursework in OOP and algorithmic problem solving"
          },
          {
            name: "Python",
            category: "languages",
            level: "Projects & Scripting",
            tooltip: "Python: used in my team CSV dashboard and data scripts"
          },
          {
            name: "HTML",
            category: "languages",
            level: "Web Basics",
            tooltip: "HTML: semantic structure used in Loan 360"
          }
        ]
      },
      {
        id: "libraries",
        name: "Libraries",
        desc: "Data processing, plotting, and GUI libraries applied in project development.",
        items: [
          {
            name: "Pandas",
            category: "libraries",
            level: "Data Exploration",
            tooltip: "Pandas: loaded and explored CSV datasets in team dashboard"
          },
          {
            name: "Matplotlib",
            category: "libraries",
            level: "Visualization",
            tooltip: "Matplotlib: plotted visual charts for data exploration"
          },
          {
            name: "Tkinter",
            category: "libraries",
            level: "Desktop GUI",
            tooltip: "Tkinter: built desktop GUI interface for team mini-project"
          }
        ]
      },
      {
        id: "learning",
        name: "Learning",
        desc: "Topics and frameworks currently studying and experimenting with.",
        items: [
          {
            name: "NumPy",
            category: "learning",
            level: "In Progress",
            tooltip: "NumPy: currently studying array operations and numerical math"
          },
          {
            name: "scikit-learn",
            category: "learning",
            level: "In Progress",
            tooltip: "scikit-learn: currently exploring machine learning workflows"
          },
          {
            name: "Generative AI",
            category: "learning",
            level: "Certified",
            tooltip: "Generative AI: certified in Outskill Mastermind programme"
          }
        ]
      }
    ]
  },

  projects: [
    {
      number: "01",
      id: "loan-360",
      featured: true,
      badge: "Latest",
      title: "Loan 360",
      tagline: "Loan Management Web Application",
      description: "Loan management web app with sign-in, borrower registration and a loan application flow; admin access is provisioned through the database.",
      tags: ["HTML", "CSS", "JavaScript", "Database"],
      liveDemoUrl: "https://theraghavendrash.github.io/Loan360/",
      githubUrl: "https://github.com/theraghavendrash",
      isTeamProject: false
    },
    {
      number: "02",
      id: "graphics-editor",
      featured: false,
      badge: null,
      title: "2D Graphics Editor",
      tagline: "C Mini-Project with graphics.h",
      description: "C mini-project using graphics.h with shapes, colour fills and transformations.",
      tags: ["C", "graphics.h", "Mini-Project"],
      liveDemoUrl: null,
      githubUrl: "https://github.com/theraghavendrash/-Graphics-Editor",
      isTeamProject: false
    },
    {
      number: "03",
      id: "csv-data-dashboard",
      featured: false,
      badge: null,
      title: "CSV Data Dashboard",
      tagline: "4-Module Team Project in Python",
      description: "4-module team project in Python. Loads CSV files, explores the data with Pandas, draws charts with Matplotlib and wraps it all in a Tkinter desktop interface.",
      tags: ["Python", "Pandas", "Matplotlib", "Tkinter", "Team Project"],
      liveDemoUrl: null,
      githubUrl: null,
      isTeamProject: true
    }
  ],

  journey: {
    eyebrow: "LEARNING MILESTONES",
    title: "Academic & Project Journey",
    milestones: [
      {
        period: "Web Project",
        role: "Building Loan 360",
        place: "Personal Project",
        description: "Built a loan management web application featuring user sign-in, borrower registration, and structured loan application flows, with database-backed admin provisioning.",
        tags: ["Web App", "Loan 360", "JavaScript", "Database"]
      },
      {
        period: "Programme",
        role: "Ignite India 5.0 Entrepreneurship Programme",
        place: "Student Initiative",
        description: "Participated in the Ignite India 5.0 entrepreneurship programme, gaining exposure to problem discovery, practical prototyping, and pitching project concepts.",
        tags: ["Entrepreneurship", "Ideation", "Innovation"]
      },
      {
        period: "Certification",
        role: "Outskill Generative AI Mastermind",
        place: "Certified Programme",
        description: "Completed the Outskill Generative AI Mastermind certification, learning prompt engineering methodologies, foundational model workflows, and hands-on AI tools.",
        tags: ["Generative AI", "Certified", "Prompt Engineering"]
      },
      {
        period: "Team Mini-Project",
        role: "Python Team Mini-Project (CSV Data Dashboard)",
        place: "Academic Collaboration",
        description: "Collaborated in a 4-module team project in Python. Loaded CSV files, explored data with Pandas, drew visual charts with Matplotlib, and integrated it into a Tkinter GUI.",
        tags: ["Python", "Pandas", "Matplotlib", "Tkinter", "Team Project"]
      },
      {
        period: "Foundational Labs",
        role: "C Programming Labs",
        place: "B.Tech Coursework",
        description: "Hands-on lab coursework in C programming covering algorithms, modular functions, memory basics, and building interactive 2D graphics with graphics.h.",
        tags: ["C", "Data Structures", "graphics.h", "Labs"]
      }
    ]
  },

  contact: {
    eyebrow: "GET IN TOUCH",
    title: "Let's connect for projects or discussions.",
    subtitle: "Feel free to reach out regarding college projects, technical discussions, or student opportunities.",
    email: "raghavendracsh@gmail.com",
    responseTime: "Usually responds within 24 hours",
    timezone: "IST (UTC+5:30)"
  }
};

export default portfolioData;
