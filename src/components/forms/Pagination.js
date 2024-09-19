import React from 'react';

function Pagination({ pagingInfo, onPageChange }) {
    if (!pagingInfo) return null;

    return (
        <div>
            {Array.from({ length: pagingInfo.endPage - pagingInfo.startPage + 1 }, (_, index) => (
                <button
                    key={pagingInfo.startPage + index}
                    onClick={() => onPageChange(pagingInfo.startPage + index)}
                    disabled={pagingInfo.currentPage === pagingInfo.startPage + index}
                >
                    {pagingInfo.startPage + index}
                </button>
            ))}
        </div>
    );
}

export default Pagination;