import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/portfolio/Header";
import { Hero } from "@/components/portfolio/Hero";
import { About, Education, Experience, Projects, Skills } from "@/components/portfolio/Sections";
import { AIInterest, Contact, Footer } from "@/components/portfolio/Closing";

const title = "Shruti Sharma — Full-Stack Developer & AI/ML Enthusiast";
const description =
  "Portfolio of Shruti Sharma, Computer Science Engineer at Parul University building full-stack web apps and exploring AI/ML.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <AIInterest />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
