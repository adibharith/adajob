import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

const backgrounds = [
  {
    id: 'indigo-purple',
    name: 'Indigo Purple',
    type: 'gradient',
    classes: 'from-indigo-600 to-purple-600',
    preview: 'bg-gradient-to-br from-indigo-600 to-purple-600'
  },
  {
    id: 'blue-cyan',
    name: 'Ocean Blue',
    type: 'gradient',
    classes: 'from-blue-600 to-cyan-500',
    preview: 'bg-gradient-to-br from-blue-600 to-cyan-500'
  },
  {
    id: 'rose-pink',
    name: 'Sunset Rose',
    type: 'gradient',
    classes: 'from-rose-500 to-pink-500',
    preview: 'bg-gradient-to-br from-rose-500 to-pink-500'
  },
  {
    id: 'emerald-teal',
    name: 'Forest',
    type: 'gradient',
    classes: 'from-emerald-500 to-teal-500',
    preview: 'bg-gradient-to-br from-emerald-500 to-teal-500'
  },
  {
    id: 'amber-orange',
    name: 'Sunrise',
    type: 'gradient',
    classes: 'from-amber-500 to-orange-500',
    preview: 'bg-gradient-to-br from-amber-500 to-orange-500'
  }
];

interface GradientSelectorProps {
  selectedBackground: string;
  backgroundImage: string;
  blurLevel: number;
  onSelect: (background: string) => void;
  onImageUpload: (image: string) => void;
  onBlurChange: (level: number) => void;
}

export function GradientSelector({ 
  selectedBackground, 
  backgroundImage,
  blurLevel,
  onSelect, 
  onImageUpload,
  onBlurChange
}: GradientSelectorProps) {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageUpload(reader.result as string);
        onSelect('bg-image');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Background Style</label>
        <div className="flex flex-wrap gap-3">
          {backgrounds.map((bg) => (
            <button
              key={bg.id}
              onClick={() => onSelect(bg.classes)}
              className={`w-12 h-12 rounded-lg ${bg.preview} ${
                selectedBackground === bg.classes
                  ? 'ring-2 ring-offset-2 ring-indigo-600'
                  : 'ring-1 ring-gray-200'
              }`}
              title={bg.name}
            />
          ))}
          <label
            className={`w-12 h-12 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-indigo-500 ${
              selectedBackground === 'bg-image'
                ? 'ring-2 ring-offset-2 ring-indigo-600'
                : ''
            }`}
            title="Upload background image"
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <ImageIcon className="w-6 h-6 text-gray-400" />
          </label>
        </div>
      </div>

      {(selectedBackground === 'bg-image' && backgroundImage) && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Background Blur: {blurLevel}px
          </label>
          <input
            type="range"
            min="0"
            max="20"
            value={blurLevel}
            onChange={(e) => onBlurChange(Number(e.target.value))}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
}