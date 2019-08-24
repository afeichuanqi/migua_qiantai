import React from 'react';
import { Form, Row, Col, Input, Button, Modal, Select, notification, Popconfirm } from 'antd';
import { setClass1, delClass1 } from '../../../axios';

const { Option } = Select;

class ColumnClassEdit extends React.Component {

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

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.data.id !== this.props.data.id) {
            this.props.form.resetFields();
            console.log('我被调用');
            this.setState({ loading: false });
        }


    }


    handleSearch = e => {
        e && e.preventDefault();

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err && err.params && err.params.length > 0) {
                notification.open({
                    message: '请认真填写每一项',
                    description:
                        '请认真填写每一项',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                });
                return;
            }
            console.log('err', err);
            this.setState({ loading: true });
            const { params, columnname, id } = values;
            setClass1({ classnames: params, columnname, id }).then(res => {
                if (res.status == 0) {
                    this.props.onSuccess();
                    notification.open({
                        message: '更新或插入成功',
                        description:
                            '类目更新或插入成功',
                        onClick: () => {
                            console.log('Notification Clicked!');
                        },
                    });
                } else {
                    notification.open({
                        message: '更新或插入失败',
                        description:
                            '类目更新或插入失败' + res.msg,
                        onClick: () => {
                            console.log('Notification Clicked!');
                        },
                    });
                }
                this.setState({
                    loading: false,
                });
            });

        });
    };
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
            <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
                <Row gutter={24}>

                    {!isAdd && <Col span={12}>
                        <Form.Item label={`id`}>
                            {getFieldDecorator(`id`, {
                                initialValue: data && data.id,
                                rules: [
                                    {
                                        required: true,
                                        message: 'Input something!',
                                    },
                                ],
                            })(<Input disabled={true} placeholder="placeholder"/>)}
                        </Form.Item>
                    </Col>}
                    <Col span={12}>
                        <Form.Item label={`大类目`}>
                            {getFieldDecorator(`columnname`, {
                                initialValue: data && data.columnname,
                                rules: [
                                    {
                                        required: true,
                                        message: 'Input something!',
                                    },
                                ],
                            })(<Select>
                                {this.props.tab_types && this.props.tab_types.length > 0 && this.props.tab_types.map((item, index, arrs) => {
                                    return <Option value={item}>{item}</Option>;
                                })}
                            </Select>)}
                        </Form.Item>
                    </Col>
                    {data && data.classnames && JSON.parse(data.classnames).map((item, index, arrs) => {
                        return <div><Col span={6}>
                            <Form.Item label={'标题'}>
                                {getFieldDecorator(`params.${index}.name`, {
                                    initialValue: item.name,
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Input something!',
                                        },
                                    ],
                                })(<Input placeholder="placeholder"/>)}
                            </Form.Item>
                        </Col>
                            <Col span={4}>
                                <Form.Item label={'关键字'}>
                                    {getFieldDecorator(`params.${index}.keyword`, {
                                        initialValue: item.keyword,
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Input something!',
                                            },
                                        ],
                                    })(<Input placeholder="placeholder"/>)}
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label={'栏目图片'}>
                                    {getFieldDecorator(`params.${index}.uri`, {
                                        initialValue: `${item.uri}`,
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Input something!',
                                            },
                                        ],
                                    })(<Input placeholder="placeholder"/>)}
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item label={'操作'}>
                                    <div style={{}}>
                                        <Popconfirm placement="top" title={'确认删除弹窗'} onConfirm={() => {
                                            const { data } = this.state;
                                            // if(){
                                            //
                                            // }
                                            const { classnames } = data;
                                            const classnamesCopy = JSON.parse(classnames);
                                            classnamesCopy.splice(index, 1);

                                            data.classnames = JSON.stringify(classnamesCopy);

                                            this.setState({
                                                data,
                                            },()=>{
                                                this.handleSearch();
                                            });
                                        }} okText="Yes" cancelText="No">
                                            <Button size={'small'} type="primary" loading={this.state.loading}>
                                                删除
                                            </Button>
                                        </Popconfirm>
                                        <Button type="primary" onClick={()=>{
                                            this.handleSearch()
                                        }} size={'small'} loading={this.state.loading}>
                                            更新/保存
                                        </Button>
                                    </div>
                                </Form.Item>
                            </Col>
                        </div>;
                    })}


                </Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        {/*<Button type="primary" htmlType="submit" loading={this.state.loading}>*/}
                        {/*    提交*/}
                        {/*</Button>*/}

                        <Button style={{ marginLeft: 8 }} loading={this.state.loading} onClick={() => {
                            const { data } = this.state;
                            const { classnames } = data;
                            const classnamesCopy = JSON.parse(classnames);
                            classnamesCopy.push({ name: '', keyword: '', uri: '' });
                            data.classnames = JSON.stringify(classnamesCopy);
                            this.setState({
                                data,
                            });
                        }}>
                            增加
                        </Button>
                        <Button style={{ marginLeft: 8 }} loading={this.state.loading} onClick={this.handleReset}>
                            还原
                        </Button>
                    </Col>
                </Row>
            </Form>
        );
    }

    delClass = (id) => {
        this.setState({ loading: true });
        delClass1({ id }).then(data => {
            if (data.status == 0) {
                this.setState({ loading: false });
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

export default class ColumnClassEdit2 extends React.PureComponent {
    state = { visible: false, data: {}, tab_types: [], isAdd: false };

    showModal = (data, tab_types, isAdd = this.state.isAdd) => {
        console.log(data);
        this.setState({
            visible: true,
            data,
            tab_types,
            isAdd,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        const { data, tab_types, isAdd, visible } = this.state;
        if (!data || !visible) {
            return null;
        }
        return (<Modal
                title={'添加用户基本信息'}
                visible={this.state.visible}
                // onOk={this.handleOk}
                cancelText={'取消'}
                onCancel={this.handleCancel}
                width={900}
            >
                <UserEditForm isAdd={isAdd} tab_types={tab_types}  {...this.props} data={data}/>
            </Modal>
        );
    }
}
const UserEditForm = Form.create({ name: 'advanced_search' })(ColumnClassEdit);
