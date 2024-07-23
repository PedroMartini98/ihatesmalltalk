"use client";
import { useState } from "react";
import { Cinzel, Prata } from "next/font/google";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { dbq } from "@/firebase/firebase";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";

const prata = Prata({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-prata",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-cinzel",
});

export function Form({ changeFormState }: any) {
  const [inputs, SetInputs] = useState({
    Nome: "",
    Pergunta: "",
    Resposta: [""],
  });
  const handleChangeInputs = (e: any) => {
    SetInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleChangeTextarea = (e: any) => {
    SetInputs((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (inputs.Pergunta.length <= 0) {
      toast.error("Ooops, você esqueceu da pergunta!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      const ref = doc(dbq, "perguntas", `${inputs.Pergunta}`);
      const questionAlreadyExists = (await getDoc(ref)).data();
      if (questionAlreadyExists) {
        toast.error("Já fizeram essa pergunta D:", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          progress: undefined,
          theme: "dark",
        });
      }
      if (inputs.Resposta.includes("")) {
        toast.error("Por favor, ponha uma resposta de exemplo!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          progress: undefined,
          theme: "dark",
        });
      }
      if (!questionAlreadyExists && !inputs.Resposta.includes("")) {
        await setDoc(ref, inputs);
        SetInputs({ Nome: "", Pergunta: "", Resposta: [""] });
        toast.success("Sua pergunta foi anotada no nosso caderninho", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  };
  return (
    <div>
      <div
        className="h-[100%] w-full backdrop-blur-sm top-0 left-0 absolute"
        onClick={changeFormState}
      ></div>
      <form
        onSubmit={handleSubmit}
        className=" h-[85vh] w-[77vw] overflow-y-auto overflow-x-hidden caixa text-metal-gold flex flex-col p-2 justify-betwee 
        absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
      >
        <div className={`${prata.className} text-xl flex font-bold flex-col `}>
          <div className="flex flex-row justify-between">
            <p className="text-metal-gold my-2">
              Como gostaria de se indentificar?:
            </p>
            <IoClose
              className="hover:cursor-pointer text-xl"
              onClick={changeFormState}
            />
          </div>
          <input
            onChange={handleChangeInputs}
            name="Nome"
            value={inputs.Nome}
            placeholder="Deixe em branco caso queira permanecer anônimo"
            className="p-3 text-metal-gold placeholder-opacity-20 placeholder-slate-200
           caixa w-[75vw]"
          />
          <p className="text-metal-gold my-2">Pergunta:</p>
          <input
            onChange={handleChangeInputs}
            name="Pergunta"
            value={inputs.Pergunta}
            className=" p-3 text-metal-gold bg-opacity-90
          caixa  w-[75vw]"
          />
          <p className="text-metal-gold my-2">Sua resposta:</p>
        </div>
        <textarea
          onChange={handleChangeTextarea}
          name="Resposta"
          value={inputs.Resposta}
          className={` ${prata.className} text-opacity-100 text-xl text-justify resize-none h-[15vw] w-[75vw] p-3 mb-2 text-metal-gold
           caixa `}
        />
        <div className="flex-col flex items-center ">
          <button
            className={`text-metal-gold ${cinzel.className}  p-4 w-[75vw] text-xl 
          caixa`}
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}
