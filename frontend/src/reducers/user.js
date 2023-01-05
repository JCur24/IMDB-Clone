const initialState = {
  user: null
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'set-user':
      return({
        user: action.user
      });
    case 'logout':
      return({
        user : null
      })
    default:
      return(state);
  }
}

export default user;