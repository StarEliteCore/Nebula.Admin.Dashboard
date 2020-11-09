import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "EditModal",
})
export default class EditModal extends Vue {
  @Prop()
  editTitle!: string;

  isOpen: boolean = false;

  private created() {
    this.$on("open", this.open);
    this.$on("close", this.close);
  }

  public open() {
    this.isOpen = true;
  }

  public close() {
    this.isOpen = false;
  }

  public save() {

    this.$emit("save1");
    console.log("");
  }
}
