import React from 'react';

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-featured online shopping platform with payment integration',
    icon: 'bi-cart',
    tags: ['React', 'Node.js', 'MongoDB']
  },
  {
    title: 'Task Management App',
    description: 'Collaborative task management tool with real-time updates',
    icon: 'bi-list-check',
    tags: ['React', 'Firebase', 'Tailwind']
  },
  {
    title: 'Portfolio Website',
    description: 'Modern portfolio website with smooth animations',
    icon: 'bi-person-badge',
    tags: ['React', 'Vite', 'CSS']
  }
];

export default function Projects() {
  return (
    <section id="projects-section" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 id="projects-heading" className="text-3xl sm:text-4xl font-bold text-center text-secondary-700 mb-12">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              id={`project-card-${index}`}
              className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-primary-600 rounded-lg flex items-center justify-center mb-4">
                <i className={`bi ${project.icon} text-white text-3xl`}></i>
              </div>
              <h3 className="text-xl font-semibold text-secondary-700 mb-3">{project.title}</h3>
              <p className="text-secondary-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
