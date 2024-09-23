import { useEffect } from 'react';
import style from '../../css/AddressPopup.module.css';

const AddressPopup = ({ onAddressSelect }) => {
    useEffect(() => {
        const loadDaumPostcodeScript = () => {
            const script = document.createElement('script');
            script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
            script.onload = () => {
                window.daum.postcode.load(() => {
                    new window.daum.Postcode({
                        oncomplete: function(data) {
                            const roadAddr = data.roadAddress;
                            const jibunAddr = data.jibunAddress;
                            const zipCode = data.zonecode;

                            // 주소 선택 후 콜백 함수 호출
                            onAddressSelect({
                                roadFullAddr: roadAddr,
                                jibunAddr: jibunAddr,
                                zipNo: zipCode,
                                addressDetail: ''
                            });
                        },
                        // 선택 후 자동으로 닫히게 하려면 아래 옵션 추가
                        autoClose: true,
                        // 기본 값 설정 (예: 검색 결과)
                        onresize: function(size) {
                            const container = document.getElementById('addressPopupContainer');
                            container.style.height = size.height + 'px';
                        },
                    }).open();
                });
            };
            document.body.appendChild(script);
        };

        loadDaumPostcodeScript();

        // 클린업 함수
        return () => {
            const scriptTags = document.querySelectorAll('script[src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"]');
            scriptTags.forEach(script => script.remove());
        };
    }, [onAddressSelect]);

    return null; // UI를 렌더링하지 않음
};

export default AddressPopup;
