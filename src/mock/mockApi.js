// 模拟api请求
import API from "./index.js";
// 引入模拟服务端数据
import Json from "./Json.js";

export function login({ username, password }) {
  return API(username, password);
}

//游戏列表
export function getGames() {
  return API(Json.games);
}
