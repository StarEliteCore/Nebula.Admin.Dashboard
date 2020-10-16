import Vue from "vue";
export default class NoticeUtils extends Vue {
  private static s_instance: NoticeUtils;
  public static Inst(): NoticeUtils {
    if (NoticeUtils.s_instance == null) {
      NoticeUtils.s_instance = new NoticeUtils();
    }
    return NoticeUtils.s_instance;
  }

  public Success(title: string, msg: string) {
    this.$Notice.success({
      title,
      desc: msg,
      duration: 4
    });
  }

  public Error(title: string, msg: string) {
    this.$Notice.error({
      title,
      desc: msg,
      duration: 4
    });
  }

  public Warning(title: string, msg: string) {
    this.$Notice.warning({
      title,
      desc: msg,
      duration: 4
    });
  }
}