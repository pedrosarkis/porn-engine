import React from 'react';
import { useTranslation } from 'react-i18next';

const FilterComponent = ({ sortBy, filterBy, onSortChange, onFilterChange }) => {
  const { t } = useTranslation();

  const dateAddedOptions = [
    'all',
    'past24hours',
    'past2days',
    'pastWeek',
    'pastMonth',
    'past3months',
    'pastYear'
  ];

  const durationOptions = [
    'all',
    '1plusMinutes',
    '5plusMinutes',
    '10plusMinutes',
    '20plusMinutes',
    '30plusMinutes',
    '60plusMinutes',
    '0to10minutes',
    '0to20minutes'
  ];

  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex items-center">
        <span className="font-medium mr-2">{t('sortBy')}:</span>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="popularity">{t('popularity')}</option>
          <option value="date">{t('date')}</option>
          <option value="duration">{t('duration')}</option>
          <option value="rating">{t('rating')}</option>
        </select>
      </div>
      <div className="flex items-center flex-wrap gap-2">
        <span className="font-medium mr-2">{t('filterBy')}:</span>
        <select
          value={filterBy.dateAdded}
          onChange={(e) => onFilterChange('dateAdded', e.target.value)}
          className="border rounded px-2 py-1"
        >
          {dateAddedOptions.map(option => (
            <option key={option} value={option}>{t(`dateAdded.${option}`)}</option>
          ))}
        </select>
        <select
          value={filterBy.duration}
          onChange={(e) => onFilterChange('duration', e.target.value)}
          className="border rounded px-2 py-1"
        >
          {durationOptions.map(option => (
            <option key={option} value={option}>{t(`durationFilter.${option}`)}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterComponent;