import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Send } from "lucide-react";

export default function Contact({ isDarkMode }) {
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setResult("");

    const formData = new FormData(event.target);
    formData.append("access_key", accessKey);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Form submitted successfully!");
        setResult("Form Submitted Successfully");
        event.target.reset();
      } else {
        toast.error("Submission failed: " + data.message);
        setResult(data.message);
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
      setResult("An error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="contact"
      className="w-full px-[12%] py-6 scroll-mt-20 bg-[url('/footer-bg-color.png')] bg-no-repeat bg-center bg-[length:90%_auto] dark:bg-none"
    >
      {/* Judul */}
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center mb-2 text-lg font-ovo"
      >
        Connect With Me
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center text-5xl font-ovo"
      >
        Get In Touch
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="text-center max-w-2xl mx-auto mt-5 mb-12 font-ovo"
      >
        Have a project in mind or just want to say hi? Let’s connect and bring
        your ideas to life. I'm always open to new collaborations and
        opportunities.
      </motion.p>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        onSubmit={onSubmit}
        className="max-w-2xl mx-auto"
      >
        <div className="grid grid-cols-auto gap-6 mt-10 mb-8">
          <motion.input
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            type="text"
            placeholder="Enter your name"
            required
            name="name"
            className="flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white dark:bg-darkHover/30 dark:border-white/90"
          />
          <motion.input
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            type="email"
            placeholder="Enter your email"
            required
            name="email"
            className="flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white dark:bg-darkHover/30 dark:border-white/90"
          />
        </div>

        <motion.textarea
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          rows="6"
          name="message"
          placeholder="Enter your message"
          required
          className="w-full p-4 outline-none border-[0.5px] border-gray-400 rounded-md bg-white mb-6 dark:bg-darkHover/30 dark:border-white/90"
        ></motion.textarea>

        <motion.button
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileHover={{ scale: isLoading ? 1 : 1.05 }}
          whileTap={{ scale: isLoading ? 1 : 0.95 }}
          type="submit"
          disabled={isLoading}
          className={`group px-10 py-3 border-[0.5px] rounded-full flex items-center gap-2 transition duration-300 ease-in-out mx-auto ${
            isLoading
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "border-gray-700 hover:shadow-lg hover:bg-lightHover dark:bg-transparent dark:border-gray-700 dark:hover:bg-darkHover"
          }`}
        >
          {isLoading ? "Sending..." : "Submit Now"}
          {!isLoading && (
            <motion.div
              initial={false}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <Send alt="arrow" className="w-4 group-hover:animate-pulse" />
            </motion.div>
          )}
        </motion.button>
      </motion.form>
    </motion.div>
  );
}
