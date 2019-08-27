/**
 * Created by hao.cheng on 2017/4/26.
 */
import React, { Component } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Menu, Icon, Spin, List, Button, notification, Input, Collapse, Table, Tag } from 'antd';
import { userPlayNo } from '../../axios';
import BreadcrumbCustom from '../BreadcrumbCustom';

const { Panel } = Collapse;
const ButtonGroup = Button.Group;

class UserPlay extends Component {
    state = {
        data: {},
        loading: false,
        current: 'playNo',
    };
    handleClick = ({ item, key, keyPath, domEvent }) => {
        this.setState({
            current: key,
        });
        if (key === 'toDayplayNo') {
            this.params = { dayNum: 0 };

        } else if (key === 'toWeekPlayNo') {
            this.params = { dayNum: 7 };
        } else if (key === 'toMouthPlayNo') {
            this.params = { dayNum: 30 };
        }
        this.initData();

    };
    params = { dayNum: 0 };

    initData = () => {
        this.setState({
            loading: true,
        });
        userPlayNo(this.params).then((res) => {
            console.log(res);
            if (res && res.status === 0) {
                this.setState({
                    data: res.data,
                });
            }
            this.setState({
                loading: false,
            });
        });
    };

    componentDidMount() {
        this.initData();
    }

    render() {
        const { data, loading, title, keyWord } = this.state;
        if (data && data.length > 0) {
            data.sort((a, b) => {
                return a.sortnum - b.sortnum;
            });
        }

        return (
            <Spin tip="Loading..." spinning={loading}>
                <div className="gutter-example button-demo">
                    <BreadcrumbCustom first="用户管理" second="播放记录"/>
                    <Menu theme={'dark'} onClick={this.handleClick} selectedKeys={[this.state.current]}
                          mode="horizontal">
                        <Menu.Item key="toDayplayNo">
                            <Icon type="align-center"/>
                            今日播放榜单
                        </Menu.Item>
                        <Menu.Item key="toWeekPlayNo">
                            <Icon type="align-left"/>
                            近一周播放榜单
                        </Menu.Item>
                        <Menu.Item key="toMouthPlayNo">
                            <Icon type="align-right"/>
                            近一个月播放榜单
                        </Menu.Item>
                    </Menu>
                    {data.length > 0 && <Table dataSource={data}
                                               pagination={{ total: data.length }} columns={this.columns}/>}
                </div>
            </Spin>
        );

    }

    columns = [
        {
            title: '播放ID',
            dataIndex: 'playerId',
            key: 'playerId',

        },
        {
            title: '播放次数',
            dataIndex: 'count',
            key: 'count',
            render: (text, record) => (
                <span>{text}次</span>
            ),

        },
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => (
                <div>
                    <span>{text}</span>

                </div>
            ),
        },
        {
            title: '类目',
            dataIndex: 'topname',
            key: 'topname',
            render: (text, record) => (
                <div>
                    <span>{text==='0'?'':text}</span>
                </div>
            ),
        },
        {
            title: '类目',
            dataIndex: 'typename',
            key: 'typename',
            render: (text, record) => (
                <div>
                    <span>{text}</span>

                </div>
            ),
        },
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => (
                <div>
                    <span>{text}</span>

                </div>
            ),
        }, {
            title: '标签',
            dataIndex: 'playerLabelList',
            key: 'playerLabelList',
            render: (text, record) => (
                <div>
                    {text && JSON.parse(text).map(item => {
                        console.log(item);
                        if(item){
                            return <Tag style={{ marginLeft: 3 }} color={'blue'}>
                                {item && item.name}
                            </Tag>;
                        }else{
                            return null;
                        }

                    })}
                </div>
            ),
        },

    ];

}

export default UserPlay;