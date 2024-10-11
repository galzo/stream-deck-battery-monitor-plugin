import { batteryDefaultColors } from "./../consts/battery.consts";
import {
  batteryBarChargingIndicatorSvg,
  batteryBarSvg,
  noBatteryBarSvg,
} from "../services/battery-image-renderer/utils/bar-battery-svg-templates";
import { BatteryPowerState, ActionBatteryData, BatteryMonitorSettings } from "../types/battery.types";
import {
  resolveBatteryFillColor,
  resolveBatteryBarFillWidth,
} from "../services/battery-image-renderer/utils/battery-image-data-adapter";
import {
  batteryCircleChargingIndicatorSvg,
  batteryCircleSvg,
} from "../services/battery-image-renderer/utils/circle-battery-svg-templates";

export const renderBatteryImage = (battery: ActionBatteryData, settings: BatteryMonitorSettings) => {
  if (!battery.isValid) {
    return _renderNoBatteryImage(settings);
  }

  switch (settings.displayType) {
    case "circle":
      return _renderBatteryCircle(battery, settings);
    case "bar":
    default:
      return _renderBatteryBar(battery, settings);
  }
};

const _renderNoBatteryImage = (settings: BatteryMonitorSettings) => {
  const baseColor = settings.batteryBaseColor ?? batteryDefaultColors.baseColor;
  const xColor = settings.emptyBatteryColor ?? batteryDefaultColors.emptyBatteryColor;
  return noBatteryBarSvg(baseColor, xColor);
};

const _renderBatteryCircle = (battery: ActionBatteryData, settings: BatteryMonitorSettings) => {
  const validPercentage = Math.max(0, Math.min(100, battery.percentage ?? 0));
  const baseColor = settings.batteryBaseColor ?? batteryDefaultColors.baseColor;
  const fillColor = resolveBatteryFillColor(battery.powerState, settings);

  const shouldRenderChargingIcon = battery.isCharging || battery.isConnectedToPower;
  const chargingIcon = shouldRenderChargingIcon ? batteryCircleChargingIndicatorSvg() : "";

  return batteryCircleSvg(baseColor, fillColor, validPercentage, chargingIcon);
};

const _renderBatteryBar = (battery: ActionBatteryData, settings: BatteryMonitorSettings) => {
  const validPercentage = Math.max(0, Math.min(100, battery.percentage ?? 0));
  const baseColor = settings.batteryBaseColor ?? batteryDefaultColors.baseColor;
  const fillWidth = resolveBatteryBarFillWidth(validPercentage);
  const fillColor = resolveBatteryFillColor(battery.powerState, settings);

  const shouldRenderChargingIcon = battery.isCharging || battery.isConnectedToPower;
  const chargingIcon = shouldRenderChargingIcon ? batteryBarChargingIndicatorSvg() : "";

  return batteryBarSvg(baseColor, fillColor, fillWidth, chargingIcon);
};
