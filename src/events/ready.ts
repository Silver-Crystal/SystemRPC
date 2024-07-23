import { RPC } from "../index";
import utils from "../utils";
import { interval } from "../../config.json";
import disconnected from "./disconnected";
export default () => {
  RPC.on("ready", () => {
    utils.logger.logAuth(RPC.user?.username);
    utils.setActivity();
    const internal = setInterval(() => {
      utils.setActivity();
    }, interval);
    disconnected(internal);
  });
};
