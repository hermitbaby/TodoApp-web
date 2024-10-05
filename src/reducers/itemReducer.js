import { GET_MY_FEED, GET_ITEMS, STORE_SUB, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING, ITEMS_SELECT, UPDATE_ITEM, GET_SUB_LISTS  } from '../actions/types';

const inititalState = {
    items: [],
    loading: false,
    feed:[],
    subLists: [], // all avaiable list to subscribe
    subscribedList: [], // user subscribed list
};

const excludeCurrentUserName = 'jack'

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

        case GET_MY_FEED: {
            return {
                ...state,
                feed: action.payload,
                loading: false,
            };
        }

        case GET_SUB_LISTS: {
            // exclude current user
            const subList = action.payload.filter((item) => ('name' in item) && !item.name.includes(excludeCurrentUserName));

            console.info(subList);

            return {
                ...state,
                subLists: subList,
                loading: false,
            };
        }

        case STORE_SUB: {
            return {
                ...state,
                subscribedList: action.payload,
                loading: false,
            };
        }

        

        default: return state;
    }
}