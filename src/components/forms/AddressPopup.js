import { useEffect } from 'react';

const AddressPopup = ({ onAddressSelect }) => {
    useEffect(() => {
        const loadDaumPostcodeScript = () => {
            const script = document.createElement('script');
            script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
            script.onload = () => {
                window.daum.postcode.load(() => {
                    new window.daum.Postcode({
                        oncomplete: (data) => {
                            const roadAddr = data.roadAddress;
                            const jibunAddr = data.jibunAddress;
                            const zipCode = data.zonecode;

                            const selectedAddress = {
                                roadFullAddr: roadAddr,
                                jibunAddr,
                                zipNo: zipCode,
                                addressDetail: '', // 상세 주소는 선택하지 않으므로 초기화
                            };

                            // 주소 선택 후 콜백 함수 호출
                            if (typeof onAddressSelect === 'function') {
                                onAddressSelect(selectedAddress);
                            } else {
                                console.error('onAddressSelect is not a function:', onAddressSelect);
                            }
                        },
                        autoClose: true, // 선택 후 팝업 자동 닫기
                        onresize: (size) => {
                            const container = document.getElementById('addressPopupContainer');
                            container.style.height = `${size.height}px`;
                        },
                    }).open();
                });
            };
            document.body.appendChild(script);
        };

        loadDaumPostcodeScript();

        // 클린업 함수: 컴포넌트가 언마운트될 때 스크립트 제거
        return () => {
            const scriptTags = document.querySelectorAll('script[src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"]');
            scriptTags.forEach(script => script.remove());
        };
    }, []);

    return null; // 팝업만 열리고 렌더링할 UI는 없음
};

export default AddressPopup;
