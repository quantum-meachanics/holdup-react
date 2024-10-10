import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callSpaceDetailAPI } from "../../apis/SpaceAPICalls";
import style from "../../css/SpaceDetail.module.css";

function SpaceDetailForm() {

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { spaceDetail, error } = useSelector(state => state.spaceDetailReducer);

    const goToReservation = () => {
        navigate(
            "/holdup/createReservation",
            { state: { spaceId: spaceDetail.id } }
        )
    };

    // 날짜 형식 포맷
    const formatDateTime = (dateArray) => {
        // dateArray가 유효한지 확인
        if (!Array.isArray(dateArray) || dateArray.length < 5) {
            console.error("Invalid date array:", dateArray);
            return "유효하지 않은 날짜";
        }

        // Date 객체 생성
        const year = dateArray[0];
        const month = String(dateArray[1]).padStart(2, '0'); // 월을 두 자리로 포맷
        const day = String(dateArray[2]).padStart(2, '0'); // 일을 두 자리로 포맷
        const hour = String(dateArray.length > 3 ? dateArray[3] : 0).padStart(2, '0'); // 시를 두 자리로 포맷
        const minute = String(dateArray.length > 4 ? dateArray[4] : 0).padStart(2, '0'); // 분을 두 자리로 포맷
        const second = String(dateArray.length > 5 ? dateArray[5] : 0).padStart(2, '0'); // 초를 두 자리로 포맷

        // "년월일 시:분:초" 형식으로 문자열 생성
        return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
    };

    useEffect(() => {
        dispatch(callSpaceDetailAPI(id));
        console.log("불러온 공간글 객체", { spaceDetail });
    }, [id, dispatch]);

    return (
        <>
            {spaceDetail ? (
                <div className={style.main}>

                    <div className={style.imageSection}>
                        {spaceDetail.imageUrls && spaceDetail.imageUrls.length > 0 ? (
                            spaceDetail.imageUrls.map((url, index) => (
                                <div key={index} className={style.image}>
                                    <img src={url} alt={`${index}번 이미지`} />
                                </div>
                            ))
                        ) : (
                            <p>이미지가 없습니다.</p>
                        )}
                    </div>

                    <div className={style.verticalLine}></div>

                    <div className={style.infoSection}>
                        <div className={style.row}>
                            {spaceDetail.count > 0 ? (
                                <div className={style.status}>
                                    <div className={style.greenDot}></div>
                                    <span>예약 가능</span>
                                </div>
                            ) : (
                                <div className={style.status}>
                                    <div className={style.redDot}></div>
                                    <span>예약 불가</span>
                                </div>
                            )}

                            <span className={style.createDateTime}>{formatDateTime(spaceDetail.createDate)}</span>
                        </div>

                        <span className={style.spaceName}>{spaceDetail.name}</span>

                        <span className={style.ownerNickname}>{spaceDetail.ownerNickname}</span>

                        <div className={style.scoreSection}>
                            <span className={style.ratingAverage}>⭐ {spaceDetail.ratingAverage}</span>
                            <span className={style.reviewCount}>리뷰수 {spaceDetail.reviewCount}</span>
                        </div>

                        <span className={style.address}>{spaceDetail.address}, {spaceDetail.detailAddress}</span>

                        <span className={style.description}>{spaceDetail.description}</span>

                        <span className={style.size}>{spaceDetail.width} X {spaceDetail.depth} X {spaceDetail.depth} (너비X높이X깊이)</span>

                        <span className={style.price}>시간당 {spaceDetail.price} 크레딧</span>

                        <span onClick={goToReservation} className={style.reservationButton}>예약하기</span>
                    </div>
                </div>

            ) : (
                <>
                    <span>게시글이 존재하지 않습니다.</span>
                </>
            )
            }
        </>
    );
}

export default SpaceDetailForm;