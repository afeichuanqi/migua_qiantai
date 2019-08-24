/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import { Table, Button, Row, Col, Card, Input, Icon, Divider } from 'antd';
import { getUsers } from '../../axios';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { comptime, getCurrentDate } from '../../utils/CommonUtil';
import UserInfo from './UserInfo';
import UserEdit from './UserEdit';
import { connectAlita } from 'redux-alita';

const { Search } = Input;

class UserAll extends React.Component {


    constructor(props) {
        super(props);


        this.state = {
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
            data: [],
            total: 0,
            inputValue: '',
        };
        this.columns = [{
            title: '用户id',
            dataIndex: 'id',
            width: '5%',
            render: text => <a onClick={() => {
                this.setState({
                    inputValue: text,
                }, this.handleSearch);
            }}>{text}</a>,
            // render: (text, record) => <a href={record.url} target="_blank" rel="noopener noreferrer">{text}</a>,

        }, {
            title: '用户名',
            dataIndex: 'username',
            width: '5%',
            render: text => <a onClick={() => {
                this.setState({
                    inputValue: text,
                }, this.handleSearch);
            }}>{text}</a>,
        }, {
            title: '身份',
            dataIndex: 'identity',
            width: '3%',
            render: identity => <a
                style={identity != -1 ? { color: 'red' } : {}}>{identity == -1 ? '游客' : '用户'}</a>,
        }, {
            title: '总/用/剩/次数',
            width: '3%',
            render: (text, record) => (
                <div>
                    <span>{record.play_total_count}/{record.play_count}/</span>
                    <span style={{ color: 'red' }}>{record.play_total_count - record.play_count}</span>
                </div>
            ),
        }, {
            title: '是否会员(到期时间)',
            dataIndex: 'vip_exp_datetime1',
            width: '10%',
            render: vip_exp_datetime1 => {
                if (vip_exp_datetime1) {
                    const nowTime = getCurrentDate(2);
                    const res = comptime(vip_exp_datetime1, nowTime);

                    if (res == 1) {
                        return <div style={{ color: 'red' }}>会员({vip_exp_datetime1})</div>;
                    } else {
                        return <div style={{ color: 'green' }}>已经到期({vip_exp_datetime1})</div>;
                    }
                } else {
                    return <div style={{ color: '#8b572a' }}>未开通</div>;
                }

            },
        }, {
            title: '设备',
            dataIndex: 'Platforms',
            width: '3%',
            render: (text) => (
                <span>{text == 'ios' ? '苹果' : '安卓'}</span>
            ),
        }, {
            title: '邀请人',
            dataIndex: 'invite',
            width: '3%',
            render: text => <a onClick={() => {
                this.setState({
                    inputValue: text,
                }, this.handleSearch);
            }}>{text}</a>,
        }, {
            title: '创建时间',
            dataIndex: 'create_time1',
            width: '3%',
        }, {
            width: '6%',
            title: '操作',
            // fixed: 'right',
            // fl,
            render: (text, record) =>
                <div>
                    <a onClick={() => {
                        this._editUserModal(record);
                    }}>编辑</a>
                    <Divider type="vertical"/>
                    <a onClick={() => {
                        this._showUserModal(record);
                    }}>详细</a>
                </div>,

        },

        ];
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const isMobile = this.props.responsive && this.props.responsive.data.isMobile;
        const newIsMobile = nextProps.responsive && nextProps.responsive.data.isMobile;
        console.log(isMobile, newIsMobile, 'responsive');
        if (isMobile != newIsMobile) {

            if (newIsMobile) {
                this.columns = [{
                    title: '用户id',
                    dataIndex: 'id',
                    width: '5%',
                    render: text => <a onClick={() => {
                        this.setState({
                            inputValue: text,
                        }, this.handleSearch);
                    }}>{text}</a>,

                }, {
                    title: '用户名',
                    dataIndex: 'username',
                    width: '5%',
                    render: text => <a onClick={() => {
                        this.setState({
                            inputValue: text,
                        }, this.handleSearch);
                    }}>{text}</a>,
                }, {
                    width: '6%',
                    title: '操作',
                    // fixed: 'right',
                    // fl,
                    render: (text, record) =>
                        <div>
                            <a onClick={() => {
                                this._editUserModal(record);
                            }}>编辑</a>
                            <Divider type="vertical"/>
                            <a onClick={() => {
                                this._showUserModal(record);
                            }}>详细</a>
                        </div>,

                }];
            } else {
                this.columns = [{
                    title: '用户id',
                    dataIndex: 'id',
                    width: '5%',
                    render: text => <a onClick={() => {
                        this.setState({
                            inputValue: text,
                        }, this.handleSearch);
                    }}>{text}</a>,

                }, {
                    title: '用户名',
                    dataIndex: 'username',
                    width: '5%',
                    render: text => <a onClick={() => {
                        this.setState({
                            inputValue: text,
                        }, this.handleSearch);
                    }}>{text}</a>,
                }, {
                    title: '身份',
                    dataIndex: 'identity',
                    width: '3%',
                    render: identity => <a
                        style={identity != -1 ? { color: 'red' } : {}}>{identity == -1 ? '游客' : '用户'}</a>,
                }, {
                    title: '总/用/剩/次数',
                    width: '3%',
                    render: (text, record) => (
                        <div>
                            <span>{record.play_total_count}/{record.play_count}/</span>
                            <span style={{ color: 'red' }}>{record.play_total_count - record.play_count}</span>
                        </div>
                    ),
                }, {
                    title: '是否会员(到期时间)',
                    dataIndex: 'vip_exp_datetime1',
                    width: '10%',
                    render: vip_exp_datetime1 => {
                        if (vip_exp_datetime1) {
                            const nowTime = getCurrentDate(2);
                            const res = comptime(vip_exp_datetime1, nowTime);

                            if (res == 1) {
                                return <div style={{ color: 'red' }}>会员({vip_exp_datetime1})</div>;
                            } else {
                                return <div style={{ color: 'green' }}>已经到期({vip_exp_datetime1})</div>;
                            }
                        } else {
                            return <div style={{ color: '#8b572a' }}>未开通</div>;
                        }

                    },
                }, {
                    title: '设备',
                    dataIndex: 'Platforms',
                    width: '3%',
                    render: (text) => (
                        <span>{text == 'ios' ? '苹果' : '安卓'}</span>
                    ),
                }, {
                    title: '邀请人',
                    dataIndex: 'invite',
                    width: '3%',
                    render: text => <a onClick={() => {
                        this.setState({
                            inputValue: text,
                        }, this.handleSearch);
                    }}>{text}</a>,
                }, {
                    title: '创建时间',
                    dataIndex: 'create_time1',
                    width: '3%',
                }, {
                    width: '6%',
                    title: '操作',
                    // fixed: 'right',
                    // fl,
                    render: (text, record) =>
                        <div>
                            <a onClick={() => {
                                this._editUserModal(record);
                            }}>编辑</a>
                            <Divider type="vertical"/>
                            <a onClick={() => {
                                this._showUserModal(record);
                            }}>详细</a>
                        </div>,

                },

                ];
            }
        }
    }


    _showUserModal = (data) => {
        this.userInfo.showModal(data);
    };
    _editUserModal = (data) => {
        this.userEdit.showModal(data, false);
    };

    componentDidMount() {
        this.params = { pagination: { current: 1, pageSize: 10 } };
        this.start();
    }

    start = () => {
        this.setState({ loading: true });
        getUsers(this.params).then((res) => {
            if (res) {
                const { data, total } = res;
                if (data) {
                    this.setState({
                        data: data,
                        total,
                    });
                }
            }
            this.setState({
                loading: false,
            });

        });
    };
    handleSearch = (selectedKeys) => {
        if (this.params.pagination) {
            this.oldParams = this.params;
        }
        console.log(this.state.inputValue.toString().length, 'this.state.inputValue');
        if ('' + this.state.inputValue.toString().length > 0) {
            this.params = { filters: this.state.inputValue };
        } else {
            this.params = { filters: this.state.inputValue, pagination: { current: 1, pageSize: 10 } };

        }

        console.log(this.params);
        this.start();
    };

    render() {
        console.log(this.props.responsive, 'props');
        const { loading, selectedRowKeys, total } = this.state;
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="用户管理" second="所有用户"/>
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="用户表" bordered={false}>
                                <div style={{ display: 'flex', marginBottom: 10 }}>
                                    <Button type="primary"
                                            onClick={() => {
                                                if (!this.params.pagination) {
                                                    this.params = this.oldParams;
                                                }
                                                this.start();
                                            }}
                                            disabled={loading} loading={loading}
                                    >
                                        刷新
                                    </Button>
                                    <Button type="primary"
                                            onClick={() => this.userEdit.showModal({}, true)}
                                            disabled={loading}
                                    >
                                        添加
                                    </Button>
                                    <Search
                                        placeholder="input search text"
                                        onSearch={value => this.handleSearch(value)}
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
                                <Table loading={this.state.loading} columns={this.columns}
                                       dataSource={this.state.data} onChange={this.onChange}
                                       pagination={{ total, defaultCurrent: 1 }}/>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <UserInfo ref={ref => this.userInfo = ref}/>
                <UserEdit onSuccess={this.onSuccess} ref={ref => this.userEdit = ref}/>
            </div>
        );
    }

    onChange = (params1, params2, params3, params4) => {
        console.log('我被调用');
        const { current, pageSize } = params1;
        this.params = { pagination: { current: current, pageSize: pageSize } };
        this.start();

        // console.log(params1,params2);
    };
    onSuccess = () => {
        this.start();
    };
}

export default connectAlita(['responsive'])(UserAll);