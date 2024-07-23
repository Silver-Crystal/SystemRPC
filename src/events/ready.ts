import { RPC } from "../index";
import utils from "../utils";
import { interval } from "../../config.json";
import disconnected from "./disconnected";
export default (): void => {
  RPC.on("ready", async () => {
    utils.logger.logAuth(RPC.user?.username);
    await utils.setActivity();
    const internal = setInterval(async () => {
      await utils.setActivity();
    }, interval);
    disconnected(internal);
  });
};
