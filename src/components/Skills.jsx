import React from 'react';

const skills = [
  { name: 'React', icon: 'bi-code-square', level: 90 },
  { name: 'JavaScript', icon: 'bi-braces', level: 95 },
  { name: 'Node.js', icon: 'bi-server', level: 85 },
  { name: 'Tailwind CSS', icon: 'bi-palette', level: 90 },
  { name: 'MongoDB', icon: 'bi-database', level: 80 },
  { name: 'Git', icon: 'bi-git', level: 85 }
];

export default function Skills() {
  return (
    <section id="skills-section" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 id="skills-heading" className="text-3xl sm:text-4xl font-bold text-center text-secondary-700 mb-12">
          Skills & Technologies
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              id={`skill-card-${index}`}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <i className={`bi ${skill.icon} text-3xl text-primary-600 mr-4`}></i>
                <h3 className="text-xl font-semibold text-secondary-700">{skill.name}</h3>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
