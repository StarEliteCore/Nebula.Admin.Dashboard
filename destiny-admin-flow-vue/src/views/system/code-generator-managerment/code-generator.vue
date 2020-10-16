<template>
  <Form ref="formInline" :inline="true" :label-width="130">
    <Card style="width: 100%" :dis-hover="true">
      <Row style="padding: 5px">
        <Card :bordered="true" :dis-hover="true">
          <p slot="title">实体信息</p>
          <Row>
            <Col span="12">
              <FormItem label="实体名：">
                <Input />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="显示名：">
                <Input />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="是否生成Dto：">
                <i-switch size="large">
                  <span slot="open">是</span>
                  <span slot="close">否</span>
                </i-switch>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="是否自动映射Dto：">
                <i-switch size="large">
                  <span slot="open">是</span>
                  <span slot="close">否</span>
                </i-switch>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="是否创建：">
                <i-switch size="large">
                  <span slot="open">是</span>
                  <span slot="close">否</span>
                </i-switch>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="是否修改：">
                <i-switch size="large">
                  <span slot="open">是</span>
                  <span slot="close">否</span>
                </i-switch>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span="12">
              <FormItem label="是否软删除：">
                <i-switch size="large">
                  <span slot="open">是</span>
                  <span slot="close">否</span>
                </i-switch>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="审核用户键类型：">
                <!-- <Select style="width: 260px">
                  <Option :value="Guid">Guid</Option>
                  <Option :value="string">String</Option>
                  <Option :value="int">Int</Option>
                </Select> -->
              </FormItem>
            </Col>
          </Row>
        </Card>
      </Row>

      <Row style="padding: 5px">
        <Card :bordered="true" :dis-hover="true">
          <p slot="title">实体信息</p>
          <Button type="primary" long slot="extra" @click="AddRow" icon="md-add">添加</Button>
          <Table
            border
            stripe
            max-height="500"
            :columns="columns"
            :data="PropertyArr"
          >
              <template slot-scope="{ row }" slot="Name">
                   <Input v-model="row.propertyName" />         
            </template>
              </Table>

          <!-- <table
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
          </table> -->
        </Card>
      </Row>
    </Card>
  </Form>
</template>
<script lang="ts" src="./code-generator.ts"></script>