import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { callGetInquiryListAPI } from '../../apis/InquiryAPICall';
import Pagination from './Pagination';
import style from '../../css/InquiryForm.module.css'; // 스타일 파일 import

function InquiryForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { inquiryList, totalPages, error } = useSelector(state => state.inqueiryReducer);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        console.log('Fetching inquiries for page:', currentPage);
        dispatch(callGetInquiryListAPI(currentPage));
    }, [dispatch, currentPage]);

    const handlePageChange = (newPage) => {
        console.log('Changing to page:', newPage);
        setCurrentPage(newPage);
    };

    const handleClick = (id) => {
        navigate(`/holdup/inquiries/${id}`);
    };

    const handleWriteReview = () => {
        navigate('/holdup/inquiries/create');
    };

    const formatDateTime = (dateArray) => {
        if (!Array.isArray(dateArray) || dateArray.length < 5) {
            console.error("Invalid date array:", dateArray);
            return "유효하지 않은 날짜";
        }
        const year = dateArray[0];
        const month = String(dateArray[1]).padStart(2, '0');
        const day = String(dateArray[2]).padStart(2, '0');
        const hour = String(dateArray.length > 3 ? dateArray[3] : 0).padStart(2, '0');
        const minute = String(dateArray.length > 4 ? dateArray[4] : 0).padStart(2, '0');
        const second = String(dateArray.length > 5 ? dateArray[5] : 0).padStart(2, '0');

        return `${year}년 ${month}월 ${day}일 ${hour}:${minute}:${second}`;
    };

    return (
        <div className={style.main}>
            <span className={style.title}>문의 게시판</span>
            <button className={style.button} onClick={handleWriteReview}>글쓰기</button>
            
            {inquiryList && inquiryList.length > 0 ? (
                <div>
                    <table className={style.table}>
                        <thead>
                            <tr>
                                <th className={style.th}>등록날짜</th>
                                <th className={style.th}>제목</th>
                                <th className={style.th}>닉네임</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inquiryList.map(inquiryList => (
                                <tr key={inquiryList.id} onClick={() => handleClick(inquiryList.id)}>
                                    <td className={style.td}>{formatDateTime(inquiryList.createDate)}</td>
                                    <td className={style.td}>{inquiryList.title}</td>
                                    <td className={style.td}>{inquiryList.nickname}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>문의가 없습니다.</p>
            )}

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default InquiryForm;