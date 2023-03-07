import { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Box, Container, Paper, Typography, TextField, Stack, Checkbox, FormControlLabel, Button, FormHelperText } from "@mui/material";
import CustomLoader from "src/app/components/common/CustomLoader/CustomLoader";
import { useDispatch, useSelector } from "react-redux";
import { setLoginResponse } from "src/app/Redux/authSlice";
import { useLocation, useNavigate } from "react-router-dom";

interface IProps {
  email: string;
  password: string;
}

const initialState: IProps = {
  email: "",
  password: "",
};

export default function SignIn() {
  const [value, setValue] = useState<IProps>(initialState);
  const disptach = useDispatch();
  const { userRole, access_token } = useSelector((state: any) => state.auth);
  const [error, setError] = useState<IProps>(initialState);
  const [serverError, setServerError] = useState<string>("");
  const navigate = useNavigate();
  const LOGINMUTATION = gql`
    mutation LOGINMUTATION($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        access_token
        userRole
        userName
      }
    }
  `;
  const [login, { loading, error: loginError, data }] = useMutation(LOGINMUTATION);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value: dataValue } = e.target;
    setValue({ ...value, [name]: dataValue });
  };

  const validate = () => {
    let temp: IProps = {
      email: "",
      password: "",
    };
    temp.email = value.email === "" ? "Please Enter Email" : "";
    temp.password = value.password === "" ? "Please Enter Password" : "";

    setError({
      ...temp,
    });
    return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = (e: any) => {
    setServerError("");
    e.preventDefault();
    if (validate()) {
      login({
        variables: {
          email: value.email,
          password: value.password,
        },
      })
        .then((res) => {
          disptach(setLoginResponse(res.data.login));
          if (res.data.login.userRole === "admin") {
            navigate("/dashboard", { replace: true });
          }
          if (res.data.login.userRole === "user") {
            navigate("/userdashboard", { replace: true });
          }
        })
        .catch((err) => {
          console.log(err.message);
          setServerError(err.message);
        });
    }
    console.log("submit");
  };
  return (
    <Container maxWidth="md" sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", p: 2 }}>
      <Paper sx={{ p: 6, borderRadius: "20px" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }} component="h1" gutterBottom>
          Welcome to BackOffice
        </Typography>
        <Typography variant="subtitle1" align="center" component="h2" gutterBottom>
          Please sign in to continue
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              variant="outlined"
              error={Boolean(error.email)}
              name="email"
              helperText={error.email ? error.email : ""}
              value={value.email}
              onChange={handleChange}
              fullWidth
              sx={{ mt: 2 }}
            />
            <TextField
              label="Password"
              variant="outlined"
              error={Boolean(error.password)}
              type="password"
              name="password"
              helperText={error.password ? error.password : ""}
              value={value.password}
              onChange={handleChange}
              fullWidth
              sx={{ mt: 2 }}
            />
            <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />

            {serverError && (
              <FormHelperText sx={{ fontSize: "16px", textAlign: "center" }} variant="outlined" error={Boolean(serverError)}>
                {serverError}
              </FormHelperText>
            )}
            {loading ? (
              <CustomLoader />
            ) : (
              <Button
                variant="contained"
                type="submit"
                sx={{
                  "&.MuiButtonBase-root:hover": {
                    backgroundColor: "#464444",
                  },
                }}
              >
                Sign in
              </Button>
            )}
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}
