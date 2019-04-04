import { Vue, Component, Watch, Prop, Model } from "vue-property-decorator";
import { ModBuild } from "@/warframe/modbuild";

@Component
export class DamageSystem extends Vue {
  @Prop() build: ModBuild;

  stateText = "";

  render() {
    return (
      <div class="damage-system-container">

      </div>
    );
  }
}
