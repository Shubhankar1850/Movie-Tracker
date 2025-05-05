import React from 'react';
import { Button, Flex, Typography } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
// import './BookmarkEmptyPage.css';

const { Title, Text } = Typography;

const BookmarkEmptyPage: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = ()=>{
    navigate("/")
  }
  return (
    <Flex 
      vertical 
      justify="center" 
      align="center" 
      style={{ height: '80vh', textAlign: 'center', width:"100%"}}
    >
      <BookOutlined style={{ fontSize: 64, color: '#1890ff', marginBottom: 16 }} />

      <Title level={3} style={{color:'white'}}>No Bookmarks Yet</Title>

      <Text type="secondary"  style={{color:'white'}}>
        Looks like you haven't saved any movies. Start exploring and add your favorites!
      </Text>

      <Button 
        type="primary" 
        size="large" 
        onClick={handleClick}
        style={{ marginTop: 24 }}
      >
        Browse Movies
      </Button>
    </Flex>
  );
};

export default BookmarkEmptyPage;
