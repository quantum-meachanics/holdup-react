import { createActions, handleActions } from "redux-actions";

// 초기 상태
const initialState = {
    chatRoomInfo: null,  // 생성된 채팅방 정보
    error: null,         // 에러 정보
};

// 액션 타입 정의
export const CREATE_CHAT_ROOM_SUCCESS = "chat/CREATE_CHAT_ROOM_SUCCESS";
export const CREATE_CHAT_ROOM_FAIL = "chat/CREATE_CHAT_ROOM_FAIL";

// 액션 생성
export const { chat: { createChatRoomSuccess, createChatRoomFail } } = createActions({
    [CREATE_CHAT_ROOM_SUCCESS]: (chatRoomInfo) => ({ chatRoomInfo }),
    [CREATE_CHAT_ROOM_FAIL]: (error) => ({ error }),
});

// 리듀서
const chatCreateReducer = handleActions(
    {
        [CREATE_CHAT_ROOM_SUCCESS]: (state, { payload: { chatRoomInfo } }) => ({
            ...state,
            chatRoomInfo,  // 생성된 채팅방 정보 저장
            error: null,   // 에러 초기화
        }),

        [CREATE_CHAT_ROOM_FAIL]: (state, { payload: { error } }) => ({
            ...state,
            chatRoomInfo: null,  // 채팅방 정보 초기화
            error,               // 에러 정보 저장
        }),
    },
    initialState
);

export default chatCreateReducer;
