import * as types from './mutation-types'

export const selectPlay = function({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list) // 顺序播放
  commit(types.SET_PLAYLIST, list) // 播放列表
  commit(types.SET_CURRENT_INDEX, index) // 播放的索引
  commit(types.SET_FULL_SCREEN, true) // 播放器打开
  commit(types.SET_PLAYING_STATE, true) // 播放状态
}