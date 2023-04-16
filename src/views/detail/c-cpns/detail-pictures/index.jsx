import React, { memo, useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux'

import { PicturesWrapper } from './style'
import PictureBrowser from '@/base-ui/picture-browser'

const DetailPictures = memo(() => {
  /** 定义组件内部的状态 */
  const [showPicBrowser, setShowPicBrowser] = useState(false)

  /** 从redux里获取数据 */
  const { detailInfo } = useSelector((state) => ({
    detailInfo: state.detail.detailInfo
  }), shallowEqual)

  return (
    <PicturesWrapper>
      <div className='pictures'>
        <div className='left'>
          <div className='item' onClick={e => setShowPicBrowser(true)}>
            <img src={detailInfo?.picture_urls?.[0]} alt="" />
            <div className='cover'></div>
          </div>
        </div>
        <div className='right'>
          {
            detailInfo.picture_urls?.slice(1, 5).map((item) => {
              return (
                <div className='item' key={item} onClick={e => setShowPicBrowser(true)}>
                  <img src={item} alt="" />
                  <div className='cover'></div>
                </div>
              )
            })
          }
        </div>
      </div>
      
      <div className='show-btn' onClick={e => setShowPicBrowser(true)}>显示照片</div>
      { showPicBrowser && (
        <PictureBrowser 
          pictureUrls={detailInfo.picture_urls} 
          closeClick={e => setShowPicBrowser(false)}
        /> 
      )}
    </PicturesWrapper>
  )
})

export default DetailPictures