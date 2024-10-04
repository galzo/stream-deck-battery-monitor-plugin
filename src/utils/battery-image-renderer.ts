import {
  BatteryPowerState,
  ActionBatteryData,
  BatteryMonitorSettings,
} from "../types/battery.types";

const _resolveBatteryFillColor = (
  powerState: BatteryPowerState | null,
  settings: BatteryMonitorSettings
) => {
  if (!powerState) {
    return "#000000";
  }

  switch (powerState) {
    case "high":
      return settings?.fullBatteryColor ?? "#33c759";
    case "medium":
      return settings?.mediumBatteryColor ?? "#ffd60a";
    case "low":
    case "veryLow":
    default:
      return settings?.emptyBatteryColor ?? "#ff453a";
  }
};

/**
 * Calculate fill width based on percentage (max width is 74)
 */
const _resolveBatteryFillWidth = (percentage: number) => {
  return Math.max(6, (percentage / 100) * 74);
};

export const renderBatteryImage = (
  battery: ActionBatteryData,
  settings: BatteryMonitorSettings
) => {
  const validPercentage = Math.max(0, Math.min(100, battery.percentage ?? 0));
  const baseColor = settings.batteryBaseColor ?? "white";
  const fillWidth = _resolveBatteryFillWidth(validPercentage);
  const fillColor = _resolveBatteryFillColor(battery.powerState, settings);

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 144">
      <!-- Battery body -->
      <rect
        x="28"
        y="44"
        width="86"
        height="56"
        rx="8"
        ry="8"
        fill="none"
        stroke="${baseColor}"
        stroke-width="6"
      />
      
      <!-- Battery terminal -->
      <rect
        x="114"
        y="60"
        width="12"
        height="24"
        rx="4"
        ry="4"
        fill="${baseColor}"
      />
      
      <!-- Battery fill -->
      <rect
        x="34"
        y="50"
        width="${fillWidth}"
        height="44"
        rx="4"
        ry="4"
        fill="${fillColor}"
      />
    </svg>
  `.trim();
};
