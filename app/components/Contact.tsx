"use client";

import React, { useState } from "react";
import { m } from "framer-motion";
import { Send } from "lucide-react";
import { useContactSubmit } from "@/hooks/useApi";

interface ContactProps {
  isDarkMode: boolean;
}

export default function Contact({ isDarkMode }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const { mutate, isPending, isSuccess } = useContactSubmit();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate(formData, {
      onSuccess: () => {
        // Reset form
        setFormData({ name: "", email: "", message: "" });
      },
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <m.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="contact"
      className="w-full scroll-mt-20 bg-[url('/footer-bg-color.png')] bg-[length:90%_auto] bg-center bg-no-repeat px-[12%] py-6 dark:bg-none"
    >
      {/* Judul */}
      <m.p
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-2 text-center font-ovo text-lg"
      >
        Connect With Me
      </m.p>
      <m.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center font-ovo text-5xl"
      >
        Get In Touch
      </m.h2>
      <m.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mx-auto mb-12 mt-5 max-w-2xl text-center font-ovo"
      >
        Have a project in mind or just want to say hi? Let&apos;s connect and
        bring your ideas to life. I&apos;m always open to new collaborations and
        opportunities.
      </m.p>

      {/* Form */}
      <m.form
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        onSubmit={handleSubmit}
        className="mx-auto max-w-2xl"
      >
        <div className="mb-8 mt-10 grid grid-cols-auto gap-6">
          <m.input
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            type="text"
            placeholder="Enter your name"
            required
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={isPending}
            className="flex-1 rounded-md border-[0.5px] border-gray-400 bg-white p-3 outline-none dark:border-white/90 dark:bg-darkHover/30"
          />
          <m.input
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            type="email"
            placeholder="Enter your email"
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isPending}
            className="flex-1 rounded-md border-[0.5px] border-gray-400 bg-white p-3 outline-none dark:border-white/90 dark:bg-darkHover/30"
          />
        </div>

        <m.textarea
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          rows={6}
          name="message"
          placeholder="Enter your message"
          required
          value={formData.message}
          onChange={handleChange}
          disabled={isPending}
          className="mb-6 w-full rounded-md border-[0.5px] border-gray-400 bg-white p-4 outline-none dark:border-white/90 dark:bg-darkHover/30"
        ></m.textarea>

        <m.button
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileHover={{ scale: isPending ? 1 : 1.05 }}
          whileTap={{ scale: isPending ? 1 : 0.95 }}
          type="submit"
          disabled={isPending}
          className={`group mx-auto flex items-center gap-2 rounded-full border-[0.5px] px-10 py-3 transition duration-300 ease-in-out ${
            isPending
              ? "cursor-not-allowed bg-gray-400 text-white"
              : "border-gray-700 hover:bg-lightHover hover:shadow-lg dark:border-gray-700 dark:bg-transparent dark:hover:bg-darkHover"
          }`}
        >
          {isPending ? "Sending..." : isSuccess ? "Sent!" : "Submit Now"}
          {!isPending && (
            <m.div
              initial={false}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <Send className="w-4 group-hover:animate-pulse" />
            </m.div>
          )}
        </m.button>
      </m.form>
    </m.div>
  );
}
