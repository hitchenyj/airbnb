import { getEntireRoomList } from '@/services/modules/entire'
import * as actionTypes from './constants'

export const changeCurrentPageAction = (currentPage) => ({
  type: actionTypes.CHANGE_CURRENT_PAGE,
  currentPage
})

export const changeRoomListAction = (roomList) => ({
  type: actionTypes.CHANGE_ROOM_LIST,
  roomList
})

export const changeTotalCountAction = (totalCount) => ({
  type: actionTypes.CHANGE_TOTAL_COUNT,
  totalCount
})

export const changeIsLoadingAction = (isLoading) => ({
  type: actionTypes.CHANGE_IS_LOADING,
  isLoading
})

export const fetchRoomListAction = (page = 0) => {
  // 返回新的函数(待派发), 它接收两个参数(dispatch, getState)
  // 如果给返回的函数加上一个 async, 这个返回的函数就变成了一个异步函数了
  return async (dispatch) => {
    // 0. 修改currentPage
    dispatch(changeCurrentPageAction(page))

    // 1. 根据redux中保存的页码, 获取最新的数据
    // const currentPage = getState().entire.currentPage
    // 一旦给返回的函数加上async, 这里就可以加上 await, 这里代码就可以变成同步形式了,看起来更加优雅一点
    // 偏移offset不一定总是从0开始的,应是动态的,要从redux拿当前页码
    dispatch(changeIsLoadingAction(true))
    const res = await getEntireRoomList(page * 20) 
    dispatch(changeIsLoadingAction(false))
    
    // 2. 获取到最新的数据, 保存到redux的store中
    const roomList = res.list
    const totalCount = res.totalCount
    dispatch(changeRoomListAction(roomList))
    dispatch(changeTotalCountAction(totalCount))
  }
}
  