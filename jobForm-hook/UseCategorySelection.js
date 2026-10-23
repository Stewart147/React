import { useState } from 'react';

export const UseCategorySelection = (maxLimit = 3) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [error, setError] = useState('');

  const selectCategory = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) return prev;

      if (prev.length >= maxLimit) {
        setError(`You can select a maximum of ${maxLimit} categories.`);
        return prev;
      }

      setError('');
      return [...prev, category];
    });
  };

  const deselectCategory = (category) => {
    setSelectedCategories(prev => prev.filter(c => c !== category));
    setError('');
  };

  const toggleCategory = (category) => {
    selectedCategories.includes(category)
      ? deselectCategory(category)
      : selectCategory(category);
  };

  const clearCategories = () => {
    setSelectedCategories([]);
    setError('');
  };

  const limitReached = selectedCategories.length >= maxLimit;

  return {
    selectedCategories,
    error,
    selectCategory,
    deselectCategory,
    toggleCategory,
    clearCategories,
    limitReached,
    maxLimit
  };
};