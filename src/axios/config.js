/**
 * Created by 叶子 on 2017/7/30.
 * 接口地址配置文件
 */

//easy-mock模拟数据接口地址
const EASY_MOCK = 'https://www.easy-mock.com/mock';
const MOCK_AUTH = EASY_MOCK + '/597b5ed9a1d30433d8411456/auth'; // 权限接口地址
const testUrl = 'http://localhost:3000/';
export const MOCK_AUTH_ADMIN = MOCK_AUTH + '/admin'; // 管理员权限接口
export const MOCK_AUTH_VISITOR = MOCK_AUTH + '/visitor'; // 访问权限接口

// github授权
export const GIT_OAUTH = 'https://github.com/login/oauth';
// github用户
export const GIT_USER = 'https://api.github.com/user';

// bbc top news
export const NEWS_BBC =
    'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=429904aa01f54a39a278a406acf50070';
//用户表s
export const GET_USERS =
    testUrl + 'admin/getUsers';
export const SET_USERS =
    testUrl + 'admin/setUsers';
export const GET_ANNOUNCE =
    testUrl + 'admin/getAnnouncement';
export const SET_ANNOUNCE =
    testUrl + 'admin/setAnnouncement';
export const GET_ADS =
    testUrl + 'admin/getAds';
export const GET_NEW =
    testUrl + 'admin/getHotConfig';
export const SET_ADS =
    testUrl + 'admin/setAdSetting';
export const SET_NEW =
    testUrl + 'admin/setHotConfig';
export const SAVE_NEW =
    testUrl + 'admin/saveHotConfig';
export const DEL_NEW =
    testUrl + 'admin/delHotConfig';
export const GET_COLUMN =
    testUrl + 'admin/getColumnClass';
export const GET_CLASS =
    testUrl + 'admin/getClass';
export const SET_CLASS =
    testUrl + 'admin/setClass';
export const SET_CLASS1 =
    testUrl + 'admin/setClass1';
export const DEL_CLASS =
    testUrl + 'admin/delClass';
export const DEL_CLASS1 =
    testUrl + 'admin/delClass1';
export const SET_BIG_CLASS =
    testUrl + 'admin/setBigClass';
export const DEL_BIG_CLASS =
    testUrl + 'admin/delBigClass';
export const LOGIN =
    testUrl + 'admin/login';
export const GET_7_DAY_PLAY_COUNT =
    testUrl + 'admin/get7DayPlay';
export const GET_50_DAY_NEW_USER =
    testUrl + 'admin/get50DayUser';
export const GET_APP_OTHER_INFO =
    testUrl + 'admin/getNowDateOrders';

