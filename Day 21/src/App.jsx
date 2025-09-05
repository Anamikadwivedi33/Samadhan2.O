import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    }
    else {
      document.documentElement.classList.remove("dark");
    }
  },  [darkMode]);
    
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      {/* Navbar */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Projects Section */}
      <Projects />

      {/* Skills Section */}
      <Skills />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <footer className="py-6 text-center bg-gray-200 dark:bg-gray-900 mt-12">
        <p className="text-gray-700 dark:text-gray-400">
          © {new Date().getFullYear()} NEW HORIZON. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
