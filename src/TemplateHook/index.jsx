/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
// classNames({ name: true, name2: false })  ==> 'name'
import config from './config';
import styles from './index.less';

/**
 * @description: TemplateHook
 * @param {object} props
 * @return {TemplateHook}
 * @author: gll
 */
function TemplateHook(props) {
  /**
   * @description: 创建ref对象
   */
  const divRef = useRef(null);

  /**
   * @description: 创建这个变量,并可以重新设置
   */
  const [count, setCount] = useState(0);

  /**
   * @description: 生命周期 componentDidMonut
   */
  useEffect(() => {
    console.log(`componentDidMonut---${count}`);
    return () => {
      // 相当于 componentWillUnmount
      console.log(`componentWillUnmount---${count}`);
    };
  }, []);

  /**
   * @description: 生命周期 componentDidUpdate and componentDidMonut
   */
  useEffect(() => {
    console.log(`componentDidUpdate---${count}`);
    console.log(divRef);
  });

  /**
   * @description:  修改count变量
   * @param   {array}   array   test variable
   * @return {undefined}
   */
  const onChange = (array = []) => {
    setCount(count + 1);
  };

  const { name = '' } = props;
  return (
    <div ref={divRef} className={styles.temp}>
      <span
        onClick={() => {
          onChange();
        }}
      >
        Hello World
        {name}
      </span>
    </div>
  );
}

TemplateHook.defaultProps = {
  name: 'default',
};
export default TemplateHook;
