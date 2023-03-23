import React from "react";
import {
  createStyles,
  Group,
  Paper,
  SimpleGrid,
  Text,
  rem,
} from "@mantine/core";
import {
  IconDiscount2,
  IconReportMedical,
  IconExchange,
  IconFileDollar,
} from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  root: {
    padding: `calc(${theme.spacing.xl} * 1.5)`,
  },
  value: {
    fontSize: rem(30),
    fontWeight: 500,
    lineHeight: 1,
  },
  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },
  title: {
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));

const icons = {
  report: IconReportMedical,
  sale: IconDiscount2,
  exchange: IconExchange,
  coin: IconFileDollar,
};

export default function StatsGrid({ data }) {
  const { classes } = useStyles();
  return (
    <div
      className={classes.root}
      style={{
        paddingLeft: "0px",
      }}
    >
      <SimpleGrid
        cols={4}
        breakpoints={[
          { maxWidth: "md", cols: 2 },
          { maxWidth: "xs", cols: 1 },
        ]}
      >
        {data.map((stat) => {
          const Icon = icons[stat.icon];
          return (
            <Paper
              withBorder
              p="md"
              radius="md"
              key={stat.title}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.1)",
              }}
            >
              <Group
                position="apart"
                sx={{
                  display: "flex",
                  alignItems: "start",
                  flexDirection: "column",
                }}
              >
                <Text size="xs" color="dimmed" className={classes.title}>
                  {stat.title}
                </Text>
                <Text className={classes.value} mt={10}>
                  {stat.value}
                </Text>
              </Group>
              <Icon className={classes.icon} size="2.6rem" stroke={1} />
            </Paper>
          );
        })}
      </SimpleGrid>
    </div>
  );
}
