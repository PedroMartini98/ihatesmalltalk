"use client";
import { Form } from "@/components/Form";
import { Modal } from "@/components/Modal";
import { useGetQuestions } from "@/hooks/useGetQuestions";
import { Cookie, Great_Vibes } from "next/font/google";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FaAngleLeft,
  FaAngleRight,
  FaCaretLeft,
  FaCaretRight,
} from "react-icons/fa6";
import { IoDice } from "react-icons/io5";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface dslType {
  Nome: string;
  Pergunta: string;
  Resposta: Array<string>;
}

const gv = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
});
const cookie = Cookie({
  subsets: ["latin"],
  weight: "400",
});
export default function Play() {
  const router = useRouter();
  let [questionNumber, setQuestionNumber] = useState(0);
  let [answerNumber, setAnswerNumber] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { questions, loading } = useGetQuestions();
  let dsl: dslType = questions[questionNumber];

  function getRandomQuestion() {
    let newNumber = Math.floor(Math.random() * questions.length);
    if (newNumber !== questionNumber) {
      setQuestionNumber(newNumber);
    }
    if (newNumber === questionNumber) {
      setQuestionNumber(newNumber + 1);
    }
    console.log(questionNumber);
  }

  function changeQuestionRight() {
    if (questionNumber === questions.length - 1) {
      setQuestionNumber(0);
      setAnswerNumber(0);
    } else {
      setQuestionNumber(questionNumber + 1);
      setAnswerNumber(0);
    }
  }

  function changeQuestionLeft() {
    if (questionNumber === 0) {
      setQuestionNumber(questions.length - 1);
      setAnswerNumber(0);
    } else {
      setQuestionNumber(questionNumber - 1);
      setAnswerNumber(0);
    }
  }

  function changeAnswerRight() {
    if (answerNumber === dsl.Resposta.length - 1) {
      setAnswerNumber(0);
    } else {
      setAnswerNumber(answerNumber + 1);
    }
  }
  function changeAnswerLeft() {
    if (answerNumber === 0) {
      setAnswerNumber(dsl.Resposta.length - 1);
    } else {
      setAnswerNumber(answerNumber - 1);
    }
  }

  function changeModalState() {
    setIsModalOpen(!isModalOpen);
  }
  function changeFormState() {
    setIsFormOpen(!isFormOpen);
  }

  if (!loading) {
    return (
      <main className=" flex flex-col items-center bg-cover h-[100vh] w-full">
        <div
          onClick={() => {
            router.push("/");
          }}
          className={` ${gv.className} px-5 pt-5 text-center md:w-[550px] w-[300px] text-3xl md:text-5xl caixa text-metal-gold hover:cursor-pointer`}
        >
          I Hate Small Talk
        </div>
        <ToastContainer />

        <div className="caixa text-metal-gold text-xl p-2 w-[99vw] md:w-[95vw] h-[80vh] break-words overflow-auto scroll- my-6">
          <div className="flex flex-col ">
            <div className="flex flex-row justify-between">
              <FaCaretLeft
                className="text-5xl md:text-2xl hover:cursor-pointer"
                onClick={changeQuestionLeft}
              />
              <p className={`${gv.className} text-3xl md:text-5xl text-center`}>
                {dsl.Pergunta}
              </p>
              <FaCaretRight
                className="text-5xl md:text-2xl hover:cursor-pointer"
                onClick={changeQuestionRight}
              />
            </div>
            <div className="px-[46vw]">
              <IoDice
                onClick={getRandomQuestion}
                className=" text-2xl  hover:cursor-pointer "
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <h1 className="mb-3">Respostas:</h1>
            <p className={` ${gv.className} text-3xl md:text-4xl text-right`}>
              {dsl.Nome ? `- ${dsl.Nome}` : "- Um amigo"}
            </p>
          </div>
          <div className="flex items-center flex-col">
            <div className="flex flex-row items-center">
              <FaAngleLeft
                className="hover:cursor-pointer text-2xl"
                onClick={changeAnswerLeft}
              />
              <div className="w-[95%] h-[45vh] border-4 rounded-md border-metal-gold p-2 overflow-auto">
                <p
                  className={`${cookie.className} text-2xl md:text-4xl text-justify`}
                >
                  {[dsl.Resposta[answerNumber]]}
                </p>
              </div>
              <FaAngleRight
                className="hover:cursor-pointer text-2xl"
                onClick={changeAnswerRight}
              />
            </div>
          </div>
          <div className="flex flex-row justify-end pr-[2.2%] pt-[0.7%]"></div>
          <div className="flex flex-row justify-between">
            <p
              className=" hover:cursor-pointer text-sm hover:underline flex justify-end p-3"
              onClick={changeFormState}
            >
              Clique aqui para deixar sua pergunta!
            </p>
            <p
              onClick={changeModalState}
              className="hover:cursor-pointer text-sm hover:underline flex justify-end p-3 "
            >
              Quer deixar sua resposta também?
            </p>
          </div>
        </div>
        {isFormOpen && <Form changeFormState={changeFormState} />}
        {isModalOpen && <Modal changeModalState={changeModalState} dsl={dsl} />}
      </main>
    );
  }
}
