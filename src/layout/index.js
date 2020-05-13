import React from 'react';
import { Layout, Space } from 'antd';
import { DingtalkOutlined, AlipayCircleOutlined } from '@ant-design/icons';
import Nav from '@sula/nav';
import { ConfigProvider } from 'sula';
import routes from '@/routes';
import menus from '@/menus';
import TipsButton from '@/components/tipsButton';
import LocaleSwitch from '@/components/localeSwitch';
import ThemeSwitch from '@/components/themeSwitch';
import { setLocale, getLocale, history } from 'umi';
import ThemeContext from './themeContext';

import zhCN from 'sula/es/localereceiver/zh_CN';
import enUS from 'sula/es/localereceiver/en_US';

import styles from './index.less';

export default class LayoutComponent extends React.Component {
  state = {
    hiddenCustomControls: false,
    locale: getLocale(),
    theme: 'bluebird',
  };

  componentDidMount() {
    Nav.start({
      siderConfig: {
        menus,
      },
      getUserInfo: () => {
        return Promise.resolve({
          operatorName: 'Sula',
        });
      },
      userInfoViewVisible: false,
      getTopMenus: () => {
        return Promise.resolve([
          {
            name: 'DingDing',
            icon: <DingtalkOutlined />,
          },
          {
            name: 'Alipay',
            icon: <AlipayCircleOutlined />,
          },
        ]);
      },
      navRightExtra: this.navRightExtraRender(),
      breadcrumbVisible: true, // 是否显示面包屑
      routes, // 路由信息（项目路由配置信息)
    });
  }

  handleChangeLanguage = lang => {
    setLocale(lang);
    this.setState({
      locale: lang,
    });
  };

  handleChangeTheme = theme => {
    this.setState({
      theme,
    });
  };

  toggleQuestion = () => {
    this.setState({
      hiddenCustomControls: !this.state.hiddenCustomControls,
    });
  };

  navRightExtraRender = () => {
    return (
      <Space className={styles.navExtra}>
        <TipsButton
          key={this.state.hiddenCustomControls}
          onClick={this.toggleQuestion}
        />
        {/* <ThemeSwitch handleChangeTheme={this.handleChangeTheme} /> */}
        <LocaleSwitch handleChangeLanguage={this.handleChangeLanguage} />
      </Space>
    );
  };

  render() {
    const { children } = this.props;
    const { hiddenCustomControls, locale, theme } = this.state;

    return (
      <Layout className={styles.wrapper}>
        <Layout.Content className={styles.content}>
          <ConfigProvider
            history={history}
            theme={theme}
            locale={locale === 'zh-CN' ? zhCN : enUS}
          >
            <ThemeContext.Provider value={{ hiddenCustomControls }}>
              {children}
            </ThemeContext.Provider>
          </ConfigProvider>
        </Layout.Content>
      </Layout>
    );
  }
}
