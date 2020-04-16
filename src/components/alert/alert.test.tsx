import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Alert from './Alert';

describe('test Alert', () => {
  it('test default alert without state', () => {
    const wrapper = render(<Alert message="describe"></Alert>);
    const ele = wrapper.getByText('describe');

    expect(ele.textContent).toEqual('describe');
  });

  it('should render the close icon', () => {
    const onClose = jest.fn();
    const wrapper = render(<Alert message="describe" closable={true} onClose={onClose}></Alert>);
    const ele = wrapper.getByTestId('iconfont');
    const closeEle = wrapper.getByTestId('close');

    expect(ele).toBeInTheDocument();
    expect(closeEle).toBeInTheDocument();

    fireEvent.click(closeEle);
    expect(onClose).toBeCalled();
  });

  it('should render the closeText', () => {
    const onClose = jest.fn();
    const wrapper = render(<Alert message="describe" closable={true} closeText="测试" onClose={onClose}></Alert>);
    const closeTextEle = wrapper.getByTestId('closeText');
    const closeEle = wrapper.getByTestId('close');

    expect(closeTextEle).toBeInTheDocument();
    expect(closeEle).toBeInTheDocument();

    expect(closeTextEle.textContent).toEqual('测试');
    fireEvent.click(closeEle);
    expect(onClose).toBeCalled();
  });
});
