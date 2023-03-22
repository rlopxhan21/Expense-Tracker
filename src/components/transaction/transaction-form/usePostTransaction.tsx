import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { toast } from "react-toastify";

import { db } from "../../../firebase/firebase-config";
import { RootState } from "../../../redux/redux";
import { transActions } from "../../../redux/trans-slice";
import { FormDataType } from "./TransactionForm";

interface OutputDataType {
  [name: string]: string;
}

export const usePostTransaction = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const dispatch = useDispatch();

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

  const fetchTransactionsData = async () => {
    try {
      const q = query(
        collection(db, "transactions"),
        where("userID", "==", `${user?.uid}`)
      );
      const querySnapshot = await getDocs(q);

      let trans: OutputDataType[] = [];

      querySnapshot.forEach((doc) => {
        const { id } = doc;

        const data = { ...doc.data(), id };
        trans.push(data);
      });

      console.log(trans);

      dispatch(transActions.setTrans(trans));
    } catch (error) {
      toast.error("Fetching Transaction Failed!");
    }
  };

  return { sendTransactionData, isLoading, fetchTransactionsData };
};
