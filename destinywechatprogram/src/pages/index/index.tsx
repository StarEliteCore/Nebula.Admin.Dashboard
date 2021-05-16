import * as React from 'react';
import { View, Text, Image } from 'remax/wechat';
import styles from './index.css';
import { Button, getStorage, getUserInfo, login, redirectTo, setNavigationBarColor, vibrateShort, showModal } from 'remax/wechat';
export default () => {

  const onLogin = () => {
    login({success:(loginRes:WechatMiniprogram.LoginSuccessCallbackResult)=>{
      console.log(loginRes.code);
      getUserInfo(
        {
          withCredentials: true,
          success: (res: WechatMiniprogram.GetUserInfoSuccessCallbackResult) => {
            console.log(res);
            redirectTo({ url: '../documenttype/index' });
          }
        }
      )
    }})
  }
  return (
    <View className={styles.app}>
      <View className={styles.header}>
        <Image
          src="https://gw.alipayobjects.com/mdn/rms_b5fcc5/afts/img/A*OGyZSI087zkAAAAAAAAAAABkARQnAQ"
          className={styles.logo}
        />
        <Button openType="getUserInfo" onClick={onLogin}>denghu</Button>
      </View>
    </View>
  );
};
