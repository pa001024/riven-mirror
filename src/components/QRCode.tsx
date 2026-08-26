import QRious from "qrious";
import { h } from "vue";
import { Vue, Component, Watch, Prop, toNative } from "vue-facing-decorator";

@Component({ name: "qrcode" })
class qrcode extends Vue {
  /**
   * The options for the QR code generator.
   * {@link https://github.com/neocotic/qrious#api}
   */
  @Prop() options: {};

  /**
   * The tag of the component root element.
   */
  @Prop({
    type: String,
    default: "canvas",
  })
  tag: string;

  /**
   * The value of the QR code.
   */
  @Prop({
    type: String,
    default: "",
  })
  value: string;

  // Vue 3 的 render 不再接收 createElement，改用从 vue 导入的 h；
  // 且 $slots.default 在 Vue 3 中是函数，需要调用后才拿到 VNode 数组
  render() {
    return h(this.tag, this.$slots.default?.());
  }

  @Watch("options")
  @Watch("value")
  generate() {
    if (this.$el) {
      new QRious({
        element: this.$el,
        value: String(this.value),
        ...this.options,
      });
    }
  }

  mounted() {
    this.generate();
  }
}

export default toNative(qrcode);
