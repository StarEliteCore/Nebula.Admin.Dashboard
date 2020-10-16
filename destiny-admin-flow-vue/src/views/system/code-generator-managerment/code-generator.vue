<template>
  <Form ref="formInline" :inline="true" :label-width="130">
    <Card style="width: 100%" :dis-hover="true">
      <Row style="padding: 5px">
        <Card :bordered="true" :dis-hover="true">
          <p slot="title">实体信息</p>

          <FormItem label="实体名：" prop="name">
            <Input style="width: 100%" />
          </FormItem>
          <FormItem label="显示名：" prop="name">
            <Input style="width: 100%" />
          </FormItem>

          <FormItem label="是否生成Dto：" prop="name">
            <i-switch size="large">
              <span slot="open">是</span>
              <span slot="close">否</span>
            </i-switch>
          </FormItem>
          <FormItem label="是否自动映射Dto：" prop="name">
            <i-switch size="large">
              <span slot="open">是</span>
              <span slot="close">否</span>
            </i-switch>
          </FormItem>
          <FormItem label="是否创建：" prop="name">
            <i-switch size="large">
              <span slot="open">是</span>
              <span slot="close">否</span>
            </i-switch>
          </FormItem>
          <FormItem label="是否修改：" prop="name">
            <i-switch size="large">
              <span slot="open">是</span>
              <span slot="close">否</span>
            </i-switch>
          </FormItem>
          <FormItem label="是否软删除：" prop="name">
            <i-switch size="large">
              <span slot="open">是</span>
              <span slot="close">否</span>
            </i-switch>
          </FormItem>
          <FormItem label="审核用户键类型：" prop="name">
            <Input />
          </FormItem>
        </Card>
      </Row>

      <Row style="padding: 5px">
        <Card :bordered="true" :dis-hover="true">
          <p slot="title">实体信息</p>
          <Button type="primary" long slot="extra" icon="md-add">添加</Button>

          <table
            style="
              border-spacing: 0;
              border-collapse: collaps;
              background-color: transparent;
              width: 100%;
              max-width: 100%;
              margin-bottom: 20px;
              border: 1px solid #ddd;
            "
          >
            <thead>
              <tr style="border: 1px solid #ddd; padding: 8px">
                <th style="border: 1px solid #ddd; padding: 8px">属性名</th>
                <th style="border: 1px solid #ddd; padding: 8px">显示名</th>
                <th style="border: 1px solid #ddd; padding: 8px">
                  是否允许为空
                </th>

                <th style="border: 1px solid #ddd; padding: 8px">C#数据类型</th>
                <th style="border: 1px solid #ddd; padding: 8px">
                  是否生成输入DTO
                </th>
                <th style="border: 1px solid #ddd; padding: 8px">
                  是否生成输出DTO
                </th>
                <th style="border: 1px solid #ddd; padding: 8px">
                  是否生成分页DTO
                </th>
              </tr>
            </thead>
            <tbody>
              <tr style="border: 1px solid #ddd; padding: 8px">
                <td style="border: 1px solid #ddd; padding: 8px">
                  <Input type="text" />
                </td>
                <td style="border: 1px solid #ddd; padding: 8px">
                  <Input type="text" />
                </td>
                <td style="border: 1px solid #ddd; padding: 8px">
                  <Input type="text" />
                </td>
                <td style="border: 1px solid #ddd; padding: 8px">
                  <Input type="text" />
                </td>
                <td style="border: 1px solid #ddd; padding: 8px">
                  <Input type="text" />
                </td>
                <td style="border: 1px solid #ddd; padding: 8px">
                  <Input type="text" />
                </td>
                <td style="border: 1px solid #ddd; padding: 8px">
                  <Input type="text" />
                </td>
              </tr>
            </tbody>
          </table>
        </Card>
      </Row>
    </Card>
  </Form>
</template>
<script lang="ts" src="./code-generator.ts"></script>