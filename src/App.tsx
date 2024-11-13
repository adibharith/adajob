import React, { useState, useRef } from 'react';
import { Camera, Download, Square, Smartphone, Coffee } from 'lucide-react';
import html2canvas from 'html2canvas';
import { GradientSelector } from './components/GradientSelector';
import { AvailabilityInput } from './components/AvailabilityInput';
import { ImageCropper } from './components/ImageCropper';

interface FormData {
  name: string;
  bio: string;
  location: string;
  availabilityDates: string[];
  photo: string;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    bio: '',
    location: '',
    availabilityDates: [''],
    photo: '',
  });
  const [isVertical, setIsVertical] = useState(false);
  const [background, setBackground] = useState('from-indigo-600 to-purple-600');
  const [backgroundImage, setBackgroundImage] = useState('');
  const [blurLevel, setBlurLevel] = useState(5);
  const [showCropper, setShowCropper] = useState(false);
  const [tempPhoto, setTempPhoto] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempPhoto(reader.result as string);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCroppedImage = (croppedImage: string) => {
    setFormData(prev => ({ ...prev, photo: croppedImage }));
    setShowCropper(false);
  };

  const handleExport = async () => {
    if (cardRef.current) {
      const scale = window.devicePixelRatio * 2;
      const canvas = await html2canvas(cardRef.current, {
        scale: scale,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: null,
        imageTimeout: 0,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.querySelector('[data-export-card]');
          if (clonedElement) {
            clonedElement.scrollIntoView();
          }
        }
      });

      const tempCanvas = document.createElement('canvas');
      const ctx = tempCanvas.getContext('2d');
      
      if (ctx) {
        const targetWidth = isVertical ? 1242 : 2048;
        const targetHeight = isVertical ? 2688 : 2048;
        
        tempCanvas.width = targetWidth;
        tempCanvas.height = targetHeight;
        
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(canvas, 0, 0, targetWidth, targetHeight);
        
        const link = document.createElement('a');
        link.download = 'availability-card.png';
        link.href = tempCanvas.toDataURL('image/png', 1.0);
        link.click();
      }
    }
  };

  const getBackgroundStyle = () => {
    if (background === 'bg-image' && backgroundImage) {
      return {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backdropFilter: `blur(${blurLevel}px)`,
        WebkitBackdropFilter: `blur(${blurLevel}px)`,
      };
    }
    return {
      backgroundSize: '200% 200%',
      backgroundPosition: 'center',
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Availability Card Generator</h1>
            <a
              href="https://buymeacoffee.com/adibharith"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-[#FFDD00] text-[#000000] px-4 py-2 rounded-lg hover:bg-[#FFDD00]/90 transition-colors"
            >
              <Coffee className="w-5 h-5" />
              <span className="font-medium">Buy me a coffee</span>
            </a>
          </div>
          
          <div className="space-y-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
              <div className="flex items-center space-x-4">
                {formData.photo ? (
                  <img src={formData.photo} alt="Preview" className="w-20 h-20 rounded-full object-cover" />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                    <Camera className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name/Title</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                rows={3}
                placeholder="Brief description about yourself"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="City, Country"
              />
            </div>

            <AvailabilityInput
              dates={formData.availabilityDates}
              onAdd={() => setFormData(prev => ({ ...prev, availabilityDates: [...prev.availabilityDates, ''] }))}
              onRemove={(index) => setFormData(prev => ({
                ...prev,
                availabilityDates: prev.availabilityDates.filter((_, i) => i !== index)
              }))}
              onChange={(index, value) => setFormData(prev => ({
                ...prev,
                availabilityDates: prev.availabilityDates.map((date, i) => i === index ? value : date)
              }))}
            />

            <GradientSelector
              selectedBackground={background}
              backgroundImage={backgroundImage}
              blurLevel={blurLevel}
              onSelect={setBackground}
              onImageUpload={setBackgroundImage}
              onBlurChange={setBlurLevel}
            />

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsVertical(false)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${!isVertical ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                <Square className="w-4 h-4" />
                <span>Square</span>
              </button>
              <button
                onClick={() => setIsVertical(true)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${isVertical ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                <Smartphone className="w-4 h-4" />
                <span>Vertical</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Preview</h2>
          <div className="w-full overflow-x-auto flex justify-center pb-4">
            <div
              ref={cardRef}
              data-export-card
              className={`${background !== 'bg-image' ? `bg-gradient-to-br ${background}` : ''} p-8 rounded-3xl shadow-2xl ${
                isVertical ? 'w-[390px] h-[844px]' : 'w-[600px] h-[600px]'
              } flex flex-col items-center justify-center text-center`}
              style={getBackgroundStyle()}
            >
              <div className="flex flex-col items-center justify-center w-full max-w-[80%]">
                {formData.photo && (
                  <div className="w-40 h-40 mb-8 rounded-full border-4 border-white/80 shadow-xl overflow-hidden">
                    <img
                      src={formData.photo}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      crossOrigin="anonymous"
                    />
                  </div>
                )}
                {formData.name && (
                  <h2 className="text-4xl font-bold text-white mb-4">{formData.name}</h2>
                )}
                {formData.bio && (
                  <p className="text-xl text-white/90 mb-8 leading-relaxed">{formData.bio}</p>
                )}
                {formData.location && (
                  <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-white text-lg mb-6 shadow-lg">
                    📍 {formData.location}
                  </div>
                )}
                <div className="space-y-3 w-full">
                  {formData.availabilityDates.map((date, index) => (
                    date && (
                      <div 
                        key={index} 
                        className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-white text-lg shadow-lg"
                      >
                        📅 {new Date(date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    )
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleExport}
            className="mt-6 flex items-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Download className="w-5 h-5" />
            <span>Export Image</span>
          </button>
        </div>
      </div>

      {showCropper && (
        <ImageCropper
          image={tempPhoto}
          onCropComplete={handleCroppedImage}
          onClose={() => setShowCropper(false)}
        />
      )}
    </div>
  );
}

export default App;