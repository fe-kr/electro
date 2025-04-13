import fs from "node:fs";
import os from "node:os";
import osUtils from "os-utils";

const getStatsPath = () => (process.platform === "win32" ? "C://" : "/");

export const getResourcesLimits = (): Resources.Limits => {
  const { bsize, blocks } = fs.statfsSync(getStatsPath());

  const totalStorage = Math.floor((bsize * blocks) / 1_000_000_000);
  const cpuModel = os.cpus()[0].model;
  const totalRam = Math.floor(osUtils.totalmem() / 1024);

  return {
    storage: totalStorage,
    cpu: cpuModel,
    ram: totalRam,
  };
};

export const getResourcesUsage = async (): Promise<Resources.Usage> => {
  const { bfree, blocks } = fs.statfsSync(getStatsPath());

  const storageUsage = Math.floor(1 - bfree / blocks);
  const cpuUsage = await new Promise(osUtils.cpuUsage);
  const ramUsage = 1 - osUtils.freememPercentage();

  return {
    storage: storageUsage,
    cpu: cpuUsage,
    ram: ramUsage,
  };
};
