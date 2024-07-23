import { RPC, start } from "../index";
import utils from "../utils";

export default (interval: NodeJS.Timeout): void => {
  RPC.on("disconnected", () => {
    if (interval) clearInterval(interval);
    utils.logger.connectionClosed();
    setTimeout(() => {
      void start(0);
    }, 6 * 10000);
  });
};
