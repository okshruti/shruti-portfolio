// All editable portfolio content lives here. Replace "#" links when real URLs are available.
export const profile = {
  name: "Shruti Sharma",
  phone: "+91 7030403060",
  phoneHref: "tel:+917030403060",
  email: "okkshrutii@gmail.com",
  // TODO: add real URLs. Left empty on purpose so no invented links are shown.
  github: "",
  linkedin: "",
  // Add the resume PDF later (e.g. "/downloads/Shruti-Sharma-Resume.pdf"). Empty = button shows "coming soon".
  resume: "",
};

export const summary =
  "Final-year Computer Science and Engineering student (Parul University, 2027) with internship experience in web development. I build full-stack applications with React.js, Node.js, Express.js and Python, and I'm exploring AI/ML.";

export const nav = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export const about = [
  "I'm Shruti Sharma, a Computer Science and Engineering student at Parul University. I'm passionate about building meaningful digital products and exploring how technology can solve real-world problems.",
  "My experience spans full-stack web development, backend integration, database management and AI-powered applications. I've worked with React.js, Node.js, Express.js, Python and modern development tools.",
  "I'm also interested in Artificial Intelligence, Machine Learning, Deep Learning and Data Science. I enjoy exploring new technologies, experimenting with ideas and continuously improving my technical skills.",
];

export const stats = [
  { value: 3, suffix: "", label: "Full-Stack / AI Projects" },
  { value: 2, suffix: "", label: "Internship / Training Experiences" },
  { value: 2027, suffix: "", label: "Graduation" },
  { value: 3, suffix: "+", label: "Development Domains" },
];

export const skills = [
  { title: "Languages", items: ["Java", "JavaScript ES6+", "TypeScript", "Python"] },
  { title: "Frontend", items: ["React.js", "HTML5", "CSS3", "Tailwind CSS", "Vite"] },
  { title: "Backend", items: ["Node.js", "Express.js", "Flask", "FastAPI", "REST APIs"] },
  { title: "Databases", items: ["MongoDB", "PostgreSQL", "MySQL"] },
  { title: "Tools & Cloud", items: ["Git", "GitHub", "Postman", "AWS Fundamentals"] },
  { title: "AI & Data", items: ["Artificial Intelligence", "Machine Learning", "Deep Learning", "Data Science", "Hugging Face", "NumPy", "pandas"] },
];

export type Project = {
  no: string;
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  highlights: string[];
  link: string; // live demo URL; empty = not shown
  github: string; // repository URL; empty = not shown
  image: string; // screenshot URL; empty = labelled placeholder
  // Optional detail fields. Leave empty until real details are provided — nothing is invented.
  problem: string;
  architecture: string;
  contribution: string;
  challenges: string;
  mock: "learning" | "store" | "ai";
};

export const projects: Project[] = [
  {
    no: "01", name: "Studious", tagline: "Adaptive Learning Platform",
    description: "A personalized learning platform designed to adapt the learning experience based on students' needs.",
    tech: ["React.js", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "REST APIs", "JWT"],
    highlights: ["Full-stack application development.", "Authentication using JWT.", "Reusable TypeScript components.", "Frontend and backend API integration.", "Adaptive learning experience."],
    link: "", github: "", image: "", problem: "", architecture: "", contribution: "", challenges: "", mock: "learning",
  },
  {
    no: "02", name: "Voidr", tagline: "Clothing E-commerce Store",
    description: "A modern clothing e-commerce platform with product management and payment integration.",
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "Razorpay", "Three.js"],
    highlights: ["Product and order management.", "Customer and admin dashboard.", "REST API integration.", "Razorpay payment gateway integration.", "Database-driven application."],
    link: "", github: "", image: "", problem: "", architecture: "", contribution: "", challenges: "", mock: "store",
  },
  {
    no: "03", name: "AI Outfit Generator", tagline: "AI-Powered Fashion Application",
    description: "An AI-powered application that integrates a machine learning model to generate outfit-related results.",
    tech: ["React.js", "Vite", "Python", "FastAPI", "Hugging Face"],
    highlights: ["React-based frontend.", "Python FastAPI backend.", "Integration with an open-source Hugging Face model.", "API-based frontend/backend communication."],
    link: "", github: "", image: "", problem: "", architecture: "", contribution: "", challenges: "", mock: "ai",
  },
];

export const experience = [
  {
    company: "Cognifyz IT Solutions Pvt. Ltd.", role: "Web Development Intern", period: "January 2026 – February 2026", place: "Remote",
    points: ["Developed reusable and maintainable code for responsive web pages.", "Integrated frontend and backend using REST APIs.", "Collaborated using Git and GitHub.", "Contributed to improvements in user engagement."],
  },
  {
    company: "Sofcon India", role: "Python Full Stack Trainee", period: "June 2023 – August 2023", place: "Pune",
    points: ["Worked on frontend and backend components.", "Used Python and Flask.", "Integrated components through REST APIs.", "Followed collaborative, Agile-style development practices."],
  },
];

export const education = [
  { school: "Parul University", degree: "B.Tech in Computer Science and Engineering", year: "2027", note: "CGPA: 7.7" },
  { school: "MSBTE", degree: "Diploma in Computer Engineering", year: "2024", note: "" },
];

export const certifications = [
  { title: "AWS Academy Graduate – Cloud Foundations", year: "2025" },
  { title: "AI Fundamentals with IBM SkillsBuild", year: "2025" },
  { title: "Python with Data Science – Sofcon", year: "2023" },
];

export const achievements = [
  { title: "Vadodara Hackathon 6.0", year: "2025" },
];

export const aiTopics = [
  { name: "Machine Learning", text: "Systems that learn patterns from data to make predictions without explicit rules." },
  { name: "Deep Learning", text: "Machine learning with multi-layer neural networks, used for images, text and speech." },
  { name: "Generative AI", text: "Models that create new content such as text, images or code from a prompt." },
  { name: "Agentic AI", text: "AI systems that plan and take multi-step actions using tools to reach a goal." },
  { name: "RAG", text: "Retrieval-Augmented Generation: grounding a model's answers in retrieved documents." },
];

export const aiPractice = [
  "Integrated an open-source Hugging Face model into the AI Outfit Generator via a Python FastAPI backend.",
  "Completed AI Fundamentals with IBM SkillsBuild (2025) and Python with Data Science – Sofcon (2023).",
];

export const aiInterests = ["Machine Learning", "Deep Learning", "Generative AI", "Agentic AI", "Retrieval-Augmented Generation (RAG)"];
