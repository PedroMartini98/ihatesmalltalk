"use client";
import { Form } from "@/components/Form";
import { dbq } from "@/firebase/firebase";
import { collection } from "firebase/firestore";
import { Great_Vibes } from "next/font/google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const great_Vibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-gv",
});

export default function Question() {
  const tantofaz = async () => {
    const ref = collection(dbq, "perguntas");
  };
  return (
    <main className="backgroundiv min-h-screen">
      <div className="items-center flex flex-col">
        <ToastContainer className={`text-metal-gold`} />
        <Form />
      </div>
    </main>
  );
}
