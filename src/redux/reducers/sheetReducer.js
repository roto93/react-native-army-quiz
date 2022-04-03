import * as Action from '../actions'

const initState = { sheet: 'all' }

const sheetReducer = (state = initState, action) => {
  switch (action.type) {
    case Action.SET_SHEET:
      return { sheet: action.payload.sheet }
    default: return state
  }
}

export default sheetReducer