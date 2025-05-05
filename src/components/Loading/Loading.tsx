import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const LoadingPage: React.FC = () => {
  return (
    <div 
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <Spin 
        indicator={
          <LoadingOutlined style={{ fontSize: 48 }} spin />
        } 
      />
      <p style={{ marginTop: 16, fontSize: 18 }}>Loading...</p>
    </div>
  );
};

export default LoadingPage;
