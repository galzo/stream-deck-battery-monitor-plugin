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
export type BatteryInfoType = "percent" | "cycle-count" | "time-left";
export type BatteryDisplayType = "circle" | "bar";
/**
 * Settings for {@link BatteryMonitorAction}.
 */
export type BatteryMonitorSettings = {
  informationType: BatteryInfoType;
  displayType: BatteryDisplayType;

  batteryBaseColor: string;
  fullBatteryColor: string;
  mediumBatteryColor: string;
  emptyBatteryColor: string;
};
