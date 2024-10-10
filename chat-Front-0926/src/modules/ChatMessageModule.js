import { createActions, handleActions } from "redux-actions";

// 초기 상태
const initialState = {
    messages: [],  // 채팅 메시지 목록
    totalPages: 0,  // 전체 페이지 수
    totalElements: 0,  // 전체 메시지 수
    error: null,  // 에러 정보
};

// 액션 타입 정의
export const GET_CHAT_MESSAGES_SUCCESS = "chat/GET_CHAT_MESSAGES_SUCCESS";
export const GET_CHAT_MESSAGES_FAIL = "chat/GET_CHAT_MESSAGES_FAIL";

// 액션 생성
export const { chat: { getChatMessagesSuccess, getChatMessagesFail } } = createActions({
    [GET_CHAT_MESSAGES_SUCCESS]: (messages, totalPages, totalElements) => ({ messages, totalPages, totalElements }),
    [GET_CHAT_MESSAGES_FAIL]: (error) => ({ error }),
});

// 리듀서
const chatMessagesReducer = handleActions(
    {
        [GET_CHAT_MESSAGES_SUCCESS]: (state, { payload: { messages, totalPages, totalElements } }) => ({
            ...state,
            messages,  // 채팅 메시지 목록 저장
            totalPages,  // 전체 페이지 수 저장
            totalElements,  // 전체 메시지 수 저장
            error: null,  // 에러 초기화
        }),

        [GET_CHAT_MESSAGES_FAIL]: (state, { payload: { error } }) => ({
            ...state,
            messages: [],  // 메시지 목록 초기화
            totalPages: 0,  // 페이지 수 초기화
            totalElements: 0,  // 전체 메시지 수 초기화
            error,  // 에러 정보 저장
        }),
    },
    initialState
);

export default chatMessagesReducer;
