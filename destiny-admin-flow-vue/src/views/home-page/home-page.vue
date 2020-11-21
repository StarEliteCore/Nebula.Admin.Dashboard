<template>
  <div class="home">
    <header>
      <div class="card_div">
        <Card>
          <template v-slot:title>
            <div class="card_title icon_baseline">
              <span><Icon type="logo-chrome" />访问</span>
              <Tag color="primary">年</Tag>
            </div>
          </template>
          <p class="card_content">1999</p>
          <p class="card_footer">
            <span>访问总量</span>
            <span class="icon_baseline">999万<Icon type="md-trophy" /></span>
          </p>
        </Card>
      </div>
      <div class="card_div">
        <Card>
          <template v-slot:title>
            <div class="card_title">
              <span><Icon type="md-contact" />用户</span>
              <Tag color="primary">月</Tag>
            </div>
          </template>
          <p class="card_content">29</p>
          <p class="card_footer">
            <span>用户总量</span>
            <span class="icon_baseline"
              >109万<Icon type="ios-thumbs-up"
            /></span>
          </p>
        </Card>
      </div>
      <div class="card_div">
        <Card>
          <template v-slot:title>
            <div class="card_title">
              <span><Icon type="ios-desktop-outline" />审计</span>
              <Tag color="primary">日</Tag>
            </div>
          </template>
          <p class="card_content">59</p>
          <p class="card_footer">
            <span>审计总量</span>
            <span class="icon_baseline">1999万<Icon type="md-stats" /></span>
          </p>
        </Card>
      </div>
      <div class="card_div">
        <Card>
          <template v-slot:title>
            <div class="card_title">
              <span><Icon type="ios-list-box-outline" />待办</span>
              <Tag color="primary">周</Tag>
            </div>
          </template>
          <p class="card_content">9</p>
          <p class="card_footer">
            <span>待办总量</span>
            <span class="icon_baseline">29<Icon type="md-bulb" /></span>
          </p>
        </Card>
      </div>
    </header>
    <section>
      <Card class="data_card">
        <template v-slot:title>网站数据</template>
        <div class="chart">
          <div class="bar_chart">
            <v-chart v-if="isChart" :options="barData" theme="macarons" />
          </div>
          <div class="pie_chart">
            <v-chart v-if="isChart" :options="pieData" theme="macarons" />
          </div>
        </div>
      </Card>
    </section>
  </div>
</template>
<style lang="scss">
/* 计算图表卡片的高度，因为是iview的内部样式，所以只能写全局样式了。 */
$titleHeight: 45px;
section .data_card {
  .ivu-card-head {
    box-sizing: border-box;
    height: $titleHeight;
  }
  .ivu-card-body {
    box-sizing: border-box;
    height: calc(100% - #{$titleHeight});
  }
}
</style>
<style lang="scss" src="./home-page.scss" scoped></style>
<script lang="ts" src="./home-page.ts"></script>
