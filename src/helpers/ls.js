export const setToLS = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}

export const getFromLS = key => localStorage.getItem(key)
