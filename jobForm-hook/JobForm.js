import React, { useState } from 'react';
import { UseCategorySelection } from './UseCategorySelection';

const JobForm = () => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('To Start');
  const [searchTerm, setSearchTerm] = useState('');

  const {
    selectedCategories,
    error,
    toggleCategory,
    clearCategories,
    limitReached,
    maxLimit
  } = UseCategorySelection(3); // Max limit configurable here

  const categoryOptions = [
    'Read Emails',
    'Web Parsing',
    'Send Emails',
    'Data Processing',
    'Report Generation'
  ];

  const filteredCategories = categoryOptions.filter(category =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedCategories.length === 0) {
      return;
    }

    const jobDetails = {
      title,
      status,
      categories: selectedCategories
    };

    console.log('Submitted job details:', jobDetails);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter job title"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="To Start">To Start</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <input
        type="text"
        placeholder="Search categories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginTop: '10px', padding: '6px', width: '100%' }}
      />

      <div style={{ margin: '10px 0' }}>
        {filteredCategories.map(category => {
          const isSelected = selectedCategories.includes(category);
          const shouldDisable = limitReached && !isSelected;

          return (
            <button
              key={category}
              type="button"
              onClick={() => toggleCategory(category)}
              disabled={shouldDisable}
              style={{
                margin: '5px',
                padding: '8px 12px',
                borderRadius: '4px',
                border: 'none',
                cursor: shouldDisable ? 'not-allowed' : 'pointer',
                opacity: shouldDisable ? 0.5 : 1,
                backgroundColor: isSelected ? '#4CAF50' : '#e0e0e0',
                color: isSelected ? 'white' : 'black'
              }}
            >
              {category}
            </button>
          );
        })}
      </div>

      {selectedCategories.length > 0 && (
        <button type="button" onClick={clearCategories}>
          Clear Categories
        </button>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <strong>
          Selected Categories ({selectedCategories.length}/{maxLimit})
        </strong>
        <ul>
          {selectedCategories.map(category => (
            <li key={category}>{category}</li>
          ))}
        </ul>
      </div>

      <button type="submit">Add Job</button>
    </form>
  );
};

export default JobForm;