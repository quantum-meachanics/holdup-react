import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CreateSpaceForm() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { space, error } = useSelector(state => state.spaceReducer);

    const [spaceInfo, setSpaceInfo] = useState({
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
            ...spaceInfo,
            [e.target.name]: e.target.value
        })
    };

    // 클릭시 입력한 정보를 axios 메소드로 전송
    const onClickHandler = () => {
        dispatch(createSpaceAPI(spaceInfo))
    };

    // 이펙트 생략함

    return (
        <>
            <label>공간 이름 : </label>
            <input type="text" name="name" value={spaceInfo.name} onChange={onChangeHandler} />
            <label>공간 주소 : </label>
            <input type="text" name="address" value={spaceInfo.address} onChange={onChangeHandler} />
            <label>공간 설명 : </label>
            <input type="text" name="description" value={spaceInfo.description} onChange={onChangeHandler} />
            <label>공간 너비 : </label>
            <input type="text" name="width" value={spaceInfo.width} onChange={onChangeHandler} />
            <label>공간 높이 : </label>
            <input type="text" name="height" value={spaceInfo.height} onChange={onChangeHandler} />
            <label>공간 깊이 : </label>
            <input type="text" name="depth" value={spaceInfo.depth} onChange={onChangeHandler} />
            <label>공간 갯수 : </label>
            <input type="text" name="count" value={spaceInfo.count} onChange={onChangeHandler} />
            <label>공간 가격 : </label>
            <input type="text" name="price" value={spaceInfo.price} onChange={onChangeHandler} />
            <button onClick={onClickHandler}>등록하기</button>
        </>
    );
}

export default CreateSpaceForm;