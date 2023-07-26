import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from "react-router-dom";
import './index.css';

const Login = () => {
    const navigate = useNavigate()
    const onFinish = (values) => {
        if (values.username === 'quniao' && values.password === '123456') {
            navigate('/index/overview')
        } else {
            message.error('账号或密码错误！')
        }
    };
    const onFinishFailed = (errorInfo) => { };

    return (
        <div>
            <div className="container">
                <div className="login">
                    <h1 style={{ fontWeight: 600, textAlign: 'center', marginBottom: 30 }}>曲鸟学生管理系统</h1>
                    <Form
                        name="basic"
                        // labelCol={{ span: 8 }}
                        wrapperCol={{ span: 24 }}
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入用户名!' }]}>
                            <Input placeholder="请输入用户名" />
                        </Form.Item>
                        <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码!' }]}>
                            <Input.Password placeholder="请输入密码" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};
export default React.memo(Login);
