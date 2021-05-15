import { Component, Mixins } from "vue-property-decorator";

import { EditModalMixins } from "@/shared/mixins/edit-modal.mixins";
import { MainManager } from "@/domain/services/main/main-manager";
import Editor from "@tinymce/tinymce-vue";


import {
  IDocumentTreeOutDto,
} from "@/domain/entity/documentType/documentTypeDto";
@Component({
  name: "DocumentOperate",
  components: {
    Editor
  }
})
export default class DocumentOperate extends Mixins(EditModalMixins) {
  private treeData: Array<IDocumentTreeOutDto> = [];

  private ruleValidate = {
    /**
     *
     */
    title: [
      { required: true, message: "标题不能为空", trigger: "onHandleCommit" },
    ],
    documentTypeId: [
      { required: true, message: "请选择文档类型", trigger: "onHandleCommit" },
    ],
    content: [
      { required: true, message: "内容不能为空", trigger: "onHandleCommit" },
    ],
  };
  ///editConfig富文本编辑器设计
  private editConfig: any = {

    language_url: '/tinymce/langs/zh_CN.js',
    language: 'zh_CN',
    skin_url: '/tinymce/skins/ui/oxide',
    // skin_url: 'tinymce/skins/ui/oxide-dark',//暗色系
    font_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif',
    fontsize_formats: '11px 12px 14px 16px 18px 24px 36px 48px',
    height: 300,
    // plugins: this.plugins,
    // toolbar: this.toolbar,
    branding: false,
    menubar: false,
    convert_urls: false,
    // images_upload_base_path: process.env.BASE_URL + '/test/',
    // relative_urls : false,
    // remove_script_host : true,
    // document_base_url: location.protocol + '//' + location.hostname,
    // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
    // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
    // images_upload_handler: (blobInfo, success, failure) => {
    //   const img = 'data:image/jpeg;base64,' + blobInfo.base64()
    //   success(img)
    // },
    // urlconverter_callback: function(url, node, on_save, name) {
    //   return url
    // },
    // setup: editor => {
    //   editor.on('blur', () => {
    //     this.$emit('onBlur', this.myValue)
    //   })
    // }
    // height: 500, //富文本高度
    // language_url: '/tinymce/zh_CN.js', //中文包
    // language: 'zh_CN', //中文
    // browser_spellcheck: true, // 拼写检查
    // branding: false, // 去水印
    // elementpath: true, //禁用编辑器底部的状态栏
    // statusbar: true, // 隐藏编辑器底部的状态栏
    // paste_data_images: true, // 是否允许粘贴图像
    // menubar: true, // 隐藏最上方menu
    // fontsize_formats: '14px 16px 18px 20px 24px 26px 28px 30px 32px 36px', //字体大小
    // font_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue;PingFang SC;sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun;serifsans-serif;Terminal=terminal;monaco;Times New Roman=times new roman;times', //字体
    // file_picker_types: 'image',
    // images_upload_credentials: true,
    // plugins: [
    //   'advlist autolink lists link image charmap print preview anchor',
    //   'searchreplace visualblocks code fullscreen',
    //   'insertdatetime media table paste code help wordcount',
    // ],
    // toolbar: 'fontselect fontsizeselect link lineheight forecolor backcolor bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | image quicklink h2 h3 blockquote table numlist bullist preview fullscreen',
    // // 图片上传三个参数，图片数据，成功时的回调函数，失败时的回调函数
    // // images_upload_handler: function(blobInfo, success, failure) {
    // //   let formdata = new FormData();
    // //   formdata.append("file", blobInfo.blob());
    // //   // 上传图片接口，跟后端同事协调上传图片
    // //   // http://hh.xxxx.cn/admin/upload为上传图片接口
    // //   axios.post('http://hh.xxxx.cn/admin/upload',formdata)
    // //   .then(function(res) {
    // //     success(res.data.data.src);
    // //   }).catch(res => {
    // //      failure("error");
    // //    });
    // // }
  }
  protected MapTo(_rowId: string) {
    if (_rowId === undefined) {
      return;
    }
  }

  protected InIt() {
    this.MapTo(this.editData.id as string);
    this.GetFormRef();
    this.LoadDocumentType();
  }
  private mainManager: MainManager = MainManager.Instance();

  LoadDocumentType() {
    this.mainManager.DocumentTypeServeice.getDocumentTypeTreeData().then(
      (res) => {
        if (res.success) {
          this.treeData = res.itemList;
        }
      }
    );
  }
}
