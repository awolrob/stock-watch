import React, { useState } from "react";
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Searchstocks from "./pages/Searchstocks";
import Savedstocks from "./pages/Savedstocks";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignupForm";
import PageHeader from "./components/PageHeader";
import Auth from "./utils/auth";
import {
  Layout,
  Menu,
} from "antd";
import {
  BarChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { setContext } from '@apollo/client/link/context';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, } from '@apollo/client';

const { Header, Content, Footer, Sider } = Layout;

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {

  const [activePage, setActivePage] = useState("Searchstocks");

  function RenderPage() {
    if (activePage === "Searchstocks") {
      return <Searchstocks />;
    } else if (activePage === "SignupForm") {
      return <SignUpForm />;
    } else if (activePage === "LoginForm") {
      return <LoginForm />;
    } else if (activePage === "Savedstocks") {
      return <Savedstocks />;
    }
  }



  return (
    <ApolloProvider client={client}>
      <Layout>

        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
          }}
          breakpoint="lg"
          collapsedWidth="50"
          onBreakpoint={broken => {
          }}
          onCollapse={(collapsed, type) => {
          }}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            {/* main page */}
            <Menu.Item key="1" icon={<BarChartOutlined />} onClick={() => {
              setActivePage("Searchstocks");
            }}
            >
              Search for Stocks
            </Menu.Item>
            {/* logged in */}
            {Auth.loggedIn() ? (
              <>
                <Menu.Item key="4" icon={<BarChartOutlined />} onClick={() => {
                  setActivePage("Savedstocks");
                }}
                >
                  Your Stocks
                </Menu.Item>

                <Menu.Item key="5" icon={<UserOutlined />} onClick={Auth.logout}
                >
                  Logout
                </Menu.Item>
                <Menu.Item key="6" icon={<BarChartOutlined />}>
                  Donations
                </Menu.Item>

              </>
            ) : (
              // logged out
              <>
                <Menu.Item key="2" icon={<UserOutlined />} onClick={() => {
                  setActivePage("SignupForm");
                }}
                >
                  Sign Up
                </Menu.Item>

                <Menu.Item key="3" icon={<UserOutlined />} onClick={() => {
                  setActivePage("LoginForm");
                }}
                >
                  Login
                </Menu.Item>
              </>
            )}
          </Menu>
        </Sider>
        <Layout
          className="site-layout ant-row layout"
          breakpoint="lg"

        >
          <Header className="site-layout-background ant-col" style={{ padding: 0, textAlign: "center" }}>
            <PageHeader setActivePage={setActivePage} />

          </Header>
          <Content className="ant-col" style={{ padding: 10, margin: "24px 16px 0", overflow: "initial" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, textAlign: "center" }}
            >
              {RenderPage()}
            </div>
          </Content>
          <Footer className="ant-col" style={{ textAlign: "center" }}>
          ©2021 BIG STONKS Inspired Designs By Eddie, Mason, Max, Patrick, Rob, Seth
          </Footer>
        </Layout>
      </Layout>
    </ApolloProvider>
  );
}

export default App;
