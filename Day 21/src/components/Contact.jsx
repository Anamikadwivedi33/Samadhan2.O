import React from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const team = [
    {
      name: "Anamika Dwivedi",
      email: "anamikadwivedi367@gmail.com",
      github: "https://github.com/Anamikadwivedi33",
    },
    {
      name: "Sadhvi Pandey",
      email: "saddvip15@gmail.com",
      github: "https://github.com/Sadhvi26",
    },
    {
      name: "Saurabh Yadav",
      email: "sy178067@gmail.com",
      github: "https://github.com/Sau-rabh-45",
    },
  ];

  return (
    <section
      id="contact"
      className="py-20 px-8 md:px-20 bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200"
    >
      <motion.h2
        initial={{ y: -30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-4xl font-bold mb-12 text-center"
      >
        Contact Us
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 flex flex-col space-y-4"
        >
          <input
            type="text"
            placeholder="Your Name"
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 
                       bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 
                       focus:ring-indigo-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 
                       bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 
                       focus:ring-indigo-500"
          />
          <textarea
            rows="5"
            placeholder="Your Message"
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 
                       bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 
                       focus:ring-indigo-500"
          ></textarea>
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg 
                       shadow-md hover:bg-indigo-700 transition"
          >
            Send Message
          </button>
        </motion.form>

        {/* Team Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          {team.map((member, index) => (
            <div
              key={index}
              className="p-5 rounded-xl bg-gray-200 dark:bg-gray-800 shadow-md hover:scale-105 transition"
            >
              <h3 className="text-xl font-semibold text-indigo-600 dark:text-yellow-400">
                {member.name}
              </h3>
              <p className="mt-1">
                📧{" "}
                <a
                  href={`mailto:${member.email}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {member.email}
                </a>
              </p>
              <p>
                💻{" "}
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  GitHub Profile
                </a>
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
