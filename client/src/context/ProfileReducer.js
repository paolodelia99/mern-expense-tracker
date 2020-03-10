export default (state,action) => {
    const {type,payload} = action;

    switch (type) {
        case 'GET_PROFILE':
            return {
                ...state,
                transactionsLoading: false,
                //user: payload.user,
                transactions: payload.transactions
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