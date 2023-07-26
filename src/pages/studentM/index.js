import { Button, Table } from 'antd';
import { useState } from 'react';
import { StudentForm } from './form'
import { CREATE, UPDATE } from '../../constant';
import { getLocalList, setLocalData } from '../../func'

const Student = () => {
    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState({})
    const [dataSource, setDataSource] = useState(getLocalList('student_data'))
    const onSave = (values) => {
        let data = getLocalList('student_data')
        if (formData?.action === CREATE) {
            data.unshift({ ...values, 'key': Date.now() })
        } else {
            for (let i = 0; i < data.length; i++) {
                if (data[i].key == formData.key) {
                    data[i] = { ...values }
                    break
                }
            }
        }
        setLocalData('student_data', [...data])
        setDataSource([...data])
        setOpen(false)
    }
    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            width: '20%'
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
            width: '20%'
        },
        {
            title: '性别',
            dataIndex: 'gender',
            key: 'gender',
            width: '20%'
        },
        {
            title: '所在班级',
            dataIndex: 'class',
            key: 'class',
            width: '20%'
        },
        {
            title: '操作',
            dataIndex: 'option',
            key: 'option',
            width: '20%',
            render: (_, record) => {
                return [<Button onClick={() => {
                    setFormData({ action: UPDATE, ...record })
                    setOpen(true)
                }}>修改</Button>, <Button danger style={{ marginLeft: 8 }} onClick={() => {
                    let data = getLocalList('student_data')
                    const newData = data.filter(item => item.key !== record.key)
                    setDataSource([...newData])
                    setLocalData('student_data', [...newData])
                }}>删除</Button>]
            }
        },
    ];
    return <>
        <Button style={{ float: 'right' }} type='primary' onClick={() => {
            setFormData({ action: CREATE })
            setOpen(true)
        }}>新建</Button>
        <Table dataSource={dataSource} columns={columns} />
        {open && <StudentForm open={open} formData={formData} onCancel={() => setOpen(false)} onSave={onSave} />}

    </>;
}
export default Student
