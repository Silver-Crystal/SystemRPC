import DiscordRPC from "discord-rpc";
import { clientId } from "../config.json";
import utils from "./utils";
export const RPC = new DiscordRPC.Client({ transport: "ipc" });

export const start = async (tries: number): Promise<void> => {
  try {
    await RPC.login({ clientId });
  } catch {
    if (tries <= 5) {
      utils.logger.loginFailed(tries);
      setTimeout(
        () => {
          void start(tries + 1);
        },
        (tries || 0) + 1 * 10000,
      );
      return;
    }
    utils.logger.loginFailed();
    process.exit(0);
  }
  utils.logger.loginSuccess(RPC.application?.name);
};

void import("./events").then(() => void start(0));
