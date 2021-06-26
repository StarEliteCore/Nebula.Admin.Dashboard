<template>
  <Header class="main-app-layout__header">
    <div>
      欢迎您 {{ GetUserName() }}
      <span style="margin-left: 21px;" @click="openGit()" ><Icon type="logo-github" size="30"/></span>
    </div>

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
          <DropdownItem @click.native="OpenUpdatePaw">修改密码</DropdownItem>
          <DropdownItem @click.native="LogOut">安全退出</DropdownItem>
        </DropdownMenu>
      </template>
    </Dropdown>

    <template>
      <Modal v-model="isOpen" :title="title" :mask-closable="false" :sticky="true" > 
        <Form
          ref="formCustom"
          :rules="ruleCustom"
          :model="formCustom"
          :label-width="100"
        >
          <FormItem label="当前密码:" prop="oldPassword">
            <Input type="password" v-model="formCustom.oldPassword"></Input>
          </FormItem>
          <FormItem label="新密码：" prop="newPassword">
            <Input type="password" v-model="formCustom.newPassword"></Input>
          </FormItem>
          <FormItem label="确认密码：" prop="passwdCheck">
            <Input type="password" v-model="formCustom.passwdCheck"></Input>
          </FormItem>
 
   
        </Form>
        <div slot="footer">
            <Button type="primary" @click="handleSubmit('formCustom')">保存</Button>
             <Button @click="handleReset()" style="margin-left: 8px">取消</Button>
        </div>
      </Modal>
    </template>
  </Header>
</template>
<style lang="scss" src="./layout-header.scss" scoped></style>
<script lang="ts" src="./layout-header.ts"></script>
