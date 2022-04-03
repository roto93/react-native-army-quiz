import * as Action from '../actions'

const initState = {
  type: '全部'
}

const typeReducer = (state = initState, action) => {
  switch (action.type) {
    case Action.SET_TYPE:
      return { type: action.payload.type }
    default: return state
  }
}

export default typeReducer