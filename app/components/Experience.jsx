import React from "react";
import { motion } from "motion/react";
import { MapPin, Calendar, Building2 } from "lucide-react";
import { experienceData } from "@/assets/assets";
import Image from "next/image";

export default function Experience({ isDarkMode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="experience"
      className="w-full px-4 md:px-12 py-8 scroll-mt-20"
    >
      <motion.h4
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center mb-2 text-lg font-ovo"
      >
        Professional Journey
      </motion.h4>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center text-4xl md:text-5xl font-ovo"
      >
        Work Experience
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="text-center max-w-3xl mx-auto mt-5 mb-12 font-ovo text-sm md:text-base text-gray-600 dark:text-gray-300"
      >
        Real-world experience building scalable applications and working with
        modern web technologies in professional environments.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="max-w-5xl mx-auto space-y-8"
      >
        {experienceData.map((experience, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
            className="relative pl-8 pb-12 border-l-2 border-gray-300 dark:border-gray-600 last:pb-0"
          >
            {/* Timeline Dot */}
            <div className="absolute w-4 h-4 bg-[#77BEF0] rounded-full -left-2 top-0 border-4 border-white dark:border-darkTheme"></div>

            {/* Experience Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-darkHover/30 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-600"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-4">
                <div className="flex items-start gap-4">
                  {/* Company Logo */}
                  {experience.logo && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 1.1 }}
                      className="flex-shrink-0"
                    >
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center justify-center p-2 shadow-sm">
                        <Image
                          src={experience.logo}
                          alt={`${experience.company} logo`}
                          width={48}
                          height={48}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Position and Company Info */}
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white font-ovo">
                      {experience.position}
                    </h3>
                    <div className="flex items-center gap-2 text-[#77BEF0] font-medium mt-1">
                      <Building2 className="w-4 h-4" />
                      <span>{experience.company}</span>
                    </div>
                  </div>
                </div>

                {/* Period and Location */}
                <div className="flex flex-col md:items-end gap-1 md:ml-4 mt-2 md:mt-0">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{experience.period}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{experience.location}</span>
                  </div>
                </div>
              </div>

              {/* Responsibilities */}
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-200 mb-3">
                  Key Responsibilities:
                </h4>
                <motion.ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {experience.responsibilities.map((responsibility, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 1.2 + idx * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-1.5 h-1.5 bg-[#77BEF0] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-justify">{responsibility}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
