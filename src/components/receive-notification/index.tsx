import React, { useState } from "react";
import validEmail from "../../utils/valid-email";
import addUserToNotifications from "../../actions/addUserNotifications";
import "./style.scss";

const minThreshold = 20;
const maxThreshold = 1000;

const ReceiveNotification = () => {
  const [email, setEmail] = useState("");
  const [threshold, setThreshold] = useState(0);
  const [emailError, setEmailError] = useState(false);
  const [thresholdError, setThresholdError] = useState(false);
  const [notificationComplete, setNotificationComplete] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (threshold < minThreshold || threshold > maxThreshold) {
      setThresholdError(true);
    } else if (!validEmail(email)) {
      setEmailError(true);
    } else {
      await addUserToNotifications(email, threshold);
      setNotificationComplete(true);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailError(false);
    setEmail(e.target.value);
  };

  const handleThresholdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThresholdError(false);
    setThreshold(parseInt(e.target.value));
  };

  return (
    <div className="receive-notification">
      <form onSubmit={handleSubmit}>
        <h1>Receive a notification when the price drops</h1>
        {notificationComplete ? (
          <div className="notification-complete">
            <h2>Notification complete!</h2>
            <p>
              You will receive a notification when the price drops by{" "}
              {threshold}
            </p>
          </div>
        ) : (
          <>
            <input
              type="email"
              placeholder="Email"
              onChange={handleEmailChange}
            />
            <p className={`error${emailError ? "" : " hidden"}`}>
              Invalid email.
            </p>
            <input
              placeholder="Gas price in gwei (e.g. 80)"
              onChange={handleThresholdChange}
              type="number"
              min={minThreshold}
              max={maxThreshold}
            />
            <p className={`error${thresholdError ? "" : " hidden"}`}>
              Invalid threshold. Must be between {minThreshold} and{" "}
              {maxThreshold}.
            </p>
            <button>Watch this price</button>
          </>
        )}
      </form>
    </div>
  );
};
export default ReceiveNotification;
