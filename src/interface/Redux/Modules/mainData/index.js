//Ações utilizadas para altera variáveis do estado compartilhado (redux)

export function setUser(data) {
    return {
        type: '@mainData/SET_USER',
        payload: data,
    };
}

export function setConversations(data) {

    return {
        type: '@mainData/SET_CONVERSATIONS',
        payload: data,
    };
}

export function setCurrentConvID(data) {
    return {
        type: '@mainData/SET_CURRENT_CONV_ID',
        payload: data,
    };
}

export function setNewUserAdded(data) {
    return {
        type: '@mainData/SET_NEW_USER_ADDED',
        payload: data,
    };
}

export function resetState() {
    return {
        type: '@mainData/RESET_STATE',
    };
}