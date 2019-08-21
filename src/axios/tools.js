/**
 * Created by 叶子 on 2017/7/30.
 * http通用工具函数
 */
import axios from 'axios';
import { message } from 'antd';
import qs from 'qs';

/**
 * 公用get请求
 * @param url       接口地址
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */
export const get = ({ url, msg = '接口异常', headers }) => {
    const user = localStorage.getItem('user');
    const data = {};

    if (user && JSON.parse(user) && JSON.parse(user).token) {
        data.token = JSON.parse(user).token;
    }
    let query = qs.stringify(data);
    return axios
        .get(`${url}?${query}`, headers)
        .then(res => {
            if (res.data.status == 402) {
                localStorage.removeItem('user');
                window.location.href = '/login';
                return;
            }
            return res.data;
        })
        .catch(err => {
            console.log(err);
            message.warn(msg);
        });
};


export const getParams = ({ url, data = {}, msg = '接口异常' }) => {

    // console.log(this.props,"this.props");
    const user = localStorage.getItem('user');
    const headers = {};
    if (user && JSON.parse(user) && JSON.parse(user).token) {

        data.token = JSON.parse(user).token;
    }

    let query = qs.stringify(data);
    return axios
        .get(`${url}?${query}`, headers)
        .then(res => {
            if (res.data.status == 402) {
                localStorage.removeItem('user');
                window.location.href = '/login';
                return;
            }
            return res.data;
        })
        .catch(err => {
            console.log(err);
            message.warn(msg);
        });
};


/**
 * 公用post请求
 * @param url       接口地址
 * @param data      接口参数
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */
export const post = ({ url, data = {}, msg = '接口异常', headers }) => {
    const user = localStorage.getItem('user');

    if (user && JSON.parse(user) && JSON.parse(user).token) {
        // console.log(JSON.parse(user).token, 'user.token');
        data.token = JSON.parse(user).token;
    }
    let query = qs.stringify(data);
    return axios
        .post(url, query, headers)
        .then(res => {
            if (res.data.status == 402) {
                localStorage.removeItem('user');
                window.location.href = '/login';
                return;
            }
            return res.data;
        })
        .catch(err => {
            console.log(err);
            message.warn(msg);
        });
};


