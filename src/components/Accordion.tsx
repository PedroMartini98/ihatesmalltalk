import { useState } from "react";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";

interface AccordionProps {
  title: string;
  description: string;
}

export function Accordion({ title, description }: AccordionProps) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const changeAccordionState = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };
  return (
    <div className="text-metal-gold bg-opacity-90 caixa p-2 mb-4 w-[75vw]">
      <button onClick={changeAccordionState} className="py-2 flex ">
        <span className="flex justify-between text-3xl ${cinzel.className} w-[73vw]">
          {title}
          {isAccordionOpen ? <HiMinusSm /> : <HiPlusSm />}
        </span>
      </button>
      <div className="mr-0 text-justify text-xl">
        {isAccordionOpen && (
          <div className="${prata.className}">{description}</div>
        )}
      </div>
    </div>
  );
}
