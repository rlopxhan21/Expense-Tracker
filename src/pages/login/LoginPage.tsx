import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "../../redux/redux";
import { Layout } from "../../components/layout/Layout";
import { inputFields } from "./LoginInputField";
import { schema } from "./LoginZod";

import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { LockOutlined } from "@mui/icons-material";
import { IconInputField } from "../../components/custom-input/IconInputField";
import { usePostLogin } from "./usePostLogin";

export interface FormDataType {
  [name: string]: string;
}

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { sendLoginRequest } = usePostLogin();

  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user?.uid) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const onLoginSubmitHandler: SubmitHandler<FormDataType> = (data) => {
    sendLoginRequest(data.email, data.password);
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
              <Stack
                gap={2}
                component="form"
                noValidate
                onSubmit={handleSubmit(onLoginSubmitHandler)}
                sx={{ mt: 1 }}
              >
                {inputFields.map((item) => (
                  <IconInputField
                    key={item.id}
                    item={item}
                    register={register}
                    errors={errors}
                  />
                ))}
                <Typography variant="body2">
                  Password must be more than 6 characters long and should also
                  contains at least one number, capital letter and small letter.
                </Typography>
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
                    <Link to="/login">Forgot password?</Link>
                  </Grid>
                  <Grid item>
                    <Link to="/register">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Layout>
    </React.Fragment>
  );
};
