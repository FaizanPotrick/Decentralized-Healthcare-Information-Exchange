import { Group, Image, Text, Card, Badge, ActionIcon } from "@mantine/core";
import { IconShoppingCartPlus } from "@tabler/icons-react";
import { StateContext } from "../context/StateContext";
import React, { useContext } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

const ReportCard = ({
  report: {
    _id,
    name,
    patient: { name: patient_name },
    patient_age,
    disease,
    criticality,
    price,
    type,
    date,
  },
}) => {
  const { isLogin, setAlert } = useContext(StateContext);
  const [cookies] = useCookies(["user_id"]);
  const AddToCart = async () => {
    try {
      const { data } = await axios.get(`/api/registration/cart/add/${_id}`);
      setAlert({
        isAlert: true,
        type: "success",
        message: data,
      });
    } catch (err) {
      console.log(err);
      setAlert({
        isAlert: true,
        type: "error",
        message: err.response.data.message,
      });
    }
  };
  return (
    <Card
      radius="md"
      withBorder
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "10px",
        width: "400px",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "100%",
        }}
      >
        <Group position="apart">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <Text weight={500}>{name}</Text>
              <Badge color="pink" variant="light" size="sm">
                {type}
              </Badge>
            </div>
            <Text weight={500} color="dimmed" size="sm">
              {patient_name} - {patient_age}
            </Text>
          </div>
          <Image
            src={type == "pdf" ? "x-ray.png" : "checkup.png"}
            height={60}
            width={60}
            alt="Norway"
          />
        </Group>
        <Group position="apart" mt="xs">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Badge c="cyan">{disease.split(",")[0]}</Badge>
            {disease.split(",")[1] && (
              <Badge c="cyan">{disease.split(",")[1]}</Badge>
            )}
          </div>
        </Group>
        <Group position="apart" mt="xs">
          <Text weight={600} size="lg">
            ₹{price}
          </Text>
          <Badge
            c={
              criticality === "high"
                ? "red"
                : criticality === "medium"
                ? "yellow"
                : "green"
            }
            color={
              criticality === "high"
                ? "red"
                : criticality === "medium"
                ? "yellow"
                : "green"
            }
          >
            {criticality}
          </Badge>
        </Group>
        <Text size="xs" c="dimmed">
          {date.substring(0, 10)}
        </Text>
      </div>
      {cookies.user_type == "buyer" && isLogin && (
        <ActionIcon
          onClick={AddToCart}
          c="teal"
          sx={{
            position: "absolute",
            bottom: "4px",
            right: "4px",
            "&:hover": {
              color: "gray",
              border: "1px solid gray",
            },
          }}
          color="teal"
          variant="outline"
        >
          <IconShoppingCartPlus size="20px" />
        </ActionIcon>
      )}
    </Card>
  );
};

export default ReportCard;
