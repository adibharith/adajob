import React from 'react';

interface HistoryCard {
  id: string;
  imageUrl: string;
  createdAt: string;
}

interface CardHistoryProps {
  cards: HistoryCard[];
}

export function CardHistory({ cards }: CardHistoryProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Card History</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div key={card.id} className="rounded-lg overflow-hidden shadow-md">
            <img src={card.imageUrl} alt="Card" className="w-full h-auto" />
            <div className="p-4 bg-gray-50">
              <p className="text-sm text-gray-600">
                Created: {new Date(card.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 