import React, { useEffect } from 'react';
import '../../css/AddressPopup.css'; 

const AddressPopup = ({ onAddressSelect }) => {
    useEffect(() => {
        const loadDaumPostcodeScript = () => {
            const script = document.createElement('script');
            script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
            script.onload = () => {
                window.daum.postcode.load(() => {
                    document.getElementById('search-address-button').onclick = () => {
                        new window.daum.Postcode({
                            oncomplete: function(data) {
                                const roadAddr = data.roadAddress;
                                const jibunAddr = data.jibunAddress;
                                const zipCode = data.zonecode;

                                onAddressSelect({
                                    roadFullAddr: roadAddr,
                                    jibunAddr: jibunAddr,
                                    zipNo: zipCode,
                                    addressDetail: '' // 여기에 상세주소를 추가할 수 있습니다.
                                });
                            }
                        }).open();
                    };
                });
            };
            document.body.appendChild(script);
        };

        loadDaumPostcodeScript();
    }, [onAddressSelect]);

    return (
        <div className="address-search-container">
            <h2>주소 검색</h2>
            <input type="text" id="sample4_postcode" placeholder="우편번호" readOnly />
            <input type="button" id="search-address-button" value="우편번호 찾기" /><br />
            <input type="text" id="sample4_roadAddress" placeholder="도로명주소" readOnly />
            <input type="text" id="sample4_jibunAddress" placeholder="지번주소" readOnly />
            <input type="text" id="sample4_detailAddress" placeholder="상세주소" />
            <input type="text" id="sample4_extraAddress" placeholder="참고항목" />
        </div>
    );
};

export default AddressPopup;
