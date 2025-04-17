import { percentageFormatter } from "@/shared/lib/format";

export const resourcesUsageConfig = [
  {
    dataKey: "cpu",
    title: "CPU",
  },
  {
    dataKey: "ram",
    title: "RAM",
    description: "Total capacity, GB:",
  },
  {
    dataKey: "storage",
    title: "Storage",
    description: "Total capacity, GB:",
  },
] satisfies Resources.UsageConfigItem[];

export const resourcesUsageLimitsConfig = [
  {
    dataKey: "cpu",
    title: "CPU",
    formatValue: percentageFormatter.format,
  },
  {
    dataKey: "ram",
    title: "RAM",
    formatValue: percentageFormatter.format,
  },
  {
    dataKey: "storage",
    title: "Storage",
    formatValue: percentageFormatter.format,
  },
] satisfies Resources.UsageConfigItem[];
