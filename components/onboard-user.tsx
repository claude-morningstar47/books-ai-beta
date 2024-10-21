"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import {
  BadgeDollarSign,
  ChartCandlestick,
  Facebook as FacebookIcon,
  HandCoins,
  Instagram,
  LucideLinkedin,
  Magnet,
  Megaphone,
  MonitorCheck,
  NotebookPen,
  Youtube,
} from "lucide-react";
import { Session } from "@/lib/types";
import { STAGGER_CHILD_VARIANTS } from "@/lib/utils";
import { patchUser } from "@/app/actions/user-actions";

export default function Onboarding({ session }: { session: Session }) {
  const [step, setStep] = useState(0);
  const [isAiAssistance, setIsAiAssistance] = useState(false);
  const [userData, setUserData] = useState({
    follow: [] as string[],
    genre: [] as string[],
    expertise: [] as string[],
  });
  const router = useRouter();

  const handleNext = () => setStep((prevStep) => prevStep + 1);

  const handleFinish = async () => {
    setIsAiAssistance(true);
    await patchUser(session.user.id, {
      onboarded: true,
      aiAssistanceEnabled: isAiAssistance,
      preferredGenre: {
        expertise: userData.expertise as string[],
        follow: userData.follow as string[],
        genre: userData.genre as string[],
      },
    });
    router.push("/book");
  };

  const updateCheckedItems = (
    field: keyof typeof userData,
    value: string,
    checked: boolean
  ) => {
    setUserData((prevData) => ({
      ...prevData,
      [field]: checked
        ? [...prevData[field], value]
        : (prevData[field] as string[]).filter((item) => item !== value),
    }));
  };

  const inputStyles =
    "rounded border-gray-300 text-primary-600 focus:ring-2 focus:ring-primary-500 transition duration-200";

  return (
    <motion.div
      className="z-10"
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, type: "spring" }}
    >
      <motion.div
        variants={{
          show: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
        initial="hidden"
        animate="show"
        className="mx-5 flex flex-col items-center space-y-10 text-center sm:mx-auto"
      >
        {step === 0 && (
          <>
            <motion.h1
              className="font-display text-4xl font-bold text-foreground transition-colors sm:text-5xl"
              variants={STAGGER_CHILD_VARIANTS}
            >
              Welcome to{" "}
              <span className="font-bold tracking-tighter">02 Book AI</span>
            </motion.h1>
            <motion.p
              className="max-w-md text-accent-foreground/80 transition-colors sm:text-lg"
              variants={STAGGER_CHILD_VARIANTS}
            >
              Help us customize your experience by telling us a bit about
              yourself and your goals.
            </motion.p>
            <motion.div variants={STAGGER_CHILD_VARIANTS}>
              <Button
                className="px-10 text-base font-medium"
                onClick={handleNext}
              >
                Get Started
              </Button>
            </motion.div>
          </>
        )}

        {/* Step 1: Expertise with Icons */}
        {step === 1 && (
          <motion.div variants={STAGGER_CHILD_VARIANTS}>
            <p className="max-w-md text-accent-foreground/80 transition-colors sm:text-lg font-bold">
              What kind of expertise do you have?
            </p>

            <div className="flex flex-col items-start space-y-4">
              {[
                { label: "Marketing", icon: <Megaphone /> },
                { label: "Human Resources", icon: <HandCoins /> },
                { label: "Legal", icon: <NotebookPen /> },
                { label: "IT", icon: <MonitorCheck /> },
                { label: "Sales", icon: <BadgeDollarSign /> },
                { label: "Finance", icon: <ChartCandlestick /> },
              ].map(({ label, icon }) => (
                <label key={label} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="expertise"
                    value={label}
                    checked={userData.expertise.includes(label)}
                    onChange={(e) =>
                      updateCheckedItems("expertise", label, e.target.checked)
                    }
                    className={inputStyles}
                    required
                  />
                  <span className="text-lg">{icon}</span>
                  <span className="text-lg font-medium">{label}</span>
                </label>
              ))}
            </div>

            <Button className="mt-6" onClick={handleNext}>
              Next
            </Button>
          </motion.div>
        )}

        {/* Step 2: Genre with Icons */}
        {step === 2 && (
          <motion.div variants={STAGGER_CHILD_VARIANTS}>
            <p className="max-w-md text-accent-foreground/80 transition-colors sm:text-lg font-bold">
              Where do you want to start?
            </p>
            <div className="flex flex-col items-start space-y-4">
              {[
                { label: "Lead magnet", icon: <Magnet /> },
                { label: "eBook", icon: <NotebookPen /> },
              ].map(({ label, icon }) => (
                <label key={label} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="genre"
                    value={label}
                    checked={userData.genre.includes(label)}
                    onChange={(e) =>
                      updateCheckedItems("genre", label, e.target.checked)
                    }
                    className={inputStyles}
                  />
                  <span className="text-lg">{icon}</span>
                  <span className="text-lg font-medium">{label}</span>
                </label>
              ))}
            </div>
            <Button className="mt-6" onClick={handleNext}>
              Next
            </Button>
          </motion.div>
        )}

        {/* Step 3: How did you hear about us? */}
        {step === 3 && (
          <motion.div variants={STAGGER_CHILD_VARIANTS}>
            <p className="max-w-md text-accent-foreground/80 transition-colors sm:text-lg font-bold">
              How did you hear about us?
            </p>
            <div className="flex flex-col items-start space-y-4">
              {[
                { label: "Facebook", icon: <FacebookIcon /> },
                { label: "Instagram", icon: <Instagram /> },
                { label: "LinkedIn", icon: <LucideLinkedin /> },
                { label: "Google", icon: <Youtube /> },
              ].map(({ label, icon }) => (
                <label key={label} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="follow"
                    value={label}
                    checked={userData.follow.includes(label)}
                    onChange={(e) =>
                      updateCheckedItems("follow", label, e.target.checked)
                    }
                    className={inputStyles}
                  />
                  <span className="text-lg">{icon}</span>
                  <span className="text-lg font-medium">{label}</span>
                </label>
              ))}
            </div>
            <Button className="mt-6" onClick={handleFinish}>
              Finish
            </Button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
