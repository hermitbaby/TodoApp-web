import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING, ITEMS_SELECT, UPDATE_ITEM  } from '../actions/types';

const inititalState = {
    items: [],
    loading: false,

};

export default function itemReducer(state = inititalState, action) {
    // console.info(action.payload);
    switch (action.type) {
        
        case GET_ITEMS: {
            return {
                ...state,
                items: action.payload,
                loading: false,
            };
        }
        case ADD_ITEM: {
            return {
                ...state,
                items: [action.payload, ...state.items],
            };
        }
        case DELETE_ITEM: {
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload),
            };
        }
        case ITEMS_LOADING: {
            return {
                ...state,
                loading: true,
            };
        }
        case ITEMS_SELECT: {
            return {
                ...state,
                items: state.items.map(item => 
                    item.id === action.payload ? { ...item, isSelect: !item.isSelect } : item
                )
            };
        }
        case UPDATE_ITEM: {
            return {
                ...state,
                items: state.items.map(item => 
                    item.id === action.payload ? { ...item, state: 'done' } : item
                )
            };
        }
        default: return state;
    }
}