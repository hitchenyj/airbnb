import React, { memo, useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { fetchHomeDataAction } from '@/store/modules/home'
import HomeBanner from './c-cpns/home-banner'
import { HomeWrapper } from './style'
import HomeSectionV1 from './c-cpns/home-section-v1'
import HomeSectionV2 from './c-cpns/home-section-v2'
import HomeLongfor from './c-cpns/home-longfor'
import HomeSectionV3 from './c-cpns/home-section-v3'
import AppHeader from '@/components/app-header'
import { changeHeaderConfigAction } from '@/store/modules/main'

const Home = memo(() => {
  /** 从redux中获取数据 */
  const { goodPriceInfo, highScoreInfo, discountInfo, recommendInfo, longforInfo, plusInfo } = useSelector((state) => ({
    goodPriceInfo: state.home.goodPriceInfo,
    highScoreInfo: state.home.highScoreInfo,
    discountInfo: state.home.discountInfo,
    recommendInfo: state.home.recommendInfo,
    longforInfo: state.home.longforInfo,
    plusInfo: state.home.plusInfo
  }), shallowEqual)

  /** 派发异步事件: 发送网络请求 */
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchHomeDataAction("xxxx"))
    dispatch(changeHeaderConfigAction({ isFixed: true, topAlpha: true }))
  }, [dispatch])

  const getInitialCity = destAddr => destAddr[0].name

  return (
    <HomeWrapper>
      <AppHeader/>
      <HomeBanner/>
      <div className='content'>
        {/* 折扣数据 */}
        { 
          discountInfo.dest_address && 
          <HomeSectionV2 
            infoData={discountInfo} 
            initialCity={getInitialCity(discountInfo.dest_address)}
          />
        }
        {/* 热门推荐数据 */}
        {
          recommendInfo.dest_address && 
          <HomeSectionV2
            infoData={recommendInfo}
            initialCity={getInitialCity(recommendInfo.dest_address)}
          />
        }
        <HomeLongfor infoData={longforInfo}/>
        <HomeSectionV1 infoData={goodPriceInfo}/>
        <HomeSectionV1 infoData={highScoreInfo}/>
        <HomeSectionV3 infoData={plusInfo}/>
      </div>
    </HomeWrapper>
  )
})

export default Home