import React, { memo } from 'react'
import { BannerWrapper } from './style'
// import coverImg from '@/assets/img/cover_01.jpeg'

const HomeBanner = memo(() => {
  return (
    <BannerWrapper>
      {/* webpack没法直接在src中引入图片,webpack打包之后找不到,引入图片需要使用 import */}
      {/* <img src="@/assets/img/cover_01.jpeg" alt="" /> */}
      {/* <img src={coverImg} alt="" /> */}
    </BannerWrapper>
  )
})

export default HomeBanner