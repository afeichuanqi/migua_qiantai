import React from 'react';
import { Form, Row, Col, Input, Button, Modal, Select, notification, Popconfirm } from 'antd';
import { setClass, delClass } from '../../../axios';

const { Option } = Select;

class ColumnClassEdit extends React.Component {
    state = {
        expand: false,
        loading: false,
    };


    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.data.id != this.props.data.id) {
            this.props.form.resetFields();
            this.setState({ loading: false });
        }
    }

    handleSearch = e => {
        e.preventDefault();
        this.setState({ loading: true });
        this.props.form.validateFields((err, values) => {
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
            setClass(values).then(data => {
                if (data.status == 0) {
                    this.setState({
                        loading: false,
                    });

                    notification.open({
                        message: '类目操作成功',
                        description:
                            '类目操作成功',
                        onClick: () => {
                            console.log('Notification Clicked!');
                        },
                    });
                    this.props.onSuccess();
                } else {
                    notification.open({
                        message: '类目操作失败',
                        description:
                            '类目操作失败',
                        onClick: () => {
                            console.log('Notification Clicked!');
                        },
                    });
                }

            });
        });
    };
    handleReset = () => {
        this.props.form.resetFields();
    };

    toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { data, isAdd } = this.props;
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
                        <Form.Item label={`展示的视频序号`}>
                            {getFieldDecorator(`playerIds`, {
                                initialValue: data && data.playerIds,
                                rules: [
                                    {
                                        required: true,
                                        message: 'Input something!',
                                    },
                                ],
                            })(<Input placeholder="placeholder"/>)}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={`类目名称`}>
                            {getFieldDecorator(`categoryname`, {
                                initialValue: data && data.categoryname,
                                rules: [
                                    {
                                        required: true,
                                        message: 'Input something!',
                                    },
                                ],
                            })(<Input placeholder="placeholder"/>)}
                        </Form.Item>
                    </Col>
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
                    <Col span={12}>
                        <Form.Item label={`排序(数字越低排位越前)`}>
                            {getFieldDecorator(`sortnum`, {
                                initialValue: data && data.sortnum,
                                rules: [
                                    {
                                        required: true,
                                        message: 'Input something!',
                                    },
                                ],
                            })(<Input placeholder="placeholder"/>)}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={`跳转关键字搜索页`}>
                            {getFieldDecorator(`keyword`, {
                                initialValue: data && data.keyword,
                                rules: [
                                    {
                                        required: true,
                                        message: 'Input something!',
                                    },
                                ],
                            })(<Input placeholder="placeholder"/>)}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit" loading={this.state.loading}>
                            提交
                        </Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                            还原
                        </Button>
                        {!this.props.isAdd &&
                        <Popconfirm placement="top" title={'确认删除弹窗'} onConfirm={
                            () => this.delClass(data && data.id)
                        } okText="Yes" cancelText="No">
                            <Button loading={this.state.loading} type="primary" style={{ marginLeft: 8 }}
                            >
                                删除
                            </Button>
                        </Popconfirm>
                        }

                    </Col>
                </Row>
            </Form>
        );
    }

    delClass = (id) => {
        this.setState({ loading: true });
        delClass({ id }).then(data => {
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

export default class ColumnClassEdit1 extends React.PureComponent {
    state = { visible: false, data: {}, tab_types: [], isAdd: false };

    showModal = (data, tab_types, isAdd = this.state.isAdd) => {
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
        const { data, tab_types, isAdd } = this.state;
        if (!data) {
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
