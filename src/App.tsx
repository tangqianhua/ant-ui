import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/button/Button';
import Alert from './components/alert/Alert';
import Menu from './components/menu/Menu';
import MenuItem from './components/menu/MenuItem';
import SubMenu from './components/menu/SubMenu';
import Icon from './components/icon/icon';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

function App() {
  const onClose = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {};

  return (
    <div className="App">
      <Button>Hello</Button>
      <Button btnType={ButtonType.Primary}>Primary</Button>
      <Button btnType={ButtonType.Default}>Default</Button>
      <Button disabled btnType={ButtonType.Danger} size={ButtonSize.Small}>
        Danger
      </Button>
      <Button disabled>Hello</Button>
      <Button disabled btnType={ButtonType.Link} href="http://www.baidu.com">
        disabled link
      </Button>
      <Button btnType={ButtonType.Link} href="http://www.baidu.com">
        link
      </Button>

      <Alert message="提示性" type="error" description="一段描述性的" closable onClose={onClose}></Alert>
      <Alert message="提示性" closeText="关闭"></Alert>
      <Alert message="提示性" type="default"></Alert>
      <Alert message="提示性" type="success"></Alert>
      <Alert message="提示性" type="warning"></Alert>

      <Menu defaultIndex="0">
        <MenuItem index="0">111</MenuItem>
        <MenuItem index="1">222</MenuItem>
        <MenuItem disabled index="2">
          222
        </MenuItem>
        <SubMenu title="SubMenu" index="3">
          <MenuItem index="3-1">111</MenuItem>
          <MenuItem index="3-1">222</MenuItem>
        </SubMenu>
      </Menu>

      <Menu mode="vertical">
        <MenuItem>111</MenuItem>
        <MenuItem>222</MenuItem>
        <SubMenu title="SubMenu">
          <MenuItem>111</MenuItem>
          <MenuItem>222</MenuItem>
        </SubMenu>
      </Menu>

      <Icon icon="coffee" theme="primary"></Icon>
    </div>
  );
}

export default App;
