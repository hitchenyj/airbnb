import PropTypes from 'prop-types'
import React, { memo, useEffect, useState } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'

import { BrowserWrapper } from './style'
import IconClose from '@/assets/svg/icon_close'
import IconArrowLeft from '@/assets/svg/icon-arrow-left'
import IconArrowRight from '@/assets/svg/icon-arrow-right'
import IconTriangleArrowDown from '@/assets/svg/icon-triangle-arrow-down'
import Indicator from '../indicator'
import classNames from 'classnames'
import IconTriangleArrowUp from '@/assets/svg/icon-triangle-arrow-up'

const PictureBrowser = memo((props) => {
  const { pictureUrls, closeClick } = props
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isNext, setIsNext] = useState(true)
  const [showList, setShowList] = useState(true)

  // 当图片浏览器展示出来时, 滚动的功能消失
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  /** 事件监听的逻辑 */
  function closeBtnClickHandle() {
    if (closeClick) {
      closeClick()
    }
  }

  function controlClickHandle(isNext = true) {
    let newIndex = isNext ? currentIndex + 1 : currentIndex - 1
    if (newIndex < 0) newIndex = pictureUrls.length - 1
    if (newIndex > pictureUrls.length - 1) newIndex = 0
    setCurrentIndex(newIndex)
    setIsNext(isNext)
  }

  function listItemClickHandle(index) {
    setIsNext(index > currentIndex)
    setCurrentIndex(index)
  }

  return (
    <BrowserWrapper isNext={isNext} showList={showList}>
      <div className='top'>
        <div className='close-btn' onClick={closeBtnClickHandle}>
          <IconClose/>
        </div>
      </div>
      <div className='slider'>
        <div className='control'>
          <div className='btn left' onClick={e => controlClickHandle(false)}>
            <IconArrowLeft width="77" height="77"/>
          </div>
          <div className='btn right' onClick={e => controlClickHandle(true)}>
            <IconArrowRight width="77" height="77"/>
          </div>
        </div>
        <div className='picture'>
          {/* 当点击上一个/下一个按钮时,这里会切换图片的地址, 怎么在图片地址切换的过程中,给它添加动画效果?
              可以使用一个库: react-transition-group, 可以使用这个库完成过渡动画的效果, 
              就是当下面的图片url地址在切换时给它一个过渡动画
              1 如果是一个东西,只是在显示和隐藏之间切换的话,这时可以使用: CSSTransition, CSSTransition里有一个in属性,in属性可以传入以一个布尔boolean类型,它就可以在显示 和 隐藏之间做一个过渡动画的效果了
              2 但是, 这里不是要在显示和隐藏之间切换,而是要切换img里面的内容 (讲课时,当时搞了一个登录和注册的按钮,在登录和注册两个之间切换), 这时, 可以使用 SwitchTransition, SwitchTransition可以在内容切换的时候,在两个内容之间做一个过渡动画的效果. 
                这里更适合使用SwitchTransition.
                SwitchTransition里面有一个 mode属性, mode可以做两个动画: in-out / out-in
                in-out: 是新的东西先进入,另外一个东西再离开
                注意: SwitchTransition 里面不能放元素, 它里面放的是 CSSTransition
                CSSTransition 接收几个属性:
                  (1) 如果单纯是CSSTransition,接收一个in属性, 但是在这里,因为是要切换里面的内容,所以这里不能使用in, 而是使用 key, 通过key的不同,来给它切换动画. 可以再切换动画的时候,把内容给key就可以了
                  (2) 再增加一个classNames,根据class来给它做过渡动画
                  (3) timeout是必传的属性, 过度动画的时间
              3 还学习过一个 TransitionGroup, 是一个列表, 如果有一组数据想要做动画的话可以使用TransitionGroup
          */}
          <SwitchTransition mode='in-out'>
            <CSSTransition
              key={pictureUrls[currentIndex]}
              classNames="pic"
              timeout={200}
            >
              <img src={pictureUrls[currentIndex]} alt="" />
            </CSSTransition>
          </SwitchTransition>
        </div>
      </div>
      <div className='preview'>
        <div className='info'>
          <div className='desc'>
            <div className='count'>
              <span>{currentIndex + 1}/{pictureUrls.length}:</span>
              <span>room apartment图片{currentIndex + 1}</span>
            </div>
            <div className='toggle' onClick={e => setShowList(!showList)}>
              <span>{showList ? "隐藏" : "显示"}照片列表</span>
              {showList ? <IconTriangleArrowDown/> : <IconTriangleArrowUp/>}
            </div>
          </div>
          <div className='list'>
            <Indicator selectIndex={currentIndex}>
              {
                pictureUrls.map((item, index) => {
                  return (
                    <div 
                      className={classNames("item", { active: currentIndex === index})} 
                      key={item}
                      onClick={e => listItemClickHandle(index)}
                    >
                      <img src={item} alt="" />
                    </div>
                  )
                })
              }
            </Indicator>
          </div>
        </div>
      </div>
    </BrowserWrapper>
  )
})

PictureBrowser.propTypes = {
  pictureUrls: PropTypes.array
}

export default PictureBrowser