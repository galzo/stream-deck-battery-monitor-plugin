export type ActionBatteryData = {
  percentage?: number;
  hasBattery?: boolean;
  isCharging?: boolean;
  isConnectedToPower?: boolean;
  timeRemaining?: number;
  cycleCount?: number;
  powerState: BatteryPowerState | null;
};

export type BatteryPowerState = "high" | "medium" | "low" | "veryLow";

/**
 * Settings for {@link BatteryMonitorAction}.
 */
export type BatteryMonitorSettings = {
  informationType: "percent" | "cycle-count" | "time-left";
  hideChargingIndicator: boolean;

  batteryBaseColor: string;
  fullBatteryColor: string;
  mediumBatteryColor: string;
  emptyBatteryColor: string;
};
