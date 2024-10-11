import { batteryDefaultColors } from "../../../consts/battery.consts";
import { BatteryPowerState } from "../../../types/battery.types";

export const resolveBatteryFillColor = (powerState: BatteryPowerState | null, settings: BatteryMonitorSettings) => {
  if (!powerState) {
    return "#000000";
  }

  switch (powerState) {
    case "high":
      return settings?.fullBatteryColor ?? batteryDefaultColors.fullBatteryColor;
    case "medium":
      return settings?.mediumBatteryColor ?? batteryDefaultColors.mediumBatteryColor;
    case "low":
    case "veryLow":
    default:
      return settings?.emptyBatteryColor ?? batteryDefaultColors.emptyBatteryColor;
  }
};

/**
 * Calculate fill width based on percentage (max width is 74)
 */
export const resolveBatteryBarFillWidth = (percentage: number) => {
  return Math.max(6, (percentage / 100) * 74);
};

export const adaptBatteryImageSvgFile = (imageSvg: string) => {
  return `data:image/svg+xml;base64,${btoa(imageSvg)}`;
};
