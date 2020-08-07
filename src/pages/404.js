import React from 'react';
import { Result, Button } from 'antd';

import Layout from '../components/layout/layout';
import SEO from '../components/seo/seo';

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Result
      status="404"
      title="Not found"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" href="/">
          Back Home
        </Button>
      }
    />
  </Layout>
);

export default NotFoundPage;
