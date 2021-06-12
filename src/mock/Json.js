/**
 *  模拟服务端数据
 */

/* 首页轮播图 */
const carouselList = [
  {
    src: "/static/index/lunbo1.jpg",
  },
  {
    src: "/static/index/lunbo2.jpg",
  },
  {
    src: "/static/index/lunbo3.jpg",
  },
];

// 模拟公告/游戏记录等列表消息。
const msgList = {
  page1: {
    curPage: 1,
    totalPage: 2,
    data: [
      { id: 1, content: "1111" },
      { id: 2, content: "2" },
      { id: 3, content: "3" },
      { id: 4, content: "4" },
      { id: 5, content: "5" },
    ],
  },
  page2: {
    curPage: 2,
    totalPage: 2,
    data: [
      { id: 6, content: "6" },
      { id: 7, content: "7" },
      { id: 8, content: "8" },
      { id: 9, content: "9" },
      { id: 10, content: "10" },
    ],
  },
};

export default {
  carouselList,
  msgList,
};
