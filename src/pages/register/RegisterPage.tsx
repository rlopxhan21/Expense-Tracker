import React from "react";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { Layout } from "../../components/layout/Layout";
import { inputFields } from "./RegisterInputFields";
import { schema } from "./RegisterZod";
import { IconInputField } from "../../components/custom-input/IconInputField";
import { usePostRegister } from "./usePostRegister";

import {
  Avatar,
  Box,
  CssBaseline,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { LockOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

interface FormDataType {
  email: string;
  fname: string;
  lname: string;
  password: string;
  password2: string;
}

export const RegisterPage = () => {
  const methods = useForm({
    defaultValues: {
      email: "",
      fname: "",
      lname: "",
      password: "",
      password2: "",
    },
    resolver: zodResolver(schema),
  });

  const { isLoading, sendRegisterRequest } = usePostRegister();

  const onRegisterSubmitHandler: SubmitHandler<FormDataType> = (data) => {
    sendRegisterRequest(
      data.email,
      data.password,
      data.password2,
      data.fname,
      data.lname
    );
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
              <FormProvider {...methods}>
                <Stack
                  gap={2}
                  component="form"
                  noValidate
                  onSubmit={methods.handleSubmit(onRegisterSubmitHandler)}
                  sx={{ mt: 1 }}
                >
                  {inputFields.map((item) => (
                    <IconInputField key={item.id} {...item} />
                  ))}
                  <Typography variant="body2">
                    Password must be 8 characters long containing at least one
                    small letter, one capital letter and one numeric character.
                  </Typography>
                  <LoadingButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    loading={isLoading}
                  >
                    Sign Up
                  </LoadingButton>
                  <Grid container>
                    <Grid item xs>
                      {/* <Link to="/login">Forgot password?</Link> */}
                    </Grid>
                    <Grid item>
                      <Link to="/login">
                        {"Already have an account? Sign In"}
                      </Link>
                    </Grid>
                  </Grid>
                </Stack>
              </FormProvider>
            </Box>
          </Grid>
        </Grid>
      </Layout>
    </React.Fragment>
  );
};
