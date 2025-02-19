import { IoClose } from "react-icons/io5";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { dbq } from "@/firebase/firebase";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { Cinzel, Cookie } from "next/font/google";

const cookie = Cookie({
  weight: "400",
  subsets: ["latin"],
});
const cinzel = Cinzel({
  weight: "600",
  subsets: ["latin"],
});

export function Modal({ changeModalState, dsl }: any) {
  const handleSubmit = async () => {
    const ref = doc(dbq, "perguntas", dsl.Pergunta);
    await updateDoc(ref, {
      Resposta: arrayUnion(answer),
    });
    toast.success("Sua resposta foi anotado no nosso caderninho", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      progress: undefined,
      theme: "dark",
    });
    setAnswer("");
  };
  const [answer, setAnswer] = useState("");
  const changeAnswer = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };
  return (
    <main>
      <div
        onClick={changeModalState}
        className="absolute top-0 left-0 h-[100vh] w-full backdrop-blur-sm"
      ></div>
      <div
        className=" absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]
       h-[82vh] w-[87vw] caixa text-metal-gold flex flex-col p-2 justify-between text-xl"
      >
        <div className="flex flex-row justify-between">
          <h1 className="my-2">Sua reposta:</h1>
          <IoClose
            className="hover:cursor-pointer text-xl"
            onClick={changeModalState}
          />
        </div>
        <textarea
          onChange={changeAnswer}
          value={answer}
          className={`${cookie.className} h-[46vh] w-[80vw] md:w-[85vw] resize-none text-justify text-3xl m-1 caixa `}
          name=""
          id=""
        ></textarea>
        <button
          onClick={handleSubmit}
          className={`${cinzel.className} caixa p-4 text-metal-gold mt-2`}
        >
          Enviar
        </button>
      </div>
    </main>
  );
}
