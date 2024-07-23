import systemInfo from "systeminformation";
import os from "node:os";
import utils from "./index";
import { RPC } from "../index";
import { largeImage, smallImage, buttons } from "../../config.json";
const cachedInfo = {};
export default async (): Promise<void> => {
  const cpuData = await systemInfo.currentLoad();

  const memData = await systemInfo.mem();
  const cpuUsage = cpuData.currentLoad.toFixed(2);
  const ramUsage = (memData.used / 1024 ** 3).toFixed(2);
  const totalRam = (memData.total / 1024 ** 3).toFixed(2);
  cachedInfo.cpu = await systemInfo.cpu();
  cachedInfo.osInfo ??= await systemInfo.osInfo();
  cachedInfo.startTime ??= Date.now() - Number((os.uptime() * 1000).toFixed(0));

  RPC.setActivity({
    details: `CPU Usage: ${cpuUsage}%`,
    state: `RAM Usage: ${ramUsage} GB / ${totalRam} GB`,
    largeImageText: cachedInfo.cpu.brand,
    largeImageKey:
      largeImage ||
      "https://cdn.discordapp.com/banners/1183807775357272114/a_2985df25876f80d1365798bd7205ef8a.gif?size=1024", // Set your large image key here
    smallImageText: `${cachedInfo.osInfo.distro} ${cachedInfo.osInfo.release}`,
    smallImageKey: smallImage || (await utils.getPlatform()), // Set your small image key here
    buttons: buttons,
    startTimestamp: cachedInfo.startTime,
    instance: false,
  });
};
