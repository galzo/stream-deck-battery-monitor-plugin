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

  if (battery.isCharging || battery.isConnectedToPower || battery.timeRemaining < 2) {
    return "♾️";
  }

  return `${Math.round(battery.timeRemaining / 60)} Hrs`;
};

export const renderBatteryTitle = (battery: ActionBatteryData, settings: BatteryMonitorSettings) => {
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
