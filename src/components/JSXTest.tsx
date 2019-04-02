import { Vue, Component, Watch, Prop, Model } from "vue-property-decorator";

/* @Component
export default class JSXTest extends Vue {
  @Model("input") text: string;
  @Prop({ default: "#000" }) color: string;

  constructor() {
    super();
    this.onInput = this.onInput.bind(this);
  }
  onInput(event) {
    this.$emit("input", event.target.value);
  }
  render() {
    return <input value={this.text} on-input={this.onInput} style={{ color: this.color }} />;
  }
} */

@Component
export default class JSXTest extends Vue {
  @Model("input") text: string;
  @Prop({ default: "#000" }) color: string;

  stateText = "";

  get textAdapter() {
    return this.text;
  }
  set textAdapter(value) {
    this.$emit("input", value);
  }

  @Watch("text")
  textChanged() {
    this.stateText = "State: " + this.text;
  }

  get computedText() {
    return this.text
      .split("")
      .reverse()
      .join("");
  }

  render() {
    return (
      <div>
        <input vModel={this.textAdapter} style={{ color: this.color }} />
        <div>
          Watch <span>{this.stateText}</span>
        </div>
        <div>
          Computed: <span>{this.computedText}</span>
        </div>
      </div>
    );
  }
}
