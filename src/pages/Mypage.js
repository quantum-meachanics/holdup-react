import React, { useState } from 'react';
import MypageForm from "../components/forms/MypageForm";
import MyPageSidebar from "../components/commons/MyPageSidebar"
import CreditPage from "../components/forms/CreditPage";
import style from "../css/MyPage.module.css"

function Mypage() {
    const [activeComponent, setActiveComponent] = useState('mypageForm');

    const handleComponentChange = (component) => {
        setActiveComponent(component);
    };

    return (
        <div>
            <h1 className={style.title}>MY HOME</h1>
            <div className={style.buttonContent}>
                {/* 버튼을 통해 컴포넌트를 전환 */}
                <button className={style.mypageButton} onClick={() => handleComponentChange('mypageForm')}>회원정보 수정</button>
                <button className={style.mypageButton} onClick={() => handleComponentChange('creditPage')}>크레딧 충전</button>
            </div>
            <div>
            <br/>
                {/* 현재 activeComponent에 따라 다른 컴포넌트를 렌더링 */}
                <div className={style.mypageContent}>
                    {activeComponent === 'mypageForm' && (
                        <>
                            <div className={style.mypageSidebar}> {/* MyPageSidebar 영역 */}
                                <MyPageSidebar />
                            </div>
                            <div className={style.mypageForm}> {/* MypageForm 영역 */}
                                <MypageForm />
                            </div>

                        </>
                    )}
                </div>

                <div className={style.mypageContent}>
                    {activeComponent === 'creditPage' && (
                        <>
                            <div>
                                <MyPageSidebar />
                            </div>
                            <div className={style.mypageForm}>
                                <CreditPage />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Mypage;