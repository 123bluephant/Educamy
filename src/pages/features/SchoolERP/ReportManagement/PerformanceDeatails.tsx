import React from 'react';
import { Card, Table, Select, DatePicker, Button, Space, Row, Col } from 'antd';
import { Area } from '@ant-design/plots';
import BackButton from '../../../../components/BackButton';

const PerformanceDetails: React.FC = () => {
  const { Option } = Select;

  const columns = [
    {
      title: 'Student ID',
      dataIndex: 'studentId',
      key: 'studentId',
    },
    {
      title: 'Student Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Class',
      dataIndex: 'class',
      key: 'class',
    },
    {
      title: 'Overall Grade',
      dataIndex: 'grade',
      key: 'grade',
    },
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
    },
  ];

  const dummyData = [
    {
      key: '1',
      studentId: 'STD001',
      name: 'John Doe',
      class: 'Class X-A',
      grade: 'A',
      rank: 1,
    },
    // Add more dummy data as needed
  ];

  const performanceData = [
    { month: 'Jan', score: 85 },
    { month: 'Feb', score: 88 },
    { month: 'Mar', score: 82 },
    { month: 'Apr', score: 90 },
    { month: 'May', score: 85 },
  ];

  const config = {
    data: performanceData,
    xField: 'month',
    yField: 'score',
    smooth: true,
  };

  return (
    <div className="relative min-h-screen p-8">
      <BackButton />
    <div className="p-6">
      <Card title="Performance Analysis" className="shadow-lg mb-6">
        <Row gutter={16}>
          <Col span={24}>
            <Area {...config} />
          </Col>
        </Row>
      </Card>

      <Card title="Detailed Performance Report" className="shadow-lg">
        <Space direction="horizontal" className="mb-4">
          <Select defaultValue="class" style={{ width: 120 }}>
            <Option value="class">Class X-A</Option>
            <Option value="class2">Class X-B</Option>
          </Select>
          <DatePicker.RangePicker />
          <Button type="primary">Generate Report</Button>
        </Space>
        <Table columns={columns} dataSource={dummyData} />
      </Card>
    </div>
    </div>
  );
};

export default PerformanceDetails;