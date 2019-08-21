import React from 'react';
import md5Util from '../../utils/md5';
import { Form, Row, Col, Input, Button, Modal, Select, notification, DatePicker } from 'antd';
import moment from 'moment';
import { setUsers } from '../../axios';
import { getCurrentDate } from '../../utils/CommonUtil';
const { Option } = Select;

class AdvancedSearchForm extends React.Component {
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
            console.log(err, values);
            const params = values;
            params.vip_exp_datetime = values.vip_exp_datetime && values.vip_exp_datetime.format('YYYY-MM-DD HH:mm');
            params.create_time = values.create_time && values.create_time.format('YYYY-MM-DD HH:mm');
            const passWord = values.password;
            const md5 = new md5Util(passWord);
            const pwdToMd5 = md5.getMd5_(passWord);
            params.password = pwdToMd5;
            params.isAdd = this.props.isAdd;
            setUsers(params).then(res => {
                console.log(res);
                this.setState({ loading: false });
                if (res.status == 0) {
                    this.props.onSuccess();
                    notification.open({
                        message: '用户信息操作成功',
                        description:
                            '更新或者插入成功',
                        onClick: () => {
                            console.log('Notification Clicked!');
                        },
                    });
                } else {
                    notification.open({
                        message: '用户信息操作失败',
                        description:
                            '更新或者插入失败' + res.msg,
                        onClick: () => {
                            console.log('Notification Clicked!');
                        },
                    });
                }
            });
            console.log('Received values of form: ', params);
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
                            })(<Input disabled placeholder="placeholder"/>)}
                        </Form.Item>
                    </Col>}

                    <Col span={12}>
                        <Form.Item label={`用户名`}>
                            {getFieldDecorator(`username`, {
                                initialValue: data && data.username,
                                rules: [
                                    {
                                        required: true,
                                        message: 'Input something!',
                                    },
                                ],
                            })(<Input disabled={data.id ? true : false} placeholder="placeholder"/>)}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={`密码`}>
                            {getFieldDecorator(`password`, {
                                initialValue: data && data.password,
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
                        <Form.Item label={`邮箱`}>
                            {getFieldDecorator(`email`, {
                                initialValue: data && data.email,
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
                        <Form.Item label={`手机号码`}>
                            {getFieldDecorator(`phone_number`, {
                                initialValue: data && data.phone_number,
                                rules: [
                                    {
                                        required: false,
                                        message: 'Input something!',
                                    },
                                ],
                            })(<Input placeholder="placeholder"/>)}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={`身份`}>
                            {getFieldDecorator(`identity`, {
                                initialValue: data.identity + '',
                                rules: [
                                    {
                                        required: false,
                                        message: 'Input something!',
                                    },
                                ],
                            })(<Select>
                                <Option value="0">普通</Option>
                                <Option value="-1">游客</Option>
                            </Select>)}

                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={`每日观看次数`}>
                            {getFieldDecorator(`play_total_count`, {
                                initialValue: data && data.play_total_count,
                                rules: [
                                    {
                                        required: true,
                                        message: 'Input something!',
                                    },
                                ],
                            })(<Input placeholder="placeholder"/>)}
                        </Form.Item>
                    </Col>
                    {!isAdd && <Col span={12}>
                        <Form.Item label={`今日观看次数`}>
                            {getFieldDecorator(`play_count`, {
                                initialValue: data && data.play_count,
                                rules: [
                                    {
                                        required: true,
                                        message: 'Input something!',
                                    },
                                ],
                            })(<Input placeholder="placeholder"/>)}
                        </Form.Item>
                    </Col>}

                    <Col span={12}>
                        <Form.Item label={`到期时间`} style={{overflow:'hidden'}}>

                            {getFieldDecorator(`vip_exp_datetime`, {
                                initialValue: moment(data.vip_exp_datetime1, 'YYYY-MM-DD HH:mm'),
                                rules: [
                                    {
                                        required: true,
                                        message: 'Input something!',
                                    },
                                ],
                            })(<DatePicker style={{width:'100%'}}  showTime
                                           format="YYYY-MM-DD HH:mm"
                            />)}

                        </Form.Item>
                    </Col>
                    {!isAdd && <Col span={12}>
                        <Form.Item label={`创建时间`} style={{overflow:'hidden'}}>
                            {getFieldDecorator(`create_time`, {
                                initialValue: moment(data && data.create_time1, 'YYYY-MM-DD HH:mm'),
                                rules: [
                                    {
                                        required: true,
                                        message: 'Input something!',
                                    },
                                ],
                            })(<DatePicker style={{width:'100%'}} showTime
                                           format="YYYY-MM-DD HH:mm"
                            />)}
                        </Form.Item>
                    </Col>}
                    <Col span={12}>
                        <Form.Item label={`设备`}>
                            {getFieldDecorator(`Platforms`, {
                                initialValue: data && data.Platforms,
                                rules: [
                                    {
                                        required: true,
                                        message: 'Input something!',
                                    },
                                ],
                            })(<Select>
                                <Option value="ios">苹果</Option>
                                <Option value="android">安卓</Option>
                            </Select>)}
                        </Form.Item>
                    </Col>
                    <Col span={12}>

                        <Form.Item  label={`设备ID`}>
                            <div style={{ display: 'flex' }}>

                                {getFieldDecorator(`DeviceID`, {
                                    initialValue: data && data.DeviceID,
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Input something!',
                                        },
                                    ],
                                })(
                                    <Input style={{height:40}} placeholder="placeholder"/>,
                                )}
                                <Button size={'small'} style={{marginTop:5,marginLeft:5 }}
                                        onClick={this._randomDeviceID} type="primary">随机</Button>

                            </div>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label={`邮箱是否绑定`}>
                            {getFieldDecorator(`is_mail_bind`, {
                                initialValue: data.is_mail_bind + '',
                                rules: [
                                    {
                                        required: true,
                                        message: 'Input something!',
                                    },
                                ],
                            })(<Select>
                                <Option value="1">已经绑定</Option>
                                <Option value="0">未绑定</Option>
                            </Select>)}

                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={`推荐人`}>
                            {getFieldDecorator(`invite`, {
                                initialValue: data && data.invite,
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
                        {/*<a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>*/}
                        {/*    Collapse <Icon type={this.state.expand ? 'up' : 'down'}/>*/}
                        {/*</a>*/}
                    </Col>
                </Row>
            </Form>
        );
    }

    _randomDeviceID = () => {
        // console.log('111');
        const date = getCurrentDate(2);

        const md5 = new md5Util(date);
        const pwdToMd5 = md5.getMd5_(date);
        this.props.form.setFieldsValue({ DeviceID: pwdToMd5 });
    };
}

export default class UserEdit extends React.PureComponent {
    state = { visible: false, data: {}, isAdd: false };

    showModal = (data, isAdd = this.state.isAdd) => {
        console.log(isAdd);
        this.setState({
            visible: true,
            data,
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
        const { data, isAdd } = this.state;
        if (!data) {
            return null;
        }
        console.log(isAdd);
        return (<Modal
                title={isAdd ? '添加用户基本信息' : '编辑用户基本信息'}
                visible={this.state.visible}
                // onOk={this.handleOk}
                cancelText={"取消"}
                onCancel={this.handleCancel}
                width={900}
            >
                <UserEditForm isAdd={isAdd} {...this.props} data={data}/>
            </Modal>
        );
    }
}
const UserEditForm = Form.create({ name: 'advanced_search' })(AdvancedSearchForm);
