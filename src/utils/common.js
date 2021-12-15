export const getUser = () => {
    const userStr = sessionStorage.getItem("user");
    if (userStr) return JSON.parse(userStr)
    else return null
}

export const setUserSession = (user) => {
    sessionStorage.setItem("user", JSON.stringify(user))
}

export const removeUserSession = () => {
    sessionStorage.removeItem("user")
}