import streamDeck from "@elgato/streamdeck";
import { runAppleScript } from "run-applescript";

export const lunchBatterySettings = async () => {
  streamDeck.logger.info("here?");
  await runAppleScript(`tell application "System Settings"
    activate
end tell

delay 1 -- wait for System Settings to open

tell application "System Events"
	tell process "System Settings"
		-- Navigate to the Battery menu
		click menu item "Battery" of menu "View" of menu bar item "View" of menu bar 1
	end tell
end tell
`);
};
