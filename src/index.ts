import DiscordRPC from  ;
import { clientId } from "../config.json";
import registerEvents from "./events";
import utils from "./utils";

export const RPC: { active: boolean; server: DiscordRPC.Client } = {
  active: true,
  server: new DiscordRPC.Client({ transport: "ipc" }),
};

export const start = async (tries: number): Promise<void> => {
  try {
    if (!RPC.active) RPC.server = new DiscordRPC.Client({ transport: "ipc" });
    registerEvents();
    await RPC.server.login({ clientId });
  } catch {
    utils.logger.loginFailed(tries);
    await new Promise<void>((resolve) => {
      setTimeout(
        async () => {
          RPC.server?.destroy?.().catch(() => {});
          RPC.active = false;
          await start(tries <= 5 ? tries : 5);
          resolve();
        },
        ((tries <= 5 ? tries : 5) + 1) * 10000,
      );
    });
    return;
  }
  utils.logger.loginSuccess(RPC.server.application?.name);
};

void start(0);
