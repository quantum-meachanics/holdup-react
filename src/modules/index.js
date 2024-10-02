import { combineReducers } from "redux";
import userReducer from "./UserModule";
import spaceReducer from "./SpaceModule";
import reviewReducer from "./ReviewModule";
import reviewDetailReducer from "./ReviewDetailModule";
import reviewcreateReducer from "./ReviewCreateModule";
import spacePageReducer from "./SpacePageModule";
import spaceDetailReducer from "./SpaceDetailModule";

const rootReducer = combineReducers({
    userReducer,
    spaceReducer,
    spacePageReducer,
    spaceDetailReducer,
    reviewReducer,
    reviewDetailReducer,
    reviewcreateReducer});

export default rootReducer;