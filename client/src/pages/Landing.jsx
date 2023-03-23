import React, { useContext } from "react";
import { StateContext } from "../context/StateContext";
import {
  createStyles,
  Title,
  Text,
  Button,
  Container,
  rem,
  Menu,
  Header,
  Group,
  Anchor,
} from "@mantine/core";
import LightDark from "../components/LightDark";
import { IconChevronDown } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    minHeight: "92.79vh",
  },
  title: {
    textAlign: "center",
    fontWeight: 800,
    fontSize: rem(40),
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    [theme.fn.smallerThan("xs")]: {
      fontSize: rem(28),
      textAlign: "left",
    },
  },
  description: {
    textAlign: "center",
    [theme.fn.smallerThan("xs")]: {
      textAlign: "left",
      fontSize: theme.fontSizes.md,
    },
  },
  controls: {
    marginTop: theme.spacing.lg,
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  control: {
    [theme.fn.smallerThan("xs")]: {
      height: rem(42),
      fontSize: theme.fontSizes.md,
    },
  },
}));

export default function Landing() {
  const { classes } = useStyles();
  const { isLogin, Logout } = useContext(StateContext);
  return (
    <>
      <Header
        h={70}
        px="xl"
        sx={{
          borderBottom: 0,
        }}
      >
        <Group
          position="apart"
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
          <Group>
            <LightDark />
            <Button color="cyan" component="a" href="/reports">
              Go To Exchange
            </Button>
          </Group>
        </Group>
      </Header>
      <Container className={classes.wrapper}>
        <Title className={classes.title}>
          Revolutionizing Healthcare with{" "}
          <Text component="span" inherit c={"cyan"}>
            Secure and Transparent
          </Text>{" "}
          Data Exchange
        </Title>
        <Container p={0} size={750}>
          <Text size="lg" color="dimmed" className={classes.description}>
            Secure and transparent data exchange is crucial for revolutionizing
            healthcare. With the increasing use of digital technologies,
            protecting patient data is more important than ever.
          </Text>
        </Container>
        <Group className={classes.controls}>
          {isLogin && (
            <Button
              className={classes.control}
              size="lg"
              variant="default"
              onClick={Logout}
            >
              Logout
            </Button>
          )}
          {!isLogin && (
            <Button
              className={classes.control}
              size="lg"
              variant="default"
              component="a"
              href="/login"
            >
              Login
            </Button>
          )}
          {isLogin && (
            <Button
              className={classes.control}
              size="lg"
              color="cyan"
              component="a"
              href="/dashboard"
            >
              Dashboard
            </Button>
          )}
          {!isLogin && (
            <Menu width={150} shadow="md">
              <Menu.Target>
                <Button className={classes.control} size="lg" color="cyan">
                  Sign up{" "}
                  <IconChevronDown
                    size="1.5rem"
                    stroke={1.5}
                    style={{
                      marginLeft: "0.2rem",
                    }}
                  />
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item component="a" href="/registration/patient">
                  Patient
                </Menu.Item>
                <Menu.Item component="a" href="/registration/buyer">
                  Buyer
                </Menu.Item>
                <Menu.Item component="a" href="/registration/doctor">
                  Doctor
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
        </Group>
      </Container>
    </>
  );
}
