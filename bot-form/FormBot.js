import React, { useState } from "react";

const FormBot = () => {
  const [bots, setBots] = useState([
    { id: 1, name: "Email Extractor", status: "Running", task: "Extracting emails" },
    { id: 2, name: "Notification Sender", status: "Completed", task: "Sending Notifications" },
    { id: 3, name: "Data Analyzer", status: "Stopped", task: "Analyzing data" }
  ]);

  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("black"); // default color

  // Form state
  const [newBotName, setNewBotName] = useState("");
  const [newBotStatus, setNewBotStatus] = useState("Running");
  const [newBotTask, setNewBotTask] = useState("");

  const statusColors = {
    Completed: "green",
    Stopped: "red",
    Running: "orange",
  };

  const triggerJob = (id) => {
    const bot = bots.find(bot => bot.id === id);
    if (bot) {
      setMessage(bot.status);
      setMessageColor(statusColors[bot.status] || "black");
    }
  };

  const handleAddBot = (e) => {
    e.preventDefault();
    if (!newBotName || !newBotTask) return; // basic validation

    const newBot = {
      id: bots.length + 1, // simple id increment
      name: newBotName,
      status: newBotStatus,
      task: newBotTask
    };

    setBots([...bots, newBot]);
    setNewBotName("");
    setNewBotStatus("Running");
    setNewBotTask("");
  };

  return (
    <div className="bot-list-manager" style={{ padding: "20px", margin: "50px auto" }}>
      <h1>Bot List Manager</h1>

      {/* Form to add new bot */}
      <form onSubmit={handleAddBot} style={{ marginBottom: "20px", padding: "10px", border: "1px solid gray" }}>
        <h2>Add New Bot</h2>
        <input
          type="text"
          placeholder="Bot Name"
          value={newBotName}
          onChange={(e) => setNewBotName(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="Bot Task"
          value={newBotTask}
          onChange={(e) => setNewBotTask(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <select
          value={newBotStatus}
          onChange={(e) => setNewBotStatus(e.target.value)}
          style={{ marginRight: "10px" }}
        >
          <option value="Running">Running</option>
          <option value="Completed">Completed</option>
          <option value="Stopped">Stopped</option>
        </select>
        <button type="submit">Add Bot</button>
      </form>

      <ul style={{ padding: "20px", backgroundColor: "pink" }}>
        {bots.map(bot => (
          <li key={bot.id} style={{ padding: "20px", listStyleType:"none" }}>
            {bot.id} - {bot.name} - {bot.status} - {bot.task}{" "}
            <button onClick={() => triggerJob(bot.id)}>Run your job</button>
          </li>
        ))}
      </ul>

      <hr />
      <p style={{ color: messageColor, fontWeight: "bold" }}>{message}</p>
    </div>
  );
};

export default FormBot;
