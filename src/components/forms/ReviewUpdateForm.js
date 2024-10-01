import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { callGetReviewDetailAPI } from '../../apis/ReviewDetailAPICall';
import { callUpdateReviewAPI } from '../../apis/ReviewUpdateAPICall';

function ReviewDetailForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { reviewDetail, error } = useSelector(state => state.reviewDetailReducer);

    const [newImages, setNewImages] = useState(() =>{
        return reviewDetail && reviewDetail.imageUrl 
            ? (Array.isArray(reviewDetail.imageUrl) ? reviewDetail.imageUrl : [reviewDetail.imageUrl])
            : [];// detailurl가지고오셈

}); // 파일 리스트 저장할 state
    const [showImages, setShowImages] = useState([]); // 화면에 보여줄 이미지 state
    const [existingImages, setExistingImages] = useState([]); // 기존 이미지를 저장할 state
    const [inputModify, setInputModify] = useState({
        title: reviewDetail.title,
        content: reviewDetail.content, // 여기도 detail 가져오셈
        rating: reviewDetail.rating,
        reservationId: reviewDetail.reservation.id
    })


    useEffect(() => {
        if (reviewDetail && reviewDetail.imageUrl) {
            if (Array.isArray(reviewDetail.imageUrl)) {
                setNewImages(reviewDetail.imageUrl);
            } else {
                setNewImages([reviewDetail.imageUrl]);
            }
        }
    }, [reviewDetail]);

    const handleGoBack = () => {
        navigate('/holdup/reviews');
    };

    const handleUpdate = (e) => {
        dispatch(callUpdateReviewAPI(id, inputModify, newImages, id));
        navigate(`/holdup/reviews/${id}`)
    };

    const onChangeHandler = e => {
        setInputModify({
            ...inputModify,
            [e.target.name]: e.target.value
        })
    };



    // 이미지 업로드 처리 메소드
    const fileChangeHandler = (e) => {
        const imageLists = e.target.files;
        let imageUrlLists = [...showImages];
        let fileLists = [...newImages];

        for (let i = 0; i < imageLists.length; i++) {
            const currentImageUrl = URL.createObjectURL(imageLists[i]);
            imageUrlLists.push(currentImageUrl);
            fileLists.push(imageLists[i]);
        };

        if (imageUrlLists.length > 10) {
            imageUrlLists = imageUrlLists.slice(0, 10);
            fileLists = fileLists.slice(0, 10);
        }

        setShowImages(imageUrlLists);
        setNewImages(fileLists);
    };

    // 이미지 삭제 처리 메소드
    const deleteImage = (id) => {
            // setExistingImages(existingImages.filter((_, index) => index !== id));
            URL.revokeObjectURL(showImages[id]);
            setShowImages(showImages.filter((_, index) => index !== id));
            setNewImages(newImages.filter((_, index) => index !== id));
        
    };

    if (error) return <div>에러 발생: {error}</div>;

    return (
        <div>
            <div>
                {reviewDetail ? (
                    <>
                        <span>제목: </span>
                        <input type='text' name='title' placeholder={inputModify.title} onChange={onChangeHandler} />

                        <span>내용:</span>
                        <input type='textarea' name='content' placeholder={inputModify.content}  onChange={onChangeHandler} />

                        <span>평점: </span>
                        <input type='text' name='rating' placeholder={inputModify.rating}  onChange={onChangeHandler} />

                        <span>예약ID: </span>
                        <input type='text' name='reservationId' placeholder={inputModify.reservationId}  onChange={onChangeHandler} />
                        <div>
                            <span>이미지 : </span>
                            <input type="file" multiple accept="image/*" onChange={fileChangeHandler} />
                            <div>
                                {newImages.map((image, id) => (
                                    <div key={{id}}>
                                        <img src={image} alt={`${image}-${id}`} />
                                        <button type="button" onClick={() => deleteImage(id, true)}>X</button>
                                    </div>
                                ))}
                                {showImages.map((image, id) => (
                                    <div key={id}>
                                        <img src={image} alt={`${image}-${id}`} />
                                        <button type="button" onClick={() => deleteImage(id)}>X</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <h2>게시글이 존재 하지 않습니다.</h2>
                )}


            </div>
            <button onClick={handleGoBack}>돌아가기</button>
            <button onClick={handleUpdate}>작성하기</button>
        </div>
    );
}

export default ReviewDetailForm;