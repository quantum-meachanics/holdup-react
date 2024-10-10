import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callCreateReviewAPI } from "../../apis/ReviewAPICall";
import StarRating from "./Ratingform";
import style from "../../css/CreateReviewForm.module.css";

function CreateReviewForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { reviewInfo, error } = useSelector(state => state.reviewcreateReducer);

    const [inputReviewInfo, setReviewInfo] = useState({
        title: '',
        content: '',
        reservationId: id,
        rating: 0
    });
    const [rating, setRating] = useState(0);
    const [imageFiles, setImageFiles] = useState([]); // 파일 리스트 저장할 state
    const [showImages, setShowImages] = useState([]); // 화면에 보여줄 이미지 state


    const onChangeHandler = e => {
        setReviewInfo({
            ...inputReviewInfo,
            [e.target.name]: e.target.value
        })
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

    // 이미지 삭제 처리 메소드
    const deleteImage = (id) => {
        URL.revokeObjectURL(showImages[id]);
        setShowImages(showImages.filter((_, index) => index !== id));
        setImageFiles(imageFiles.filter((_, index) => index !== id));
    };

    // 페이지 이동 메소드
    const onClickHandler = () => {
        dispatch(callCreateReviewAPI({ ...inputReviewInfo, rating }, imageFiles));
        navigate('/holdup/myPage/reservations');
    };


    const onClickGoBack = () => {
        navigate('/holdup/myPage/reservations');
    }

    // rating 변경 핸들러
    const handleRatingChange = (newRating) => {
        setRating(newRating);
        setReviewInfo(prev => ({ ...prev, rating: newRating }));
    };


    useEffect(() => {
        if (error) {
            alert(error);
        } else if (reviewInfo) {
            navigate("/holdup/reviews");
        }
    }, [reviewInfo, error, navigate, dispatch]);

    return (
        <div className={style.main}>
            <span className={style.title}>리뷰 작성</span>

            <span className={style.label}>제목</span>
            <input className={style.input} type="text" name="title" value={inputReviewInfo.title} onChange={onChangeHandler} />

            <span className={style.label}>내용</span>
            <input className={style.input} type="text" name="content" value={inputReviewInfo.content} onChange={onChangeHandler} />

            <span className={style.rate}>별점 <StarRating rating={inputReviewInfo.rating} setRating={handleRatingChange} /></span>

            <span className={style.label}>사진 업로드</span>
            <input type="file" multiple accept="image/*" onChange={fileChangeHandler} />
            <div className={style.imagePreview}>
                {showImages.map((image, id) => (
                    <div key={id} className={style.previewImage}>
                        <img src={image} alt={`${image}-${id}`} />
                        <span className={style.imageOrder}>{id + 1}</span>
                        <button type="button" className={style.deleteButton} onClick={() => deleteImage(id)}>X</button>
                    </div>
                ))}
            </div>

            <div className={style.buttonSection}>
                <button className={style.button} onClick={onClickHandler}>등록하기</button>
                <button className={style.button} onClick={onClickGoBack}>뒤로가기</button>
            </div>
        </div>
    );
}

export default CreateReviewForm;