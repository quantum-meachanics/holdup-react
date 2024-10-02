import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { callSpaceDetailAPI } from "../../apis/SpaceAPICalls";

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

    useEffect(() => {
        dispatch(callSpaceDetailAPI(id));
        console.log("불러온 공간글 객체", { spaceDetail });
    }, [id, dispatch]);

    if (error) return (<div>에러 발생 : {error}</div>);

    return (
        <>
            {spaceDetail ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <span>공간명 : {spaceDetail.name}</span>
                    <span>등록자 : {spaceDetail.ownerNickname}</span>
                    <span>등록일시 : {spaceDetail.createDate}</span>
                    <span>리뷰수 : {spaceDetail.reviewCount}</span>
                    <span>별점 : {spaceDetail.ratingAverage}</span>
                    <span>주소 : {spaceDetail.address}, {spaceDetail.detailAddress}</span>
                    <span>설명 : {spaceDetail.description}</span>
                    <span>높이 : {spaceDetail.height}</span>
                    <span>너비 : {spaceDetail.width}</span>
                    <span>깊이 : {spaceDetail.depth}</span>
                    <span>재고 : {spaceDetail.count}개</span>
                    <span>가격 : {spaceDetail.price} 크레딧</span>
                    <div>
                        {spaceDetail.imageUrls && spaceDetail.imageUrls.length > 0 ? (
                            spaceDetail.imageUrls.map((url, index) => (
                                <div key={index}>
                                    <img src={url} alt={`${index}번 이미지`} />
                                </div>
                            ))
                        ) : (
                            <p>이미지가 없습니다.</p>
                        )}
                    </div>
                    <span onClick={goToReservation}>예약하기</span>
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