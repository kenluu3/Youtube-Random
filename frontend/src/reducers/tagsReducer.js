const tagsReducer = (state = [], action) => {
    switch (action.type) {
        case 'tags/ADD':
            return [...state, action.payload];
        case 'tags/REMOVE':
            return state.filter(tag => tag.id !== action.payload);
        case 'tags/CLEAR':
            return [];
        default: 
            return state;
    }
}

export default tagsReducer;