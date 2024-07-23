"use client";
import { Accordion } from "@/components/Accordion";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="backgroundiv1 bg-cover min-h-screen overflow-hidden">
      <div className="flex  flex-col items-center justify-between ">
        <div className="caixa mb-[6rem] w-[650px]">
          <p className="text-metal-gold  px-5 text-center pt-5 overflow-hidden text-6xl hover:cursor-pointer">
            I Hate Small Talk
          </p>
        </div>
        <div>
          <Accordion
            title={"O que é?"}
            description={`Um jogo feito para ter conversas profundas sem o tom de entrevista de emprego.
               O conceito é fortemente inspirado no artista italiano Greg Goya e no podcast "The Diary of a CEO" de Steven Bartlett. 
               No final do programa, cada convidado deixa uma pergunta escrita à mão no diário de Steven sem saber quem irá respondê-la.
                A ideia é produzir perguntas interessantes sobre assuntos profundos sem a pretensão de sondar uma parte específica da vida de alguém. 
                O próprio host tem uma iniciativa semelhante chamada "The Conversation Cards", vendida por 25 euros em seu site.
                 Esta é uma versão traduzida e gratuita feita com perguntas de brasileiros para brasileiros.
            `}
          />
          <Accordion
            title={"Regras:"}
            description={`Bom, creio que não sejam muitas. 1 - Não minta
              2 - Não precisa responder nada que não quiser 
              3 - Se for deixar uma pergunta precisa deixar sua resposta
            `}
          />
          <Accordion
            title={"Interface:"}
            description={`Ela foi feita pra ser intuitiva, mas na duvida aqui está a explicação: As setas do lado da pergunta mudam a pergunta. 
              O dado busca uma pergunta aleatória. As setas debaixo da resposta navegam entre as respostas para determinada pergunta. Para deixar sua
              pergunta clique em "Clique aqui para deixar sua pergunta!". Para deixar sua resposta clique em "Quer deixar sua resposta também?". Para
              jogar clique no botão "Jogar" abaixo.
            `}
          />
        </div>
        <button
          onClick={() => {
            router.push("/play");
          }}
          className="text-metal-gold mt-32 p-5 text-3xl caixa"
        >
          Jogar
        </button>
      </div>
    </main>
  );
}
