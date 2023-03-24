import React, { useState, useEffect, useContext } from "react";
import { StateContext } from "../context/StateContext";
import axios from "axios";
import { useDisclosure } from "@mantine/hooks";
import {
  Drawer,
  Group,
  Button,
  Image,
  ActionIcon,
  Text,
  Card,
  Badge,
} from "@mantine/core";
import { IconShoppingCart, IconTrash } from "@tabler/icons-react";

const Cart = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [reports, setReports] = useState([]);
  const { setLoading, setAlert } = useContext(StateContext);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (!opened) return;
    (async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/cart");
        setReports(data);
        setTotalPrice(
          data.reduce((acc, curr) => {
            return acc + curr.report.price;
          }, 0)
        );
      } catch (err) {
        console.log(err);
        setAlert({
          isAlert: true,
          type: "error",
          message: err.response.data.message,
        });
      }
      setLoading(false);
    })();
  }, [opened]);

  const RemoveFromCart = async (id) => {
    setLoading(true);
    try {
      await axios.get(`/api/registration/cart/remove/${id}`);
      setTotalPrice(
        reports
          .filter((report) => report._id !== id)
          .reduce((acc, curr) => {
            return acc + curr.report.price;
          }, 0)
      );
      setReports(reports.filter((report) => report._id !== id));
    } catch (err) {
      console.log(err);
      setAlert({
        isAlert: true,
        type: "error",
        message: err.response.data.message,
      });
    }
    setLoading(false);
  };

  const Purchase = async () => {
    setLoading(true);
    try {
      await axios.get("/api/registration/report/exchange");
      setReports([]);
      setTotalPrice(0);
    } catch (err) {
      console.log(err);
      setAlert({
        isAlert: true,
        type: "error",
        message: err.response.data.message,
      });
    }
    setLoading(false);
  };

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title="Shopping cart"
        position="right"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginBottom: "auto",
            height: "100%",
          }}
        >
          {reports.map((product) => {
            return (
              <Card
                radius="md"
                withBorder
                key={product._id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <Image
                  src={
                    product.report.type == "pdf" ? "x-ray.png" : "checkup.png"
                  }
                  height={60}
                  width={60}
                  alt="Norway"
                />
                <div
                  style={{
                    width: "100%",
                  }}
                >
                  <Group position="apart">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <Text weight={500}>{product.report.name}</Text>
                      <Badge color="pink" variant="light" size="sm">
                        {product.report.type}
                      </Badge>
                    </div>
                    <Text weight={500} color="cyan">
                      ₹{product.report.price}
                    </Text>
                  </Group>
                  <Group position="apart" mt="xs">
                    <Text weight={500} color="dimmed" size="sm">
                      {product.patient.name} - {product.report.patient_age}
                    </Text>
                    <ActionIcon
                      onClick={() => RemoveFromCart(product._id)}
                      size="sm"
                      c="red"
                    >
                      <IconTrash />
                    </ActionIcon>
                  </Group>
                </div>
              </Card>
            );
          })}
        </div>
        <Group
          sx={{
            position: "fixed",
            bottom: 10,
            left: 18,
            right: 18,
          }}
        >
          <Group
            position="apart"
            sx={{
              width: "100%",
            }}
            mb={-18}
          >
            <Text size="xl" fw={600}>
              Subtotal
            </Text>
            <Text size="lg" fw={500} color="cyan">
              ₹{totalPrice}
            </Text>
          </Group>
          <Text size="sm" color="dimmed" mb={-4}>
            Exchange and taxes calculated at checkout.
          </Text>
          <Button
            color="cyan"
            onClick={Purchase}
            fullWidth
            disabled={totalPrice === 0}
          >
            Purchase
          </Button>
        </Group>
      </Drawer>
      <Group position="center">
        <ActionIcon variant="transparent" color="cyan" onClick={open}>
          <IconShoppingCart size="50px" />
        </ActionIcon>
      </Group>
    </>
  );
};

export default Cart;
