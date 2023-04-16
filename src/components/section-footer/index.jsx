import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { FooterWrapper } from './style'
import IconMoreArrow from '@/assets/svg/icon-more-arrow'
import { useNavigate } from 'react-router-dom'

const SectionFooter = memo((props) => {
  const { name } = props

  let showMessage = "显示全部"
  if (name) {
    showMessage = `显示更多${name}房源`
  }

  /** 事件处理的逻辑, 跳转到更多页, 路由跳转,所以要使用navigate() */
  const navigate = useNavigate()
  function moreClickHandle(params) {
    navigate("/entire")
  }

  return (
    <FooterWrapper color={name ? "#00848A" : "#000"}>
      <div className='info' onClick={moreClickHandle}>
        <span className='text'>{showMessage}</span>
        <IconMoreArrow/>
      </div>
    </FooterWrapper>
  )
})

SectionFooter.propTypes = {
  name: PropTypes.string
}

export default SectionFooter