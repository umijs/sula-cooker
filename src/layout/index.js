import React from 'react';
import { Layout, Space, Tooltip } from 'antd';
import {
  DingtalkOutlined,
  AlipayCircleOutlined,
  GithubOutlined,
} from '@ant-design/icons';
import Nav from '@sula/nav';
import { ConfigProvider } from 'sula';
import routes from '@/routes';
import menus from '@/menus';
import TipsSwitch from '@/components/tipsSwitch';
import LanguageSwitch from '@/components/languageSwitch';
import ThemeSwitch from '@/components/themeSwitch';
import GuideWrapper from '@/components/guide';
import { setLocale, getLocale, history } from 'umi';
import ThemeContext, { GUIDE, DONE } from './themeContext';

import zhCN from 'sula/es/localereceiver/zh_CN';
import enUS from 'sula/es/localereceiver/en_US';

import styles from './index.less';

export default class LayoutComponent extends React.Component {
  state = {
    hiddenCustomControls: false,
    locale: getLocale(),
    theme: 'bluebird',
    hiddenGuideTips: localStorage.getItem(GUIDE) === DONE,
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
        <TipsSwitch
          key={this.state.hiddenCustomControls}
          onClick={this.toggleQuestion}
        />
        {/* <ThemeSwitch handleChangeTheme={this.handleChangeTheme} /> */}
        <LanguageSwitch handleChangeLanguage={this.handleChangeLanguage} />
        <Tooltip title="github">
          <GithubOutlined
            onClick={() => {
              window.open('https://github.com/umijs/sula');
            }}
            className={styles.github}
          />
        </Tooltip>
      </Space>
    );
  };

  toggleGuideTips = visible => {
    this.setState({
      hiddenGuideTips: visible,
    });
  };

  render() {
    const { children } = this.props;
    const { hiddenCustomControls, hiddenGuideTips, locale, theme } = this.state;

    return (
      <ThemeContext.Provider
        value={{
          hiddenCustomControls,
          hiddenGuideTips,
          toggleGuideTips: this.toggleGuideTips,
        }}
      >
        <GuideWrapper>
          <Layout className={styles.wrapper}>
            <Layout.Content className={styles.content}>
              <ConfigProvider
                history={history}
                theme={theme}
                locale={locale === 'zh-CN' ? zhCN : enUS}
              >
                {children}
              </ConfigProvider>
            </Layout.Content>
          </Layout>
        </GuideWrapper>
      </ThemeContext.Provider>
    );
  }
}
