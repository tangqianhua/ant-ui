import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/button/Button';
import Alert from './components/alert/Alert';
import Menu from './components/menu/Menu';
import MenuItem from './components/menu/MenuItem';
import SubMenu from './components/menu/SubMenu';
import Icon from './components/icon/icon';
import Input from './components/input/Input';
import AutoComplete from './components/auto-complete/AutoComplete';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

const testAutoCompleteValue = [
  { value: '1枪会山', number: 1 },
  { value: '1钱记', number: 2 },
];

function App() {
  const onClose = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {};

  const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  const fetchSuggestions = (value: string, cb: Function) => {
    const res = testAutoCompleteValue.filter((v) => v.value.includes(value));
    cb(res);
  };

  const selectAutoComplete = (value: string) => {
    console.log(value);
  };

  const renderDropdown = (item: any) => {
    return <h1>{item.value}</h1>;
  };

  return (
    <div className="App">
      {/* <Button>Hello</Button>
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
      </Menu> */}

      <Menu mode="vertical">
        <MenuItem>111</MenuItem>
        <MenuItem>222</MenuItem>
        <SubMenu title="SubMenu">
          <MenuItem>111</MenuItem>
          <MenuItem>222</MenuItem>
        </SubMenu>
      </Menu>

      <Icon icon="coffee" theme="primary"></Icon>

      {/* <Input size="lg" onChange={changeInput} placeholder="hello"></Input>
      <Input prepend="http"></Input>
      <Input append=".com"></Input>
      <Input disabled></Input> */}

      <AutoComplete
        fetchSuggestions={fetchSuggestions}
        onSelect={selectAutoComplete}
        renderOption={renderDropdown}
      ></AutoComplete>
    </div>
  );
}

export default App;
