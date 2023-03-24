import React from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { auth, db } from "../../firebase/firebase-config";
import { authActions } from "../../redux/auth-slice";

export const usePostRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const sendRegisterRequest = async (
    email: string,
    password: string,
    password2: string,
    fname: string,
    lname: string
  ) => {
    setIsLoading(true);

    if (password !== password2) {
      return toast.error("Password do not match!");
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;

        updateProfile(user, { displayName: fname });

        dispatch(
          authActions.setUser({ uid: user.uid, displayName: user.displayName })
        );

        await setDoc(doc(db, "users", user.uid), {
          fname: fname,
          lname: lname,
          email: email,
        });

        setIsLoading(false);
        toast.success("Registration Successful!");
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setIsLoading(false);

        if (errorMessage.includes("auth/email-already-in-use")) {
          toast.error("User already exists.");
        }
      });
  };

  return { isLoading, sendRegisterRequest };
};
