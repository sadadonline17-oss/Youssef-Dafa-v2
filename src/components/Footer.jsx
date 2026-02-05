import React from 'react';

export default function Footer() {
  return (
    <footer id="main-footer" className="bg-secondary-700 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">Youssef Dafa</h3>
            <p className="text-slate-300">Full Stack Developer</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-2xl hover:text-primary-400 transition-colors duration-300">
              <i className="bi bi-github"></i>
            </a>
            <a href="#" className="text-2xl hover:text-primary-400 transition-colors duration-300">
              <i className="bi bi-linkedin"></i>
            </a>
            <a href="#" className="text-2xl hover:text-primary-400 transition-colors duration-300">
              <i className="bi bi-twitter"></i>
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-600 text-center">
          <p className="text-slate-400 text-sm">
            Powered by <a href="https://websparks.ai" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:underline">WebSparks AI</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
