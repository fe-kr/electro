import fs from "node:fs";
import os from "node:os";
import osUtils from "os-utils";

const getStatsPath = () => (process.platform === "win32" ? "C://" : "/");

export const getResourcesLimits = (): Resources.Limits => {
  const { bsize, blocks } = fs.statfsSync(getStatsPath());

  const totalStorage = Math.floor((bsize * blocks) / 1_000_000_000).toString();
  const cpuModel = os.cpus()[0].model;
  const totalRam = Math.floor(osUtils.totalmem() / 1024).toString();

  return {
    storage: totalStorage,
    cpu: cpuModel,
    ram: totalRam,
  };
};

export const getResourcesUsage = async (): Promise<Resources.Usage> => {
  const { bfree, blocks } = fs.statfsSync(getStatsPath());

  const storageUsage = 1 - bfree / blocks;
  const cpuUsage = await new Promise(osUtils.cpuUsage).catch(() => 0);
  const ramUsage = 1 - osUtils.freememPercentage();

  return {
    storage: storageUsage * 100,
    cpu: cpuUsage * 100,
    ram: ramUsage * 100,
  };
};
