"use client";

import React, { useState } from "react";
import { m } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { Send, Loader2 } from "lucide-react";
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
      className="w-full scroll-mt-20 px-[8%] py-12 font-outfit md:px-[12%]"
    >
      <m.p
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-2 text-center font-ovo text-lg text-[#783E30] dark:text-[#B39070]"
      >
        Connect With Me
      </m.p>
      <m.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center font-ovo text-5xl md:text-5xl"
      >
        Get In Touch
      </m.h2>
      <m.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mx-auto mb-12 mt-5 max-w-3xl text-center font-outfit text-sm text-[#59493E] md:text-base dark:text-[#C5B8A5]"
      >
        Have a project in mind or just want to say hi? Let&apos;s connect and
        bring your ideas to life. I&apos;m always open to new collaborations and
        opportunities.
      </m.p>

      <m.form
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        onSubmit={onSubmit}
        className="glass-card mx-auto max-w-2xl rounded-3xl p-6 sm:p-10"
      >
        <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <m.input
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            type="text"
            placeholder="Enter your name"
            aria-label="Your Name"
            required
            name="name"
            disabled={isLoading}
            className="glass-input outline-hidden w-full rounded-2xl p-3.5 text-sm placeholder:text-[#59493E]/60 dark:placeholder:text-[#C5B8A5]/50"
          />
          <m.input
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            type="email"
            placeholder="Enter your email"
            aria-label="Your Email"
            required
            name="email"
            disabled={isLoading}
            className="glass-input outline-hidden w-full rounded-2xl p-3.5 text-sm placeholder:text-[#59493E]/60 dark:placeholder:text-[#C5B8A5]/50"
          />
        </div>

        <m.textarea
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          rows={5}
          name="message"
          placeholder="Enter your message"
          aria-label="Your Message"
          required
          disabled={isLoading}
          className="glass-input outline-hidden mb-6 w-full resize-none rounded-2xl p-4 text-sm placeholder:text-[#59493E]/60 dark:placeholder:text-[#C5B8A5]/50"
        />

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className={`group inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-3 font-outfit text-sm font-semibold shadow-md transition-all duration-300 active:scale-95 ${
              isLoading
                ? "cursor-not-allowed border border-[#B39070]/20 bg-[#FAF6F0]/50 text-[#6E6755] opacity-60"
                : "border border-[#B39070]/30 bg-gradient-to-r from-[#783E30] to-[#924D3D] text-[#FAF6F0] shadow-[#783E30]/25 hover:shadow-lg hover:shadow-[#783E30]/30 dark:from-[#B39070] dark:to-[#C5A585] dark:text-[#190E0C] dark:shadow-black/40"
            }`}
          >
            <span>{isLoading ? "Sending..." : "Submit Now"}</span>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            )}
          </button>
        </div>
      </m.form>
    </m.div>
  );
}
