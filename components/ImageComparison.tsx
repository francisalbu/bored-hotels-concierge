import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ArrowLeftRight } from 'lucide-react';

interface ImageComparisonProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export const ImageComparison: React.FC<ImageComparisonProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = "Room",
  afterLabel = "Destination"
}) => {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const newPosition = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(newPosition);
  }, []);

  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setIsDragging(true);
    handleMove(e.touches[0].clientX);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mouseleave', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden select-none cursor-ew-resize group bg-neutral-900 rounded-[2.5rem]"
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
      onMouseDown={handleMouseDown}
    >
        {/* Right Image (After/Complete) - Bottom Layer */}
        <div className="absolute inset-0 overflow-hidden">
             <img
                src={afterImage}
                alt="After"
                className="w-full h-full object-cover scale-110"
                draggable={false}
            />
             {/* Label for After */}
            <div className="absolute bottom-4 right-6 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full text-white text-xs font-semibold uppercase tracking-wider z-10 pointer-events-none border border-white/10 shadow-lg">
                {afterLabel}
            </div>
        </div>

        {/* Left Image (Before/Empty) - Top Layer with Clip Path */}
        <div
            className="absolute inset-0 overflow-hidden"
            style={{ 
                clipPath: `inset(0 ${100 - position}% 0 0)`,
                transition: isDragging ? 'none' : 'clip-path 0.1s ease-out'
            }}
        >
            <img
                src={beforeImage}
                alt="Before"
                className="absolute inset-0 w-full h-full object-cover scale-110"
                draggable={false}
            />
            {/* Label for Before */}
            <div className="absolute bottom-8 left-8 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-black text-xs font-semibold uppercase tracking-wider z-20 pointer-events-none shadow-lg">
                {beforeLabel}
            </div>
            
            {/* Divider Line Shadow/Gradient */}
            <div className="absolute inset-y-0 right-0 w-1 bg-white/50 shadow-[0_0_15px_rgba(0,0,0,0.3)]" />
        </div>

        {/* Slider Handle */}
        <div
            className="absolute top-0 bottom-0 w-0.5 bg-white z-30"
            style={{ left: `${position}%` }}
        >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-[0_0_20px_rgba(0,0,0,0.3)] flex items-center justify-center text-black hover:scale-110 transition-transform duration-200 cursor-grab active:cursor-grabbing">
                <ArrowLeftRight size={16} strokeWidth={2.5} />
            </div>
        </div>
        
        {/* Hover hint */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 mt-10 text-white text-[10px] font-medium bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm pointer-events-none transition-all duration-500 ${isDragging ? 'opacity-0 translate-y-2' : 'opacity-0 group-hover:opacity-100 translate-y-0'}`}>
            Slide to Compare
        </div>
    </div>
  );
};