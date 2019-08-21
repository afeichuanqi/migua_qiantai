/**
 * Created by hao.cheng on 2017/4/16.
 */
import axios from 'axios';
import { get, post, getParams } from './tools';
import * as config from './config';

export const getUsers = (params) => getParams({ url: config.GET_USERS, data: params });
export const setUsers = (params) => post({ url: config.SET_USERS, data: params });
export const getAnnouncement = () => get({ url: config.GET_ANNOUNCE });
export const setAnnouncement = (params) => getParams({ url: config.SET_ANNOUNCE, data: params });
export const getAds = () => get({ url: config.GET_ADS });
export const setAds = (params) => getParams({ url: config.SET_ADS, data: params });
export const getNews = (params) => getParams({ url: config.GET_NEW, data: params });
export const setNews = (params) => getParams({ url: config.SET_NEW, data: params });
export const saveNews = (params) => getParams({ url: config.SAVE_NEW, data: params });
export const delNews = (params) => getParams({ url: config.DEL_NEW, data: params });
export const getColumns = () => get({ url: config.GET_COLUMN});
export const getClass = (params) => getParams({ url: config.GET_CLASS, data: params});
export const setClass = (params) => getParams({ url: config.SET_CLASS, data: params});
export const setClass1 = (params) => getParams({ url: config.SET_CLASS1, data: params});
export const delClass = (params) => getParams({ url: config.DEL_CLASS, data: params});
export const delClass1 = (params) => getParams({ url: config.DEL_CLASS1, data: params});
export const setBigClass = (params) => getParams({ url: config.SET_BIG_CLASS, data: params});
export const delBigClass = (params) => getParams({ url: config.DEL_BIG_CLASS, data: params});
export const get7DayPlay = (params) => getParams({ url: config.GET_7_DAY_PLAY_COUNT, data: params});
export const get50DayUser = (params) => getParams({ url: config.GET_50_DAY_NEW_USER, data: params});
export const getOherAppInfo = (params) => getParams({ url: config.GET_APP_OTHER_INFO, data: params});

export const login = (params) => getParams({ url: config.LOGIN, data: params});



export const npmDependencies = () =>
    axios
        .get('./npm.json')
        .then(res => res.data)
        .catch(err => console.log(err));

export const weibo = () =>
    axios
        .get('./weibo.json')
        .then(res => res.data)
        .catch(err => console.log(err));

export const gitOauthLogin = () =>
    get({
        url: `${
            config.GIT_OAUTH
            }/authorize?client_id=792cdcd244e98dcd2dee&redirect_uri=http://localhost:3006/&scope=user&state=reactAdmin`,
    });
export const gitOauthToken = code =>
    post({
        url: `https://cors-anywhere.herokuapp.com/${config.GIT_OAUTH}/access_token`,
        data: {
            client_id: '792cdcd244e98dcd2dee',
            client_secret: '81c4ff9df390d482b7c8b214a55cf24bf1f53059',
            redirect_uri: 'http://localhost:3006/',
            state: 'reactAdmin',
            code,
        },
    });
// {headers: {Accept: 'application/json'}}
export const gitOauthInfo = access_token =>
    get({ url: `${config.GIT_USER}access_token=${access_token}` });

// easy-mock数据交互
// 管理员权限获取
export const admin = () => get({ url: config.MOCK_AUTH_ADMIN });
// 访问权限获取
export const guest = () => get({ url: config.MOCK_AUTH_VISITOR });
