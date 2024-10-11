export const batteryCircleChargingIndicatorSvg = () => {
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

export const batteryCircleSvg = (
  baseColor: string,
  fillColor: string,
  percentage: number,
  chargingIndicatorSvg?: string
) => {
  const circlePath = `M72 12a60 60 0 1 1 0 120 60 60 0 1 1 0 -120`;

  // Calculate the arc length based on the percentage
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const arcLength = (circumference * percentage) / 100;
  const dashOffset = circumference - arcLength;

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
        ${percentage}%
      </text>
      ${chargingIndicatorSvg ?? ""}
    </svg>
  `.trim();
};
