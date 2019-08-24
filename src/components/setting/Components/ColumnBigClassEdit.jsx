import React from 'react';
import { Form, Row, Col, Input, Button, Modal, Select, notification, Popconfirm } from 'antd';
import { delBigClass, setBigClass } from '../../../axios';

const { Option } = Select;

class ColumnClassEdit extends React.Component {


    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.data.id != this.props.data.id) {
            this.props.form.resetFields();
            this.setState({ loading: false });
        }
    }

    constructor(props) {
        super(props);
        const arr1 = JSON.stringify(this.props.data);
        const arr2 = arr1.concat();
        const obj = JSON.parse(arr2);
        this.state = {
            expand: false,
            loading: false,
            data: obj,
        };
    }

    // handleSearch = e => {
    //     e.preventDefault();
    //
    //     this.props.form.validateFieldsAndScroll((err, values) => {
    //         if (err && err.params && err.params.length > 0) {
    //             notification.open({
    //                 message: '请认真填写每一项',
    //                 description:
    //                     '请认真填写每一项',
    //                 onClick: () => {
    //                     console.log('Notification Clicked!');
    //                 },
    //             });
    //             return;
    //         }
    //         console.log('err', err);
    //         this.setState({ loading: true });
    //         const { params, columnname, id } = values;
    //
    //
    //     });
    // };
    handleReset = () => {
        const arr1 = JSON.stringify(this.props.data);
        const arr2 = arr1.concat();
        const obj = JSON.parse(arr2);
        this.setState({
            data: obj,
        });
        this.props.form.resetFields();
    };

    toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { isAdd } = this.props;
        const { data } = this.state;

        return (
            <Form className="ant-advanced-search-form">
                <Row gutter={24}>
                    {/*<style>*/}
                    {/*    {`.ant-advanced-search-form {*/}
                    {/*        padding: 24px;*/}
                    {/*        background: #fbfbfb;*/}
                    {/*        border: 1px solid #d9d9d9;*/}
                    {/*        border-radius: 6px;*/}
                    {/*    }*/}

                    {/*.ant-advanced-search-form .ant-form-item {*/}
                    {/*        display: flex;*/}
                    {/*    }*/}

                    {/*.ant-advanced-search-form .ant-form-item-control-wrapper {*/}
                    {/*        flex: 1;*/}
                    {/*    }`}*/}
                    {/*</style>*/}
                    {data && data.map((item, index, arrs) => {
                        return <div>
                            <Col span={0}>
                                <Form.Item label={'id'}>
                                    {getFieldDecorator(`params.${index}.id`, {
                                        initialValue: item.id,
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Input something!',
                                            },
                                        ],
                                    })(<Input   disabled placeholder="placeholder"/>)}
                                </Form.Item>
                            </Col>
                            <Col span={3}>
                                <Form.Item label={'标示(需不同)'}>
                                    {getFieldDecorator(`params.${index}.tab_name`, {
                                        initialValue: item.tab_name,
                                        rules: [
                                            {
                                                required: true,
                                                message: '空',
                                            },
                                        ],
                                    })(<Input placeholder="placeholder"/>)}
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item label={'标题'}>
                                    {getFieldDecorator(`params.${index}.tab_title`, {
                                        initialValue: `${item.tab_title}`,
                                        rules: [
                                            {
                                                required: true,
                                                message: '空',
                                            },
                                        ],
                                    })(<Input placeholder="placeholder"/>)}
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item label={'栏目类型'}>
                                    {getFieldDecorator(`params.${index}.tab_type`, {
                                        initialValue: `${item.tab_type}`,
                                        rules: [
                                            {
                                                required: true,
                                                message: '空',
                                            },
                                        ],
                                    })(<Select>
                                        <Option value={'1'}>类一:精选</Option>
                                        <Option value={'2'}>类二:分类</Option>
                                    </Select>)}
                                </Form.Item>
                            </Col>
                            <Col span={3}>
                                <Form.Item label={'栏目排序'}>
                                    {getFieldDecorator(`params.${index}.sort_num`, {
                                        initialValue: `${item.sort_num}`,
                                        rules: [
                                            {
                                                required: true,
                                                message: '空',
                                            },
                                        ],
                                    })(<Input placeholder="placeholder"/>)}
                                </Form.Item>
                            </Col>
                            <Col span={3}>
                                <Form.Item label={'是否可见'}>
                                    {getFieldDecorator(`params.${index}.checked`, {
                                        initialValue: `${item.checked}`,
                                        rules: [
                                            {
                                                required: true,
                                                message: '空',
                                            },
                                        ],
                                    })(<Select>
                                        <Option value={'1'}>可见</Option>
                                        <Option value={'0'}>隐藏</Option>
                                    </Select>)}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label={'操作'}>
                                    <div style={{}}>
                                        <Popconfirm placement="top" title={'是否确认删除?'} onConfirm={() => {
                                            const { id, tab_title, tab_type } = item;
                                            this.delClass(id, tab_title, tab_type, index);
                                        }} okText="Yes" cancelText="No">
                                            <Button type="primary">
                                                删除
                                            </Button>
                                        </Popconfirm>
                                        <Popconfirm placement="top" title={'确认更新/添加是否确认?'} onConfirm={() => {
                                            this.updateClass(index);
                                        }} okText="Yes" cancelText="No">
                                            <Button type="primary">
                                                更新/添加
                                            </Button>
                                        </Popconfirm>
                                    </div>
                                </Form.Item>
                            </Col>
                        </div>;
                    })}


                </Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button style={{ marginLeft: 8 }} loading={this.state.loading} onClick={this.addColumn}>
                            增加
                        </Button>
                        <Popconfirm placement="top" title={'确认还原弹窗'} onConfirm={this.handleReset} okText="Yes"
                                    cancelText="No">
                            <Button style={{ marginLeft: 8 }} loading={this.state.loading}>
                                还原
                            </Button>
                        </Popconfirm>
                    </Col>
                </Row>
            </Form>

        );
    }

    addColumn = () => {
        const { data } = this.state;
        const lastSortNum = (data[data.length - 1].sort_num) + 1;
        data.push({
            isAdd: true,
            id: 0,
            tab_name: '',
            tab_title: '',
            tab_type: 1,
            sort_num: lastSortNum,
            checked: 0,
        });
        this.setState({
            data,
        });
    };
    updateClass = (index) => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            const params = values.params[index];
            setBigClass(params).then(res => {
                if (res.status == 0) {
                    this.props.onSuccess();
                    const { data } = this.state;
                    const id = res.data.insertId;
                    console.log("id",id);
                    params.id = id;
                    data[index] = params;
                    this.setState({ data });
                    notification.open({
                        message: '类目更新或添加成功',
                        description:
                            '类目更新或添加成功',
                        onClick: () => {
                            console.log('Notification Clicked!');
                        },
                    });
                } else {
                    notification.open({
                        message: '类目更新或添加失败',
                        description:
                            '类目更新或添加失败：' + res.msg,
                        onClick: () => {
                            console.log('Notification Clicked!');
                        },
                    });
                }
            });
        });
    };
    delClass = (id, tab_title, tab_type, index) => {
        const { data } = this.state;
        // console.log(data[index].tab_title, tab_title);
        if (tab_title == '') {
            data.splice(index, 1);
            this.setState({ loading: false, data });
            return;
        }
        this.setState({ loading: true });
        delBigClass({ id, tab_title, tab_type }).then(res => {
            if (res.status == 0) {

                data.splice(index, 1);
                this.setState({ loading: false, data });
                notification.open({
                    message: '类目删除成功',
                    description:
                        '类目删除成功',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                });
                this.props.onSuccess();
            } else {
                notification.open({
                    message: '类目删除失败',
                    description:
                        '类目删除失败',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                });
            }

        });
    };
}

export default class ColumnBigClassEdit extends React.PureComponent {
    state = { visible: false, data: {} };

    showModal = (data) => {
        this.setState({
            visible: true,
            data,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const { data, visible } = this.state;
        if (!data || !visible) {
            return null;
        }
        return (<Modal
                title={`编辑类目基本信息`}
                visible={this.state.visible}
                cancelText={'取消'}
                onCancel={this.handleCancel}
                width={900}
            >
                <UserEditForm  {...this.props} data={data}/>
            </Modal>
        );
    }
}
const UserEditForm = Form.create({ name: 'advanced_search' })(ColumnClassEdit);
