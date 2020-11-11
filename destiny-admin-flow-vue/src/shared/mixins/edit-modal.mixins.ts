import * as PageQuery from "@/shared/request";

import { Component, Emit, Prop, Ref, Vue } from "vue-property-decorator";

import { Guid } from "guid-typescript";

@Component({
  name: "EditModalMixins",
  components: {},
})
export class EditModalMixins extends Vue {
  @Prop()
  editTitle!: string;

  @Prop()
  editData!: any;

  isOpen: boolean = false;
  private form!: any;
  protected InIt() {
    this.GetFormRef();
  }

  protected GetFormRef() {
    this.form = this.$refs[this.formName] as any;
  }

  private created() {
    this.$on("open", this.open);
    this.$on("close", this.close);
    this.SetOn();
  }

  protected SetOn() {}

  open() {
    this.isOpen = true;
    this.InIt();
  }

  close() {
    this.isOpen = false;
    if (this.form) {
      this.form.resetFields();
    }
  }

  protected MapTo(row: any) {}

  formName: string = "form";
  onHandleCommit() {
    if (!this.form) {
      return;
    }
    this.form.validate((valid: boolean) => {
      if (valid) {
        this.$emit("saveEdit", this.editData);
      }
    });
  }
}
