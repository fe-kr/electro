import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  ResponsiveContainerProps,
  XAxis,
  YAxis,
} from "recharts";

interface ResourceChartProps extends Partial<ResponsiveContainerProps> {
  data: (Partial<Resources.Usage> | null)[];
  dataKey: Resources.Variant;
}

export const ResourceChart = ({
  data,
  dataKey,
  ...props
}: ResourceChartProps) => {
  const { fill, stroke } = colors[dataKey];

  return (
    <ResponsiveContainer {...props} height="100%" minHeight={100}>
      <AreaChart data={data}>
        <CartesianGrid stroke="#333" strokeDasharray="5 5" fill="#1C1C1C" />
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
        <YAxis domain={[0, 100]} stroke="transparent" width={0} />
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
