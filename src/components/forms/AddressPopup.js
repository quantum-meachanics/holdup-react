import React, { useEffect } from 'react';

const AddressPopup = ({ onAddressSelect }) => {
    useEffect(() => {
        const init = () => {
            const url = encodeURIComponent(window.location.href); // 현재 URL 인코딩
            const confmKey = "devU01TX0FVVEgyMDI0MDkwNjE3MDQwMDExNTA3MTI="; // 자신의 승인키로 변경하세요
            const resultType = "4"; // 도로명+지번+상세건물명

            const params = new URLSearchParams({
                confmKey,
                returnUrl: url,
                resultType,
            });

            const popupUrl = `https://business.juso.go.kr/addrlink/addrLinkUrl.do?${params.toString()}`;
            const pop = window.open(popupUrl, "AddressPopup", "width=570,height=420,scrollbars=yes,resizable=yes");

            // 팝업에서 리턴된 데이터를 처리하기 위한 콜백 함수 정의
            pop.jusoCallBack = (roadFullAddr, roadAddrPart1, addrDetail, roadAddrPart2, engAddr, jibunAddr, zipNo, admCd, rnMgtSn, bdMgtSn, detBdNmList, bdNm, bdKdcd, siNm, sggNm, emdNm, liNm, rn, udrtYn, buldMnnm, buldSlno, mtYn, lnbrMnnm, lnbrSlno, emdNo) => {
                onAddressSelect({
                    roadFullAddr,
                    roadAddrPart1,
                    addrDetail,
                    roadAddrPart2,
                    engAddr,
                    jibunAddr,
                    zipNo,
                    admCd,
                    rnMgtSn,
                    bdMgtSn,
                    detBdNmList,
                    bdNm,
                    bdKdcd,
                    siNm,
                    sggNm,
                    emdNm,
                    liNm,
                    rn,
                    udrtYn,
                    buldMnnm,
                    buldSlno,
                    mtYn,
                    lnbrMnnm,
                    lnbrSlno,
                    emdNo,
                });
                pop.close();
            };
        };

        init();
    },);

    return (
        <div>
            <h2>주소 검색 중...</h2>
        </div>
    );
};

export default AddressPopup;
