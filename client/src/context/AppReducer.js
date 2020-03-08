export default (state,action) => {
    const {type,payload} = action;

    switch (type) {
        case 'GET_TRANSACTIONS':
            return {
                ...state,
                loading: false,
                transactions: payload
            };
        case 'ADD_TRANSACTION':
            return {
                ...state,
                transactions: [...state.transactions, payload]
            };
        case 'DELETE_TRANSACTION':
            return {
                ...state,
                transactions: state.transactions.filter(transaction => transaction._id !== payload)
            };
        case 'TRANSACTION_ERROR':
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}