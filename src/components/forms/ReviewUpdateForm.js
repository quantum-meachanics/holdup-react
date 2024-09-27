import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { callUpdateReviewAPI } from '../../apis/ReviewUpdateAPICall';

function ReviewUpdateForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { modifyInfo, error } = useSelector(state => state.reviewReducer);

    const [inputModifyInfo, setModifyInfo] = useState({
        title: '',
        content: '',
        rating: '',
        reservationId: '',
    });

    const [newImages, setNewImages] = useState([]);
    const [showImages, setShowImages] = useState([]);
    const [deletedImageId, setDeletedImageId] = useState([]);

    useEffect(() => {
        dispatch(callGetReviewDetailAPI(id));
    }, [id, dispatch]);

    useEffect(() => {
        if (reviewDetails) {
            setModifyInfo({
                title: reviewDetails.title || '',
                content: reviewDetails.content || '',
                rating: reviewDetails.rating || '',
                reservationId: reviewDetails.reservationId || '',
            });
            setShowImages(reviewDetails.images || []);
        }
    }, [reviewDetails]);

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
        if (isExistingImage) {
            setDeletedImageId([...deletedImageId, showImages[id].id]);
        } else {
            URL.revokeObjectURL(showImages[id]);
            setNewImages(newImages.filter((_, index) => index !== id));
        }
        setShowImages(showImages.filter((_, index) => index !== id));
    };

    const onClickHandler = () => {
        dispatch(callUpdateReviewAPI(id, inputModifyInfo, newImages, deletedImageId));
    };

    const handleGoBack = () => {
        navigate("/holdup/reviews");
    };

    return (
        <>
            <span>제목 : </span>
            <input type="text" name="title" value={inputModifyInfo.title} onChange={onChangeHandler} />

            <span>내용 : </span>
            <textarea name="content" value={inputModifyInfo.content} onChange={onChangeHandler} />

            <span>별점 : </span>
            <input type="number" name="rating" value={inputModifyInfo.rating} onChange={onChangeHandler} min="1" max="5" />

            <span>예약ID: </span>
            <input type="text" name="reservationId" value={inputModifyInfo.reservationId} onChange={onChangeHandler} readOnly />

            <span>이미지 : </span>
            <input type="file" multiple accept="image/*" onChange={fileChangeHandler} />
            <div>
                {showImages.map((image, id) => (
                    <div key={id}>
                        <img src={typeof image === 'string' ? image : image.url} alt={`review-${id}`} />
                        <button type="button" onClick={() => deleteImage(id, typeof image !== 'string')}>X</button>
                    </div>
                ))}
            </div>

            <button onClick={onClickHandler}>수정하기</button>
            <button onClick={handleGoBack}>돌아가기</button>
        </>
    );
}

export default ReviewUpdateForm;