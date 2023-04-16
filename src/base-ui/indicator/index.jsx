import PropTypes from 'prop-types'
import React, { memo, useEffect, useRef } from 'react'
import { IndicatorWrapper } from './style'

const Indicator = memo((props) => {
  const { selectIndex = 0 } = props
  const contentRef = useRef()
  
  // const indicatorRef = useRef()
  useEffect(() => {
    // 1. 先获取selectIndex对应的item
    const selectItemEl = contentRef.current.children[selectIndex]
    const itemLeft = selectItemEl.offsetLeft
    const itemWidth = selectItemEl.clientWidth
    // 2. content的宽度
    const contentWidth = contentRef.current.clientWidth
    const contentScroll = contentRef.current.scrollWidth
    const totalDistance = contentScroll - contentWidth

    // 3. 获取selectIndex要滚动的距离
    let distance = itemLeft + itemWidth * 0.5 - contentWidth * 0.5
    // 4. 特殊情况的处理
    if (distance < 0)             // content左边部分的特殊情况处理
      distance = 0 
    if (distance > totalDistance) // content右边部分的特殊情况处理
      distance = totalDistance

    // 5. 改变位置
    contentRef.current.style.transform = `translate(${-distance}px)`
  }, [selectIndex]) // 等到当前组件的内容渲染完了,看一下selectIndex有没有发生改变

  return (
    <IndicatorWrapper>
      <div className='i-content' ref={contentRef}>
        {
          props.children
        }
      </div>
    </IndicatorWrapper>
  )
})

Indicator.propTypes = {
  selectIndex: PropTypes.number
}

export default Indicator