// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import { PlusCircle } from "lucide-react";
// import { useRouter } from "next/navigation";
// import {  Session } from "@/lib/types";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/select";
// import { createNewBookWithAI } from "@/app/actions/ai-suggestions";

// export function NewBookButton({ session }: { session: Session }) {
//   const router = useRouter();
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [step, setStep] = useState(1);

//   const [newBookData, setNewBookData] = useState({
//     language: "",
//     title: "",
//     expertise: "",
//     genre: "",
//     entrepreneurialInsights: "",
//   });

//   const handleNextStep = () => setStep((prev) => Math.min(prev + 1, 5));
//   const handlePreviousStep = () => setStep((prev) => Math.max(prev - 1, 1));

//   const handleInputChange = (
//     field: keyof typeof newBookData,
//     value: string
//   ) => {
//     setNewBookData((prevData) => ({ ...prevData, [field]: value }));
//   };

//   const handleCreateBook = async () => {
//     const bookId = await createNewBookWithAI({ session, newBookData });
//     router.push(`/book/create/${bookId}`);
//     // Reset inputs and close dialog
//     setNewBookData({
//       language: "",
//       title: "",
//       expertise: "",
//       genre: "",
//       entrepreneurialInsights: "",
//     });
//     setStep(1);
//     setIsDialogOpen(false);
//   };

//   return (
//     <>
//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogTrigger asChild>
//           <Button className="mb-4">
//             <PlusCircle className="mr-2 h-4 w-4" /> New Book
//           </Button>
//         </DialogTrigger>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Create a New Book</DialogTitle>
//             <DialogDescription>
//               Fill out the following steps to create your new book.
//             </DialogDescription>{" "}
//             {/* Ajout de la description */}
//           </DialogHeader>
//           <div className="space-y-4">
//             {step === 1 && (
//               <div>
//                 <h1>Let&apos;s start crafting your eBook!</h1>
//                 <p>Step 1: Which language will you be using?</p>
//                 <Select
//                   onValueChange={(value) =>
//                     handleInputChange("language", value)
//                   }
//                 >
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
//             )}
//             {step === 2 && (
//               <div>
//                 <p>Step 2: Enter your project name</p>
//                 <Input
//                   onChange={(e) => handleInputChange("title", e.target.value)}
//                   placeholder="Book Title"
//                 />
//               </div>
//             )}
//             {step === 3 && (
//               <div>
//                 <p>Step 3: Add your book expertise here</p>
//                 <Input
//                   onChange={(e) =>
//                     handleInputChange("expertise", e.target.value)
//                   }
//                   placeholder="E.g. Self-development"
//                 />
//               </div>
//             )}
//             {step === 4 && (
//               <div>
//                 <p>Step 4: What writing style and tone will you use?</p>
//                 <Input
//                   onChange={(e) => handleInputChange("genre", e.target.value)}
//                   placeholder="E.g. Funny and shameless"
//                 />
//               </div>
//             )}
//             {step === 5 && (
//               <div>
//                 <h1>Share your entrepreneurial journey insights</h1>
//                 <p>
//                   Step 5: What were your &quot;AHA&quot; moments during your
//                   experience?
//                 </p>
//                 <Input
//                   placeholder="E.g. Never trust sweet..."
//                   onChange={(e) =>
//                     handleInputChange("entrepreneurialInsights", e.target.value)
//                   }
//                 />
//                 <p>Note: Each lesson will be a special chapter in your book.</p>
//               </div>
//             )}
//           </div>
//           <DialogFooter>
//             {step > 1 && (
//               <Button variant="ghost" onClick={handlePreviousStep}>
//                 Previous
//               </Button>
//             )}
//             {step < 5 ? (
//               <Button onClick={handleNextStep}>Next</Button>
//             ) : (
//               <Button onClick={handleCreateBook}>Create Book</Button>
//             )}
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }


"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Session } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { createNewBookWithAI } from "@/app/actions/ai-suggestions";
import { toast } from "sonner";

export function NewBookButton({ session }: { session: Session }) {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false); // Ajouter un état de chargement

  const [newBookData, setNewBookData] = useState({
    language: "",
    title: "",
    expertise: "",
    genre: "",
    entrepreneurialInsights: "",
  });

  const handleNextStep = () => setStep((prev) => Math.min(prev + 1, 5));
  const handlePreviousStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleInputChange = (
    field: keyof typeof newBookData,
    value: string
  ) => {
    setNewBookData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleCreateBook = async () => {
    setLoading(true); // Début du chargement
    try {
      const bookId = await createNewBookWithAI({ session, newBookData });
      toast.success("Book created successfully!"); 
      router.push(`/book/create/${bookId}`);
      // Reset inputs and close dialog
      setNewBookData({
        language: "",
        title: "",
        expertise: "",
        genre: "",
        entrepreneurialInsights: "",
      });
      setStep(1);
      setIsDialogOpen(false);
    } catch (error) 
    {
      console.error(error);
      
      toast.error("An error occurred while creating the book.");
    } finally {
      setLoading(false); // Fin du chargement
    }
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mb-4">
            <PlusCircle className="mr-2 h-4 w-4" /> New Book
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a New Book</DialogTitle>
            <DialogDescription>
              Fill out the following steps to create your new book.
            </DialogDescription>{" "}
          </DialogHeader>
          <div className="space-y-4">
            {step === 1 && (
              <div>
                <h1>Let&apos;s start crafting your eBook!</h1>
                <p>Step 1: Which language will you be using?</p>
                <Select
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
            )}
            {step === 2 && (
              <div>
                <p>Step 2: Enter your project name</p>
                <Input
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Book Title"
                />
              </div>
            )}
            {step === 3 && (
              <div>
                <p>Step 3: Add your book expertise here</p>
                <Input
                  onChange={(e) =>
                    handleInputChange("expertise", e.target.value)
                  }
                  placeholder="E.g. Self-development"
                />
              </div>
            )}
            {step === 4 && (
              <div>
                <p>Step 4: What writing style and tone will you use?</p>
                <Input
                  onChange={(e) => handleInputChange("genre", e.target.value)}
                  placeholder="E.g. Funny and shameless"
                />
              </div>
            )}
            {step === 5 && (
              <div>
                <h1>Share your entrepreneurial journey insights</h1>
                <p>
                  Step 5: What were your &quot;AHA&quot; moments during your
                  experience?
                </p>
                <Input
                  placeholder="E.g. Never trust sweet..."
                  onChange={(e) =>
                    handleInputChange("entrepreneurialInsights", e.target.value)
                  }
                />
                <p>Note: Each lesson will be a special chapter in your book.</p>
              </div>
            )}
          </div>
          <DialogFooter>
            {step > 1 && (
              <Button variant="ghost" onClick={handlePreviousStep}>
                Previous
              </Button>
            )}
            {step < 5 ? (
              <Button onClick={handleNextStep}>Next</Button>
            ) : (
              <Button
                onClick={handleCreateBook}
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Book"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
