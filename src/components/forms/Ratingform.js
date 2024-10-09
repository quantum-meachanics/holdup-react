import React, { useState } from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating, setRating, maxStars = 5, readOnly = false }) => {
    // hover 상태: 마우스가 어떤 별 위에 있는지 추적합니다.
    const [hover, setHover] = useState(null);

    return (
        <div className="flex">
            {/* maxStars 개수만큼 별을 생성합니다. */}
            {[...Array(maxStars)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                    <Star
                        key={index}
                        className={`
                            ${readOnly ? '' : 'cursor-pointer'} 
                            ${ratingValue <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'}
                        `}
                        size={24}
                        // readOnly가 아닐 때만 클릭 이벤트를 처리합니다.
                        onClick={() => !readOnly && setRating(ratingValue)}
                        // readOnly가 아닐 때만 마우스 enter/leave 이벤트를 처리합니다.
                        onMouseEnter={() => !readOnly && setHover(ratingValue)}
                        onMouseLeave={() => !readOnly && setHover(null)}
                        // 별을 채우거나 비웁니다. hover 상태를 우선적으로 고려합니다.
                        fill={ratingValue <= (hover || rating) ? 'currentColor' : 'none'}
                    />
                );
            })}
        </div>
    );
};

export default StarRating;