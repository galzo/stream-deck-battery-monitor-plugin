import { BatteryPowerState, ActionBatteryData, BatteryMonitorSettings } from "../types/battery.types";

const _resolveBatteryFillColor = (powerState: BatteryPowerState | null, settings: BatteryMonitorSettings) => {
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

export const renderBattery = (battery: ActionBatteryData, settings: BatteryMonitorSettings) => {
  switch (settings.displayType) {
    case "circle":
      return renderBatteryCircle(battery, settings);
    case "bar":
    default:
      return renderBatteryBar(battery, settings);
  }
};

const renderCircleChargingBolt = () => {
  return `<g transform="translate(24, 60)">
        <!-- Lightning bolt shadow -->
        <path
          d="M71 52l-6 18h11l-14 22 6-18h-11l14-22z"
          fill="#B8860B"
          stroke="#B8860B"
          stroke-width="1.5"
          stroke-linejoin="round"
          transform="translate(6.5, 1.5) scale(0.6)"
        />
        <!-- Lightning bolt -->
        <path
          d="M71 52l-6 18h11l-14 22 6-18h-11l14-22z"
          fill="#FFD60A"
          stroke="#ffae00"
          stroke-width="1.5"
          stroke-linejoin="round"
          transform="translate(5, 0) scale(0.6)"
        />
      </g>`;
};

const renderBarChargingBolt = () => {
  return `<!-- Lightning bolt shadow -->
      <path
        d="M71 52l-6 18h11l-14 22 6-18h-11l14-22z"
        fill="#B8860B"
        stroke="#B8860B"
        stroke-width="1.5"
        stroke-linejoin="round"
        transform="translate(6.5, 1.5)"
      />
      <!-- Lightning bolt -->
      <path
        d="M71 52l-6 18h11l-14 22 6-18h-11l14-22z"
        fill="#FFD60A"
        stroke="#ffae00"
        stroke-width="1.5"
        stroke-linejoin="round"
        transform="translate(5, -1)"
      />`;
};

const renderBatteryCircle = (battery: ActionBatteryData, settings: BatteryMonitorSettings) => {
  const validPercentage = Math.max(0, Math.min(100, battery.percentage ?? 0));
  const baseColor = settings.batteryBaseColor ?? "white";
  const fillColor = _resolveBatteryFillColor(battery.powerState, settings);

  // Calculate the arc length based on the percentage
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const arcLength = (circumference * validPercentage) / 100;
  const dashOffset = circumference - arcLength;

  // Determine the path for the circle
  const circlePath = `M72 12a60 60 0 1 1 0 120 60 60 0 1 1 0 -120`;

  const shouldRenderChargingIcon = battery.isCharging || battery.isConnectedToPower;
  const chargingIcon = shouldRenderChargingIcon ? renderCircleChargingBolt() : "";

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 144">
      <!-- Background circle -->
      <path
        d="${circlePath}"
        fill="none"
        stroke="#3b3b3b"
        stroke-width="12"
        stroke-linecap="round"
      />

      <!-- Filled portion -->
      <path
        d="${circlePath}"
        fill="none"
        stroke="${fillColor}"
        stroke-width="12"
        stroke-linecap="round"
        stroke-dasharray="${circumference}"
        stroke-dashoffset="${dashOffset}"
      />

      <!-- Percentage text -->
      <text
        x="72"
        y="84"
        font-family="Arial, sans-serif"
        font-size="36"
        fill="${baseColor}"
        text-anchor="middle"
        dominant-baseline="middle"
      >
        ${validPercentage}%
      </text>
      ${chargingIcon}
    </svg>
  `.trim();
};

const renderBatteryBar = (battery: ActionBatteryData, settings: BatteryMonitorSettings) => {
  const validPercentage = Math.max(0, Math.min(100, battery.percentage ?? 0));
  const baseColor = settings.batteryBaseColor ?? "white";
  const fillWidth = _resolveBatteryFillWidth(validPercentage);
  const fillColor = _resolveBatteryFillColor(battery.powerState, settings);

  const shouldRenderChargingIcon = battery.isCharging || battery.isConnectedToPower;
  const chargingIcon = shouldRenderChargingIcon ? renderBarChargingBolt() : "";

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
      ${chargingIcon}
    </svg>
  `.trim();
};
