import React, { useState } from "react";
import './style.scss';

const ReceiveNotification = () => {
  const [email, setEmail] = useState("");
  const [threshold, setThreshold] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

  }

  return (
    <div className="receive-notification">
      <form onSubmit={handleSubmit}>
        <h1>Receive a notification when the price drops</h1>
        <input
          placeholder="Email"
          onChange={({ target }) => setEmail(target.value)}
        />
        <input
          placeholder="Gas price in gwei (e.g. 80)"
          onChange={({ target }) => setThreshold(target.value)}
        />
        <button>Watch this price</button>
      </form>
    </div>
  );
};
export default ReceiveNotification;
