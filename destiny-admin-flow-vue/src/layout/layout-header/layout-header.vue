<template>
  <Header class="main-app-layout__header">
    <div>欢迎您 {{ GetUserName() }}</div>
    <Dropdown>
      <a href="javascript:void(0)">
        <img
          src="@/assets/user.jpg"
          width="35"
          height="35"
          class="img-user"
          alt="更多"
        />
        <Icon type="ios-arrow-down"></Icon>
      </a>
      <template v-slot:list>
        <DropdownMenu>
          <DropdownItem @click.native="LogOut">退出登录</DropdownItem>
          <DropdownItem @click.native="OpenUpdatePaw">修改密码</DropdownItem>
        </DropdownMenu>
      </template>
    </Dropdown>

    <template>
      <Modal v-model="isOpen" :title="title">
        <Form
          ref="formCustom"
          :rules="ruleCustom"
          :model="formCustom"
          :label-width="100"
        >
          <FormItem label="上一次密码:" prop="oldPassword">
            <Input type="password" v-model="formCustom.oldPassword"></Input>
          </FormItem>
          <FormItem label="新密码：" prop="newPassword">
            <Input type="password" v-model="formCustom.newPassword"></Input>
          </FormItem>
          <FormItem label="确认：" prop="passwdCheck">
            <Input type="password" v-model="formCustom.passwdCheck"></Input>
          </FormItem>
 
   
        </Form>
        <div slot="footer">
            <Button type="primary" @click="handleSubmit('formCustom')">保存</Button>
        </div>
      </Modal>
    </template>
  </Header>
</template>
<style lang="scss" src="./layout-header.scss" scoped></style>
<script lang="ts" src="./layout-header.ts"></script>
