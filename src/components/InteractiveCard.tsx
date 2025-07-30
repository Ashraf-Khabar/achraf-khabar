import { ReactNode, useState } from 'react';
import { Card } from '@/components/ui/card';

interface InteractiveCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  glowOnHover?: boolean;
  tiltOnHover?: boolean;
  scaleOnHover?: boolean;
}

const InteractiveCard = ({ 
  children, 
  className = "", 
  style = {},
  glowOnHover = true,
  tiltOnHover = true,
  scaleOnHover = true 
}: InteractiveCardProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltOnHover) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  const tiltStyle = tiltOnHover && isHovered ? {
    transform: `perspective(1000px) rotateX(${mousePosition.y / 10}deg) rotateY(${-mousePosition.x / 10}deg) ${scaleOnHover ? 'scale(1.02)' : ''}`
  } : {
    transform: scaleOnHover && isHovered ? 'scale(1.02)' : 'scale(1)'
  };

  return (
    <Card 
      className={`
        transition-all duration-300 cursor-pointer
        ${glowOnHover && isHovered ? 'hover-glow' : ''}
        ${className}
      `}
      style={{ ...tiltStyle, ...style }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Card>
  );
};

export default InteractiveCard;