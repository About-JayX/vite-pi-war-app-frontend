import React, { useEffect } from 'react'

const useResetPage = () => {
  useEffect(() => {
    console.log('enter use ResetPage_')

    const handleFocusIn = () => {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        console.log("is ios_");
        
        // 软键盘弹起的事件处理
        setTimeout(() => {
          document.body.className = 'inTouch'
        }, 100)
      }
    }

    const handleFocusOut = () => {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        // 软键盘收起的事件处理
        setTimeout(() => {
          const scrollHeight =
            document.documentElement.scrollTop || document.body.scrollTop || 0
          window.scrollTo(0, Math.max(scrollHeight - 1, 0))
          document.body.className = 'noTouch'
        }, 100)
      }
    }

    document.body.addEventListener('focusin', handleFocusIn)
    document.body.addEventListener('focusout', handleFocusOut)

    // 清除副作用
    return () => {
      document.body.removeEventListener('focusin', handleFocusIn)
      document.body.removeEventListener('focusout', handleFocusOut)
    }
  }, [])
}

export default useResetPage
