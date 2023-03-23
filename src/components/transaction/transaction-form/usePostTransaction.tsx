import React from "react";
import { useSelector } from "react-redux";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";

import { db } from "../../../firebase/firebase-config";
import { RootState } from "../../../redux/redux";
import { FormDataType } from "./TransactionForm";
import { useGetTransaction } from "./useGetTransaction";

export const usePostTransaction = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const { fetchTransactionsData } = useGetTransaction();

  const user = useSelector((state: RootState) => state.auth.user);

  const sendTransactionData = async (data: FormDataType) => {
    setIsLoading(true);
    try {
      await addDoc(collection(db, "transactions"), {
        ...data,
        userID: user?.uid,
      });

      fetchTransactionsData();
      setIsLoading(false);
      toast.success("The transaction has been added successfully.");
    } catch (error) {
      toast.error(`error`);
    }
  };

  return { sendTransactionData, isLoading };
};
