import { useEffect, useState } from "react";
import { throttle } from "underscore"

export function useScrollPosition() {
  // 两个状态记录位置
  const [scrollX, setScrollX] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  // 监听window的滚动
  useEffect(() => {
    const handleScroll = throttle(function() {
      setScrollX(window.scrollX)
      setScrollY(window.scrollY)
    }, 100) // 100ms内只执行一次 
    
    // 这里addEventListener监听到的 "scroll"事件 执行的很频繁,可以对 handleScroll函数做节流(throttle)操作
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // 返回
  return {scrollX, scrollY}
}