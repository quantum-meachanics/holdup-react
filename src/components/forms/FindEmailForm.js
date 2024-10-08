import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate로 변경
import { request } from '../../apis/Api'; // API 요청을 위한 유틸리티
import style from '../../css/FindEmailForm.module.css'; // CSS 모듈

const FindEmailForm = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // POST 요청으로 데이터 전송
            const response = await request('POST', '/find-email', { name, phone });

            // 서버 응답 처리
            if (response) {
                setMessage(response); // 전체 메시지 설정
            } else {
                setMessage('이메일을 찾을 수 없습니다.');
            }
        } catch (error) {
            console.error('이메일 찾기 오류:', error);
            setMessage('이메일을 찾는 데 실패했습니다.');
        }
    };

    return (
        <div className={style.findEmailContainer}>
            <h2 className={style.title}>이메일 찾기</h2>
            {!message && (
                <form onSubmit={handleSubmit}>
                    <div className={style.inputGroup}>
                        <label htmlFor="name">이름</label>
                        <br/>
                        <br/>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className={style.inputGroup}>
                        <label htmlFor="phone">전화번호</label>
                        <br/>
                        <br/>
                        <input
                            type="text"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <button className={style.button} type="submit">이메일 찾기</button>
                </form>
            )}
            {message && <div className={style.message}>{message}</div>}
            {message.includes("성공적으로 찾았습니다") && (
                <div className={style.links}>
                    <button className={`${style.linkButton} ${style.loginButton}`} onClick={() => navigate('/holdup/login')}>
                        로그인
                    </button>
                    <button className={`${style.linkButton} ${style.passwordButton}`} onClick={() => navigate('/holdup/email-verification')}>
                        비밀번호 찾기
                    </button>
                </div>
            )}
        </div>
    );
};

export default FindEmailForm;
