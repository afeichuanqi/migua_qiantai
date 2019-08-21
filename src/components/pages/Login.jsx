/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { PwaInstaller } from '../widget';
import { connectAlita } from 'redux-alita';
import { login } from '../../axios';

const FormItem = Form.Item;

class Login extends React.Component {
    componentDidMount() {
        const { setAlitaState } = this.props;
        setAlitaState({ stateName: 'auth', data: null });
    }

    componentDidUpdate(prevProps) { // React 16.3+弃用componentWillReceiveProps
        const { user, history } = this.props;
        // console.log(this.props.user, 'this.props.auth');
        // localStorage.setItem
        // console.log("user.token",localStorage.getItem('user'));
        if (localStorage.getItem('user')) { // 判断是否登陆
            history.push('/');
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                const { setAlitaState } = this.props;
                const { userName, password } = values;
                if (userName && password) {
                    login({ userName, passWord: password }).then(data => {
                        if (data.status == 0) {
                            const token = data.data.token;
                            localStorage.setItem('user', JSON.stringify({ token: token }));
                            setAlitaState({ stateName: 'user', data: { token: token } });
                            console.log('我已经设置', 'this.props.auth');
                        }
                    });
                }
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <div className="login-form">
                    <div className="login-logo">
                        <span>管理终端</span>
                        <PwaInstaller/>
                    </div>
                    <Form onSubmit={this.handleSubmit} style={{ maxWidth: '300px' }}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }}/>} placeholder=""/>,
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }}/>} type="password"
                                       placeholder=""/>,
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住我</Checkbox>,
                            )}
                            {/*<span className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码</span>*/}
                            <Button type="primary" htmlType="submit" className="login-form-button"
                                    style={{ width: '100%' }}>
                                登录
                            </Button>
                            {/*<p style={{display: 'flex', justifyContent: 'space-between'}}>*/}
                            {/*    <span >或 现在就去注册!</span>*/}
                            {/*    <span onClick={this.gitHub} ><Icon type="github" />(第三方登录)</span>*/}
                            {/*</p>*/}
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

export default connectAlita(['auth', 'user'])(Form.create()(Login));