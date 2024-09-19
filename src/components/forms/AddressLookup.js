import React, { useEffect } from 'react';

const AddressPopup = ({ onAddressSelect }) => {
    useEffect(() => {
        const init = () => {
            const url = encodeURIComponent(window.location.href);
            const confmKey = "devU01TX0FVVEgyMDI0MDkwNjE3MDQwMDExNTA3MTI="; // 자신의 승인키로 변경하세요
            const resultType = "4"; // 도로명+지번+상세건물명

            const params = new URLSearchParams({
                confmKey,
                returnUrl: url,
                resultType,
            });

            const popupUrl = `https://business.juso.go.kr/addrlink/addrLinkUrl.do?${params.toString()}`;
            window.open(popupUrl, "AddressPopup", "width=570,height=420,scrollbars=yes,resizable=yes");
        };

        init();
    }, []);

    // 팝업에서 주소를 선택한 후 호출할 수 있는 콜백 함수를 추가해야 합니다.
    // 이 부분은 실제 API에서 주소를 선택했을 때의 처리 방법에 따라 다를 수 있습니다.

    return (
        <div>
            <h2>주소 검색 중...</h2>
        </div>
    );
};

export default AddressPopup;
