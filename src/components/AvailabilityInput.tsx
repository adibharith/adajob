import React from 'react';
import { Plus, X } from 'lucide-react';

interface AvailabilityInputProps {
  dates: string[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, value: string) => void;
}

export function AvailabilityInput({ dates, onAdd, onRemove, onChange }: AvailabilityInputProps) {
  const formatDate = (date: string) => {
    if (!date) return '';
    try {
      return new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return date;
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">Available Dates</label>
      <div className="space-y-4">
        {dates.map((date, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div className="relative flex-shrink-0">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => onChange(index, e.target.value)}
                    className="w-[160px] px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                {date && (
                  <span className="text-sm text-gray-600 flex-1">
                    {formatDate(date)}
                  </span>
                )}
              </div>
            </div>
            {dates.length > 1 && (
              <button
                onClick={() => onRemove(index)}
                className="p-2 text-gray-500 hover:text-red-500 flex-shrink-0"
                title="Remove date"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={onAdd}
        className="flex items-center space-x-2 text-sm text-indigo-600 hover:text-indigo-700 mt-4"
      >
        <Plus className="w-4 h-4" />
        <span>Add another date</span>
      </button>
    </div>
  );
}