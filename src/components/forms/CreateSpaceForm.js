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

    // 공간 입력값 상태 추가
    const [inputSpaceInfo, setInputSpaceInfo] = useState({
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

    const [imageFiles, setImageFiles] = useState([]); // 파일 리스트 저장할 state
    const [showImages, setShowImages] = useState([]); // 화면에 보여줄 이미지 state

    // 주소 검색 api 팝업 여는 메소드
    const openAddressPopup = () => {
        new window.daum.Postcode({
            oncomplete: (data) => {
                const address = data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress;
                setInputSpaceInfo(prev => ({
                    ...prev,
                    address,
                    gu: data.sigungu,
                    dong: data.bname
                }));
                detailAddressRef.current.focus(); // 주소를 선택하면 상세주소 입력창으로 커서 이동
            }
        }).open();
    };

    // 공간정보 입력창 감지하여 저장
    const onChangeHandler = e => {
        setInputSpaceInfo({
            ...inputSpaceInfo,
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

    // 입력된 정보를 전송하는 메소드
    const onClickHandler = () => {
        if (!inputSpaceInfo.address.startsWith('서울')) {
            alert('서울시에 해당하는 공간만 등록할 수 있습니다.');
            return;
        }

        dispatch(callCreateSpaceAPI(inputSpaceInfo, imageFiles));
    };

    // 이펙트
    useEffect(() => {
        if (error) {
            alert(error);

        } else if (spaceInfo) {
            alert("공간 등록을 성공하였습니다!");
        }
    }, [spaceInfo, error, navigate]);

    return (
        <div className={style.main}>

            <span className={style.title}>공간 등록하기</span>

            <div className={style.inputSection}>

                <div className={style.spaceSection}>

                    <div className={style.inputSet}>
                        <span className={style.label}>공간 이름</span>
                        <input className={style.input} type="text" name="name" value={inputSpaceInfo.name} onChange={onChangeHandler} />
                    </div>

                    <div className={style.inputSet}>
                        <span className={style.label}>공간 주소</span>
                        <div>
                            <input className={style.inputAdrress} type="text" name="address" value={inputSpaceInfo.address} readOnly />
                            <button className={style.button} type="button" onClick={openAddressPopup}>주소 검색</button>
                        </div>
                        <input className={style.input} type="text" name="detailAddress" ref={detailAddressRef} value={inputSpaceInfo.detailAddress} onChange={onChangeHandler} />
                    </div>

                    <div className={style.inputSet}>
                        <span className={style.label}>공간 설명</span>
                        <input className={style.input} type="text" name="description" value={inputSpaceInfo.description} onChange={onChangeHandler} />
                    </div>

                    <div className={style.inputSet}>
                        <span className={style.label}>공간 크기</span>

                        <div className={style.inputSizeSection}>
                            <div className={style.inputSizeSet}>
                                <span className={style.label}>너비</span>
                                <input className={style.inputSize} type="number" name="width" value={inputSpaceInfo.width} onChange={onChangeHandler} />
                            </div>

                            <div className={style.inputSizeSet}>
                                <span className={style.label}>높이</span>
                                <input className={style.inputSize} type="number" name="height" value={inputSpaceInfo.height} onChange={onChangeHandler} />
                            </div>

                            <div className={style.inputSizeSet}>
                                <span className={style.label}>깊이</span>
                                <input className={style.inputSize} type="number" name="depth" value={inputSpaceInfo.depth} onChange={onChangeHandler} />
                            </div>
                        </div>
                    </div>

                    <div className={style.inputSet}>
                        <span className={style.label}>공간 갯수</span>
                        <input className={style.input} type="number" name="count" value={inputSpaceInfo.count} onChange={onChangeHandler} />
                    </div>

                    <div className={style.inputSet}>
                        <span className={style.label}>공간 가격</span>
                        <input className={style.input} type="number" name="price" value={inputSpaceInfo.price} onChange={onChangeHandler} />
                    </div>

                </div>

                <div className={style.verticalLine}></div>

                <div className={style.imageSection}>

                    <span className={style.label}>사진 등록하기</span>
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

                </div>
            </div>
            <button className={style.button} onClick={onClickHandler}>등록하기</button>
        </div >
    );
}

export default CreateSpaceForm;