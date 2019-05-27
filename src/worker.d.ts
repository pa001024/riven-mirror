declare module "worker-loader!*" {
  class WebpackWorker extends Worker {
    constructor();
  }

  export default WebpackWorker;
}

declare module "*.proto" {
  import { Type } from "protobufjs";
  const proto: Type;

  export default proto;
}

declare module "*.data" {
  const data: string;

  export default data;
}
