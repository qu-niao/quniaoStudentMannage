import { Button, Table } from 'antd';
import { useState } from 'react';
import { ClassForm } from './form'
import { CREATE, UPDATE } from '../../constant';
import { getLocalList, setLocalData } from '../../func'


const Class = () => {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({})
  const [dataSource, setDataSource] = useState(getLocalList('class_data'))

  const onSave = (values) => {
    let data = getLocalList('class_data')
    if (formData?.action === CREATE) {
      data.unshift({ 'name': values.name, 'key': Date.now() })
    } else {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key == formData.key) {
          data[i].name = values.name
          break
        }
      }
    }
    setLocalData('class_data', [...data])
    setDataSource([...data])
    setOpen(false)
  }
  const columns = [
    {
      title: '班级名称',
      dataIndex: 'name',
      key: 'name',
      width: '80%'
    },

    {
      title: '操作',
      dataIndex: 'option',
      key: 'option',
      width: '20%',
      render: (_, record) => {
        return [<Button onClick={() => {
          setFormData({ action: UPDATE, name: record.name, key: record.key })
          setOpen(true)
        }}>修改</Button>, <Button danger style={{ marginLeft: 8 }} onClick={()=>{
          let data = getLocalList('class_data')
          const newData=data.filter(item=>item.key!==record.key)
          setDataSource([...newData])
          setLocalData('class_data',[...newData])
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
    {open && <ClassForm open={open} formData={formData} onCancel={() => setOpen(false)} onSave={onSave} />}

  </>;
}
export default Class
