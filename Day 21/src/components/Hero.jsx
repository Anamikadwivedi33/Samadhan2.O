import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-r from-gray-500 via-indigo-700 to-pink-400 dark:from-gray-900 dark:via-gray-800 dark:to-black text-white"
    >
      {/* Team Name */}
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-6xl font-extrabold mb-4"
      >
        NEW HORIZON
      </motion.h1>

      {/* Tagline */}
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-xl md:text-2xl font-semibold mb-6"
      >
        Full-Stack Developer Team
      </motion.h2>

      {/* Members */}
      <motion.p
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="text-lg md:text-xl mb-10"
      >
        👩‍💻 Anamika Dwivedi &nbsp; | &nbsp; 👩‍💻 Sadhvi Pandey &nbsp; | &nbsp; 👨‍💻 Saurabh Yadav
      </motion.p>

      {/* Call-to-Action */}
      <motion.a
        href="#projects"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-yellow-300 transition"
      >
        View Projects
      </motion.a>
    </section>
  );
}
