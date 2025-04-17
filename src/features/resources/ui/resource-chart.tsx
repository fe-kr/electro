import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface ResourceChartProps {
  data: (Partial<Resources.Usage> | null)[];
  dataKey: Resources.Variant;
}

export const ResourceChart = ({ data, dataKey }: ResourceChartProps) => {
  const { fill, stroke } = colors[dataKey];

  return (
    <ResponsiveContainer height="99%">
      <AreaChart data={data}>
        <CartesianGrid
          className="fill-none stroke-gray-300 dark:stroke-gray-600"
          strokeDasharray="3 3"
        />

        <Area
          fillOpacity={0.3}
          fill={fill}
          stroke={stroke}
          strokeWidth={3}
          type="monotone"
          dataKey={dataKey}
          isAnimationActive={false}
        />
        <XAxis stroke="transparent" height={0} />
        <YAxis domain={[0, 1]} stroke="transparent" width={0} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const colors = {
  cpu: {
    stroke: "#5DD4EE",
    fill: "#0A4D5C",
  },
  ram: {
    stroke: "#E99311",
    fill: "#5F3C07",
  },
  storage: {
    stroke: "#1ACF4D",
    fill: "#0B5B22",
  },
};
