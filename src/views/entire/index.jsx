import React, { memo, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { EntireWrapper } from './style'
import EntireFilter from './c-cpns/entire-filter'
import EntireRooms from './c-cpns/entire-rooms'
import EntirePagination from './c-cpns/entire-pagination'
import { fetchRoomListAction } from '@/store/modules/entire/actionCreators'
import AppHeader from '@/components/app-header'
import { changeHeaderConfigAction } from '@/store/modules/main'

const Entire = memo(() => {
  // 发送网络请求, 获取数据, 并保存当前的页面等等...
  const dispatch = useDispatch()
  useEffect(() => {
    /** 这里做的本质是在调 fetchRoomListAction()函数, 
     * 而fetchRoomListAction函数有一个返回值, 是一个新的待派发(dispatch)的函数, 
     * 根据react-thunk的原理, 这个被派发dispatch的新的函数会被立即执行, 所以可以在它里面编写网络请求代码
     * 就在这个新的函数里面调用 getEntireRoomList(0)), 
     *  */
    dispatch(fetchRoomListAction())
    dispatch(changeHeaderConfigAction({isFixed: true, topAlpha: false}))
  }, [dispatch])

  return (
    <EntireWrapper>
      <AppHeader/>
      <EntireFilter/>
      <EntireRooms/>
      <EntirePagination/>
    </EntireWrapper>
  )
})

export default Entire