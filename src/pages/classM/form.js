import React from 'react';
import {  Form, Input, Modal } from 'antd';
export const ClassForm = ({ open,formData, onSave, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      open={open}
      title="编辑班级弹窗"
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
        }}
      >
        <Form.Item
          name="name"
          label="班级名称"
          rules={[
            {
              required: true,
              message: '该项必填！'
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

