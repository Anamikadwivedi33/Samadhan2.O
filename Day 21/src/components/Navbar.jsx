import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar({ darkMode, setDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="flex justify-between items-center px-8 py-4 shadow-md sticky top-0 z-50 bg-gradient-to-r from-teal-500 to-teal-700 dark:from-gray-900 dark:to-gray-800"
    >
      {/* Logo / Brand Name */}
      <h1 className="text-2xl font-bold text-white cursor-pointer">
        NEW HORIZON
      </h1>

      {/* Desktop Nav Links */}
      <ul className="hidden md:flex gap-8 text-white font-medium">
        {navLinks.map((link, i) => (
          <motion.li
            key={link.name}
            whileHover={{ scale: 1.1 }}
            className="hover:text-yellow-300 cursor-pointer"
          >
            <a href={link.href}>{link.name}</a>
          </motion.li>
        ))}
      </ul>

      {/* Right Side: Dark Mode + Mobile Menu Button */}
      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-white dark:bg-gray-700 p-2 rounded-full shadow hover:scale-110 transition"
        >
          {darkMode ? "🌙" : "☀️"}
        </button>

        {/* Hamburger (Mobile only) */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.ul
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
          className="absolute top-16 right-0 w-2/3 bg-gradient-to-b from-purple-600 to-indigo-600 dark:from-gray-900 dark:to-gray-800 p-6 flex flex-col gap-6 text-white font-medium shadow-lg md:hidden"
        >
          {navLinks.map((link) => (
            <li
              key={link.name}
              className="hover:text-yellow-300 cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <a href={link.href}>{link.name}</a>
            </li>
          ))}
        </motion.ul>
      )}
    </motion.nav>
  );
}
