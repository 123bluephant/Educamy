import React from 'react';
import { Card, Table, Select, DatePicker, Button, Space, Statistic, Row, Col } from 'antd';
import BackButton from '../../../../components/BackButton';

const FinancialDetails: React.FC = () => {
  const { Option } = Select;

  const columns = [
    {
      title: 'Transaction ID',
      dataIndex: 'transactionId',
      key: 'transactionId',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  const dummyData = [
    {
      key: '1',
      transactionId: 'TRX001',
      date: '2024-01-15',
      category: 'Tuition Fee',
      amount: '$500',
      status: 'Paid',
    },
    // Add more dummy data as needed
  ];

  return (
    <div className="relative min-h-screen p-8">
      <BackButton />
    <div className="p-6">
      <Row gutter={16} className="mb-6">
        <Col span={6}>
          <Card>
            <Statistic title="Total Revenue" value={42000} prefix="$" />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Pending Payments" value={15000} prefix="$" />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Expenses" value={28000} prefix="$" />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Net Profit" value={14000} prefix="$" />
          </Card>
        </Col>
      </Row>

      <Card title="Financial Transactions" className="shadow-lg">
        <Space direction="horizontal" className="mb-4">
          <Select defaultValue="category" style={{ width: 120 }}>
            <Option value="tuition">Tuition Fee</Option>
            <Option value="transport">Transport Fee</Option>
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

export default FinancialDetails;