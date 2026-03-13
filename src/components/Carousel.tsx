import React, { useState } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const gap = 10;

  const maxIndex = Math.max(images.length - frameSize, 0);

  const handleNext = () => {
    setCurrentIndex(prev => {
      if (infinite) {
        if (prev + step > maxIndex) {
          return 0;
        }

        return prev + step;
      }

      return Math.min(prev + step, maxIndex);
    });
  };

  const handlePrev = () => {
    setCurrentIndex(prev => {
      if (infinite) {
        if (prev - step < 0) {
          return maxIndex;
        }

        return prev - step;
      }

      return Math.max(prev - step, 0);
    });
  };

  const translateX = currentIndex * (itemWidth + gap);

  return (
    <div className="Carousel">
      <button
        type="button"
        className="Carousel__button"
        onClick={handlePrev}
        disabled={!infinite && currentIndex === 0}
      >
        Prev
      </button>

      <div
        className="Carousel__viewport"
        style={{
          width: frameSize * (itemWidth + gap) - gap,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${translateX}px)`,
            transition: `transform ${animationDuration}ms`,
            gap: `${gap}px`,
          }}
        >
          {images.map((image, index) => (
            <li
              key={image}
              className="Carousel__item"
              style={{
                width: itemWidth,
              }}
            >
              <img
                src={image}
                alt={`slide-${index}`}
                style={{
                  width: itemWidth,
                  height: itemWidth,
                }}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        className="Carousel__button"
        onClick={handleNext}
        disabled={!infinite && currentIndex >= maxIndex}
        data-cy="next"
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
