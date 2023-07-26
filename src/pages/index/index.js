import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import StudentM from '../studentM'
import ClassM from '../classM'
import Overview from '../overview';
import { Link, Routes, Route } from 'react-router-dom'
import { Layout, Menu, Button, theme } from 'antd';
const { Header, Sider, Content } = Layout;
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout style={{height:'100vh'}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <h3 style={{ color: 'white', textAlign: 'center' }}>曲鸟学生管理系统</h3>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: <Link to={`/index/overview`}>数据概览</Link>,
            },
            {
              key: '2',
              icon: <UserOutlined />,
              label: <Link to={`/index/student`}>学生管理</Link>,
            },
            {
              key: '3',
              icon: <UsergroupAddOutlined />,
              label: <Link to={`/index/class`}>班级管理</Link>,
            },

          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '16px 8px',
            padding: 16,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Routes>
          <Route path="/overview" element={<Overview />} />
            <Route path="/student" element={<StudentM />} />
            <Route path="/class" element={<ClassM />} />
          </Routes>
        </Content>
      </Layout>


    </Layout>
  );
};
export default App;