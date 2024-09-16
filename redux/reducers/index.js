// reducers/index.js
import { combineReducers } from "redux";
import contactReducer from "./contact";
import authReducer from "./auth";
import userReducer from "./user";
import subscriptionsReducer from "./subscriptions";
import contactUs from "./contactUs";
import chatReducer from "./chat";

const rootReducer = combineReducers({
    contact: contactReducer,
    auth: authReducer,
    user: userReducer,
    contactUs: contactUs,
    chat: chatReducer,
})

export default rootReducer;