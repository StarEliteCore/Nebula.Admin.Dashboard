import * as React from 'react';
import { View, Text, Image, onAppShow } from 'remax/wechat';
import styles from './index.css';
import { Button, getStorage, login, redirectTo, setNavigationBarColor, vibrateShort, showModal } from 'remax/wechat';
import { getDocumentType } from '@/services/document-service';

export default () => {
  /**
 * 进入首页时判断数据来源.是否是分享来的.并将相应数据存入到data中.
 */
  const onLogin = () => {
    //微信登录获取用户信息
    wx.getUserProfile(
      {
        desc: '笔记整理',
        success: (res: WechatMiniprogram.GetUserInfoSuccessCallbackResult) => {
          console.log(res)
          redirectTo({ url: '../documenttype/index' });
        }
      }
    )
  }
  return (
    <View className={styles.app}>
      <Button openType="getUserInfo" onClick={onLogin}>登录</Button>
    </View>
  );
};
