"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Instagram } from "lucide-react";

export default function CreatorSection() {
  return (
    <section className="py-12 px-6 md:px-20  text-gray-800">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <motion.div
          className="w-full md:w-2/3 space-y-4"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-bold">Pranshu Patel</h2>
          <p className="text-xl text-slate-700 font-semibold">
            Full-Stack Developer
          </p>
          <p className="text-base text-gray-600 leading-relaxed">
            I am a passionate full-stack developer who loves turning ideas into
            real-world applications. HomeBites was born out of a desire to
            connect home chefs with food lovers, building a platform that is as
            authentic as the meals it delivers. I enjoy working across the
            stack, designing thoughtful user experiences, and integrating smart
            systems behind the scenes.
          </p>
          <div className="flex gap-4 pt-4">
            <Link
              href="https://github.com/Pranshu-2908"
              target="_blank"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6 text-gray-700 hover:text-black" />
            </Link>
            <Link
              href="https://linkedin.com/in/pranshupatel"
              target="_blank"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6 text-gray-700 hover:text-blue-600" />
            </Link>
            <Link
              href="https://instagram.com/pranshu.codes"
              target="_blank"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6 text-gray-700 hover:text-pink-600" />
            </Link>
          </div>
        </motion.div>
        <motion.div
          className="w-full md:w-1/3 relative h-72 md:h-96"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Image
            src="/about.jpg"
            alt="Pranshu Patel"
            fill
            className="object-cover rounded-xl shadow-md"
          />
        </motion.div>
      </div>
    </section>
  );
}
