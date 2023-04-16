import PropTypes from 'prop-types'
import React, { memo, useState, useCallback } from 'react'

import { SectionV2Wrapper } from './style'
import SectionHeader from '@/components/section-header'
import SectionRooms from '@/components/section-rooms'
import SectionTabs from '@/components/section-tabs'
import SectionFooter from '@/components/section-footer'

const HomeSectionV2 = memo((props) => {
  /** 从props获取数据 */
  const { infoData, initialCity } = props

  /** 定义内部的state */
  /** 注意: useState()的初始化值 只有在第一次渲染组件时才有作用, 后面再传入任何值都没用了! */
  const [name, setName] = useState(initialCity)
  /** 数据的转换 */
  const tabNames = infoData.dest_address?.map(item => item.name)
  /** 事件处理函数 */
  const tabClickHandle = useCallback(function(index, name) {
    setName(name)
  }, []) 
  
  return (
    <SectionV2Wrapper>
      <SectionHeader title={infoData.title} subtitle={infoData.subtitle}/>
      {/* 子组件把内部发送的一个事件传递给父组件方法: 往子组件内部传入一个函数, 子组件内部回调这个函数.
          当把一个函数传递给一个子组件,这里就要考虑性能优化initialCity的问题: 每次Home组件在重新渲染的时候,这个函数就会定义一个新的函数对象, 每次都是新对象就会造成:就算这里的数据没有修改,子组件的数据也会重新刷新(因为子组件接收了一个新的东西), 这就是useCallback()要解决的性能优化! */}
      <SectionTabs tabNames={tabNames} tabClick={tabClickHandle}/>
      <SectionRooms roomList={infoData.dest_list?.[name]} itemWidth="33.33333%"/>
      <SectionFooter name={name}/>
    </SectionV2Wrapper>
  )
})

HomeSectionV2.propTypes = {
  infoData: PropTypes.object
}

export default HomeSectionV2