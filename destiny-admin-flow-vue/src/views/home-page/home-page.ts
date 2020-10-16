import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "HomePage"
})
export default class HomePage extends Vue {
  private created ()
  {
    console.log("++++++++++++++++++++++++++++++++");
  }
}
