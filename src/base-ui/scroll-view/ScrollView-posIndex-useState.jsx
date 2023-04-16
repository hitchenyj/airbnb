import React, { memo, useEffect, useRef, useState } from 'react'
import { ViewWrapper } from './style'

const ScrollView = memo((props) => {
  /** 定义内部的状态 */
  const [ showLeft, setShowLeft ] = useState(false)
  const [ showRight, setShowRight ] = useState(false)
  const [ posIndex, setPosIndex ] = useState(0)
  const totalDistanceRef = useRef(0)

  /** 组件渲染完毕, 判断是否显示右侧的按钮 */
  const scrollContentRef = useRef()
  useEffect(() => {
    const scrollWidth = scrollContentRef.current.scrollWidth // 拿到scroll-content一共可滚动的宽度
    const clientWidth = scrollContentRef.current.clientWidth // 本身占据的宽度
    const totalDistance = scrollWidth - clientWidth
    setShowRight(totalDistance > 0)
    totalDistanceRef.current = totalDistance
  }, [props.children]) // 一旦 ScrollView组件内部的children发生变化,就要重新执行;否则只会在开始时执行一次

  function controlClickHandle(isRight) {
    const newIndex = isRight? posIndex + 1 : posIndex - 1
    const newEl = scrollContentRef.current.children[newIndex]
    const newOffsetLeft = newEl.offsetLeft
    scrollContentRef.current.style.transform = `translate(-${newOffsetLeft}px)`
    setPosIndex(newIndex)
    // 是否继续显示右边的按钮
    setShowRight(totalDistanceRef.current > newOffsetLeft)
    setShowLeft(newOffsetLeft > 0)
  }

  return (
    <ViewWrapper>
      {showLeft && <button onClick={e => controlClickHandle(false)}>左边按钮</button>}
      {showRight && <button onClick={e => controlClickHandle(true)}>右边按钮</button>}

      {/* ScrollView里到底要展示什么内容不确定,所以要使用插槽. 以前学习过两种插槽方式:
          (1) 以属性的方式传入插槽内容: props.contentElement
          (2) 另一种更简单的方式是 让外面传入: props.chhildren
      */}
      <div className='scroll-content' ref={scrollContentRef}>
        {props.children}
      </div>
    </ViewWrapper>
  )
})

ScrollView.propTypes = {}

export default ScrollView