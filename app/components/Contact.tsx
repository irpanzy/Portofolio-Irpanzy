"use client";

import React, { useState } from "react";
import { m } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { Send } from "lucide-react";
import axios from "axios";

interface ContactProps {
  isDarkMode?: boolean;
}

export default function Contact({ isDarkMode }: ContactProps) {
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setResult("");

    const target = event.currentTarget;
    const formData = new FormData(target);
    if (accessKey) {
      formData.append("access_key", accessKey);
    }

    try {
      const response = await axios.post(
        "https://api.web3forms.com/submit",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );

      if (response.data?.success) {
        toast.success("Form submitted successfully!");
        setResult("Form Submitted Successfully");
        target.reset();
      } else {
        const errorMsg = response.data?.message || "Submission failed";
        toast.error("Submission failed: " + errorMsg);
        setResult(errorMsg);
      }
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "An error occurred. Please try again.";
      toast.error(message);
      setResult("An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <m.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="contact"
      className="w-full scroll-mt-20 bg-[url('/footer-bg-color.png')] bg-[length:90%_auto] bg-center bg-no-repeat px-[12%] py-6 font-outfit dark:bg-none"
    >
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
        className="mx-auto mb-12 mt-5 max-w-3xl text-center font-ovo text-sm text-gray-700 md:text-base dark:text-gray-200"
      >
        Have a project in mind or just want to say hi? Let&apos;s connect and
        bring your ideas to life. I&apos;m always open to new collaborations and
        opportunities.
      </m.p>

      <m.form
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        onSubmit={onSubmit}
        className="mx-auto max-w-2xl"
      >
        <div className="mb-8 mt-10 grid grid-cols-auto gap-6">
          <m.input
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            type="text"
            placeholder="Enter your name"
            aria-label="Your Name"
            required
            name="name"
            disabled={isLoading}
            className="flex-1 rounded-md border-[0.5px] border-gray-400 bg-white p-3 outline-none dark:border-white/90 dark:bg-darkHover/30"
          />
          <m.input
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            type="email"
            placeholder="Enter your email"
            aria-label="Your Email"
            required
            name="email"
            disabled={isLoading}
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
          aria-label="Your Message"
          required
          disabled={isLoading}
          className="mb-6 w-full rounded-md border-[0.5px] border-gray-400 bg-white p-4 outline-none dark:border-white/90 dark:bg-darkHover/30"
        ></m.textarea>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className={`group inline-flex items-center justify-center gap-2.5 rounded-full border px-7 py-2.5 font-ovo text-sm font-medium shadow-sm backdrop-blur-sm transition-all duration-300 active:scale-95 ${
              isLoading
                ? "cursor-not-allowed border-gray-300 bg-gray-100 text-gray-400 dark:border-white/10 dark:bg-white/5 dark:text-gray-500"
                : "border-black/15 bg-white/70 text-zinc-800 hover:border-black/30 hover:bg-black/5 hover:shadow-md dark:border-white/20 dark:bg-white/5 dark:text-zinc-200 dark:hover:border-white/40 dark:hover:bg-white/10"
            }`}
          >
            <span>{isLoading ? "Sending..." : "Submit Now"}</span>
            {!isLoading && (
              <Send className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            )}
          </button>
        </div>
      </m.form>
    </m.div>
  );
}
