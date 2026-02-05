import React, { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = ['About', 'Skills', 'Projects', 'Contact'];

  return (
    <header id="main-header" className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <nav id="primary-nav" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <a id="logo-link" href="#" className="text-xl sm:text-2xl font-bold text-primary-600">
            Youssef Dafa
          </a>

          <button
            id="mobile-menu-btn"
            className="md:hidden text-2xl text-primary-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`bi ${isMenuOpen ? 'bi-x' : 'bi-list'}`}></i>
          </button>

          <ul className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <li key={item}>
                <a
                  id={`nav-${item.toLowerCase()}`}
                  href={`#${item.toLowerCase()}`}
                  className="text-secondary-600 hover:text-primary-600 transition-colors duration-300"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {isMenuOpen && (
          <div id="mobile-menu" className="md:hidden pb-4">
            <ul className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="block text-secondary-600 hover:text-primary-600 transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
