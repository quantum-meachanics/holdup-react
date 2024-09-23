import { combineReducers } from "redux";
import userReducer from "./UserModule";
import spaceReducer from "./SpaceModule";
import reviewReducer from "./ReviewModule";
import reviewDetailReducer from "./ReviewDetailModule";

const rootReducer = combineReducers({
    userReducer,
    spaceReducer,
    reviewReducer,
    reviewDetailReducer
});

export default rootReducer;