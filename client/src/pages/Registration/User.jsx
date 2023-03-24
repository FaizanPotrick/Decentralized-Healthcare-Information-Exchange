import React, { useEffect, useContext } from "react";
import { StateContext } from "../../context/StateContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "@mantine/form";
import LightDark from "../../components/LightDark";
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

const User = ({ type_of_user }) => {
  const navigate = useNavigate();
  const { setIsLogin, isLogin, setAlert, setLoading } =
    useContext(StateContext);

  const form = useForm({
    initialValues: {
      name: "",
      email_address: "",
      type_of_user: type_of_user,
      registration_number: "",
      gst_number: "",
      password: "",
      cPassword: "",
    },
    validate: {
      email_address: (val) =>
        !val.includes("@") ? "Email address should include @" : null,
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
      cPassword: (val) =>
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
        <Paper
          radius="md"
          p="xl"
          withBorder
          w={"34rem"}
          sx={(theme) => {
            return {
              [theme.fn.smallerThan("xs")]: {
                width: 340,
              },
            };
          }}
        >
          <Title
            align="center"
            mb={20}
            sx={(theme) => ({
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
              fontWeight: 600,
            })}
          >
            Sign Up
          </Title>
          <form
            onSubmit={form.onSubmit(async (val) => {
              setLoading(true);
              const { password, cPassword } = val;
              if (password !== cPassword) {
                setLoading(false);
                setAlert({
                  isAlert: true,
                  type: "error",
                  message: "Password do not match",
                });
                return;
              }
              try {
                await axios.post(`/api/registration/${type_of_user}`, val);
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
            <Stack
              sx={(theme) => ({
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                [theme.fn.smallerThan("xs")]: {
                  gridTemplateColumns: "1fr",
                },
              })}
            >
              <TextInput
                placeholder="Name"
                label="Name"
                value={form.values.name}
                onChange={(event) =>
                  form.setFieldValue("name", event.currentTarget.value)
                }
                required
              />
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
              {type_of_user === "doctor" && (
                <TextInput
                  placeholder="Registration Number"
                  label="Registration Number"
                  value={form.values.registration_number}
                  onChange={(event) =>
                    form.setFieldValue(
                      "registration_number",
                      event.currentTarget.value
                    )
                  }
                  required
                />
              )}
              {type_of_user === "buyer" && (
                <TextInput
                  placeholder="GST Number"
                  label="GST Number"
                  value={form.values.gst_number}
                  onChange={(event) =>
                    form.setFieldValue("gst_number", event.currentTarget.value)
                  }
                  required
                />
              )}
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
              <PasswordInput
                placeholder="Password"
                label="Confirm Password"
                value={form.values.cPassword}
                onChange={(event) =>
                  form.setFieldValue("cPassword", event.target.value)
                }
                error={form.errors.cPassword && "Invalid password"}
                withAsterisk
                required
              />
            </Stack>
            <Button type="submit" radius="md" fullWidth color="cyan" mt={20}>
              Sign Up
            </Button>
          </form>
          <Title
            sx={{
              fontSize: "14px",
              marginTop: "8px",
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            Already have an account?
            <Anchor href="/login" c="cyan" ml={4}>
              Login
            </Anchor>
          </Title>
        </Paper>
      </Container>
    </div>
  );
};

export default User;
