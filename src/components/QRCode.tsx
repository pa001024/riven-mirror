import QRious from "qrious";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";

@Component({ name: "qrcode" })
export default class qrcode extends Vue {
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
    default: "canvas"
  })
  tag: string;

  /**
   * The value of the QR code.
   */
  @Prop({
    type: String,
    default: ""
  })
  value: string;

  render(createElement: typeof Vue.prototype.$createElement) {
    return createElement(this.tag, this.$slots.default);
  }

  @Watch("options")
  @Watch("value")
  generate() {
    if (this.$el) {
      new QRious({
        element: this.$el,
        value: String(this.value),
        ...this.options
      });
    }
  }

  mounted() {
    this.generate();
  }
}
