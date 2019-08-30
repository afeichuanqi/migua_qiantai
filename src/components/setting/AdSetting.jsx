/**
 * Created by hao.cheng on 2017/4/26.
 */
import React, { Component } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Menu, Icon, Descriptions, Badge, Button, Select, Input, notification, Spin } from 'antd';
import { getAds, setAds } from '../../axios';
import BreadcrumbCustom from '../BreadcrumbCustom';

const { Option } = Select;
const { SubMenu } = Menu;

class AdSetting extends Component {
    state = {
        data: {},
        loading: false,
        current: 0,
    };

    componentDidMount() {
        this.dataIndex = 0;
        this._initData();
    }

    dataIndex = 0;
    _initData = () => {
        this.setState({
            loading: true,
        });
        getAds().then(datas => {
            if (datas && datas.status == 0) {
                const data = datas.data[this.dataIndex];
                console.log(data);
                this.setState({
                    data,
                });
            }
            this.setState({
                loading: false,
            });
        });
    };
    _onSelect = (value) => {
        const { data } = this.state;
        data.is_show = value;
        this.setState({
            data,
        });
    };
    _adinfoonChange = (e) => {
        const { data } = this.state;
        data.info = e.target.value;
        this.setState({
            data,
        });
    };
    _click_urlonChange = (e) => {

        const { data } = this.state;
        data.click_url = e.target.value;
        this.setState({
            data,
        });
    };
    _ad_urlonChange = (e) => {

        const { data } = this.state;
        data.ad_url = e.target.value;
        this.setState({
            data,
        });
    };
    _md5onChange = (e) => {

        const { data } = this.state;
        data.md5 = e.target.value;
        this.setState({
            data,
        });
    };

    setAdSetting = () => {
        this.setState({
            loading: true,
        });
        setAds(this.state.data).then(result => {
            if (result && result.status == 0) {
                notification.open({
                    message: '广告表操作成功',
                    description:
                        '更新或者插入成功',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                });
            } else {
                notification.open({
                    message: '用户信息操作失败',
                    description:
                        '更新或者插入失败',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                });
            }
            this.setState({
                loading: false,
            });
        });
    };
    handleClick = ({ item, key, keyPath, domEvent }) => {
        this.setState({
            current: key,
        });
        switch (key) {
            case 'start':
                this.dataIndex = 0;
                break;
            case 'lunbo':
                this.dataIndex = 1;
                break;
            case 'search':
                this.dataIndex = 3;
                break;
            case 'play':
                this.dataIndex = 2;
                break;
            // case 'share':
            //     this.dataIndex = 4;


        }
        this._initData();
    };

    render() {
        const { data, loading } = this.state;
        let addr = '首页';

        switch (data.addr_type) {
            case 1:
                addr = '轮播图广告';
                break;
            case 2:
                addr = '播放页广告';
                break;
            case 3 :
                addr = '搜索页广告';
                break;
            case 4:
                addr = '启动页广告';
                break;
            case 5:
                addr = '推广页广告';
                break;
        }
        return (
            <Spin tip="Loading..." spinning={this.state.loading}>
                <div className="gutter-example button-demo">
                    <BreadcrumbCustom first="软件配置" second="广告配置"/>
                    <Menu theme={'dark'} onClick={this.handleClick} selectedKeys={[this.state.current]}
                          mode="horizontal">
                        <Menu.Item key="start">
                            <Icon type="book"/>
                            启动页广告
                        </Menu.Item>
                        <Menu.Item key="lunbo">
                            <Icon type="api"/>
                            轮播图广告
                        </Menu.Item>
                        <Menu.Item key="search">
                            <Icon type="search"/>
                            搜索页广告
                        </Menu.Item>
                        <Menu.Item key="play">
                            <Icon type="play-circle"/>
                            播放页广告
                        </Menu.Item>
                        {/*<Menu.Item key="share">*/}
                        {/*    <Icon type="play-circle"/>*/}
                        {/*    推广页图片*/}
                        {/*</Menu.Item>*/}
                    </Menu>
                    {data && <Descriptions style={{ marginTop: 10 }} title="广告设置" bordered>
                        <Descriptions.Item span={1} label="修改"><span
                            style={{ color: 'red' }}>
                        <Button onClick={this.setAdSetting} type="primary" htmlType="submit"
                                disabled={loading} loading={loading}>修改</Button>
                    </span></Descriptions.Item>
                        <Descriptions.Item label="广告ID"><span className={'adId'}
                                                              style={{ color: 'red' }}>{data.id}</span></Descriptions.Item>
                        <Descriptions.Item label="施放位置">
                            <span style={{ color: 'red' }}>{addr}</span>
                        </Descriptions.Item>
                        <Descriptions.Item label="是否展示">
                            <Select style={{ width: 100 }} onSelect={this._onSelect} value={data.is_show + ''}>
                                <Option value="1">展示</Option>
                                <Option value="0">不展示</Option>
                            </Select>
                        </Descriptions.Item>
                        <Descriptions.Item span={2} label="广告说明">
                            <Input onChange={this._adinfoonChange} value={data.info}/>

                        </Descriptions.Item>
                        <Descriptions.Item label="跳转链接" span={2}>
                            <Input onChange={this._click_urlonChange} value={data.click_url}/>
                        </Descriptions.Item>
                        <Descriptions.Item label="更新标示(每次更改需不同)" span={3}>
                            <Input onChange={this._md5onChange} value={data.md5}/>
                        </Descriptions.Item>
                        <Descriptions.Item label="图片地址" span={3}>
                            <Input onChange={this._ad_urlonChange} value={data.ad_url}/>
                        </Descriptions.Item>
                        <Descriptions.Item label="图片预览">
                            <img src={data.ad_url} alt="上海鲜花港 - 郁金香"/>
                        </Descriptions.Item>
                    </Descriptions>}

                </div>
            </Spin>
        );
    }
}

export default AdSetting;