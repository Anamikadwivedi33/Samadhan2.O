import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="py-20 px-8 md:px-20 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
    >
      <motion.h2
        initial={{ x: -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-4xl font-bold mb-6 text-center"
      >
        About Us
      </motion.h2>

      <motion.p
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-lg leading-relaxed text-center hover:text-yellow-500 transition"
      >
        We are the <span className="font-semibold">Team NEW HORIZON</span> seeking to make a difference in this world, 
        trying to solve real-world problems with our skills. Our passion lies in building innovative 
        solutions that empower people and drive positive change.
      </motion.p>
    </section>
  );
}
