import React, { useEffect, useContext } from "react";
import { StateContext } from "../context/StateContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "@mantine/form";
import LightDark from "../components/LightDark";
import {
  TextInput,
  PasswordInput,
  Paper,
  Group,
  Button,
  Title,
  Anchor,
  Stack,
  Container,
} from "@mantine/core";

const Login = () => {
  const navigate = useNavigate();
  const { setIsLogin, isLogin, setAlert, setLoading } =
    useContext(StateContext);

  const form = useForm({
    initialValues: {
      email_address: "",
      password: "",
    },
    validate: {
      email_address: (val) =>
        !val.includes("@") ? "Email address should include @" : null,
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  useEffect(() => {
    if (isLogin) {
      navigate(-1);
    }
  }, [setIsLogin]);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Group
        position="apart"
        h={70}
        px="xl"
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Anchor
          href="/"
          c="cyan"
          sx={{
            ":hover": {
              textDecoration: "none",
            },
          }}
        >
          <Title c="cyan">DHIE</Title>
        </Anchor>
        <LightDark />
      </Group>
      <Container my="auto">
        <Paper radius="md" p="xl" withBorder w={"25rem"}>
          <Title
            align="center"
            mb={20}
            sx={(theme) => ({
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
              fontWeight: 600,
            })}
          >
            Login
          </Title>
          <form
            onSubmit={form.onSubmit(async (val) => {
              setLoading(true);
              try {
                await axios.put("/api/login", val);
                await setIsLogin(true);
                form.reset();
                navigate("/dashboard");
              } catch (error) {
                setAlert({
                  isAlert: true,
                  type: "error",
                  message: error.response.data,
                });
              }
              setLoading(false);
            })}
          >
            <Stack>
              <TextInput
                placeholder="Email address"
                label="Email address"
                value={form.values.email_address}
                onChange={(event) =>
                  form.setFieldValue("email_address", event.currentTarget.value)
                }
                error={form.errors.email_address && "Invalid email address"}
                required
              />
              <PasswordInput
                placeholder="Password"
                label="Password"
                value={form.values.password}
                onChange={(event) =>
                  form.setFieldValue("password", event.target.value)
                }
                error={form.errors.password && "Invalid password"}
                withAsterisk
                required
              />
            </Stack>
            <Button type="submit" radius="md" fullWidth color="cyan" mt={20}>
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
