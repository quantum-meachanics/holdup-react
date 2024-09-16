import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { callCreateSpaceAPI } from "../../apis/SpaceAPICalls";

function CreateSpaceForm() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { spaceInfo, error } = useSelector(state => state.spaceReducer);

    const [inputSpaceInfo, setSpaceInfo] = useState({
        name: '',
        address: '',
        description: '',
        width: '',
        height: '',
        depth: '',
        count: '',
        price: ''
    });

    // 입력창 감지
    const onChangeHandler = e => {
        setSpaceInfo({
            ...inputSpaceInfo,
            [e.target.name]: e.target.value
        })
    };

    // 클릭시 입력한 정보를 axios 메소드로 전송
    const onClickHandler = () => {
        dispatch(callCreateSpaceAPI(inputSpaceInfo))
    };

    // 이펙트
    useEffect(() => {
        if (error) {
            alert(error);
        } else if (spaceInfo) {
            navigate("/holdiup/spaces/suceess");
        }
    }, [spaceInfo, error, navigate, dispatch]);

    return (
        <>
            <label>공간 이름 : </label>
            <input type="text" name="name" value={inputSpaceInfo.name} onChange={onChangeHandler} />
            <label>공간 주소 : </label>
            <input type="text" name="address" value={inputSpaceInfo.address} onChange={onChangeHandler} />
            <label>공간 설명 : </label>
            <input type="text" name="description" value={inputSpaceInfo.description} onChange={onChangeHandler} />
            <label>공간 너비 : </label>
            <input type="text" name="width" value={inputSpaceInfo.width} onChange={onChangeHandler} />
            <label>공간 높이 : </label>
            <input type="text" name="height" value={inputSpaceInfo.height} onChange={onChangeHandler} />
            <label>공간 깊이 : </label>
            <input type="text" name="depth" value={inputSpaceInfo.depth} onChange={onChangeHandler} />
            <label>공간 갯수 : </label>
            <input type="text" name="count" value={inputSpaceInfo.count} onChange={onChangeHandler} />
            <label>공간 가격 : </label>
            <input type="text" name="price" value={inputSpaceInfo.price} onChange={onChangeHandler} />
            <button onClick={onClickHandler}>등록하기</button>
        </>
    );
}

export default CreateSpaceForm;