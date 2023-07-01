//Ações utilizadas para altera variáveis do estado compartilhado (redux)

export function setUser(data) {
    return {
        type: '@mainData/SET_USER',
        payload: data,
    };
}

export function setConversations(data) {
    return {
        type: '@mainData/SET_CONVERSATION',
        payload: data,
    };
}

export function setCurrentConvID(data) {
    return {
        type: '@mainData/SET_CURRENT_CONV_ID',
        payload: data,
    };
}

export function resetState() {
    return {
        type: '@mainData/RESET_STATE',
    };
}