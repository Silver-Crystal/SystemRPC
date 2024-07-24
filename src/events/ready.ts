import { RPC } from "../index";
import utils from "../utils";
import { interval } from "../../config.json";
import disconnected from "./disconnected";
export default (): void => {
  RPC.server.on("ready", async () => {
    RPC.active = true;
    utils.logger.logAuth(RPC.server.user?.username);
    await utils.setActivity();
    const internal = setInterval(async () => {
      await utils.setActivity();
    }, interval);
    disconnected(internal);
  });
};
