import {playMode} from 'common/js/config'

const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  mockMusic: 'http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C400003iHc0e2UIgMC.m4a?guid=5968966040&vkey=08DBA4A28F02B1A6A75F532108C029E4238065CB0989145461AA177152E3793D1C2D7E4CC88920A31F350C53E4D9C89D1A866BF13880C07D&uin=0&fromtag=38'
}

export default state