import streamDeck from "@elgato/streamdeck";
import { runAppleScript } from "run-applescript";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

const _lunchMacOSBatterySettings = async () => {
  streamDeck.logger.info("Lunching battery settings on macOS");
  await execAsync("open x-apple.systempreferences:com.apple.preference.battery");
};

const _lunchWindowsBatterySettings = async () => {
  streamDeck.logger.info("Lunching battery settings on windows");
  await execAsync("control.exe powercfg.cpl");
};

export const lunchBatterySettings = async () => {
  if (process.platform === "darwin") {
    await _lunchMacOSBatterySettings();
    return;
  }

  if (process.platform === "win32") {
    await _lunchWindowsBatterySettings();
    return;
  }

  throw new Error("Unsupported platform");
};
