export const checkValidToken = () => {
  if(!localStorage.getItem("accessToken")) return false
  const now = new Date().getTime()
  const timeLogin = Number(localStorage.getItem("accessTime"))
  if(now - timeLogin > 30 * 60 * 1000) return false
  return true
}