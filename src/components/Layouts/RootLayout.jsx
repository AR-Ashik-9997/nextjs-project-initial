import React, { useState, useEffect } from "react";
import { Menu, Layout, Dropdown, Button, theme } from "antd";
import {
  UserOutlined,  
  LogoutOutlined,
  MenuOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

const RootLayout = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuVisible(true);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const menu = (
    <Menu theme="dark">
      <Menu.Item key="1">Home</Menu.Item>
      <Menu.Item key="2">About</Menu.Item>
      <Menu.Item key="3">Contact</Menu.Item>

      {isLoggedIn && (
        <>
          <Menu.Item key="4">
            <span onClick={handleLogout}>
              <LogoutOutlined /> Logout
            </span>
          </Menu.Item>
          <Menu.Item key="5">
            <UserOutlined /> Profile
          </Menu.Item>
        </>
      )}
    </Menu>
  );

  return (
    <Layout className="layout">
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="logo">
          <h1 style={{ color: "white" }}>This is the logo</h1>
        </div>
        {!isMobile ? (
          <div className="menu">
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">Home</Menu.Item>
              <Menu.Item key="2">About</Menu.Item>
              <Menu.Item key="3">Contact</Menu.Item>

              {isLoggedIn && (
                <>
                  <Menu.Item key="4" style={{ float: "right" }}>
                    <span onClick={handleLogout}>
                      <LogoutOutlined /> Logout
                    </span>
                  </Menu.Item>
                  <Menu.Item key="5" style={{ float: "right" }}>
                    <UserOutlined /> Profile
                  </Menu.Item>
                </>
              )}
            </Menu>
          </div>
        ) : (
          <div className="mobile-menu">
            <Dropdown
              overlay={menu}
              placement="bottomRight"
              visible={isMobileMenuVisible}
              onVisibleChange={handleMobileMenuToggle}
            >
              <Button
                type="primary"
                onClick={handleMobileMenuToggle}
                icon={<MenuOutlined />}
              />
            </Dropdown>
          </div>
        )}
      </Header>
      <Content
        style={{
          padding: "0 50px",
        }}
      >
        <div
          className="site-layout-content"
          style={{ minHeight: "100vh", background: colorBgContainer }}
        >
          {children}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default RootLayout;
