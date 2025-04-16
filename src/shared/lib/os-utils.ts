import fs from "node:fs";
import os from "node:os";
import osUtils from "os-utils";
import { AppPath } from "../config/path";

const ONE_GB = 1024 * 1024 * 1024;
const ONE_KB = 1024;

export const getResourcesLimits = (): Resources.Limits => {
  const { bsize, blocks } = fs.statfsSync(AppPath.statsPath);

  const totalStorage = Math.floor((bsize * blocks) / ONE_GB).toString();
  const cpuModel = os.cpus()[0].model;
  const totalRam = Math.floor(osUtils.totalmem() / ONE_KB).toString();

  return {
    storage: totalStorage,
    cpu: cpuModel,
    ram: totalRam,
  };
};

export const getResourcesUsage = async (): Promise<Resources.Usage> => {
  const { bfree, blocks } = fs.statfsSync(AppPath.statsPath);

  const storageUsage = 1 - bfree / blocks;
  const cpuUsage = await new Promise(osUtils.cpuUsage).catch(() => 0);
  const ramUsage = 1 - osUtils.freememPercentage();

  return {
    storage: storageUsage,
    cpu: cpuUsage,
    ram: ramUsage,
  };
};
