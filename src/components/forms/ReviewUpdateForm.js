import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { callUpdateReviewAPI } from '../../apis/ReviewUpdateAPICall';

function ReviewUpdateForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { modifyInfo, error } = useSelector(state => state.reviewUpdateReducer);

    const [inputModifyInfo, setModifyInfo] = useState({
        title: '',
        content: '',
        rating: '',
        reservationId: '',
    });

    const [newImages, setNewImages] = useState([]); // 파일 리스트 저장할 state
    const [showImages, setShowImages] = useState([]); // 화면에 보여줄 이미지 state
    const [deletedImageId, setdeletedImageId] = useState([]); // 삭제할 이미지 state


    useEffect(() => {
        dispatch(callUpdateReviewAPI(id,inputModifyInfo, newImages, deletedImageId) );
        // 예: dispatch(fetchReviewDetails(reviewId));
    }, [id, dispatch]);

    useEffect(() => {
        if (error) {
            alert(error);
        } else if (modifyInfo) {
            navigate("/holdup/reviews");
        }
    }, [modifyInfo, error, navigate]);

    const onChangeHandler = e => {
        setModifyInfo({
            ...inputModifyInfo,
            [e.target.name]: e.target.value
        });
    };

    const fileChangeHandler = (e) => {
        const imageLists = e.target.files;
        let imageUrlLists = [...showImages];
        let fileLists = [...newImages];

        for (let i = 0; i < imageLists.length; i++) {
            const currentImageUrl = URL.createObjectURL(imageLists[i]);
            imageUrlLists.push(currentImageUrl);
            fileLists.push(imageLists[i]);
        }

        if (imageUrlLists.length > 10) {
            imageUrlLists = imageUrlLists.slice(0, 10);
            fileLists = fileLists.slice(0, 10);
        }

        setShowImages(imageUrlLists);
        setNewImages(fileLists);
    };

    const deleteImage = (id, isExistingImage) => {
        URL.revokeObjectURL(showImages[id]);
        setShowImages(showImages.filter((_, index) => index !== id));
        
        if (isExistingImage) {
            // 기존 이미지인 경우
            setdeletedImageId([...deletedImageId, showImages[id].id]);
        } else {
            // 새로 추가된 이미지인 경우
            setNewImages(newImages.filter((_, index) => index !== id));
        }
    };

    const onClickHandler = () => {
        dispatch(callUpdateReviewAPI(id, inputModifyInfo, newImages, deletedImageId));
    };

    const handleGoBack = () => {
        navigate(`/holdup/reviews/${id}`);
    };

    return (
        <>
            <span>제목 : </span>
            <input type="text" name="title" value={inputModifyInfo.title} onChange={onChangeHandler} />

            <span>내용 : </span>
            <textarea name="content" value={inputModifyInfo.content} onChange={onChangeHandler} />

            <span>별점 : </span>
            <input type="text" name="rating" value={inputModifyInfo.rating} onChange={onChangeHandler} />

            <span>예약ID: </span>
            <input type="text" name="reservationId" value={inputModifyInfo.reservationId} onChange={onChangeHandler} />

            <span>이미지 : </span>
            <input type="file" multiple accept="image/*" onChange={fileChangeHandler} />
            <div>
                {showImages.map((image, id) => (
                    <div key={id}>
                        <img src={image} alt={`${image}-${id}`} />
                        <button type="button" onClick={() => deleteImage(id)}>X</button>
                    </div>
                ))}
            </div>

            <button onClick={onClickHandler}>수정하기</button>
            <button onClick={handleGoBack}>돌아가기</button>
        </>
    );
}

export default ReviewUpdateForm;