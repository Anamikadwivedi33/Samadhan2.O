import React from "react";
import { motion } from "framer-motion";

export default function Projects() {
  const projects = [
    {
      title: "Crop Recommendation System",
      description:
        "A system for large-scale farmers that generates the 3 best crops according to the nutrients present in the soil & climate conditions. It also uses historical data for production analysis and connects farmers to schemes and incentives.",
    },
    {
      title: "Library Management System",
      description:
        "Tracks registered members, their fee due dates, and activity. It manages issued books, calculates late charges, and ensures smooth library operations.",
    },
    {
      title: "Food Delivery Website",
      description:
        "A website that connects restaurants and customers for home delivery. Includes separate veg/non-veg sections and integrates a payment gateway.",
    },
    {
      title: "Student Portal",
      description:
        "A portal for students to track their learning progress. Students can mark completed topics, view personal details, and store documents digitally.",
    },
  ];

  return (
    <section
      id="projects"
      className="py-20 px-8 md:px-20 bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-200"
    >
      <motion.h2
        initial={{ y: -30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-4xl font-bold mb-12 text-center"
      >
        Projects
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl shadow-lg bg-gray-100 dark:bg-gray-800 hover:scale-105 transform transition"
          >
            <h3 className="text-2xl font-semibold mb-4 text-indigo-600 dark:text-yellow-400">
              {project.title}
            </h3>
            <p className="text-lg leading-relaxed">{project.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
