import { combineReducers } from "redux";
import userReducer from "./UserModule";
import spaceReducer from "./SpaceModule";
import reviewReducer from "./ReviewModule";
import reviewDetailReducer from "./ReviewDetailModule";
import reviewcreateReducer from "./ReviewCreateModule";
import spacePageReducer from "./SpacePageModule";
import spaceDetailReducer from "./SpaceDetailModule";
import reservationReducer from "./ReservationModule";

const rootReducer = combineReducers({
    userReducer,

    spaceReducer,
    spacePageReducer,
    spaceDetailReducer,

    reviewReducer,
    reviewDetailReducer,
    reviewcreateReducer,

    reservationReducer
});

export default rootReducer;