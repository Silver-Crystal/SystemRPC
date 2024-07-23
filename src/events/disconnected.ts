import { start, RPC } from "../index";
import utils from "../utils";

export default (interval: NodeJS.Timeout) => {
  RPC.on("disconnected", () => {
    if (interval) clearInterval(interval);
    utils.logger.connectionClosed();
    setTimeout(() => {
      start(0);
    }, 6 * 10000);
  });
};
