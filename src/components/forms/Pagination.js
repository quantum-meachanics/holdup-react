import React from 'react';

// Pagination 컴포넌트: 현재 페이지, 총 페이지 수, 페이지 변경 함수를 props로 받음
function Pagination({ currentPage, totalPages, onPageChange }) {

    // 페이지 번호 배열 생성 (1부터 totalPages까지)
    const pageNumber = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div>
            {/* 이전 버튼 */}
            <button 
                onClick={() => onPageChange(currentPage - 1)} 
                disabled={currentPage === 1} // 첫 페이지에서 비활성화
            >
                이전
            </button>

            {/* 페이지 번호 버튼 */}
            {pageNumber.map(number => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)} // 페이지는 0부터 시작하므로 -1
                    className={currentPage === number - 1 ? 'active' : ''} // 현재 페이지 강조
                >
                    {number}
                </button>
            ))}

            {/* 다음 버튼 */}
            <button 
                onClick={() => onPageChange(currentPage + 1)} 
                disabled={currentPage === totalPages} // 마지막 페이지에서 비활성화
            >
                다음
            </button>
        </div>
    );
}

export default Pagination;