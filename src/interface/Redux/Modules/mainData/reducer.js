const initialState = {
    user:{},
    conversations:[],
    currentConvID:null
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
          conversation: action.payload,
        };
  
      case "@mainData/SET_CURRENT_CONV_ID":
        return {
          ...state,
          currentConvID: action.payload,
        };

      case "@mainData/RESET_STATE":
        return initialState;
      default:
        return state;
    }
  };