import {createSlice} from "@reduxjs/toolkit";
import React from "react";

export const defaultModalConfig = {
    isVisible: false,
    params: {
        header: "",
        subHeader: "",
        isName: true,
        isPhone: true,
        button: "Бесплатная консультация",
        isTextArea: false
    }
}

export const dataSlice = createSlice({
    name: "dataStore",
    initialState: {
        scrollPosition: 0,
        isMenuExpanded: false,
        isModalVisible: false,
        modal: defaultModalConfig
    },
    reducers: {
        setScrollPosition: (state, action) => {
            state.scrollPosition = action.payload
        },
        setMenuExpanded: (state, action) => {
            state.isMenuExpanded = !!action.payload;
        },
        setModal: (state, action) => {
            state.modal = action.payload; // mutation ??? = [ ... action.payload]
        },
        setModalVisible: (state, action) => {
            state.modal.isVisible = !!action.payload;
        },
        setModalParams: (state, action) => {
            state.modal.params = action.payload; // mutation ??? [ ... action.payload]
        }
    }
});

export const {setScrollPosition, setMenuExpanded, setModal, setModalVisible, setModalParams} = dataSlice.actions;

export const getScrollPosition = state => state.rootReducer.scrollPosition;
export const getMenuExpanded = state => state.rootReducer.isMenuExpanded;
export const getModal = state => state.rootReducer.modal;
export const getModalVisible = state => state.rootReducer.modal.isVisible;
export const getModalParams = state => state.rootReducer.modal.params;

export default dataSlice.reducer;
