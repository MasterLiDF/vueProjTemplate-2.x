/* eslint-disable */
// localStorage
export const setLocalCache = (key, value) => {
  let str = null;
  try {
    str = JSON.stringify(value);
  } catch (err) {}
  return localStorage.setItem(key, str);
};

/**
 * 带有过期时间的本地存储
 * time:秒
 */
export const setLocalCacheWithTime = (key,value,time) => {
  let endTime = new Date().getTime() + time * 1000;
  setLocalCache(key,value);
  setLocalCache(`_expire_${key}`,endTime)
}

export const getLocalCache = key => {
  let expire_val = JSON.parse(localStorage.getItem(`_expire_${key}`))
  if(expire_val == null){
    return JSON.parse(localStorage.getItem(key)); 
  }
  return expire_val < new Date().getTime() ? null : JSON.parse(localStorage.getItem(key));
};

export const removeLocalCache = key => {
  localStorage.removeItem(key);
};

export const clearLocalCache = () => {
  return localStorage.clear();
};


