import React, { useState } from 'react';
import { Select, InputNumber, Form, Input, Modal, Radio } from 'antd';
import { getLocalList } from '../../func';
export const StudentForm = ({ open, formData, onSave, onCancel }) => {
  const [form] = Form.useForm();
  const getClassCand = () => getLocalList('class_data').map(item => { return { value: item.name, label: item.name } })
  return (
    <Modal
      open={open}
      title="编辑学生弹窗"
      okText="确定"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onSave(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          name: formData?.name,
          age: formData?.age || 18,
          gender: formData?.gender || '男',
          class: formData?.class || null,
        }}
      >
        <Form.Item
          name="name"
          label="姓名"
          rules={[
            {
              required: true,
              message: '该项必填！'
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="age"
          label="年龄"
          rules={[
            {
              required: true,
              message: '该项必填！'
            },
          ]}
          style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
        >
          <InputNumber placeholder="请输入年龄" />

        </Form.Item>
        <Form.Item
          name="gender"
          label="性别"
          rules={[{ required: true }]}
          style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
        >
          <Radio.Group optionType='button'>
            <Radio value="男">男</Radio>
            <Radio value="女">女</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="class"
          label="所在班级"
          placeholder="请选择班级"
          rules={[
            {
              required: true,
              message: '该项必填！'
            },
          ]}
        >
          <Select
            options={getClassCand()}
          />
        </Form.Item>
      </Form>
    </Modal >
  );
};

