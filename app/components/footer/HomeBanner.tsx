"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const HomeBanner = () => {
  return (
    <motion.div
      className="relative mb-8 rounded-2xl"
      animate={{
        backgroundColor: [
          "#9c27b0",
          "#ffeb3b",
          "#8bc34a",
          "#4caf50",
          "#009688",
          "#00bcd4",
          "#03a9f4",
          "#3f51b5",
        ],
        transition: { duration: 20, ease: "linear", repeat: Infinity },
      }}
    >
      <div className="mx-auto px-8 py-12 flex flex-col gap-2 
      md:flex-row items-center justify-evenly ">
        <motion.div
          className="mb-8 md:mb-0 text-center"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 0.8, ease: "easeIn" },
          }}
        >
          <motion.h1
            className="text-4x1 md:text-6xl font-bold text-white mb-4"
            animate={{
              y: [-10, 0],
              transition: { duration: 0.5, ease: "easeOut" },
            }}
          >
            Summer Extravaganza
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-white mb-2"
            animate={{ scale: [0.8, 1], transition: { duration: 0.4 } }}
          >
            Unbelievable discounts on our entire collection
          </motion.p>
          <motion.p
            className="text-2xl md:text-5xl text-yellow-400 font-bold"
            animate={{
              x: [-10, 0],
              backgroundColor: ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.3)"],
              transition: { duration: 0.7, ease: "backInOut" },
            }}
          >
            UP TO 70% OFF
          </motion.p>
        </motion.div>
        <motion.div
          className="w-1/3 relative aspect-video"
          animate={{
            scale: [0.95, 1],
            transition: { duration: 0.4, ease: "easeInOut" },
          }}
        >
          <Image
            src="/banner/pngwing.png"
            alt="Banner Image"
            className="object-contain"
            quality={100}
            fill
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HomeBanner;
