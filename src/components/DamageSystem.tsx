import { Vue, Component, Prop, toNative } from "vue-facing-decorator";
import { ModBuild } from "@/warframe/modbuild";

@Component
class DamageSystemClass extends Vue {
  @Prop() build: ModBuild;

  stateText = "";

  render() {
    return (
      <div class="damage-system-container">

      </div>
    );
  }
}

export const DamageSystem = toNative(DamageSystemClass);
export default DamageSystem;
