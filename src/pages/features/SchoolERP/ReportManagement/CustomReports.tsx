import React, { useState } from 'react';
import { Card, Form, Select, Button, Space, Divider, Input, Checkbox, Table } from 'antd';
import BackButton from '../../../../components/BackButton';

const CustomReports: React.FC = () => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const [selectedFields, setSelectedFields] = useState<string[]>([]);

  const availableFields = [
    { label: 'Student ID', value: 'studentId' },
    { label: 'Student Name', value: 'name' },
    { label: 'Class', value: 'class' },
    { label: 'Section', value: 'section' },
    { label: 'Roll Number', value: 'rollNumber' },
    { label: 'Attendance', value: 'attendance' },
    { label: 'Grades', value: 'grades' },
    { label: 'Fee Status', value: 'feeStatus' },
  ];

  const handleFieldSelection = (checkedValues: string[]) => {
    setSelectedFields(checkedValues);
  };

  const columns = selectedFields.map(field => ({
    title: availableFields.find(f => f.value === field)?.label,
    dataIndex: field,
    key: field,
  }));

  return (
    <div className="relative min-h-screen p-8">
      <BackButton />
    <div className="p-6">
      <Card title="Custom Report Generator" className="shadow-lg">
        <Form form={form} layout="vertical">
          <Form.Item label="Report Name" name="reportName">
            <Input placeholder="Enter report name" />
          </Form.Item>

          <Form.Item label="Select Category" name="category">
            <Select placeholder="Select a category">
              <Option value="academic">Academic</Option>
              <Option value="attendance">Attendance</Option>
              <Option value="financial">Financial</Option>
            </Select>
          </Form.Item>

          <Divider>Select Fields</Divider>

          <Form.Item>
            <Checkbox.Group
              options={availableFields}
              value={selectedFields}
              onChange={handleFieldSelection}
            />
          </Form.Item>

          <Space direction="horizontal" className="mb-4">
            <Button type="primary">Generate Custom Report</Button>
            <Button>Save Template</Button>
          </Space>
        </Form>

        {selectedFields.length > 0 && (
          <div className="mt-6">
            <Divider>Preview</Divider>
            <Table columns={columns} dataSource={[]} />
          </div>
        )}
      </Card>
    </div>
    </div>
  );
};

export default CustomReports;