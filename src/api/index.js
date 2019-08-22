import {get,post} from '../utils/request'

const API_URL = 'https://test.youbaobao.xyz:18081'

export function getHomeData(params){
  return get(`${API_URL}/book/home/v2`,params)
}

export function recommend(){
  return get(`${API_URL}/book/home/recommend/v2`)
}

export function freeRead(){
  return get(`${API_URL}/book/home/freeRead/v2`)
}

export function hotBook(){
  return get(`${API_URL}/book/home/hotBook/v2`)
}

export function getOpenId(code){
  return get(`${API_URL}/openId/get`,{
    appId:'wx9f7589008014546c',
    secret:'9421bd3b9ca8b0fec4f48564e91bc26f',
    code
  })
}

export function register(openId,userInfo){
  return post(`${API_URL}/user/register`,{
    openId,
    platform:mpvuePlatform,
    ...userInfo
  })
}

export function search(params){
  return get(`${API_URL}/book/search`,params)
}

export function hotSearch(){
  return get(`${API_URL}/book/hot-search`)
}