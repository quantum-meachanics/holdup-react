import { useEffect } from 'react';

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

                            onAddressSelect({
                                roadFullAddr: roadAddr,
                                jibunAddr: jibunAddr,
                                zipNo: zipCode,
                                addressDetail: ''
                            });
                        }
                    }).open();
                });
            };
            document.body.appendChild(script);
        };

        loadDaumPostcodeScript();
    }, [onAddressSelect]);

    return null; // UI를 렌더링하지 않음
};

export default AddressPopup;
