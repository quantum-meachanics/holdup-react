import { combineReducers } from "redux";
import userReducer from "./UserModule";
import spaceReducer from "./SpaceModule";
import reviewReducer from "./ReviewModule";

const rootReducer = combineReducers({
    userReducer,
    spaceReducer,
    reviewReducer
});

export default rootReducer;