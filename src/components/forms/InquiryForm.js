import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { callGetInquiryListAPI } from '../../apis/InquiryAPICall';
import Pagination from './Pagination';

function InquiryForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { inquiryList, totalPages, error } = useSelector(state => state.inqueiryReducer);
    const [currentPage, setCurrentPage] = useState(1);

    // 컴포넌트가 마운트되거나 currentPage가 변경될 때 문의 목록 가져오기
    useEffect(() => {
        console.log('Fetching inquiries for page:', currentPage);
        dispatch(callGetInquiryListAPI(currentPage));
    }, [dispatch, currentPage]);

    // 페이지 변경 핸들러
    const handlePageChange = (newPage) => {
        console.log('Changing to page:', newPage);
        setCurrentPage(newPage);
    };

    const handleClick = (id) => {
        navigate(`/inqueiries/${id}`);
    };

    const handleWriteReview = () => {
        navigate('/holdup/inquiries/create');
    };

    // 에러 발생 시 에러 메시지 표시
    if (error) {
        return <div>에러 발생: {error.message || '알 수 없는 오류'}</div>;
    }

    console.log('Current state:', { inquiryList, totalPages, error });
    console.log("리뷰 컴포넌트 재랜더링됨");

    return (
        <div>
            <h1>문의 게시판</h1>
            {inquiryList && inquiryList.length > 0 ? (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th >등록날짜</th>
                                <th >제목</th>
                                <th >닉네임</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inquiryList.map(inquiryList => (
                                <tr key={inquiryList.id} onClick={() => handleClick(inquiryList.id)} style={{ cursor: 'pointer' }}>
                                    <td >{inquiryList.createDate}</td>
                                    <td >{inquiryList.title}</td>
                                    <td>{inquiryList.nickname}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>문의가 없습니다.</p>
            )}

            <button onClick={handleWriteReview}>글쓰기</button>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default InquiryForm;