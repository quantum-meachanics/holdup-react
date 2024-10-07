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
import reportCreateReducer from "./ReportCreateModule";
import reportDetailReducer from "./ReportDetailModule";
import reportCommentReducer from "./ReportCommentModule";
import reportCreateCommentReducer from "./ReportCommentCreateModule";
import myReservationReducer from "./MyReservationModule";

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
    myReservationReducer,

    inqueiryReducer,
    inquiryCreateReducer,
    inquiryDetailReducer,

    reportReducer,
    reportCreateReducer,
    reportDetailReducer,
    reportCommentReducer,
    reportCreateCommentReducer

});

export default rootReducer;