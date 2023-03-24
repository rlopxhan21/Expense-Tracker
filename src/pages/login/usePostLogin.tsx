import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { auth } from "../../firebase/firebase-config";
import { authActions } from "../../redux/auth-slice";

export const usePostLogin = () => {
  const dispatch = useDispatch();

  const sendLoginRequest = async (email: string, password: string) => {
    try {
      const resPending = signInWithEmailAndPassword(auth, email, password);
      toast.promise(resPending, { pending: "Response Pending!" });

      const { user } = await resPending;

      if (user?.uid) {
        const newData = {
          uid: user.uid,
          displayName: user.displayName,
        };

        dispatch(authActions.setUser(newData));
        toast.success("Logged In Successfully!");
      }
    } catch (error) {
      toast.error("Login Failed!");
    }
  };

  return { sendLoginRequest };
};
