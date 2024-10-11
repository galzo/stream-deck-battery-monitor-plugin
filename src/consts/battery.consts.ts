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
  isValid: false,
};

export const batteryDataPollingRoundMs = 60000;

export const batteryDefaultColors = {
  baseColor: "#EFEFEF",
  fullBatteryColor: "#33c759",
  mediumBatteryColor: "#ffd60a",
  emptyBatteryColor: "#ff453a",
};
