import { StateContext } from "../context/StateContext";
import { useCookies } from "react-cookie";
import React, { useContext } from "react";
import LightDark from "./LightDark";
import {
  Title,
  Text,
  Button,
  Menu,
  Header,
  Group,
  Anchor,
  ActionIcon,
} from "@mantine/core";
import { IconChevronDown, IconShoppingCart } from "@tabler/icons-react";

function IsHeader({ setOpen }) {
  const { isLogin, Logout } = useContext(StateContext);
  const [cookies] = useCookies(["user_id"]);

  return (
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
          {isLogin && (
            <Button color="cyan" component="a" href="/dashboard">
              Dashboard
            </Button>
          )}
          {isLogin && cookies.user_type === "patient" && (
            <Button color="cyan" component="a" href="/registration/report">
              Upload Report
            </Button>
          )}
          {isLogin && cookies.user_type === "buyer" && (
            <Button color="cyan" component="a" href="/reports">
              Go To Exchange
            </Button>
          )}
          {isLogin && (
            <Button variant="default" onClick={Logout}>
              Logout
            </Button>
          )}
          {!isLogin && (
            <Button variant="default" component="a" href="/login">
              Login
            </Button>
          )}
          {!isLogin && (
            <Menu width={150} shadow="md">
              <Menu.Target>
                <Button color="cyan">
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
          {isLogin && cookies.user_type === "buyer" && (
            <ActionIcon
              variant="transparent"
              color="cyan"
              onClick={() => {
                setOpen(true);
              }}
            >
              <IconShoppingCart size="50px" />
            </ActionIcon>
          )}
          <LightDark />
        </Group>
      </Group>
    </Header>
  );
}

export default IsHeader;
