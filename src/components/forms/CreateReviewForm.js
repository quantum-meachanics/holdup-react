import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callCreateReviewAPI } from "../../apis/ReviewAPICall";

function CreateReviewForm() {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { reviewInfo, error } = useSelector(state => state.reviewcreateReducer);

    const [inputReviewInfo, setReviewInfo] = useState({
        title: '',
        content: '',
        rating: '',
        reservationId: id,
    });

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
        dispatch(callCreateReviewAPI(inputReviewInfo, imageFiles));
        navigate('/holdup/myPage/reservations');
    };


    const onClickGoBack = () => {
        navigate('/holdup/myPage/reservations');
    }


    useEffect(() => {
        if (error) {
            alert(error);
        } else if (reviewInfo) {
            navigate("/holdiup/myPage/reservations");
        }
    }, [reviewInfo, error, navigate, dispatch]);

    return (
        <>

            <p>예약ID: {id} </p>

            <span>제목 : </span>
            <input type="text" name="title" value={inputReviewInfo.title} onChange={onChangeHandler} />

            <span>내용 : </span>
            <textarea type="text" name="content" value={inputReviewInfo.content} onChange={onChangeHandler} />

            <span>별점 : </span>
            <input type="text" name="rating" value={inputReviewInfo.rating} onChange={onChangeHandler} />

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

            <button onClick={onClickHandler}>등록하기</button>
            <button onClick={onClickGoBack}>뒤로가기</button>
        </>
    );
}

export default CreateReviewForm;