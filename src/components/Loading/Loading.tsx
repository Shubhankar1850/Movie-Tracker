import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';

const LoadingPage: React.FC = () => {
  return (
    <Flex justify='center' align='center' style={{height:"60vh"}}>
      <Spin 
        indicator={
          <LoadingOutlined style={{ fontSize: 48 }} spin />
        } 
      />
      <p style={{ marginTop: 16, fontSize: 18 }}>Loading...</p>
    </Flex>
  );
};

export default LoadingPage;
