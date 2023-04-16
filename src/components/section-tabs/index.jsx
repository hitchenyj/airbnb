import PropTypes from 'prop-types'
import React, { memo, useState } from 'react'
import { TabsWrapper } from './style'
import classNames from 'classnames'
import ScrollView from '@/base-ui/scroll-view/ScrollView'

const SectionTabs = memo((props) => {
  const { tabNames = [], tabClick } = props
  const [ currentIndex, setCurrentIndex ] = useState(0)

  function itemClickHandle(index, item) {
    setCurrentIndex(index) //记录当前哪一项是选中的
    tabClick(index, item)
  }

  /** 还需要把内部切换的事件传递出去, 外面父组件就会根据当前切换的索引, 或者当前切换之后的名字来外界修改不同的数据 */

  return (
    <TabsWrapper>
      <ScrollView>
        {
          tabNames.map((item, index) => {
            return (
              <div 
                key={index}
                /** 这里使用classnames库:能方便地动态添加某些class,当然这里自己动态做逻辑判断也是OK的,做起来稍麻烦, classNames("item"),"item"是肯定要加的, 另外一些是动态添加的: 要传入一个对象 
                 * 前面写上一个key(active),后面的值为true时加上这个东西,为false时不加 */
                className={classNames('item', { active: index === currentIndex })}
                onClick={e => itemClickHandle(index, item)}
              >
                {item}
              </div>
            )
          })
        }
      </ScrollView>
    </TabsWrapper>
  )
})

SectionTabs.propTypes = {
  tabNames: PropTypes.array
}

export default SectionTabs