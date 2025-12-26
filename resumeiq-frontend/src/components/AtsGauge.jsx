import { PieChart, Pie, Cell } from "recharts";
import { Box, Typography } from "@mui/material";

const BRAND_PRIMARY = "#FF725E";
const BRAND_TEXT = "#37474F";

export default function AtsGauge({ value }) {
  const data = [
    { name: "Score", value },
    { name: "Remaining", value: 100 - value },
  ];

  return (
    <Box textAlign="center">
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          cx={100}
          cy={100}
          innerRadius={60}
          outerRadius={80}
          startAngle={90}
          endAngle={-270}
          dataKey="value"
        >
          <Cell fill={BRAND_PRIMARY} />
          <Cell fill="#eee" />
        </Pie>
      </PieChart>

      <Typography
        variant="h5"
        fontWeight={800}
        color={BRAND_TEXT}
        mt={-12}
      >
        {value}%
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
      >
        ATS Score
      </Typography>
    </Box>
  );
}
