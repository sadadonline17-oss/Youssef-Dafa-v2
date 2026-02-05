import React from 'react';

export default function Hero() {
  return (
    <section id="hero-section" className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h1 id="hero-title" className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-700 mb-6">
              Hi, I am <span className="text-primary-600">Youssef Dafa</span>
            </h1>
            <p id="hero-subtitle" className="text-lg sm:text-xl text-secondary-600 mb-8">
              Full Stack Developer & Creative Problem Solver
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                id="hero-cta-projects"
                href="#projects"
                className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                View Projects
              </a>
              <a
                id="hero-cta-contact"
                href="#contact"
                className="px-8 py-3 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-all duration-300"
              >
                Get in Touch
              </a>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div id="hero-image-container" className="w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center shadow-2xl">
              <i className="bi bi-code-slash text-white text-8xl sm:text-9xl"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
