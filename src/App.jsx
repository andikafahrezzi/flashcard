import './App.css'
import './index.css'
import React, { useState } from "react";

const flashcards = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: 'Who wrote "To Kill a Mockingbird"?', answer: "Harper Lee" },
  { question: "What is the largest planet in our solar system?", answer: "Jupiter" },
  { question: "Who painted the Mona Lisa?", answer: "Leonardo da Vinci" },
  { question: "What is the smallest country in the world?", answer: "Vatican City" },
  { question: "What is the chemical symbol for gold?", answer: "Au" },
  { question: "Who invented the telephone?", answer: "Alexander Graham Bell" },
  { question: "What is the longest river in the world?", answer: "Nile River" },
  { question: "What year did World War II end?", answer: "1945" },
  { question: "What is the hardest natural substance on Earth?", answer: "Diamond" },
  { question: "Who developed the theory of relativity?", answer: "Albert Einstein" },
  { question: "What is the largest mammal in the world?", answer: "Blue Whale" },
  { question: "In which country would you find the ancient city of Petra?", answer: "Jordan" },
  { question: "What is the currency of Japan?", answer: "Yen" },
  { question: "Who wrote 'Romeo and Juliet'?", answer: "William Shakespeare" },
  { question: "What is the tallest mountain in the world?", answer: "Mount Everest" },
  { question: "What gas do plants absorb from the atmosphere?", answer: "Carbon Dioxide" },
  { question: "Who was the first person to walk on the moon?", answer: "Neil Armstrong" },
  { question: "What is the smallest unit of matter?", answer: "Atom" },
  { question: "In which ocean is the Bermuda Triangle located?", answer: "Atlantic Ocean" },
];

const Flashcard = ({ flashcard, isFlipped, onFlip }) => {
  const handleFlip = () => onFlip();

  return (
    <div 
      className="relative w-80 h-48 cursor-pointer"
      style={{ perspective: "1000px" }}
    >
      <div
        onClick={handleFlip}
        className={`absolute inset-0 w-full h-full transition-transform duration-700 transform-gpu ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card (Question) */}
        <div
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-xl flex items-center justify-center p-6 text-white"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="text-center">
            <div className="text-sm font-medium opacity-80 mb-2">QUESTION</div>
            <div className="text-lg font-bold leading-tight">{flashcard.question}</div>
          </div>
        </div>
        
        {/* Back of card (Answer) */}
        <div
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-xl flex items-center justify-center p-6 text-white [transform:rotateY(180deg)]"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="text-center">
            <div className="text-sm font-medium opacity-80 mb-2">ANSWER</div>
            <div className="text-xl font-bold leading-tight">{flashcard.answer}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Progress = ({ currentCardIndex, totalCards }) => (
  <div className="flex items-center space-x-4">
    <div className="text-gray-600 font-medium">
      Card {currentCardIndex} of {totalCards}
    </div>
    <div className="w-48 bg-gray-200 rounded-full h-2">
      <div
        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
        style={{ width: `${(currentCardIndex / totalCards) * 100}%` }}
      ></div>
    </div>
  </div>
);

const App = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNextCard = () => {
    setIsFlipped(false); // Reset ke sisi pertanyaan
    setCurrentCardIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false); // Reset ke sisi pertanyaan
    setCurrentCardIndex(
      (prev) => (prev - 1 + flashcards.length) % flashcards.length
    );
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKeyPress = (e) => {
    if (e.key === "ArrowLeft") handlePrevCard();
    if (e.key === "ArrowRight") handleNextCard();
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Flashcard Study App</h1>
        <p className="text-gray-600">Click the card to reveal the answer</p>
      </div>

      <div className="mb-8">
        <Flashcard 
          flashcard={flashcards[currentCardIndex]} 
          isFlipped={isFlipped}
          onFlip={handleFlip}
        />
      </div>

      <div className="flex items-center space-x-6 mb-6">
        <button
          onClick={handlePrevCard}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg shadow-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
        >
          ← Previous
        </button>
        
        <div className="text-2xl font-bold text-gray-400">
          {currentCardIndex + 1}
        </div>
        
        <button
          onClick={handleNextCard}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          Next →
        </button>
      </div>

      <Progress
        currentCardIndex={currentCardIndex + 1}
        totalCards={flashcards.length}
      />

      <div className="mt-6 text-sm text-gray-500 text-center">
        💡 Tip: Use ← → arrow keys to navigate
      </div>
    </div>
  );
};

export default App;