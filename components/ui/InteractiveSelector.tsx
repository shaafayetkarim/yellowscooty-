import React, { useState, useEffect } from 'react';
import { Camera, Play } from 'lucide-react';
import { FaFire, FaTint, FaHiking } from 'react-icons/fa';

const InteractiveSelector = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);

  const options = [
    {
      title: "Cinematography",
      description: "Dramatic visuals with 8K precision",
      image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80",
      icon: <Camera size={24} className="text-white" />
    },
    {
      title: "Post-Production",
      description: "CGI, VFX, and rhythmic editing",
      image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80",
      icon: <FaFire size={24} className="text-white" />
    },
    {
      title: "Drone Work",
      description: "Aerial perspectives that wow",
      image: "https://images.unsplash.com/photo-1473968512647-3e44a224fe8f?auto=format&fit=crop&w=800&q=80",
      icon: <Play size={24} className="text-white" />
    },
    {
      title: "Sound Design",
      description: "Immersive audio engineering",
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80",
      icon: <FaTint size={24} className="text-white" />
    },
    {
      title: "Global Scouting",
      description: "Locating the perfect backdrop",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
      icon: <FaHiking size={24} className="text-white" />
    }
  ];

  const handleOptionClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    options.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions(prev => [...prev, i]);
      }, 180 * i);
      timers.push(timer);
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[80vh] bg-black font-sans text-white py-12 overflow-hidden">
      {/* Header Section */}
      <div className="w-full max-w-3xl px-6 mt-8 mb-12 text-center relative z-10">
        <span className="text-yellow-500 font-black tracking-[0.4em] uppercase text-xs mb-4 block">Our Expertise</span>
        <h2 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter">BEYOND THE LENS</h2>
        <p className="text-lg md:text-xl text-white/40 font-medium max-w-xl mx-auto">Explore our high-end production services tailored for ambitious visual storytellers.</p>
      </div>

      {/* Options Container */}
      <div className="options flex w-full max-w-7xl h-[600px] mx-auto items-stretch overflow-hidden relative border border-white/10 rounded-[3rem] glass shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
        {options.map((option, index) => (
          <div
            key={index}
            className={`
              option relative flex flex-col justify-end overflow-hidden transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1)
              ${activeIndex === index ? 'active' : ''}
            `}
            style={{
              backgroundImage: `url('${option.image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backfaceVisibility: 'hidden',
              opacity: animatedOptions.includes(index) ? 1 : 0,
              transform: animatedOptions.includes(index) ? 'translateX(0)' : 'translateX(-60px)',
              minWidth: '80px',
              margin: 0,
              cursor: 'pointer',
              flex: activeIndex === index ? '10 1 0%' : '1 1 0%',
              zIndex: activeIndex === index ? 10 : 1,
              position: 'relative',
              willChange: 'flex-grow, transform'
            }}
            onClick={() => handleOptionClick(index)}
          >
            {/* Overlay Gradient */}
            <div
              className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
              style={{
                background: activeIndex === index
                  ? 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 40%, transparent 100%)'
                  : 'rgba(0,0,0,0.6)',
                opacity: 1
              }}
            ></div>

            {/* Label with icon and info */}
            <div className={`label absolute left-0 right-0 bottom-8 flex items-center justify-start h-16 z-2 pointer-events-none px-8 gap-5 w-full transition-all duration-700 ${activeIndex === index ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="icon min-w-[56px] h-[56px] flex items-center justify-center rounded-2xl glass-yellow shadow-[0_0_20px_rgba(234,179,8,0.3)] border border-yellow-500/30 flex-shrink-0">
                {option.icon}
              </div>
              <div className="info text-white overflow-hidden">
                <div className="main font-black text-2xl uppercase tracking-tighter leading-none mb-1">
                  {option.title}
                </div>
                <div className="sub text-sm font-bold text-yellow-500 uppercase tracking-widest opacity-80">
                  {option.description}
                </div>
              </div>
            </div>

            {/* Vertical Title for non-active */}
            {activeIndex !== index && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-white/40 font-black text-xs tracking-[0.5em] uppercase pointer-events-none">
                {option.title}
              </div>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        .glass {
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          background: rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </div>
  );
};

export default InteractiveSelector;
