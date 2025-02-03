import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

export const useFetchSingleDocument = (docCollection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDocument = async () => {
      try {
        const docRef = doc(db, docCollection, id);
        const docSnap = await getDoc(docRef); // ✅ Await here
        if (docSnap.exists()) {
          setDocument(docSnap.data());
        } else {
          setError("Document not found");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadDocument();
  }, [docCollection, id]);

  return { document, loading, error };
};
