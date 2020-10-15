export const stocksReducer = (state, action) => {
  const newState = [...state];
  switch(action.type) {
    case 'BUY_STOCK':
      if (newState[action.itemIndex].buyDay > 0) {
        newState[action.itemIndex] = {...state[action.itemIndex], owned: +state[action.itemIndex].owned + +action.amount}
      } else {
        newState[action.itemIndex] = {...state[action.itemIndex], owned: +state[action.itemIndex].owned + +action.amount, buyDay: action.day}
      }
      return [...newState]
    case 'SELL_STOCK':
      const newOwned= +state[action.itemIndex].owned - +action.amount
      if (newOwned === 0) {
        newState[action.itemIndex] = {...state[action.itemIndex], owned: newOwned, buyDay: 0}
      } else {
        newState[action.itemIndex] = {...state[action.itemIndex], owned: newOwned}
      }
      return [...newState]
    case 'NEW_PRICES':
      return action.state
    default:
      return state
  }
}