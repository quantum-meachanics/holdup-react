import { combineReducers } from "redux";
import userReducer from "./UserModule";
import spaceReducer from "./SpaceModule";
import reviewReducer from "./ReviewModule";
import reviewDetailReducer from "./ReviewDetailModule";
import reviewcreateReducer from "./ReviewCreateModule";
import reviewUpdateReducer from "./ReviewUpdateModule";

const rootReducer = combineReducers({
    userReducer,
    spaceReducer,
    reviewReducer,
    reviewDetailReducer,
    reviewcreateReducer,
    reviewUpdateReducer
});

export default rootReducer;