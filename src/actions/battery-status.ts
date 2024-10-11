import streamDeck, {
  action,
  DidReceiveSettingsEvent,
  ImageOptions,
  KeyDownEvent,
  SingletonAction,
  Target,
  WillAppearEvent,
  WillDisappearEvent,
} from "@elgato/streamdeck";

import si from "systeminformation";
import { BatteryDataPoller } from "../utils/battery-data-poller";
import type { ActionBatteryData, BatteryMonitorSettings } from "../types/battery.types";
import { adaptBatteryData } from "../utils/battery-data-adapter";
import { renderBatteryImage } from "../utils/battery-image-renderer";
import { renderBatteryTitle } from "../utils/battery-title-renderer";
import { batteryDataPollingRoundMs, defaultBatteryData } from "../consts/battery.consts";
import { lunchBatterySettings } from "../utils/battery-settings-luncher";

@action({ UUID: "com.galzo.battery-monitor.battery-status" })
export class BatteryStatusAction extends SingletonAction<BatteryMonitorSettings> {
  private batteryPoller: BatteryDataPoller;
  private batteryData: ActionBatteryData;

  constructor() {
    super();
    this.batteryPoller = new BatteryDataPoller();
    this.batteryData = defaultBatteryData;
  }

  override async onKeyDown(ev: KeyDownEvent<BatteryMonitorSettings>): Promise<void> {
    try {
      await lunchBatterySettings();
    } catch (e) {
      streamDeck.logger.error(e);
      ev.action.showAlert();
    }
  }

  private async setBatteryData(
    battery: si.Systeminformation.BatteryData,
    settings: BatteryMonitorSettings,
    setTitle: (title: string) => Promise<void>,
    setImage: (image: string, options?: ImageOptions | undefined) => Promise<void>,
    showAlert: () => Promise<void>
  ) {
    this.batteryData = adaptBatteryData(battery);
    const batteryTitle = renderBatteryTitle(this.batteryData, settings);
    const batteryImage = renderBatteryImage(this.batteryData, settings);

    await setTitle(batteryTitle);
    await setImage(`data:image/svg+xml;base64,${btoa(batteryImage)}`, {
      target: Target.HardwareAndSoftware,
      state: 1,
    });

    if (!this.batteryData.isValid) {
      await showAlert();
    }
  }

  override async onWillAppear(ev: WillAppearEvent<BatteryMonitorSettings>): Promise<void> {
    streamDeck.logger.info("Plugin mounted. Requesting settings to trigger polling");
    ev.action.getSettings();
  }

  override async onWillDisappear(ev: WillDisappearEvent<BatteryMonitorSettings>): Promise<void> {
    streamDeck.logger.info("Plugin unmounted. stop polling");
    this.batteryPoller.stopPolling();
  }

  override async onDidReceiveSettings(ev: DidReceiveSettingsEvent<BatteryMonitorSettings>): Promise<void> {
    streamDeck.logger.info("Plugin updated with new settings. Restarting polling");

    this.batteryPoller.stopPolling();
    this.batteryPoller.startPolling(async (data) => {
      await this.setBatteryData(
        data,
        ev.payload.settings,
        (title) => ev.action.setTitle(title),
        (image, opts) => ev.action.setImage(image, opts),
        () => ev.action.showAlert()
      );
    }, batteryDataPollingRoundMs);
  }
}
