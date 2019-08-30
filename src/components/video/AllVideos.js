/**
 * Created by hao.cheng on 2017/4/26.
 */
import React, { Component } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Menu, Icon, Spin, message, Button, Input, Table, Tag } from 'antd';
import { getAllVideo } from '../../axios';
import BreadcrumbCustom from '../BreadcrumbCustom';
import copy from 'copy-to-clipboard';

const { Search } = Input;

class AllVideos extends Component {
    state = {
        data: {},
        loading: false,
        current: 'playNo',
        total: 0,
        inputValue: '',
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
    params = { pagination: { pageSize: 10, current: 1 }, filters: { title: '' } };

    initData = () => {
        this.setState({
            loading: true,
        });
        getAllVideo(this.params).then((res) => {
            console.log(res);
            if (res && res.status === 0) {
                this.setState({
                    data: res.data,
                    total: res.count,
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
                    <BreadcrumbCustom first="所有片库" second="片库列表"/>
                    <Menu theme={'dark'} onClick={this.handleClick} selectedKeys={[this.state.current]}
                          mode="horizontal">
                        <Menu.Item key="toDayplayNo">
                            <Icon type="align-center"/>
                            所有片库
                        </Menu.Item>
                        {/*<Menu.Item key="toWeekPlayNo">*/}
                        {/*    <Icon type="align-left"/>*/}
                        {/*    近一周播放榜单*/}
                        {/*</Menu.Item>*/}
                        {/*<Menu.Item key="toMouthPlayNo">*/}
                        {/*    <Icon type="align-right"/>*/}
                        {/*    近一个月播放榜单*/}
                        {/*</Menu.Item>*/}
                    </Menu>
                    <div style={{ display: 'flex', marginTop: 10, marginBottom: 10 }}>
                        <Button type="primary"
                                onClick={() => {
                                    // if (!this.params.pagination) {
                                    //     this.params = this.oldParams;
                                    // }

                                    this.initData();
                                }}
                                disabled={loading} loading={loading}
                        >
                            刷新
                        </Button>
                        <Search
                            placeholder="input search text"
                            onSearch={value => {
                                this._searchValue(value);
                            }}
                            style={{ width: 200, marginLeft: 10 }}
                            onChange={e => {
                                this.setState({
                                    inputValue: e.target.value,
                                });
                            }}
                            value={this.state.inputValue}
                        />
                        {/*<span*/}
                        {/*    style={{ marginLeft: 8 }}>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</span>*/}
                    </div>
                    {data.length > 0 && <Table dataSource={data} onChange={this.onChange}
                                               pagination={{ total: this.state.total,current:this.params.pagination.current }} columns={this.columns}/>}
                </div>
            </Spin>
        );
    }

    _searchValue = () => {
        this.params.filters.title = this.state.inputValue;
        this.params.pagination.current = 1;
        this.initData();
    };

    onChange = (params1, params2, params3, params4) => {
        const { current, pageSize } = params1;
        this.params.pagination.current = current;
        this.params.pagination.pageSize = pageSize;
        this.initData();

        // console.log(params1,params2);
    };
    columns = [
        {
            title: 'ID',
            dataIndex: 'playerId',
            key: 'playerId',
            width: '5%',
            render: text => <a onClick={() => {
                this.setState({
                    inputValue: text,
                }, () => {
                    this._searchValue();
                });

            }}>{text}</a>,

        },
        {
            title: '图片',
            dataIndex: 'coverpic',
            key: 'coverpic',
            render: (text, record) => (
                <div onClick={() => {
                    copy(text);
                    message.info('复制成功');
                }}><img width={200} height={100} src={JSON.parse(text)[0]}/></div>
            ),
            width: '20%',
        },

        {
            title: '类目',
            dataIndex: 'topname',
            key: 'topname',
            render: (text, record) => (
                <div>
                    <div><a onClick={() => {
                        this.setState({
                            inputValue: text === '0' ? '' : text,
                        }, () => {
                            this._searchValue();
                        });

                    }}>{text === '0' ? '' : text}</a></div>
                    <div><a onClick={() => {
                        this.setState({
                            inputValue: record.typename,
                        }, () => {
                            this._searchValue();
                        });
                        this._searchValue();
                    }}>{record.typename}</a></div>
                </div>
            ),
            width: '10%',
        },

        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            render: text => <a onClick={() => {
                this.setState({
                    inputValue: text,
                }, () => {
                    this._searchValue();
                });

            }}>{text}</a>,
            width: '10%',
        }, {
            title: '标签',
            dataIndex: 'playerLabelList',
            key: 'playerLabelList',
            render: (text, record) => (
                <div>
                    {text && JSON.parse(text).map(item => {
                        if (item) {
                            return <Tag onClick={() => {
                                this.setState({
                                    inputValue: item && item.name,
                                }, () => {
                                    this._searchValue();
                                });
                            }} style={{ marginLeft: 3 }}
                                        color={'blue'}>
                                {item && item.name}
                            </Tag>;
                        } else {
                            return null;
                        }

                    })}
                </div>
            ),
            width: '20%',
        }, {
            title: '赞',
            dataIndex: 'upnum',
            key: 'upnum',
            render: (text, record) => (
                <div>
                    <div>点赞:{text}</div>
                    <div>不好:{record.downnum}</div>
                </div>
            ),
            width: '10%',
        }, {
            title: '时长',
            dataIndex: 'duration',
            key: 'duration',
            width: '8%',
        }, {
            title: '观看次数',
            dataIndex: 'playnum',
            key: 'playnum',
            width: '7%',
        }, {
            title: '上传时间',
            dataIndex: 'createtime1',
            key: 'createtime1',
            width: '10%',
        },

    ];

}

export default AllVideos;