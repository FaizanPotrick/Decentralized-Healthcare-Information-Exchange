import {
  Modal,
  Button,
  TextInput,
  Paper,
  Stack,
  ActionIcon,
} from "@mantine/core";
import { IconCoinRupee } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import React from "react";
import axios from "axios";

function Price({ price, report_id, setReFetched, reFetched }) {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      price: price || 0,
    },
  });

  return (
    <>
      <Modal opened={opened} onClose={close} title="Update Price" centered>
        <Paper>
          <form
            onSubmit={form.onSubmit(async (val) => {
              try {
                await axios.put(
                  `/api/registration/report/price/${report_id}`,
                  val
                );
                form.reset();
                setReFetched(!reFetched);
                close();
              } catch (error) {
                console.log(error);
              }
            })}
          >
            <Stack>
              <TextInput
                placeholder="Enter Price"
                label="Price"
                value={form.values.price}
                onChange={(event) =>
                  form.setFieldValue("price", event.currentTarget.value)
                }
                required
              />
            </Stack>
            <Button type="submit" radius="md" fullWidth color="cyan" mt={20}>
              Update
            </Button>
          </form>
        </Paper>
      </Modal>
      <ActionIcon color="teal" onClick={open}>
        <IconCoinRupee />
      </ActionIcon>
    </>
  );
}

export default Price;
