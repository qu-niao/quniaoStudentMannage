import React, { useState, useEffect } from 'react';
import { Row, Col, Tooltip, Card } from 'antd';
import { UnorderedListOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { RingChart } from './charts';
import { getLocalList } from '../../func';

const Overview = () => {
    const [data, setData] = useState({})
    const STATIC_MAP = [
        {
            name: '学生总数',
            countKey: 'student_count',
            newCountKey: 'student_new_count',
            tip: '平台中创建的学生数量汇总',
        },
        {
            name: '班级总数',
            countKey: 'class_count',
            newCountKey: 'class_new_count',
            tip: '平台中创建的班级数量汇总',
        },
        {
            name: '男生总数',
            countKey: 'man_count',
            newCountKey: 'man_new_count',
            tip: '平台中男生数量汇总',
        },
        {
            name: '女生总数',
            countKey: 'woman_count',
            newCountKey: 'woman_new_count',
            tip: '平台中女生数量汇总',
        },
    ];
    useEffect(() => {
        const classData = getLocalList('class_data')
        const studentData = getLocalList('student_data')
        let data = { class: [], gender: [], class_count: classData.length, student_count: studentData.length, man_count: 0, woman_count: 0 }
        let classPeopleConut = {}
        let genderPeopleCount = {}
        studentData.forEach(item => {
            if (!classPeopleConut[item.class]) {
                classPeopleConut[item.class] = 0
            }
            if (!genderPeopleCount[item.gender]) {
                genderPeopleCount[item.gender] = 0
            }
            data[item.gender === '男' ? 'man_count' : 'woman_count'] += 1
            classPeopleConut[item.class] += 1
            genderPeopleCount[item.gender] += 1

        });
        for (let key in classPeopleConut) {
            data.class.push({ name: key, count: classPeopleConut[key] })
        }
        for (let key in genderPeopleCount) {
            data.gender.push({ name: key, count: genderPeopleCount[key] })
        }
        setData(data)
    }, [])

    return <Row gutter={[16,8]} style={{ paddingTop: 8, height: '100%', backgroundColor: '#F5F5F5' }}>
        <Col span={24}>
            <Row gutter={16}>
                {STATIC_MAP.map((item) => (
                    <Col span={6}>
                        <Card style={{ backgroundColor: 'white', paddingBottom: 10 }}>
                            <>
                                <div>
                                    <span style={{ color: '#8C8C8C' }}>{item.name}</span>{' '}
                                    <Tooltip title={item.tip}>
                                        <InfoCircleOutlined
                                            style={{ position: 'absolute', right: 16, fontSize: 16, color: '#8C8C8C' }}
                                        />
                                    </Tooltip>
                                </div>
                                <p style={{ fontSize: 36, marginBottom: 0, fontWeight: 'bold' }}>
                                    {data[item.countKey]}
                                </p>
                                <span style={{ position: 'absolute', right: 16, fontSize: 10 }}>
                                    较昨日新增：{data[item.newCountKey]||0}
                                </span>
                            </>

                        </Card>
                    </Col>
                ))}
            </Row>
        </Col>
        <Col span={12}>
            <Card bordered={false} title={
                <p style={{ fontWeight: 'bold' }}>
                    各班级人数统计{' '}
                    <UnorderedListOutlined
                        style={{ position: 'absolute', right: 24, top: 20, fontSize: 24 }}
                    />
                </p>
            }>
                <RingChart data={data.class || []} content="人数统计" color={{
                    color: ['#657798', '#F6C022', '#62DAAB', '#7666F9', '#74CBED', '#6395F9'],
                }} />
            </Card>
        </Col>
         <Col span={12}>
            <Card bordered={false} title={
                <p style={{ fontWeight: 'bold' }}>
                    各性别人数占比{' '}
                    <UnorderedListOutlined
                        style={{ position: 'absolute', right: 24, top: 20, fontSize: 24 }}
                    />
                </p>
            }>
                <RingChart data={data.gender || []} content="性别统计" />
            </Card>
        </Col></Row>
}

export default Overview