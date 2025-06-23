import React from 'react';
import { Card, Table, Select, DatePicker, Button, Space, Progress } from 'antd';

const AttendenceDetails: React.FC = () => {
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
      title: 'Present Days',
      dataIndex: 'presentDays',
      key: 'presentDays',
    },
    {
      title: 'Absent Days',
      dataIndex: 'absentDays',
      key: 'absentDays',
    },
    {
      title: 'Attendance %',
      dataIndex: 'attendance',
      key: 'attendance',
      render: (attendance: number) => (
        <Progress percent={attendance} size="small" />
      ),
    },
  ];

  const dummyData = [
    {
      key: '1',
      studentId: 'STD001',
      name: 'John Doe',
      class: 'Class X-A',
      presentDays: 85,
      absentDays: 15,
      attendance: 85,
    },
    // Add more dummy data as needed
  ];

  return (
    <div className="p-6">
      <Card title="Attendance Report" className="shadow-lg">
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
  );
};

export default AttendenceDetails;