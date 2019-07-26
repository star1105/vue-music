import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
// import axios from 'axios'
export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  // console.log(jsonp(url, data, options))
  return jsonp(url, data, options)
}

export function getDiscList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

  const data = Object.assign({}, {
    g_tk: 5381,
    uin: 0,
    inCharset: 'utf-8',
    outCharset: 'utf-8¬ice=0',
    platform: 'h5',
    needNewCode: 1,
    tpl: 3,
    page: 'detail',
    type: top,
    topid: 27,
    _: 1519963122923
  })
  // console.log(jsonp(url, data, options))
  return jsonp(url, data, options)
}

// export function getDiscList() {
//   // const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8¬ice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=27&_=1519963122923'
//   // return axios.get(url).then((res) => {
//   //   return Promise.resolve(res.data)
//   // }
//   const url = '/api/getDisclist'
//   const data = Object.assign({}, {
//     g_tk: 5381,
//     uin: 0,
//     inCharset: 'utf-8',
//     outCharset: 'utf-8¬ice=0',
//     platform: 'h5',
//     needNewCode: 1,
//     tpl: 3,
//     page: 'detail',
//     type: top,
//     topid: 27,
//     _: 1519963122923
//   })
//   return axios.get(url, {
//     params: data
//   }).then((res) => {
//     console.log(res.data)
//     // return Promise.resolve(res.data)
//   })
// }

// export function getDiscList() {
//   const url = '/api/getDisclist'

//   const data = Object.assign({}, commonParams, {
//     platform: 'yqq',
//     hostUin: 0,
//     sin: 0,
//     ein: 29,
//     sortId: 5,
//     needNewCode: 0,
//     categoryId: 10000000,
//     rnd: Math.random(),
//     format: 'json'
//   })

//   return axios.get(url, {
//     params: data
//   }).then((res) => {
//     return Promise.resolve(res.data)
//   })
// }