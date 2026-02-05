import React from 'react';

export default function About() {
  return (
    <section id="about-section" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 id="about-heading" className="text-3xl sm:text-4xl font-bold text-center text-secondary-700 mb-12">
          About Me
        </h2>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-secondary-600 mb-6">
            I am a passionate Full Stack Developer with expertise in building modern web applications. 
            I love creating elegant solutions to complex problems and continuously learning new technologies.
          </p>
          <p className="text-lg text-secondary-600">
            With a strong foundation in both frontend and backend development, I strive to deliver 
            high-quality, scalable, and user-friendly applications that make a difference.
          </p>
        </div>
      </div>
    </section>
  );
}
