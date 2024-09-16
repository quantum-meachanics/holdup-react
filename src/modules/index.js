import { combineReducers } from "redux";
import userReducer from "./UserModule";
import spaceReducer from "./SpaceModule";

const rootReducer = combineReducers({
    userReducer,
    spaceReducer
});

export default rootReducer;