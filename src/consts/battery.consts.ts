import { BatteryInfoType } from "./../types/battery.types";
import { ActionBatteryData } from "../types/battery.types";

export const powerStateLowerThreshold = {
  high: 65,
  medium: 45,
  low: 25,
};

export const defaultBatteryData: ActionBatteryData = {
  percentage: undefined,
  hasBattery: false,
  isCharging: false,
  timeRemaining: undefined,
  isConnectedToPower: undefined,
  cycleCount: undefined,
  powerState: null,
};

export const batteryDataPollingRoundMs = 60000;
