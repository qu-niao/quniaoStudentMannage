export const getLocalList = (key) => {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : []
}
export const setLocalData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data))
}