import React, { ChangeEventHandler } from 'react'
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { Layout } from '../../components/layout/Layout'
import { CustomInput, InputFieldsDataType } from '../../components/custom-input/CustomInput';
import { FormDataType } from '../login/LoginPage';

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
import { auth } from '../../firebase/firebase-config';
import { LoadingButton } from '@mui/lab';

  const inputFields: InputFieldsDataType[] = [
    {
      label: "First Name",
      id: "fname",
      type: "text",
      name: "fname",
      autoComplete: "fname",
      autoFocus: true,
      fullWidth: true,
      required: true,
    },
    {
      label: "Last Name",
      id: "lname",
      type: "text",
      name: "lname",
      autoComplete: "lname",
      required: true,
      autoFocus: false,
      fullWidth: true,
    },
    {
      label: "Email Address",
      id: "email",
      type: "email",
      name: "email",
      autoComplete: "email",
      required: true,
      autoFocus: false,
      fullWidth: true,
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
    {
      label: "Confirm Password",
      id: "password2",
      type: "password",
      name: "password2",
      autoComplete: "current-password",
      required: true,
      autoFocus: false,
      fullWidth: true,
    },
  ];

export const RegisterPage = () => {
    const [formData, setFormData] = React.useState<FormDataType>({});
  const [formError, setFormError] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;

    if (name === "password") {
      setFormError("");
      value.length < 6 && setFormError("Password is too short.");

      !/[0-9]/.test(value) && setFormError("Must include number");
      !/[A-Z]/.test(value) && setFormError("Must include upercase letter");
      !/[a-z]/.test(value) && setFormError("Must include lowercase letter");
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {password, password2, email} = formData;

    if (password !== password2) {
      return toast.error("Password do not match!")
    }
    
    setIsLoading(true)
    createUserWithEmailAndPassword(auth, email,password).then((userCredential) => {
    // Signed in 
      const user = userCredential.user;
      console.log("LOged")
    // ...
    setIsLoading(false)
      
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    setIsLoading(false)
  });
    


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
                <LoadingButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={formError ? true : false}
                  loading={isLoading}
                >
                  Sign Up
                </LoadingButton>
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
  )
}
