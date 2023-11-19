import * as types from './types'

interface State {
  todayLogId: string | null
}

const initialState: State = {
  todayLogId: null,
}

type Action = {
  type: string
  payload: string
}

const rootReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case types.SET_TODAY_LOG_ID:
      return {
        ...state,
        todayLogId: action.payload,
      }
    default:
      return state
  }
}

export default rootReducer
