<template>
  <div class="my-search">
    <div style="margin-top:20px;">
      <Row>
        <Form inline :label-width="120" v-model="fields">
          <FormItem
            v-for="(item, index) in fields"
            :key="index"
            :label="item.title"
          >
            <template v-if="item.config != undefined && item.config.type == 0">
              <Select
                v-model="item.value"
                style="width:200px"
                :clearable="true"
                :filterable="true"
              >
                <Option
                  v-for="op in item.config.data"
                  :value="op.value"
                  :key="op.value"
                  >{{ op.label }}</Option
                >
              </Select>
            </template>
            <template v-else>
              <Input
                type="text"
                v-model="item.value"
                style="width:200px"
              ></Input>
            </template>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="onSearch()">查询</Button>
            <Button style="margin-left:10px;" @click="handleReset()"
              >重置</Button
            >
          </FormItem>
        </Form>
      </Row>
    </div>
  </div>
  <!-- <Row>
        <Collapse>
          <Panel name="1">
            查询面板
            <p slot="content" >
                <Form  inline  :label-width="120" v-model="fields">
                    <FormItem v-for="(item,index) in fields"  :key="index" :label="item.title">
                       <template v-if="item.config!=undefined && item.config.type==0">
                           <Select v-model="item.value" style="width:200px"  :clearable="true" :filterable="true">
         
                              <Option v-for="op in item.config.data" :value="op.value" :key="op.value">{{ op.label }}</Option>
                          </Select>
                       </template>
                       <template v-else>
                           <Input type="text" v-model="item.value" style="width:200px" ></Input>
                       </template>
                    </FormItem>
                     <FormItem>
                        <Button type="primary" @click="onSearch()">查询</Button>
                        <Button  style="margin-left:10px;" @click="handleReset()">重置</Button>
                     
                    </FormItem>
                </Form>
            </p>
          </Panel>
        </Collapse>
      </Row> -->
</template>
<script lang="ts" src="./my-search.ts"></script>
<style scoped>
.my-search {
  background-color: #fff;
  padding: 12px 10px 6px 10px;
  border-radius: 2px;
  margin-bottom: 12px;
}
</style>
