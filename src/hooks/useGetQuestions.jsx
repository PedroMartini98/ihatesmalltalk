import { useEffect, useState } from "react";
import { dbq } from "@/firebase/firebase";
import { collection, getDocs, query } from "firebase/firestore";

export function useGetQuestions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getQuestion = async () => {
      setLoading(true);
      const q = query(collection(dbq, "perguntas"));
      const querySnapshot = await getDocs(q);
      const ref = [];
      querySnapshot.forEach((doc) => {
        ref.push({ ...doc.data() });
      });
      setQuestions(ref);
      setLoading(false);
    };
    getQuestion();
  }, []);

  return { questions, loading };
}
