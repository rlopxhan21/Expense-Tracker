import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, getDocs, query, where } from "firebase/firestore";
import { toast } from "react-toastify";

import { db } from "../../../firebase/firebase-config";
import { RootState } from "../../../redux/redux";
import { transActions } from "../../../redux/trans-slice";

interface OutputDataType {
  [name: string]: string;
}

export const useGetTransaction = () => {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);

  const userID = user?.uid;

  const fetchTransactionsData = React.useCallback(async () => {
    try {
      const q = query(
        collection(db, "transactions"),
        where("userID", "==", `${userID}`)
      );
      const querySnapshot = await getDocs(q);

      let trans: OutputDataType[] = [];

      querySnapshot.forEach((doc) => {
        const { id } = doc;

        const data = { ...doc.data(), id };
        trans.push(data);
      });

      dispatch(transActions.setTrans(trans));
    } catch (error) {
      toast.error("Fetching Transaction Failed!");
    }
  }, [dispatch, userID]);

  return { fetchTransactionsData };
};
