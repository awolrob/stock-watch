import React, { useState } from "react";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";
import { PageHeader, Tabs, Button, Statistic, Descriptions } from 'antd';
import Savedstocks from "../pages/Savedstocks";
import Searchstocks from "../pages/Searchstocks";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignupForm";
import Auth from "../utils/auth";
import {useHistory}  from 'react-router';
import { Menu } from 'antd';
import AppNavbar from "./Navbar";


const RenderPage = ({setActivePage}) => {



    return (
      Auth.loggedIn() ? (
        <>
        <PageHeader
        className="site-page-header-responsive"
        onBack={() => window.history.back()}
        title="Stock Watch"
        subTitle="The Ultimate Stock Portfolio Assistant"
        extra={[
          <Button key="4" onClick={() => {setActivePage("Searchstocks");}}>Home</Button>,
          <Button key="3" onClick={() => {setActivePage("Savedstocks");}}>Your Stocks</Button>,
          <Button key="2" onClick={() => {setActivePage("Searchstocks");}}>Donations</Button>,
          <Button key="1" onClick={Auth.logout} type="primary">
            Logout
          </Button>,
        ]}>
        </PageHeader>
            </>
      ) : (
        <>
        <PageHeader
        className="site-page-header-responsive"
        onBack={() => window.history.back()}
        title="Stock Watch"
        subTitle="The Ultimate Stock Portfolio Assistant"
        extra={[
          <Button key="3" onClick={() => {setActivePage("Searchstocks");}}>Home</Button>,
          <Button key="2" onClick={() => {setActivePage("SignupForm");}}>Sign Up</Button>,
          <Button key="1" onClick={Auth.login} type="primary">
            Login
          </Button>
          ,
        ]}>
        </PageHeader>
        </>
      )
    )
}

export default RenderPage;
