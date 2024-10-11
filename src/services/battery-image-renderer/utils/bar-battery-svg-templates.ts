import { BatteryMonitorColors } from "../../../types/battery.types";

export const batteryBarChargingIndicatorSvg = () => {
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
      />`.trim();
};

export const noBatteryBarSvg = (baseColor: string, xMarkerColor: string) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 144">
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
    width="50"
    height="44"
    rx="4"
    ry="4"
    fill="${baseColor}"
  />

  <!-- Red X -->
  <g transform="translate(72, 72) scale(0.4)">
    <!-- Shadow -->
    <g transform="translate(3, 3)">
      <line x1="-40" y1="-40" x2="40" y2="40" stroke="rgba(0,0,0,0.5)" stroke-width="14" stroke-linecap="round" />
      <line x1="-40" y1="40" x2="40" y2="-40" stroke="rgba(0,0,0,0.5)" stroke-width="14" stroke-linecap="round" />
    </g>
    <!-- Red X -->
    <line x1="-40" y1="-40" x2="40" y2="40" stroke="${xMarkerColor}" stroke-width="15" stroke-linecap="round" />
    <line x1="-40" y1="40" x2="40" y2="-40" stroke="${xMarkerColor}" stroke-width="15" stroke-linecap="round" />
  </g>
</svg>`.trim();
};

export const batteryBarSvg = (
  baseColor: string,
  fillColor: string,
  fillWidth: number,
  chargingIndicatorSvg?: string
) => {
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
      ${chargingIndicatorSvg}
    </svg>`;
};
