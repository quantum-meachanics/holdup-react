import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { callCreateSpaceAPI } from "../../apis/SpaceAPICalls";
import style from "../../css/CreateSpaceForm.module.css";

function CreateSpaceForm() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { spaceInfo, error } = useSelector(state => state.spaceReducer);

    const detailAddressRef = useRef(null); // 상세주소 입력창에 ref 생성

    const [inputSpaceInfo, setSpaceInfo] = useState({
        name: '',
        address: '',
        detailAddress: '',
        gu: '',
        dong: '',
        description: '',
        width: '',
        height: '',
        depth: '',
        count: '',
        price: ''
    });

    // 주소 검색 api 팝업 여는 메소드
    const openAddressPopup = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택한 경우
                    setSpaceInfo((prev) => ({
                        ...prev,
                        address: data.roadAddress,
                        gu: data.sigungu,
                        dong: data.bname
                    }));
                } else { // 도로명 주소 선택이 아닌 경우(지번밖에 없음)
                    setSpaceInfo((prev) => ({
                        ...prev,
                        address: data.jibunAddress,
                        gu: data.sigungu,
                        dong: data.bname
                    }));
                }
                detailAddressRef.current.focus(); // 주소를 선택하면 상세주소 입력창으로 커서 이동
            }
        }).open();
    };

    // 입력창 감지하여 spaceInfo에 넘김
    const onChangeHandler = e => {
        setSpaceInfo({
            ...inputSpaceInfo,
            [e.target.name]: e.target.value
        })
    };

    // 클릭시 입력한 정보를 axios 메소드로 전송
    const onClickHandler = () => {
        if (!inputSpaceInfo.address.startsWith('서울')) {
            alert('서울시에 해당하는 공간만 등록할 수 있습니다.');
            return;
        }
        dispatch(callCreateSpaceAPI(inputSpaceInfo));
    };

    // 이펙트
    useEffect(() => {
        if (error) {
            alert(error);
        } else if (spaceInfo) {
            navigate("/holdup/spaces/suceess");
        }
    }, [spaceInfo, error, navigate, dispatch]);

    return (
        <div className={style.createSpaceForm}>
            <span className={style.label}>공간 이름</span>
            <input className={style.input} type="text" name="name" value={inputSpaceInfo.name} onChange={onChangeHandler} />

            <span>공간 주소</span>
            <input className={style.input} type="text" name="address" value={inputSpaceInfo.address} readOnly />
            <button className={style.button} type="button" onClick={openAddressPopup}>주소 검색</button>

            <span>상세주소</span>
            <input className={style.input} type="text" name="detailAddress" ref={detailAddressRef} value={inputSpaceInfo.detailAddress} onChange={onChangeHandler} />

            <span>공간 설명</span>
            <input className={style.input} type="text" name="description" value={inputSpaceInfo.description} onChange={onChangeHandler} />

            <span>공간 너비</span>
            <input className={style.input} type="number" name="width" value={inputSpaceInfo.width} onChange={onChangeHandler} />

            <span>공간 높이</span>
            <input className={style.input} type="number" name="height" value={inputSpaceInfo.height} onChange={onChangeHandler} />

            <span>공간 깊이</span>
            <input className={style.input} type="number" name="depth" value={inputSpaceInfo.depth} onChange={onChangeHandler} />

            <span>공간 갯수</span>
            <input className={style.input} type="number" name="count" value={inputSpaceInfo.count} onChange={onChangeHandler} />

            <span>공간 가격</span>
            <input className={style.input} type="number" name="price" value={inputSpaceInfo.price} onChange={onChangeHandler} />

            <button className={style.button} onClick={onClickHandler}>등록하기</button>
        </div>
    );
}

export default CreateSpaceForm;