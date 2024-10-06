import { combineReducers } from "redux";
import userReducer from "./UserModule";
import spaceReducer from "./SpaceModule";
import reviewReducer from "./ReviewModule";
import reviewDetailReducer from "./ReviewDetailModule";
import reviewcreateReducer from "./ReviewCreateModule";
import spacePageReducer from "./SpacePageModule";
import spaceDetailReducer from "./SpaceDetailModule";
import reservationReducer from "./ReservationModule";
import reviewCommentReducer from "./ReviewCommentModule";
import reviewCreateCommentReducer from "./ReviewCommentCreateModule";
import inqueiryReducer from "./InquiryModule";
import inquiryCreateReducer from "./InquiryCreateModule";
import inquiryDetailReducer from "./InquiryDetailModule";
import reportReducer from "./ReportModule";

const rootReducer = combineReducers({
    userReducer,

    spaceReducer,
    spacePageReducer,
    spaceDetailReducer,

    reviewReducer,
    reviewDetailReducer,
    reviewcreateReducer,
    reviewCommentReducer,
    reviewCreateCommentReducer,

    reservationReducer,

    inqueiryReducer,
    inquiryCreateReducer,
    inquiryDetailReducer,

    reportReducer
});

export default rootReducer;