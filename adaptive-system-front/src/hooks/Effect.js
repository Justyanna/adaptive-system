import { useEffect } from 'react'

export const useAssync = (
  fun,
  dep,
  callback,
  error = e => {
    console.log(e)
  }
) => {
  useEffect(() => {
    let mounted = true
    fun()
      .then(res => {
        if (!mounted) return
        callback(res)
      })
      .catch(error)
    return () => {
      mounted = false
    }
  }, dep)
}
