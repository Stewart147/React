
import React, { useState } from 'react';

const DynamicBotManager = () => {
  const [bots, setBots] = useState([
    { id: '1', name: 'Email Bot', status: 'Active' },
    { id: '2', name: 'Data Bot', status: 'Inactive' }
  ]);

  const [newBot, setNewBot] = useState({
    id: '',
    name: '',
    status: ''
  });

  const [editingBotId, setEditingBotId] = useState(null);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Handle form input
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBot(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  // Add or update bot
  const addOrUpdateBot = () => {
    const { id, name, status } = newBot;

    if (!id.trim() || !name.trim() || !status.trim()) {
      setError('All fields are required');
      return;
    }

    if (!editingBotId && bots.some(bot => bot.id === id)) {
      setError('Bot ID must be unique');
      return;
    }

    if (editingBotId) {
      setBots(prev => prev.map(bot => bot.id === editingBotId ? newBot : bot));
      setEditingBotId(null);
    } else {
      setBots(prev => [...prev, newBot]);
    }

    setNewBot({ id: '', name: '', status: '' });
    setError('');
  };

  const editBot = (bot) => {
    setNewBot(bot);
    setEditingBotId(bot.id);
    setError('');
  };

  const deleteBot = (id) => {
    setBots(prev => prev.filter(bot => bot.id !== id));
    if (editingBotId === id) {
      setEditingBotId(null);
      setNewBot({ id: '', name: '', status: '' });
    }
  };

  const cancelEdit = () => {
    setEditingBotId(null);
    setNewBot({ id: '', name: '', status: '' });
    setError('');
  };

  // Filter bots based on search query (id, name, or status)
  const filteredBots = bots.filter(bot => {
    const query = searchQuery.toLowerCase();
    return (
      bot.id.toLowerCase().includes(query) ||
      bot.name.toLowerCase().includes(query) ||
      bot.status.toLowerCase().includes(query)
    );
  });

  return (
    <div className="dynamic-bot-manager">
      <h1>Dynamic Bot Manager</h1>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search by ID, Name, or Status"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: '10px', width: '300px' }}
      />

      {/* Bot form */}
      <input
        type="text"
        name="id"
        value={newBot.id}
        onChange={handleInputChange}
        placeholder="Enter ID"
        disabled={editingBotId !== null}
      />
      <input
        type="text"
        name="name"
        value={newBot.name}
        onChange={handleInputChange}
        placeholder="Enter Bot Name"
      />
      <input
        type="text"
        name="status"
        value={newBot.status}
        onChange={handleInputChange}
        placeholder="Enter Status"
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button
        onClick={addOrUpdateBot}
        disabled={!newBot.id.trim() || !newBot.name.trim() || !newBot.status.trim()}
      >
        {editingBotId ? 'Update Bot' : 'Add Bot'}
      </button>

      {editingBotId && (
        <button onClick={cancelEdit} style={{ marginLeft: '8px' }}>
          Cancel
        </button>
      )}

      {/* Bot list */}
      <ul>
        {filteredBots.length > 0 ? (
          filteredBots.map(bot => (
            <li key={bot.id}>
              {bot.id} - {bot.name} - {bot.status}
              <button onClick={() => editBot(bot)}>Edit</button>
              <button onClick={() => deleteBot(bot.id)}>Delete</button>
            </li>
          ))
        ) : (
          <li>No bots found.</li>
        )}
      </ul>

      <h3>Current Input</h3>
      <p>ID: {newBot.id}</p>
      <p>Name: {newBot.name}</p>
      <p>Status: {newBot.status}</p>
    </div>
  );
};

export default DynamicBotManager;
