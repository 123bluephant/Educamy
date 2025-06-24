import React from 'react';
import { Card, Table, Select, DatePicker, Button, Space } from 'antd';
import BackButton from '../../../../components/BackButton';

const AcademicDetails: React.FC = () => {
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
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      key: 'grade',
    },
    {
      title: 'Remarks',
      dataIndex: 'remarks',
      key: 'remarks',
    },
  ];

  const dummyData = [
    {
      key: '1',
      studentId: 'STD001',
      name: 'John Doe',
      class: 'Class X-A',
      subject: 'Mathematics',
      grade: 'A',
      remarks: 'Excellent performance',
    },
    // Add more dummy data as needed
  ];

  return (
    <div className="relative min-h-screen p-8">
      <BackButton />
    <div className="p-6">
      <Card title="Academic Performance Report" className="shadow-lg">
        <Space direction="horizontal" className="mb-4">
          <Select defaultValue="class" style={{ width: 120 }}>
            <Option value="class">Class X-A</Option>
            <Option value="class2">Class X-B</Option>
          </Select>
          <Select defaultValue="subject" style={{ width: 120 }}>
            <Option value="math">Mathematics</Option>
            <Option value="science">Science</Option>
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

export default AcademicDetails;