export default (state={user:'e'}, action) => {
  switch (action.type) {
    case 'user':
      {
        return {
          user:'lalla',
          ...state
        }
      }
    default:
      {
        return state;
      }
  }
}