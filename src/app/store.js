import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const reducer = combineReducers({
    user: userReducer,
  });
  
const Store = () => {
    return createStore(
      reducer,
      compose(applyMiddleware(thunk))
    );
};

export default Store;

