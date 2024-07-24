import { RPC, start } from "../index";
import utils from "../utils";

export default (interval: NodeJS.Timeout): void => {
  RPC?.server.on("disconnected", () => {
    RPC.active = false;
    RPC.server.destroy();
    if (interval) clearInterval(interval);
    utils.logger.connectionClosed();
    const reconnectInterval = setInterval(async () => {
      try {
        await start(0);
        clearInterval(reconnectInterval);
      } catch {
        console.clear();
        utils.logger.connectionClosed();
      }
    }, 1.5 * 10000);
  });
};
