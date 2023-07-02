const initialState = {
    user:{},
    conversations:[],
    currentConvID:null,
    newContactAdded:false,
  };
  
  export const mainData = (state = initialState, action) => {
  
    switch (action.type) {
      case "@mainData/SET_USER":
        return {
          ...state,
          user: action.payload,
        };
      case "@mainData/SET_CONVERSATIONS":
        return {
          ...state,
          conversations: action.payload,
        };
  
      case "@mainData/SET_CURRENT_CONV_ID":
        return {
          ...state,
          currentConvID: action.payload,
        };

      case "@mainData/SET_NEW_USER_ADDED":
      return {
        ...state,
        newContactAdded: !state.newContactAdded,
      };

      case "@mainData/RESET_STATE":
        return initialState;
      default:
        return state;
    }
  };