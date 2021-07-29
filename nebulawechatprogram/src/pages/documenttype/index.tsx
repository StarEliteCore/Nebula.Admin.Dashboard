import * as React from 'react';
import { Cascade, Cell } from 'annar';
import { View, Text, Image } from 'remax/wechat';
import { usePageEvent } from 'remax/macro';
import { getDocumentType } from '@/services/document-service';
export default () => {
  // onShow 页面加载时调用获取文档类型
  usePageEvent('onLoad', () => {
    getDocumentType("res.cloudID").then((res: any) => {
      console.log(res.data.itemList);
      debugger

      // setDocumentTypeArr([])
    })
  });
  const option = [
    {
      value: 'zhejiang',
      text: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          text: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              text: 'West Lake',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      text: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          text: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              text: 'Zhong Hua Men',
            },
          ],
        },
      ],
    },
  ];
  const onLogin = () => {
    //微信登录获取用户信息

  }
  return (
    <View>
      <Cascade options={option} >adsada</Cascade>
    </View>
  );
};