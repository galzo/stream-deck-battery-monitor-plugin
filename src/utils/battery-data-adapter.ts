import { powerStateLowerThreshold } from "../consts/battery.consts";
import { BatteryPowerState, ActionBatteryData } from "../types/battery.types";
import { Systeminformation } from "systeminformation";

export const adaptBatteryData = (battery: Systeminformation.BatteryData): ActionBatteryData => {
  return {
    percentage: battery.percent,
    hasBattery: battery.hasBattery,
    isCharging: battery.isCharging,
    timeRemaining: battery.timeRemaining,
    cycleCount: battery.cycleCount,
    isConnectedToPower: battery.acConnected,
    powerState: battery.hasBattery ? _resolveBatteryPowerState(battery.percent) : null,
    isValid: _isDataValid(battery),
  };
};

const _resolveBatteryPowerState = (percentage: number): BatteryPowerState => {
  if (percentage >= powerStateLowerThreshold.high) {
    return "high";
  }

  if (percentage >= powerStateLowerThreshold.medium) {
    return "medium";
  }

  if (percentage >= powerStateLowerThreshold.low) {
    return "low";
  }

  return "veryLow";
};

const _isDataValid = (battery: Systeminformation.BatteryData) => {
  return battery && battery.hasBattery && battery.percent !== undefined;
};
