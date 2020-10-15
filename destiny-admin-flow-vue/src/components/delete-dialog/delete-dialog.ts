import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "DeleteDialog"
})
export default class DeleteDialog extends Vue {
  private IsShow: boolean = false;
  private title: string = "";
  private info: string = "";
  private CB: Function = () => {};
  Show(_infoTitle: string, _info: string, callback: () => void) {
    this.title = _infoTitle;
    this.info = _info;
    this.IsShow = true;
    this.CB = callback;
  }
  private OnHandleCancel() {
    this.IsShow = false;
  }
  private OnHandleCommit() {
    this.IsShow = false;
    this.CB();
  }
}
