import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { callGetReviewDetailAPI, callUpdateReviewAPI } from '../../apis/ReviewAPICall';
import StarRating from './Ratingform';
import style from "../../css/ReviewUpdateForm.module.css";

function ReviewUpdateForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { reviewDetail, error } = useSelector(state => state.reviewDetailReducer);

    // 기존 이미지를 저장할 state
    const [images, setImages] = useState([{
        imageUrl: '',
        imageId: ''
    }]);

    // 삭제할 이미지 ID들을 관리할 새로운 state
    const [deletedImageIds, setDeletedImageIds] = useState([]);

    // 파일 리스트 저장할 state
    const [imageFiles, setImageFiles] = useState([]);

    // 별점을 위한 상태 추가
    const [rating, setRating] = useState(0);

    const [showImages, setShowImages] = useState([]);
    const [inputModify, setInputModify] = useState({
        title: '',
        content: '',
        rating: '',
        reservationId: ''
    });


    useEffect(() => {
        dispatch(callGetReviewDetailAPI(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (reviewDetail) {
            setImages(
                Array.isArray(reviewDetail.imageId)
                    ? reviewDetail.imageId.map((id, index) => ({
                        imageUrl: Array.isArray(reviewDetail.imageUrl) ? reviewDetail.imageUrl[index] : reviewDetail.imageUrl,
                        imageId: id
                    }))
                    : [{
                        imageUrl: reviewDetail.imageUrl || '',
                        imageId: reviewDetail.imageId || ''
                    }]
            );

            setInputModify({
                title: reviewDetail.title || '',
                content: reviewDetail.content || '',
                rating: reviewDetail.rating || 0,
                reservationId: reviewDetail.reservation?.id || ''
            });

            setRating(reviewDetail.rating || 0);  // 별점 상태 초기화

        }
    }, [reviewDetail]);

    const handleGoBack = () => {
        navigate(`/holdup/reviews/${id}`);
    };

    const handleUpdate = (e) => {
        dispatch(callUpdateReviewAPI(id, inputModify, imageFiles, deletedImageIds));
        navigate(`/holdup/reviews/${id}`)
    };

    const onChangeHandler = e => {
        setInputModify({
            ...inputModify,
            [e.target.name]: e.target.value
        })
    };

    const handleRatingChange = (newRating) => {
        setRating(newRating);
        setInputModify(prev => ({ ...prev, rating: newRating }));
    };


    // 이미지 업로드 처리 메소드
    const fileChangeHandler = (e) => {
        const imageLists = e.target.files;
        let imageUrlLists = [...showImages];
        let fileLists = [...imageFiles];

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
        setImageFiles(fileLists);
    };

    // 추가한 이미지 삭제 처리 메소드
    const deleteimageFiles = (id) => {
        URL.revokeObjectURL(showImages[id]);
        setShowImages(showImages.filter((_, index) => index !== id));
        setImageFiles(imageFiles.filter((_, index) => index !== id));
    };

    const deleteImages = (imageId) => {
        // 삭제할 이미지 찾기
        const imageToDelete = images.find(img => img.imageId === imageId);

        if (imageToDelete) {
            // URL 객체 해제
            URL.revokeObjectURL(imageToDelete.imageUrl);

            // 이미지 ID로 필터링하여 새 배열 생성
            setImages(images.filter(img => img.imageId !== imageId));
            // 삭제할 이미지 ID 목록에 추가
            setDeletedImageIds(prev => [...prev, imageId]);
            console.log("Deleted image ID:", imageId);
        } else {
            console.log("Image not found:", imageId);
        }
    }



    if (error) return <div>에러 발생: {error}</div>;

    return (
        <div className={style.main}>
            <span className={style.title}>리뷰 수정</span>

            <span className={style.label}>제목</span>
            <input className={style.input} type='text' name='title' placeholder={inputModify.title} onChange={onChangeHandler} />

            <span className={style.label}>내용</span>
            <input className={style.input} type='text' name='content' placeholder={inputModify.content} onChange={onChangeHandler} />

            <span className={style.rate}>평점 <StarRating rating={rating} setRating={handleRatingChange} /></span>

            <span className={style.label}>사진 업로드</span>
            <input type="file" multiple accept="image/*" onChange={fileChangeHandler} />
            <div className={style.imagePreview}>
                {images.map((image) => (
                    <div key={image.imageId} className={style.previewImage}>
                        <img src={image.imageUrl} alt={`업로드된 이미지 ${image.imageId}`} />
                        <button className={style.deleteButton} type="button" onClick={() => deleteImages(image.imageId)}>X</button>
                    </div>
                ))}

                {showImages.map((image, id) => (
                    <div key={id} className={style.previewImage}>
                        <img src={image} alt={`${image}-${id}`} />
                        <button className={style.deleteButton} type="button" onClick={() => deleteimageFiles(id)}>X</button>
                    </div>
                ))}
            </div>
            <div className={style.buttonSection}>
                <button className={style.button} onClick={handleGoBack}>돌아가기</button>
                <button className={style.button} onClick={handleUpdate}>작성하기</button>
            </div>
        </div>
    );
}

export default ReviewUpdateForm;