/*
    tagItem structure: {
        id: (Integer),
        item: "Text",
    }
*/
export const addTag = (tagItem) => {
    return {
        type: 'tags/ADD',
        payload: tagItem
    }
}

export const removeTag = (tagId) => {
    return {
        type: 'tags/REMOVE',
        payload: tagId
    }
}

export const clearTags = () => {
    return {
        type: 'tags/CLEAR'
    }
}