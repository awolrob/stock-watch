import React from "react";
import { PageHeader, Tabs, Button, Statistic, Descriptions } from 'antd';
// import { PageHeader } from "antd";

const renderHeader = () => {
    return (
        <>
        <PageHeader
        className="site-page-header-responsive"
        onBack={() => window.history.back()}
        title="Stock Watch"
        subTitle="The Ultimate Stock Portfolio Assistant"
        extra={[
          <Button key="3">Operation</Button>,
          <Button key="2">Operation</Button>,
          <Button key="1" type="primary">
            Primary
          </Button>,
        ]}>
            </PageHeader>
            </>
    )
}

export default renderHeader;
