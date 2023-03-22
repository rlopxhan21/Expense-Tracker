import React, { ChangeEventHandler } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

import { Layout } from "../../components/layout/Layout";
import {
  CustomInput,
  InputFieldsDataType,
} from "../../components/custom-input/CustomInput";

import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../redux/auth-slice";
import { auth } from "../../firebase/firebase-config";
import { RootState } from "../../redux/redux";
import { useNavigate } from "react-router-dom";

export interface FormDataType {
  [name: string]: string;
}

const inputFields: InputFieldsDataType[] = [
  {
    label: "Email Address",
    id: "email",
    type: "email",
    name: "email",
    autoComplete: "email",
    autoFocus: true,
    fullWidth: true,
    required: true,
  },
  {
    label: "Password",
    id: "password",
    type: "password",
    name: "password",
    autoComplete: "current-password",
    required: true,
    autoFocus: false,
    fullWidth: true,
  },
];

export const LoginPage = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = React.useState<FormDataType>({});
  const [formError, setFormError] = React.useState<string>("");

  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user?.uid) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;

    if (name === "password") {
      setFormError("");
      value.length < 6 && setFormError("Password is too short.");

      !/[/d]/.test(value) && setFormError("Must include number");
      !/[A-Z]/.test(value) && setFormError("Must include upercase letter");
      !/[a-z]/.test(value) && setFormError("Must include lowercase letter");
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { email, password } = formData;

    try {
      const resPending = signInWithEmailAndPassword(auth, email, password);
      toast.promise(resPending, { pending: "Response Pending!" });

      const { user } = await resPending;

      if (user?.uid) {
        const newData: { uid: string } = {
          uid: user.uid,
        };
        dispatch(authActions.setUser(newData));

        toast.success("Logged In Successfully!");
      }
    } catch (error) {
      toast.error("Login Failed!");
    }
  };

  return (
    <React.Fragment>
      <Layout>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: "url(https://source.unsplash.com/random)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlined />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                {inputFields.map((item) => (
                  <CustomInput
                    key={item.id}
                    item={item}
                    handleChange={handleChange}
                  />
                ))}
                <Typography variant="body2">
                  Password must be more than 6 characters long and should also
                  contains at least one number, Capital letter and small letter.
                </Typography>
                {formError && (
                  <List
                    sx={{
                      listStyleType: "disc",
                      pl: 2,
                      "& .MuiListItem-root": {
                        display: "list-item",
                      },
                      color: "red",
                    }}
                  >
                    <ListItem>{formError}</ListItem>
                  </List>
                )}
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Layout>
    </React.Fragment>
  );
};
