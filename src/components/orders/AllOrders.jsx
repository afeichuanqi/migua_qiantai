/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import { Table, Divider, Tag, Card, Col, Input, Row } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { getOrders, searchOrders } from '../../axios';
import { Button, Icon } from 'antd';
import {isToday} from '../../utils/CommonUtil';
const { Search } = Input;
const ButtonGroup = Button.Group;

class AllOrders extends React.Component {
    params = {
        status: 1,
        pageSize: 10,
        current: 1,
    };
    state = {
        data: [],
        total: 0,
        current: 1,
        loading: true,

        inputValue: '',
    };

    componentDidMount() {
        this._getOrders();
    }

    _getOrders = () => {
        this.setState({ loading: true });
        getOrders({ ...this.params }).then(res => {
            // console.log(res);
            if (res && res.status == 0) {
                this.setState({
                    data: res.data ? res.data : [],
                    total: res.count,
                    current: this.params.current,
                });
            }
            this.setState({ loading: false });
        });
    };
    _searchContent = (content) => {
        this.setState({ loading: true });
        searchOrders({ content: this.state.inputValue, ...this.params }).then(res => {
            if (res && res.status == 0) {
                console.log('this.state.total', res);
                this.setState({
                    data: res.data,
                    current: this.params.current,
                    total: res.total,
                });
            }
            this.setState({ loading: false });
        });
    };

    render() {
        console.log(this.state.total, 'this.state.total');
        return <div className="gutter-example">
            <BreadcrumbCustom first="订单管理" second="所有订单"/>
            <Row gutter={16} style={{ marginTop: 10, marginBottom: 10 }}>
                <Col span={6}>
                    <Search
                        placeholder="input search text"
                        enterButton="搜索"
                        onChange={e => {
                            this.setState({
                                inputValue: e.target.value,
                            });
                        }}
                        value={this.state.inputValue}
                        onSearch={value => {
                            this._searchContent(value);
                        }}
                    />
                </Col>
                <Col span={10}>
                    <ButtonGroup>
                        <Button onClick={() => {
                            this.params.status = 1;
                            this.params.current = 1;
                            if (this.state.inputValue.length > 0) {
                                this._searchContent(this.state.inputValue);
                            } else {
                                this._getOrders();
                            }

                        }}>已支付</Button>
                        <Button onClick={() => {
                            this.params.status = 0;
                            this.params.current = 1;
                            if (this.state.inputValue.length > 0) {
                                this._searchContent(this.state.inputValue);
                            } else {
                                this._getOrders();
                            }

                        }}>未支付</Button>
                        <Button onClick={() => {
                            this.params.status = -1;
                            this.params.current = 1;
                            if (this.state.inputValue.length > 0) {
                                this._searchContent(this.state.inputValue);
                            } else {
                                this._getOrders();
                            }


                        }}>所有订单</Button>
                    </ButtonGroup>
                </Col>
            </Row>


            <Col className="gutter-row" md={24}>
                <div className="gutter-box">
                    <Card title="订单表" bordered={false}>
                        <Table loading={this.state.loading}
                               pagination={{
                                   pageSize: this.params.pageSize,
                                   total: this.state.total,
                                   current: this.state.current,
                                   defaultCurrent: 1,
                               }}
                               onChange={this._onChange} columns={this.columns} dataSource={this.state.data}/>
                    </Card>
                </div>
            </Col>
        </div>;
    }

    _onChange = (params1, params2, params3, params4) => {
        this.params.current = params1.current;
        this.params.pageSize = params1.pageSize;
        if (this.state.inputValue.length > 0) {
            this._searchContent(this.state.inputValue);
        } else {
            this._getOrders();
        }
        console.log(params1);
    };
    columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            width:'5%'
            // render: text => <a>{text}</a>,
        },
        {
            title: '订单id',
            dataIndex: 'order_id',
            key: 'order_id',
            width:'10%',
            render: text => <a onClick={() => {
                this.setState({
                    inputValue: text,
                }, this._searchContent);
            }}>{text}</a>,
        },
        {
            title: '用户id',
            dataIndex: 'userid',
            key: 'userid',
            width:'5%',
            render: text => <a onClick={() => {
                this.setState({
                    inputValue: text,
                }, this._searchContent);
            }}>{text}</a>,

        }, {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
            width:'10%',
        }, {
            title: '创建时间',
            dataIndex: 'create_date1',
            key: 'create_date',
            width:'10%',
            render: text => <div>
                <a onClick={() => {
                    this.setState({
                        inputValue: text,
                    }, this._searchContent);

                }}>{text}</a>
                {isToday(text)?<Tag style={{marginLeft:3}} color={'blue'} >
                    今天
                </Tag>:null}
            </div>,
        }, {
            title: '订单状态',
            dataIndex: 'order_status',
            key: 'order_status',
            width:'15%',
            render: text => <a style={{ color: 'red' }}>{text == 0 ? '未支付' : '成功支付'}</a>,
        }, {
            title: '订单描述',
            dataIndex: 'order_desc',
            key: 'order_desc',
            width:'15%',
            render: text => <a onClick={() => {
                this.setState({
                    inputValue: text,
                }, this._searchContent);
            }}>{text}</a>,
        }, {
            title: 'aoid',
            dataIndex: 'aoid',
            key: 'aoid',
            width:'10%',
            render: text => <a onClick={() => {
                this.setState({
                    inputValue: text,
                }, this._searchContent);
            }}>{text}</a>,
        }, {
            title: '付款时间',
            width:'10%',
            dataIndex: 'pay_time1',
            key: 'pay_time',
        },

        // {
        //     title: 'Action',
        //     key: 'action',
        //     width:'5%',
        //     render: (text, record) => (
        //         <span>
        //         <a>Invite {record.name}</a>
        //         <Divider type="vertical"/>
        //         <a>Delete</a>
        //       </span>
        //     ),
        // },
    ];

}

export default AllOrders;