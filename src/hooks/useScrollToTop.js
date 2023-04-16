import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export function useScrollToTop() {
  const location = useLocation()  // useLocation()是router里面的
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])  // location里有个属性pathname,它是监听路径有没有发生改变的,路径发生改变,页面会切换
}