import streamDeck from "@elgato/streamdeck";
import { ActionBatteryData, BatteryMonitorSettings } from "../types/battery.types";

const _adaptBatteryPercentage = (battery: ActionBatteryData, settings: BatteryMonitorSettings) => {
  if (!battery.hasBattery || battery.percentage === undefined) {
    return "N/A";
  }

  const shouldRenderLowPowerIcon = battery.powerState === "veryLow";
  return `${shouldRenderLowPowerIcon ? "☠️" : ""}${battery.percentage}%`;
};

const _adaptCycleCount = (battery: ActionBatteryData) => {
  if (!battery.hasBattery || battery.cycleCount === undefined) {
    return "N/A";
  }

  return `${battery.cycleCount} ♽`;
};

const _adaptTimeLeft = (battery: ActionBatteryData) => {
  if (!battery.hasBattery || battery.timeRemaining === undefined) {
    return "N/A";
  }

  if (battery.isCharging || battery.isConnectedToPower) {
    return "♾️";
  }

  const timeLeftHrs = battery.timeRemaining / 60;
  if (timeLeftHrs < 1) {
    return "< 1 Hr";
  }

  const adaptedTimeLeftHrs = timeLeftHrs > 10 ? "10+" : Math.round(timeLeftHrs);
  return `${adaptedTimeLeftHrs} Hrs`;
};

export const renderBatteryTitle = (battery: ActionBatteryData, settings: BatteryMonitorSettings) => {
  if (!battery.isValid) {
    return "No battery";
  }

  if (settings.displayType === "circle") {
    return "";
  }

  switch (settings.informationType) {
    case "cycle-count":
      return _adaptCycleCount(battery);
    case "time-left":
      return _adaptTimeLeft(battery);
    case "percent":
    default:
      return _adaptBatteryPercentage(battery, settings);
  }
};
