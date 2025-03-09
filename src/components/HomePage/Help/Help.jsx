import React from "react";
import "./Help.css";

// Help component definition
const Help = () => {
return (
    <>
        <div className="help-cards-container">
            <p className="help-paragraph">If you're having trouble with your smart home device, check out these frequently asked questions for help:</p>
            <div className="help-card">
                <h3>How do I reset my smart home device?</h3>
                <p>To reset your smart home device, press and hold the reset button for 10 seconds until the LED light blinks.</p>
            </div>
            <div className="help-card">
                <h3>Why is my smart home device not connecting to Wi-Fi?</h3>
                <p>Ensure your Wi-Fi network is working properly and that your device is within range. Restart your router and try reconnecting the device.</p>
            </div>
            <div className="help-card">
                <h3>How do I update the firmware on my smart home device?</h3>
                <p>Open the device's app, go to settings, and check for firmware updates. Follow the on-screen instructions to update the firmware.</p>
            </div>
            <div className="help-card">
                <h3>Can I control my smart home device with voice commands?</h3>
                <p>Yes, you can control your smart home device with voice commands if it is compatible with voice assistants like Amazon Alexa or Google Assistant.</p>
            </div>
            <div className="help-card">
                <h3>How do I set up automation for my smart home device?</h3>
                <p>Use the device's app to create automation rules. You can set triggers and actions to automate your device based on time, location, or other conditions.</p>
            </div>
            <div className="help-card">
                <h3>What should I do if my smart home device is not responding?</h3>
                <p>Check if the device is powered on and connected to the network. Restart the device and your router. If the issue persists, refer to the troubleshooting section in the user manual.</p>
            </div>
        </div>
    </>
);

}

export default Help;
// Export the Help component as the default export