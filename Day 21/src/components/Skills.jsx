import React from "react";
import { motion } from "framer-motion";

export default function Skills() {
  const skills = [
    "HTML", "CSS", "JavaScript", "React", "Node.js",
    "Express.js", "MongoDB", "SQL", "Git & GitHub",
    "Tailwind CSS", "REST APIs", "Problem Solving"
  ];

  return (
    <section
      id="skills"
      className="py-20 px-8 md:px-20 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
    >
      <motion.h2
        initial={{ y: -30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-4xl font-bold mb-10 text-center"
      >
        Skills
      </motion.h2>

      <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
        {skills.map((skill, index) => (
          <motion.span
            key={index}
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="px-5 py-2 rounded-full bg-indigo-100 dark:bg-gray-800 
                       text-indigo-700 dark:text-yellow-400 font-medium 
                       shadow-md hover:scale-110 transform transition cursor-default"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </section>
  );
}
