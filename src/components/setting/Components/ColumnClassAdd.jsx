import React from 'react';
import { Form, Row, Col, Input, Button, Modal, Select, notification } from 'antd';
import { setBigClass } from '../../../axios';

const { Option } = Select;

class ColumnClassAddItem extends React.Component {
    state = {
        expand: false,
        loading: false,
    };


    // componentWillReceiveProps(nextProps, nextContext) {
    //     if (nextProps.data.id != this.props.data.id) {
    //         this.props.form.resetFields();
    //         this.setState({ loading: false });
    //     }
    // }

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
            setBigClass(values).then(data => {
                if (data.status == 0) {
                    this.setState({
                        loading: false,
                    });

                    notification.open({
                        message: '大类目增加成功',
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
        // const { data, isAdd } = this.props;
        return (
            <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item label={`tab_name`}>
                            {getFieldDecorator(`tab_name`, {
                                initialValue: '',
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
                        <Form.Item label={`标题`}>
                            {getFieldDecorator(`tab_title`, {
                                initialValue: '',
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
                        <Form.Item label={`类目类型`}>
                            {getFieldDecorator(`tab_type`, {
                                initialValue: '1',
                                rules: [
                                    {
                                        required: true,
                                        message: 'Input something!',
                                    },
                                ],
                            })(<Select onSelect={this._onSelect}>
                                <Option value={'1'}>类目一</Option>
                                <Option value={'2'}>类目二</Option>
                            </Select>)}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={`排序`}>
                            {getFieldDecorator(`sort_num`, {
                                initialValue: '',
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
                        <Form.Item label={`是否可见`}>
                            {getFieldDecorator(`checked`, {
                                initialValue: '0',
                                rules: [
                                    {
                                        required: true,
                                        message: 'Input something!',
                                    },
                                ],
                            })(<Select onSelect={this._onSelect}>
                                <Option value={'1'}>可见</Option>
                                <Option value={'0'}>隐藏</Option>
                            </Select>)}
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
                    </Col>
                </Row>
            </Form>
        );
    }


}

export default class ColumnClassAdd extends React.PureComponent {
    state = { visible: false, data: {}, tab_types: [], isAdd: false };

    showModal = (tab_types) => {
        this.setState({
            visible: true,
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
        // const { data, tab_types, isAdd } = this.state;

        return (<Modal
                title={'添加大类目'}
                visible={this.state.visible}
                cancelText={'取消'}
                onCancel={this.handleCancel}
                width={900}
            >
                <UserEditForm  {...this.props} />
            </Modal>
        );
    }
}
const UserEditForm = Form.create({ name: 'advanced_add' })(ColumnClassAddItem);
