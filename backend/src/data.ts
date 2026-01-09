import { GraphNode } from "./model";

export const graphData: GraphNode[] = [
  {
    name: "Software",
    description: "Complete learning path for modern software development",
    parent: ""
  },
  {
    name: "Frontend",
    description: "Building user interfaces using modern web technologies",
    parent: "Software"
  },
  {
    name: "Backend",
    description: "Server-side development, APIs, and databases",
    parent: "Software"
  },
  {
    name: "DevOps",
    description: "CI/CD, cloud infrastructure, and automation practices",
    parent: "Software"
  },
  {
    name: "HTML & CSS",
    description: "Fundamentals of web structure and styling",
    parent: "Frontend"
  },
  {
    name: "Scripting",
    description: "Core programming for interactive web applications",
    parent: "Frontend"
  },
  {
    name: "Frameworks",
    description: "Vue, React, and component-based UI development",
    parent: "Frontend"
  },
  {
    name: "API Development",
    description: "Designing RESTful and GraphQL APIs",
    parent: "Backend"
  },
  {
    name: "Cloud & CI/CD",
    description: "Docker, Kubernetes, and deployment pipelines",
    parent: "DevOps"
  }
];
