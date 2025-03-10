/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/*
 * @Description:  到当前路径下执行 node .\docgen.js生成md文件
 * @Version: 1.0
 * @Autor: gll
 * @Date: 2020-12-21 11:56:49
 * @LastEditors: unicom
 * @LastEditTime: 2021-01-12 13:52:38
 */

const path = require('path');
const fs = require('fs-extra');
const reactDocs = require('react-docgen');
const prettier = require('prettier');

// 读取文件内容
const content = fs.readFileSync(path.resolve('./index.jsx'), 'utf-8');
// 提取组件信息
const componentInfo = reactDocs.parse(content);
// 打印信息
// console.log(componentInfo)
// 生成markdown文档
fs.writeFileSync(path.resolve('./index.md'), commentToMarkDown(componentInfo));

// 把react-docgen提取的信息转换成markdown格式
function commentToMarkDown(componentInfo) {
  let { props, description, displayName, methods } = componentInfo;
  const markdownInfo = `
  ${displayName}
    ---
    ${description}
  ${renderMarkDown(props)}
  `;
  // 使用prettier美化格式
  const content = prettier.format(markdownInfo, {
    parser: 'markdown',
  });
  return content;
}
function renderMarkDown(props) {
  return `## 参数 Props
  | 属性 |  类型 | 默认值 | 必填 | 描述 |
  | --- | --- | --- | --- | ---|
  ${Object.keys(props)
    .map(key => renderProp(key, props[key]))
    .join('')}
  `;
}

function getType(type) {
  const handler = {
    enum: type =>
      type.value.map(item => item.value.replace(/'/g, '')).join(' \\| '),
    union: type => type.value.map(item => item.name).join(' \\| '),
  };
  if (typeof handler[type.name] === 'function') {
    return handler[type.name](type).replace(/\|/g, '');
  }
  return type.name.replace(/\|/g, '');
}

// 渲染1行属性
function renderProp(
  name,
  {
    type = { name: '-' },
    defaultValue = { value: '-' },
    required,
    description,
  },
) {
  return `| ${name} | ${getType(type)} | ${defaultValue.value.replace(
    /\|/g,
    '<span>|</span>',
  )} | ${required ? '✓' : '✗'} |  ${description || '-'} |
  `;
}
