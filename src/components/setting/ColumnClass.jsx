/**
 * Created by hao.cheng on 2017/4/26.
 */
import React, { Component } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Menu, Icon, Spin, Button, Row, Col, Table, Tag, Select } from 'antd';
import { getColumns, getClass } from '../../axios';
import BreadcrumbCustom from '../BreadcrumbCustom';
import ColumnClassEdit1 from './Components/ColumnClassEdit';
import ColumnClassEdit2 from './Components/ColumnClassEdit1';
import ColumnClassAdd from './Components/ColumnClassAdd';
import ColumnBigClassEdit from './Components/ColumnBigClassEdit';
import LunboComponent from './CommonComponent/LunboComponent';

const { Option } = Select;

class ColumnClass extends Component {
    state = {
        data: [],
        loading: false,
        current: 'jingxuan',
        item: {},
        classItem: {},
        tab_type: 0,
        selectKey: 0,

    };

    componentDidMount() {
        this._initData();

    }

    _initData = () => {
        getColumns().then(datas => {
            if (datas) {
                const { status, data } = datas;
                if (status == 0) {
                    this.setState({
                        data,
                    });
                }
            }

        });
    };
    tab_type = 0;
    handleClick = ({ item, key, keyPath, domEvent }) => {
        if (key == 'delete') {
            this.setState({ loading: false });
            this.columnClassDelete.showModal(this.state.data);
            return;
        }
        if (key == 'add') {
            this.columnClassAdd.showModal({}, [], true);
            this.setState({ loading: false });
            return;
        }
        this.setState({ loading: true });
        const { data } = this.state;
        this.setState({
            current: key,
        });
        data.forEach((item) => {
            if (item.tab_name == key) {
                getClass({ tab_type: item.tab_type, className: item.tab_title }).then(res => {
                    if (res.status == 0) {
                        this.setState({
                            classItem: res.data,
                            item,
                            tab_type: item.tab_type,
                            selectKey: item.checked,
                        })
                        ;
                    }
                    this.setState({ loading: false });

                });


            }
        });

    };
    _onSelect = (key) => {
        this.setState({
            selectKey: key,
        });
    };

    render() {
        const { data, loading, item, classItem } = this.state;
        if (data && data.length > 0) {
            data.sort((a, b) => {
                return a.sort_num - b.sort_num;
            });
        }
        const { tab_type } = this.state;
        let result = [];
        if (tab_type) {
            for (let i = 0; i < data.length; i++) {
                const item = data[i];

                if (tab_type == item.tab_type) {
                    result.push(item.tab_title);

                }
            }
        }
        // console.log(result);
        // console.log(item);
        return (
            <Spin tip="Loading..." spinning={loading}>
                <div className="gutter-example button-demo">
                    <BreadcrumbCustom first="软件配置" second="最新页面配置"/>
                    <Menu theme={'dark'} onClick={this.handleClick} selectedKeys={[this.state.current]}
                          mode="horizontal">
                        {data && data.length > 0 && data.map((item, index, arr) => {
                            return <Menu.Item key={item.tab_name}>
                                <Icon type="align-center"/>
                                {item.tab_title}
                            </Menu.Item>;
                        })

                        }
                        {/*<Menu.Item key={'add'}>*/}
                        {/*    <Icon type="plus-circle" theme="twoTone"/>*/}
                        {/*    增加*/}
                        {/*</Menu.Item>*/}
                        <Menu.Item key={'delete'}>
                            <Icon type="edit" theme="twoTone"/>
                            编辑所有类目
                        </Menu.Item>

                    </Menu>
                    {item && item.tab_type === 1 &&
                    <LunboComponent columns={result} colunmName={item.tab_title}/>
                    }
                    <Row style={{ marginTop: 10 }} gutter={16}>
                        <Col span={16}>
                            <div>
                                <span>类型:</span>
                                <span
                                    style={{
                                        color: 'red',
                                        marginLeft: 10,
                                    }}>{item && item.tab_type == 1 ? '类目一-精选' : '类目二-栏目分组'}</span>
                                <Select onSelect={this._onSelect} style={{ marginLeft: 10 }}
                                        value={this.state.selectKey}
                                        disabled
                                >
                                    <Option value={1}>
                                        可见
                                    </Option>
                                    <Option value={0}>
                                        隐藏
                                    </Option>
                                </Select>
                            </div>
                        </Col>
                    </Row>
                    {item && item.tab_type === 1 && <div>

                        <Row style={{ marginTop: 10 }} gutter={24}>
                            <Col style={{ marginBottom: 10 }}>
                                <Button type="primary"
                                        onClick={() => {
                                            this.handleClick({ key: this.state.current });
                                        }}
                                        disabled={loading} loading={loading}
                                >
                                    刷新
                                </Button>

                                <Button type="primary"
                                        onClick={() => {
                                            const { tab_type, data } = this.state;
                                            let result = [];
                                            if (tab_type) {
                                                for (let i = 0; i < data.length; i++) {
                                                    const item = data[i];

                                                    if (tab_type == item.tab_type) {
                                                        result.push(item.tab_title);

                                                    }
                                                }
                                                console.log(result);
                                                this.columnClassEdit.showModal({}, result, true);
                                            }
                                        }}
                                        disabled={loading}
                                >
                                    添加
                                </Button>
                            </Col>
                            {
                                classItem.length > 0 && <Col>
                                    <Table bordered dataSource={classItem}
                                           columns={this.columns}/>

                                </Col>


                            }

                        </Row>
                    </div>}
                    {item && item.tab_type == 2 && <Row style={{ marginTop: 10 }} gutter={24}>
                        <Col style={{ marginBottom: 10 }}>
                            <Button type="primary"
                                    onClick={() => {
                                        this.handleClick({ key: this.state.current });
                                    }}
                                    disabled={loading} loading={loading}
                            >
                                刷新
                            </Button>

                            <Button type="primary"
                                    onClick={() => {
                                        // const { tab_type, data } = this.state;
                                        // let result = [];
                                        // if (tab_type) {
                                        //     for (let i = 0; i < data.length; i++) {
                                        //         const item = data[i];
                                        //
                                        //         if (tab_type == item.tab_type) {
                                        //             result.push(item.tab_title);
                                        //
                                        //         }
                                        //     }
                                        //     console.log(result);
                                        //
                                        // }
                                        this.columnClassEdit1.showModal(classItem[0], result, false);

                                    }}
                                    disabled={loading}
                            >
                                编辑
                            </Button>
                        </Col>
                        {classItem && classItem[0] && <div style={{ marginLeft: 10 }}>

                            <Table dataSource={classItem[0] && JSON.parse(classItem[0].classnames)}
                                   columns={this.columns1}/>
                        </div>}
                    </Row>}


                </div>
                <ColumnClassEdit1 colunmName={item.tab_title} onSuccess={this._onSuccess} ref={ref => this.columnClassEdit = ref}/>
                <ColumnClassEdit2 onSuccess={this._onSuccess} ref={ref => this.columnClassEdit1 = ref}/>
                <ColumnClassAdd onSuccess={this._onSuccess1} ref={ref => this.columnClassAdd = ref}/>
                <ColumnBigClassEdit onSuccess={this._onSuccess1} ref={ref => this.columnClassDelete = ref}/>
            </Spin>
        );

    }

    _onSuccess = () => {
        this.handleClick({ key: this.state.current });
    };
    _onSuccess1 = () => {
        this._initData();
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { data } = this.state;
        if (data && data.length > 0 && !this.isClickhandle) {
            this.isClickhandle = true;
            const item = data[0];
            this.handleClick({ key: item.tab_name });
        }
    }

    columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',

        },
        {
            title: '影片ID',
            dataIndex: 'playerIds',
            key: 'playerIds',
            render: (text, record) => (
                JSON.parse(text).map((item, index, arrs) => {
                    return <Tag key={index}>{item.id}</Tag>;
                })
            ),
        },
        {
            title: '类目名称',
            dataIndex: 'categoryname',
            key: 'categoryname',

        },
        {
            title: '大类目',
            dataIndex: 'columnname',
            key: 'columnname',

        },
        {
            title: '排序',
            dataIndex: 'sortnum',
            key: 'sortnum',

        },
        {
            title: '关键字',
            dataIndex: 'keyword',
            key: 'keyword',

        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => {
                return <div>
                    <Button type="primary" onClick={() => this._showEditModel(record)}>编辑</Button>
                </div>;
            },

        },

    ];
    _showEditModel = (record) => {
        const { tab_type, data } = this.state;
        let result = [];
        if (tab_type) {
            for (let i = 0; i < data.length; i++) {
                const item = data[i];

                if (tab_type == item.tab_type) {
                    result.push(item.tab_title);

                }
            }
            console.log(result);
            this.columnClassEdit.showModal(record, result, false);
        }

    };
    columns1 = [
        {
            title: '标题',
            dataIndex: 'name',
            key: 'name',

        },
        {
            title: '关键字',
            dataIndex: 'keyword',
            key: 'keyword',

        },
        {
            title: '图片链接',
            dataIndex: 'uri',
            key: 'uri',
            render: (text, record) => (
                <div>
                    <a href={record.uri}>{record.uri}</a>

                </div>
            ),
        },

    ];
}

export default ColumnClass;