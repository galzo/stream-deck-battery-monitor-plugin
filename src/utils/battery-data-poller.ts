import streamDeck from "@elgato/streamdeck";
import { Systeminformation, battery } from "systeminformation";

export class BatteryDataPoller {
  private interval: NodeJS.Timeout | null;

  constructor() {
    this.interval = null;
  }

  public fetchBatteryData = async () => {
    return await battery();
  };

  public startPolling = async (
    submitBatteryData: (data: Systeminformation.BatteryData) => Promise<void>,
    delayMs: number
  ) => {
    if (this.interval) {
      return;
    }

    // Run initial population before the polling
    const batteryData = await this.fetchBatteryData();
    await submitBatteryData(batteryData);

    // Set the polling rounds
    this.interval = setInterval(async () => {
      const batteryData = await this.fetchBatteryData();
      await submitBatteryData(batteryData);
    }, delayMs);
  };

  public stopPolling = () => {
    if (!this.interval) return;

    clearInterval(this.interval);
    this.interval = null;
  };
}
