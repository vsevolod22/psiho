import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import confetti from 'canvas-confetti';
import { Specialty } from '../types';


interface RouletteProps {
  specialties: Specialty[];
  onFinish: (specialty: Specialty) => void;
}

export const Roulette = ({ specialties, onFinish }: RouletteProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [itemsToShow, setItemsToShow] = useState<Specialty[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [finalItemIndex, setFinalItemIndex] = useState(0);
  const [showHighlight, setShowHighlight] = useState(false);
  const [visibleSpecialtyIndex, setVisibleSpecialtyIndex] = useState(0);
  
  const animationRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Initialize items on component mount
  useEffect(() => {
    // Create initial array of items to display
    const initialItems: Specialty[] = [];
    
    // Fill with random items
    for (let i = 0; i < 20; i++) {
      const randomIndex = Math.floor(Math.random() * specialties.length);
      initialItems.push(specialties[randomIndex]);
    }
    
    setItemsToShow(initialItems);
  }, [specialties]);
  
  // Initialize sound
  useEffect(() => {
    audioRef.current = new Audio('./sounds/tick.mp3');
    audioRef.current.volume = 0.3;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  // Play tick sound
  const playTickSound = () => {
    try {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(e => console.log('Ошибка воспроизведения звука:', e));
      }
    } catch (e) {
      console.log('Ошибка воспроизведения звука:', e);
    }
  };
  
  // Start spinning the roulette
  const startSpin = () => {
    if (isSpinning) return;
    
    // Reset states
    setIsSpinning(true);
    
    // Determine winning item
    const winningItemIndex = Math.floor(Math.random() * specialties.length);
    setFinalItemIndex(winningItemIndex);
    
    // Create array of items for scrolling (many random + winning at the end)
    const totalItems = 50; // Total number of items to scroll
    const items: Specialty[] = [];
    
    // Fill with random items
    for (let i = 0; i < totalItems - 1; i++) {
      const randomIndex = Math.floor(Math.random() * specialties.length);
      items.push(specialties[randomIndex]);
    }
    
    // Add winning item at the end
    items.push(specialties[winningItemIndex]);
    
    setItemsToShow(items);
    setScrollPosition(0);
    
    // Initial animation parameters
    let startTime = performance.now();
    const duration = 7000; // Animation duration in ms
    const itemWidth = 200; // Item width in pixels
    const totalDistance = (totalItems - 8) * itemWidth; // Total scroll distance
    
    // Animation function
    const animate = (timestamp: number) => {
      // Elapsed time
      const elapsed = timestamp - startTime;
      
      // Progress coefficient (from 0 to 1)
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (easeOutExpo)
      const easeOut = (t: number) => {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      };
      
      // Apply easing function
      const easedProgress = easeOut(progress);
      
      // Calculate current scroll position
      const newPosition = easedProgress * totalDistance;
      setScrollPosition(newPosition);
      
      // Determine current visible item (for tick sound)
      const currentItemIndex = Math.floor(newPosition / itemWidth);
      if (currentItemIndex !== visibleSpecialtyIndex && currentItemIndex < totalItems - 1) {
        setVisibleSpecialtyIndex(currentItemIndex);
        playTickSound();
      }
      
      // Continue animation if not at the end
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Animation complete
        finishSpin();
      }
    };
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate);
  };
  
  // Finish spinning
  const finishSpin = () => {
    // Highlight winning item
    setShowHighlight(true);
    
    // Win sound
    try {
      const winSound = new Audio('/sounds/win.mp3');
      winSound.play().catch(e => console.log('Ошибка воспроизведения звука:', e));
    } catch (e) {
      console.log('Ошибка воспроизведения звука:', e);
    }
    
    // Launch confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    
    setIsSpinning(false);
    
    
      onFinish(specialties[finalItemIndex]);
      setShowHighlight(false);
   
  };
  
  return (
    <div className="max-w-4xl mx-auto mb-12">
      <div className="relative">
        {/* Enhanced roulette design */}
        <div className="relative h-80 overflow-hidden rounded-2xl border-4 border-primary/50 shadow-2xl bg-gradient-to-b from-gray-900 to-gray-800">
          {/* Decorative elements */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none"></div>
          <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-primary/20 to-transparent pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none"></div>
          
          {/* Side shadows */}
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none"></div>
          
          {/* Center pointer */}
          <div className="absolute top-0 bottom-0 left-1/2 transform  w-1 bg-gradient-to-b from-primary via-primary to-primary/50 z-20 rounded-full shadow-[0_0_15px_rgba(var(--primary-rgb),0.7)]"></div>
          <div className="absolute top-0 left-1/2 transform  w-0 h-0 border-l-[12px] border-r-[12px] border-t-[18px] border-l-transparent border-r-transparent border-t-primary z-30 filter drop-shadow-lg"></div>
          <div className="absolute bottom-0 left-1/2 transform  w-0 h-0 border-l-[12px] border-r-[12px] border-b-[18px] border-l-transparent border-r-transparent border-b-primary z-30 filter drop-shadow-lg"></div>
          
          {/* Center highlight */}
          <div className={`absolute top-0 bottom-0 left-1/2 transform  w-[202px] bg-primary/10 z-10 ${showHighlight ? 'animate-pulse bg-primary/30' : ''}`}></div>
          
          {/* Scroll container */}
          <div 
            className="absolute top-0 bottom-0 left-0 flex items-center transition-transform"
            style={{ transform: `translateX(${-scrollPosition}px)` }}
          >
            {itemsToShow.map((item, index) => (
              <div 
                key={`item-${index}`} 
                className="flex-shrink-0 w-[200px] h-[180px] mx-[1px] flex items-center justify-center"
              >
                <Card 
                  className={`w-full h-full ${item.color} text-white border-2 
                            ${index === itemsToShow.length - 1 && showHighlight 
                              ? 'border-yellow-400 shadow-[0_0_25px_rgba(234,179,8,0.5)]' 
                              : 'border-gray-700/50 bg-opacity-80'}`}
                >
                  <CardContent className="flex flex-col items-center justify-center h-full p-4 text-center">
                    <div className="text-5xl mb-3">{item.icon}</div>
                    <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mt-8">
        <Button 
          size="large" 
          className={`px-8 py-6 rounded-full text-lg font-bold
              bg-gradient-to-r from-primary to-primary-dark
              shadow-md shadow-primary/20
              transition-all duration-300
              ${isSpinning ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-primary/30'}`}
          onClick={startSpin}
          disabled={isSpinning}
        >
          {isSpinning ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Вращение...
            </span>
          ) : (
            'Крутить рулетку'
          )}
        </Button>
      </div>
    </div>
  );
};