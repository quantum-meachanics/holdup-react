import React, { useEffect, useState } from 'react';
import { getAllMembers, updateMemberInfo } from '../../apis/AdministratorAPICall';
import styles from '../../css/AdministratorForm.module.css';

const AdministratorForm = () => {
    const [members, setMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);
    const [updatedData, setUpdatedData] = useState({ nickname: '', role: '', isLeave: false, isBan: false });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchAllMembers();
    }, []);

    const fetchAllMembers = async () => {
        const result = await getAllMembers();
        if (result.success) {
            setMembers(result.data);
        } else {
            setErrors({ general: result.message });
        }
    };

    const handleUpdateMember = async (email) => {
        const result = await updateMemberInfo(email, updatedData);
        if (result.success) {
            alert(result.message);
            fetchAllMembers(); // 업데이트 후 다시 사용자 목록 가져오기
            setSelectedMember(null); // 업데이트 후 선택된 회원 초기화
        } else {
            setErrors({ general: result.message });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className={styles.adminPageContainer}>
            {errors.general && <p className={styles.error}>{errors.general}</p>}
            <table className={styles.memberTable}>
                <thead>
                    <tr>
                        <th>이메일</th>
                        <th>닉네임</th>
                        <th>역할</th>
                        <th>탈퇴 여부</th>
                        <th>정지 여부</th>
                        <th>수정</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map(member => (
                        <tr key={member.email}>
                            <td>{member.email}</td>
                            <td>{member.nickname}</td>
                            <td>{member.role}</td>
                            <td>{member.isLeave ? '예' : '아니오'}</td>
                            <td>{member.isBan ? '예' : '아니오'}</td>
                            <td>
                                <button className={styles.button} onClick={() => {
                                    setSelectedMember(member);
                                    setUpdatedData({ nickname: member.nickname, role: member.role, isLeave: member.isLeave, isBan: member.isBan });
                                }}>
                                    수정
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedMember && (
                <div className={styles.updateForm}>
                    <h2>{selectedMember.nickname} 정보 수정</h2>
                    <label>닉네임</label>
                    <input
                        type="text"
                        name="nickname"
                        value={updatedData.nickname}
                        onChange={handleInputChange}
                    />
                    <label>역할</label>
                    <input
                        type="text"
                        name="role"
                        value={updatedData.role}
                        onChange={handleInputChange}
                    />
                    <label>
                        탈퇴 여부
                        <input
                            type="checkbox"
                            name="isLeave"
                            checked={updatedData.isLeave}
                            onChange={(e) => setUpdatedData(prev => ({ ...prev, isLeave: e.target.checked })) }
                        />
                    </label>
                    <label>
                        정지 여부
                        <input
                            type="checkbox"
                            name="isBan"
                            checked={updatedData.isBan}
                            onChange={(e) => setUpdatedData(prev => ({ ...prev, isBan: e.target.checked })) }
                        />
                    </label>
                    <button className={styles.button} onClick={() => handleUpdateMember(selectedMember.email)}>회원 정보 수정</button>
                    <button className={styles.button} onClick={() => setSelectedMember(null)}>취소</button>
                </div>
            )}
        </div>
    );
};

export default AdministratorForm;
