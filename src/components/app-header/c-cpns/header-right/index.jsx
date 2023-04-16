import IconAvatar from '@/assets/svg/icon_avatar'
import IconGlobal from '@/assets/svg/icon_global'
import IconMenu from '@/assets/svg/icon_menu'
import React, { memo, useEffect, useState } from 'react'
import { RightWrapper } from './style'

const HeaderRight = memo(() => {
  /** 定义组件内部的状态: panel要在显示和隐藏之间切换,所以要有一个状态来记录它的状态 */
  const [showPanel, setShowPanel] = useState(false)
  
  /**
   * 副作用代码, 它不需要依赖别人,只需要执行一次,所以第二个参数(依赖条件)写上一个[]空数组
  */
 useEffect(() => {
    function windowClickHandle() {
      setShowPanel(false)
    }
    window.addEventListener("click", windowClickHandle, true) // 监听

    return () => { //取消监听
      window.removeEventListener("click", windowClickHandle, true)
    }
  }, [])

  /** 事件处理函数 */
  function profileClickHandle(event) {
    setShowPanel(true)
    // event.stopPropagation() // 实现profileClickHandle方法二, 阻止事件冒泡
  }

  return (
    <RightWrapper>
      <div className='btns'>
        <span className='btn'>登录</span>
        <span className='btn'>注册</span>
        <span className='btn'>
          <IconGlobal/>
        </span>
      </div>

      <div className='profile' onClick={profileClickHandle}>
        <IconMenu/>
        <IconAvatar/>

        { showPanel && (
          <div className='panel'>
            <div className='top'>
              <div className='item register'>注册</div>
              <div className='item login'>登录</div>
            </div>
            <div className='bottom'>
              <div className='item'>出租房源</div>
              <div className='item'>开展体验</div>
              <div className='item'>帮助</div>
            </div>
          </div>
        ) }
      </div>
    </RightWrapper>
  )
})

export default HeaderRight