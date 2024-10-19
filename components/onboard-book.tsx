// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Button } from "./ui/button";
// import { useRouter } from "next/navigation";

// import { Book, Session } from "@/lib/types";
// import { STAGGER_CHILD_VARIANTS } from "@/lib/utils";
// import { patchUser } from "@/app/actions/user-actions";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/select";
// import { Input } from "./ui/input";

// export default function OnboardingBook({ session }: { session: Session }) {
//   const [step, setStep] = useState(0);
//   const [newBookData, setNewBookData] = useState<Book>();
//   const router = useRouter();

//   const handleNext = () => setStep((prevStep) => prevStep + 1);

//   const handleFinish = async () => {
//     await patchUser(session.user.id, {
//       onboarded: true,
//       preferences: newBookData,
//     });
//     router.push("/");
//   };

//   const updateCheckedItems = (
//     field: keyof typeof userData,
//     value: string,
//     checked: boolean
//   ) => {
//     setNewBookData((prevData) => ({
//       ...prevData,
//       [field]: checked
//         ? [...prevData[field], value]
//         : prevData[field].filter((item) => item !== value),
//     }));
//   };

//   return (
//     <motion.div
//       className="z-10"
//       exit={{ opacity: 0, scale: 0.95 }}
//       transition={{ duration: 0.3, type: "spring" }}
//     >
//       <motion.div
//         variants={{
//           show: {
//             transition: {
//               staggerChildren: 0.2,
//             },
//           },
//         }}
//         initial="hidden"
//         animate="show"
//         className="mx-5 flex flex-col items-center space-y-10 text-center sm:mx-auto"
//       >
//         {/* Step 0: Language Selection */}
//         {step === 0 && (
//           <>
//             <motion.h1
//               className="font-display text-2xl font-bold text-foreground transition-colors sm:text-2xl"
//               variants={STAGGER_CHILD_VARIANTS}
//             >
//               Let&apos;s start crafting your eBook!
//             </motion.h1>
//             <motion.p
//               className="max-w-md text-accent-foreground/80 transition-colors sm:text-lg"
//               variants={STAGGER_CHILD_VARIANTS}
//             >
//               Which languages will you be using?
//             </motion.p>
//             <motion.div variants={STAGGER_CHILD_VARIANTS}>
//               <div className="flex flex-col items-start space-y-4">
//                 <Select>
//                   <SelectTrigger className="w-[280px]">
//                     <SelectValue placeholder="Select a language" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectGroup>
//                       <SelectLabel>Languages</SelectLabel>
//                       <SelectItem value="en">English</SelectItem>
//                       <SelectItem value="fr">French</SelectItem>
//                       <SelectItem value="es">Spanish</SelectItem>
//                       <SelectItem value="de">German</SelectItem>
//                       <SelectItem value="it">Italian</SelectItem>
//                       <SelectItem value="zh">Chinese</SelectItem>
//                     </SelectGroup>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <Button
//                 className="px-10 text-base font-medium mt-6"
//                 onClick={handleNext}
//               >
//                 Next
//               </Button>
//             </motion.div>
//           </>
//         )}

//         {/* Step 1: Project Name */}
//         {step === 1 && (
//           <motion.div variants={STAGGER_CHILD_VARIANTS}>
//             <p className="max-w-md text-accent-foreground/80 transition-colors sm:text-lg font-bold">
//               Let&apos;s continue crafting your eBook!
//             </p>
//             <motion.p
//               className="max-w-md text-accent-foreground/80 transition-colors sm:text-lg"
//               variants={STAGGER_CHILD_VARIANTS}
//             >
//               Enter your project name
//             </motion.p>
//             <div className="flex flex-col items-start space-y-4">
//               <Input type="text" />
//             </div>

//             <Button className="mt-6" onClick={handleNext}>
//               Next
//             </Button>
//           </motion.div>
//         )}

//         {/* Step 2: Expertise */}
//         {step === 2 && (
//           <motion.div variants={STAGGER_CHILD_VARIANTS}>
//             <p className="max-w-md text-accent-foreground/80 transition-colors sm:text-lg font-bold">
//               What&apos;s your expertise?
//             </p>
//             <motion.p
//               className="max-w-md text-accent-foreground/80 transition-colors sm:text-lg"
//               variants={STAGGER_CHILD_VARIANTS}
//             >
//               Add your book expertise here
//             </motion.p>

//             <div className="flex flex-col items-start space-y-4">
//               <Input type="text" />
//             </div>

//             <Button className="mt-6" onClick={handleNext}>
//               Next
//             </Button>
//           </motion.div>
//         )}

//         {/* Step 3: Writing Style */}
//         {step === 3 && (
//           <motion.div variants={STAGGER_CHILD_VARIANTS}>
//             <p className="max-w-md text-accent-foreground/80 transition-colors sm:text-lg font-bold">
//               What writing style and tone will you use?
//             </p>

//             <div className="flex flex-col items-start space-y-4">
//               <Input type="text" />
//             </div>

//             <Button className="mt-6" onClick={handleNext}>
//               Next
//             </Button>
//           </motion.div>
//         )}

//         {/* Step 4: Entrepreneur Insights */}
//         {step === 4 && (
//           <motion.div variants={STAGGER_CHILD_VARIANTS}>
//             <p className="max-w-md text-accent-foreground/80 transition-colors sm:text-lg font-bold">
//               Share your entrepreneurial journey insights
//             </p>

//             <motion.p
//               className="max-w-md text-accent-foreground/80 transition-colors sm:text-lg"
//               variants={STAGGER_CHILD_VARIANTS}
//             >
//               What were your &quot;AHA&quot; moments during your experience?
//             </motion.p>

//             <div className="flex flex-col items-start space-y-4">
//               <Input type="text" />
//             </div>

//             <p className="max-w-md text-accent-foreground/80 transition-colors sm:text-lg font-bold">
//               Note: Each lesson will be a special chapter in your book.
//             </p>

//             <Button className="mt-6" onClick={handleFinish}>
//               Finish
//             </Button>
//           </motion.div>
//         )}
//       </motion.div>
//     </motion.div>
//   );
// }

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
// import { useRouter } from "next/navigation";

import { Session } from "@/lib/types";
import { STAGGER_CHILD_VARIANTS } from "@/lib/utils";
// import { patchUser } from "@/app/actions/user-actions";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { useToast } from "@/hooks/use-toast";

export default function OnboardingBook({ session }: { session: Session }) {
  const [step, setStep] = useState(0);
  const [newBookData, setNewBookData] = useState({
    preferences: "",
    language: "",
    projectName: "",
    expertise: "",
    writingStyle: "",
    entrepreneurialInsights: "",
    aiAssistance: false,
  });
  const { toast } = useToast();

  const handleNext = () => setStep((prevStep) => prevStep + 1);
  // const handlePrev = () => setStep((prevStep) => prevStep - 1);

  const handleInputChange = (field: string, value: string | boolean) => {
    setNewBookData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleFinish = async () => {
    console.log("Final Onboarding User:", session);
    console.log("Final Onboarding Data:", newBookData);
    if (!newBookData) {
      toast({
        title: "Invalid input",
        description:
          "Please provide a valid book title and number of chapters.",
        variant: "destructive",
      });
      return
    }

    // await patchUser(session.user.id, {
    //   onboarded: true,
    //   preferences: newBookData,
    // });
    // router.push("/");
  };

  return (
    <div className="container mx-auto max-w-md py-10">
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
          {/* Step 0: Preferences Selection */}
          {step === 0 && (
            <>
              <motion.h1
                className="font-display text-2xl font-bold text-foreground transition-colors sm:text-2xl"
                variants={STAGGER_CHILD_VARIANTS}
              >
                Welcome! Let&apos;s set up your preferences
              </motion.h1>
              <motion.p
                className="max-w-md text-accent-foreground/80 transition-colors sm:text-lg"
                variants={STAGGER_CHILD_VARIANTS}
              >
                Which type of book will you be writing?
              </motion.p>
              <motion.div variants={STAGGER_CHILD_VARIANTS}>
                <div className="flex flex-col items-start space-y-4">
                  <Select
                    required
                    onValueChange={(value) =>
                      handleInputChange("preferences", value)
                    }
                  >
                    <SelectTrigger className="w-[280px]">
                      <SelectValue placeholder="Select a genre" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Preferences</SelectLabel>
                        <SelectItem value="fiction">Fiction</SelectItem>
                        <SelectItem value="non-fiction">Non-Fiction</SelectItem>
                        <SelectItem value="poetry">Poetry</SelectItem>
                        <SelectItem value="academic">Academic</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <label>Enable AI Assistance</label>
                  <Switch
                    required
                    checked={newBookData.aiAssistance}
                    onCheckedChange={(value) =>
                      handleInputChange("aiAssistance", value)
                    }
                  />
                </div>
                <Button
                  className="px-10 text-base font-medium mt-6"
                  onClick={handleNext}
                >
                  Next
                </Button>
              </motion.div>
            </>
          )}

          {/* Step 1: Language Selection */}
          {step === 1 && (
            <>
              <motion.h1
                className="font-display text-2xl font-bold text-foreground transition-colors sm:text-2xl"
                variants={STAGGER_CHILD_VARIANTS}
              >
                Let&apos;s start crafting your eBook!
              </motion.h1>
              <motion.p
                className="max-w-md text-accent-foreground/80 transition-colors sm:text-lg"
                variants={STAGGER_CHILD_VARIANTS}
              >
                Which languages will you be using?
              </motion.p>
              <motion.div variants={STAGGER_CHILD_VARIANTS}>
                <div className="flex flex-col items-start space-y-4">
                  <Select
                    required
                    onValueChange={(value) =>
                      handleInputChange("language", value)
                    }
                  >
                    <SelectTrigger className="w-[280px]">
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Languages</SelectLabel>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="it">Italian</SelectItem>
                        <SelectItem value="zh">Chinese</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  className="px-10 text-base font-medium mt-6"
                  onClick={handleNext}
                >
                  Next
                </Button>
              </motion.div>
            </>
          )}

          {/* Step 2: Project Name */}
          {step === 2 && (
            <motion.div variants={STAGGER_CHILD_VARIANTS}>
              <p className="max-w-md text-accent-foreground/80 transition-colors sm:text-lg font-bold">
                Let&apos;s continue crafting your eBook!
              </p>
              <motion.p
                className="max-w-md text-accent-foreground/80 transition-colors sm:text-lg"
                variants={STAGGER_CHILD_VARIANTS}
              >
                Enter your project name
              </motion.p>
              <div className="flex flex-col items-start space-y-4">
                <Input
                  required
                  type="text"
                  onChange={(e) =>
                    handleInputChange("projectName", e.target.value)
                  }
                />
              </div>

              <Button className="mt-6" onClick={handleNext}>
                Next
              </Button>
            </motion.div>
          )}

          {/* Step 3: Expertise */}
          {step === 3 && (
            <motion.div variants={STAGGER_CHILD_VARIANTS}>
              <p className="max-w-md text-accent-foreground/80 transition-colors sm:text-lg font-bold">
                What&apos;s your expertise?
              </p>
              <motion.p
                className="max-w-md text-accent-foreground/80 transition-colors sm:text-lg"
                variants={STAGGER_CHILD_VARIANTS}
              >
                Add your book expertise here
              </motion.p>

              <div className="flex flex-col items-start space-y-4">
                <Input
                  required
                  type="text"
                  onChange={(e) =>
                    handleInputChange("expertise", e.target.value)
                  }
                />
              </div>

              <Button className="mt-6" onClick={handleNext}>
                Next
              </Button>
            </motion.div>
          )}

          {/* Step 4: Writing Style */}
          {step === 4 && (
            <motion.div variants={STAGGER_CHILD_VARIANTS}>
              <p className="max-w-md text-accent-foreground/80 transition-colors sm:text-lg font-bold">
                What writing style and tone will you use?
              </p>

              <div className="flex flex-col items-start space-y-4">
                <Input
                  required
                  type="text"
                  onChange={(e) =>
                    handleInputChange("writingStyle", e.target.value)
                  }
                />
              </div>

              <Button className="mt-6" onClick={handleNext}>
                Next
              </Button>
            </motion.div>
          )}

          {/* Step 5: Entrepreneur Insights */}
          {step === 5 && (
            <motion.div variants={STAGGER_CHILD_VARIANTS}>
              <p className="max-w-md text-accent-foreground/80 transition-colors sm:text-lg font-bold">
                Share your entrepreneurial journey insights
              </p>

              <motion.p
                className="max-w-md text-accent-foreground/80 transition-colors sm:text-lg"
                variants={STAGGER_CHILD_VARIANTS}
              >
                What were your &quot;AHA&quot; moments during your experience?
              </motion.p>

              <div className="flex flex-col items-start space-y-4">
                <Input
                  required
                  type="text"
                  onChange={(e) =>
                    handleInputChange("entrepreneurialInsights", e.target.value)
                  }
                />
              </div>

              <p className="max-w-md text-accent-foreground/80 transition-colors sm:text-lg font-bold">
                Note: Each lesson will be a special chapter in your book.
              </p>

              <Button className="mt-6" onClick={handleFinish}>
                Finish
              </Button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
