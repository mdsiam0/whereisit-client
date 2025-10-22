// CommunityTrust.jsx
import React from "react";
import CountUp from "react-countup";
import { motion } from "motion/react"

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const CommunityTrust = () => {
  return (
    <section className="py-12 my-40 px-4 bg-blue-500 text-white">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          Trusted by the Community
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10 text-lg max-w-2xl mx-auto"
        >
          Our mission is to bring people together by reuniting them with what matters.
          Here's what we've accomplished so far:
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6 text-center font-semibold text-xl">
          {[
            { value: 3200, label: "Items Reunited" },
            { value: 10000, label: "Active Users" },
            { value: 98, label: "Success Rate", suffix: "%" },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6 + i * 0.2 }}
            >
              <span className="text-5xl font-bold">
                <CountUp
                  end={item.value}
                  duration={2}
                  separator=","
                  suffix={item.suffix || "+"}
                  enableScrollSpy
                  scrollSpyDelay={100}
                />
              </span>
              <p className="mt-2">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityTrust;
