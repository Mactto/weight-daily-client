import * as types from './types'

export const setTodayLogId = (id: string) => ({
  type: types.SET_TODAY_LOG_ID,
  payload: id,
})
