import { Component, Prop, Vue } from "vue-property-decorator";
@Component({ name: "CircleLoading" })
export default class CircleLoading extends Vue {
    /**
     *是否显示（默认false）
     */
    @Prop(Boolean) isShow!: boolean;

    /**
     * 加载显示的字（默认'加载中...'）
     */
    @Prop(String) text!: string;

    /**
     * 图标的样式 (默认旋转)
     */
    @Prop(String) iconClass!: string;

    /**
     * 图标的大小（默认 18）
     */
    @Prop(Number) iconSize!: number


    private defaultObj: any = {
        isShow: true,
        text: "加载中...",
        iconClass: "demo-spin-icon-load",
        iconSize: 18,
    };

    get _isShow() { return this.isNULL(this.isShow) ? this.defaultObj.isShow : this.isShow; }
    get _text() { return this.isNULL(this.text) ? this.defaultObj.text : this.text; }
    get _iconClass() { return this.isNULL(this.iconClass) ? this.defaultObj.iconClass : this.iconClass; }
    get _iconSize() { return this.isNULL(this.iconSize) ? this.defaultObj.iconSize : this.iconSize; }

    private isNULL(value: any) {
        return value === undefined || value === null;
    }

}