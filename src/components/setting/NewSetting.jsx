/**
 * Created by hao.cheng on 2017/4/26.
 */
import React, { Component } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Menu, Icon, Spin, List, Button, notification, Input, Collapse } from 'antd';
import { getNews, setNews, saveNews, delNews } from '../../axios';
import BreadcrumbCustom from '../BreadcrumbCustom';

const { Panel } = Collapse;
const ButtonGroup = Button.Group;

class NewSetting extends Component {
    state = {
        data: {},
        loading: true,
        title: '',
        keyWord: '',
        current: 1,
    };

    componentDidMount() {
        this.dataIndex = 1;
        this._initData();
    }

    _initData = () => {
        this.setState({ loading: true });
        getNews({ type: this.dataIndex }).then(datas => {
            if(datas){
                const { data = {}, status = -1 } = datas;
                if (status == 0) {
                    this.setState({
                        data,
                    });
                }
            }


            this.setState({ loading: false });
        });
    };
    _saveData = (sortnum, id) => {
        this.setState({
            loading: true,
        });
        setNews({ type: this.dataIndex, sortnum, id }).then(data => {
            if (!data) {
                notification.open({
                    message: '修改失败',
                    description:
                        '失败:' + data.msg,
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
            case 'one':
                this.dataIndex = 1;
                break;
            case 'two':
                this.dataIndex = 2;
                break;
            case 'three':
                this.dataIndex = 3;
                break;

        }
        this._initData();
    };
    _saveHotConfig = () => {
        this.setState({
            loading: true,
        });
        const { data, title, keyWord } = this.state;
        const sortnum = data[data.length - 1].sortnum;
        saveNews({ type: this.dataIndex, sortnum, keyword: keyWord, title }).then(data => {
            if (data) {
                this.setState({
                    loading: false,
                });
                notification.open({
                    message: '新增成功',
                    description:
                        '新增成功',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                });
                this._initData();

            }
        });
    };
    _clickTitleChange = (e) => {
        this.setState({
            title: e.target.value,
        });
    };
    _clickKeyWordChange = (e) => {
        this.setState({
            keyWord: e.target.value,
        });
    };

    render() {
        const { data, loading, title, keyWord } = this.state;
        if (data.length > 0) {
            data.sort((a, b) => {
                return a.sortnum - b.sortnum;
            });
        }

        return (
            <Spin tip="Loading..." spinning={loading}>
                <div className="gutter-example button-demo">
                    <BreadcrumbCustom first="软件配置" second="栏目配置"/>
                    <Menu theme={'dark'} onClick={this.handleClick} selectedKeys={[this.state.current]}
                          mode="horizontal">
                        <Menu.Item key="one">
                            <Icon type="align-center"/>
                            第一栏
                        </Menu.Item>
                        <Menu.Item key="two">
                            <Icon type="align-left"/>
                            第二栏
                        </Menu.Item>
                        <Menu.Item key="three">
                            <Icon type="align-right"/>
                            第三栏
                        </Menu.Item>
                    </Menu>
                    {data.length > 0 && <List
                        header={<div>
                            <Collapse>
                                <Panel header="新建" key="1">
                                    <div>
                                        <a>标题</a>
                                        <Input style={{ marginTop: 5, marginBottom: 5 }}
                                               onChange={this._clickTitleChange} value={title}/>
                                        <a>关键字</a>
                                        <Input style={{ marginTop: 5, marginBottom: 5 }}
                                               onChange={this._clickKeyWordChange} value={keyWord}/>
                                        <Button style={{ marginTop: 5 }} disabled={loading} loading={loading}
                                                type="primary"
                                                onClick={this._saveHotConfig} size={'small'}>新建</Button>
                                    </div>
                                </Panel>

                            </Collapse>


                        </div>}
                        bordered
                        dataSource={data}
                        renderItem={item => (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <List.Item>
                                    <div style={{
                                        borderRadius: 5,
                                        paddingLeft: 5,
                                        paddingRight: 5,
                                        backgroundColor: '#4594ee',
                                        paddingTop: 3,
                                        paddingBottom: 3,
                                    }}>
                                        <span style={{ color: 'white' }}>{item.value}</span>
                                    </div>
                                </List.Item>
                                <ButtonGroup>
                                    <Button onClick={() => this._onMoveClick(item.keyid)} type="primary">
                                        <Icon type="up"/>
                                        上移
                                    </Button>
                                    <Button onClick={() => this._downMoveClick(item.keyid)} type="primary">
                                        下移
                                        <Icon type="down"/>
                                    </Button>
                                    <Button onClick={() => this._delMoveClick(item.keyid)} type="primary">

                                        <Icon type="delete"/>
                                    </Button>
                                </ButtonGroup>
                            </div>

                        )}
                    />}

                </div>
            </Spin>
        );

    }

    _delMoveClick = (id) => {
        this.setState({ loading: true });
        delNews({ type: this.dataIndex, id }).then(data => {
            if (data) {
                this.setState({ loading: false });
            }
            notification.open({
                message: '删除成功',
                description:
                    '删除成功',
                onClick: () => {
                    console.log('Notification Clicked!');
                },
            });
        });
        this._initData();

    };
    _onMoveClick = (keyid) => {
        const { data } = this.state;
        for (let i = 0; i < data.length; i++) {
            let item = data[i];

            if (item.keyid == keyid) {
                const prev = data[i - 1];
                if (prev) {
                    const prevSortNum = prev.sortnum;
                    item.sortnum = prevSortNum - 1;
                    data[i] = item;
                    this._saveData(prevSortNum - 1, item.keyid);
                    this.setState({
                        data,
                    });
                    console.log(data);
                }


            }
        }
    };
    _downMoveClick = (keyid) => {
        const { data } = this.state;
        for (let i = 0; i < data.length; i++) {
            let item = data[i];

            if (item.keyid == keyid) {
                const next = data[i + 1];
                if (next) {
                    const nextSortNum = next.sortnum;
                    item.sortnum = nextSortNum + 1;
                    data[i] = item;
                    this._saveData(nextSortNum + 1, item.keyid);
                    this.setState({
                        data,
                    });
                    console.log(data);
                }


            }
        }
    };
}

export default NewSetting;