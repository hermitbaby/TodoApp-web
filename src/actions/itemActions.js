import axios from 'axios';

import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING, ITEMS_SELECT, UPDATE_ITEM } from './types';
// import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

axios.defaults.baseURL = 'http://127.0.0.1:8000/';
const todolist_id = "66e6a949a6adb29da224a811";


const getItems = () => (dispatch, getState) => {
    dispatch(setItemsLoading());
    axios
        .get(`/lists/${todolist_id}/items`)
        .then(res => dispatch(
                {
                    type: GET_ITEMS,
                    payload: res.data,
                }
            )
        )
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

const deleteItem = id => (dispatch, getState) => {
    axios
        .delete(`/lists/${todolist_id}/items/${id}`)
        .then(res => dispatch(
                {
                    type: DELETE_ITEM,
                    payload: id,
                }
            )
        )
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));;
};

const addItem = item => (dispatch, getState) => {
    axios
        .post(`/lists/${todolist_id}/items`, item)
        .then(res => dispatch(
            {
                type: ADD_ITEM,
                payload: res.data,
            }
        )
    )
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));;
};

const updateItem = itemId => (dispatch, getState) => {
    axios
        .put(`/lists/${todolist_id}/items/state/done`, [itemId])
        .then(res => dispatch(
            {
                type: UPDATE_ITEM,
                payload: itemId,
            }
        )
    )
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));;
};

const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING,
    };
};

const selectItem = (id) => {
    return {
        type: ITEMS_SELECT,
        payload: id,
    };
};

export {
    getItems,
    deleteItem,
    addItem,
    setItemsLoading,
    selectItem,
    updateItem
}