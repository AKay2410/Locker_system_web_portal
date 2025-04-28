
import React from 'react';
import { DoorClosed, DoorOpen } from 'lucide-react';

interface LockerAnimationProps {
  isOpen: boolean;
}

const LockerAnimation = ({ isOpen }: LockerAnimationProps) => {
  return (
    <div className="fixed inset-0 -z-10 flex items-center justify-center opacity-5 pointer-events-none">
      <div className="relative w-96 h-96 bg-gray-100 rounded-lg shadow-xl transition-transform duration-500 transform">
        {isOpen ? (
          <DoorOpen 
            className="w-full h-full p-12 text-gray-400 animate-[swing-open_0.5s_ease-in-out_forwards]"
          />
        ) : (
          <DoorClosed 
            className="w-full h-full p-12 text-gray-400 animate-[swing-closed_0.5s_ease-in-out_forwards]"
          />
        )}
      </div>
    </div>
  );
};

export default LockerAnimation;
