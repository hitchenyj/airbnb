import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'

import IconLogo from '@/assets/svg/icon_log'
import { LeftWrapper } from './style'

const HeaderLeft = memo(() => {
  const navigate = useNavigate()
  function logoClickHandle() {
    navigate("/home")
  }

  return (
    <LeftWrapper>
      <div className='logo' onClick={logoClickHandle}>
        <IconLogo/>
      </div>
    </LeftWrapper>
  )
})

export default HeaderLeft