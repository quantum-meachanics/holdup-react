import { combineReducers } from "redux";
import userReducer from "./UserModule";
import spaceReducer from "./SpaceModule";
import reviewReducer from "./ReviewModule";
import reviewDetailReducer from "./ReviewDetailModule";
import reviewcreateReducer from "./ReviewCreateModule";

const rootReducer = combineReducers({
    userReducer,
    spaceReducer,
    reviewReducer,
    reviewDetailReducer,
    reviewcreateReducer
});

export default rootReducer;