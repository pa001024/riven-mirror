import axios from "axios";
import { Base64 } from "@/warframe/util";
import shajs from "sha.js";

export class User {
  email: string
  nickname: string
  gameid: string
  clan: string
  birthday: Date
  signuptime: Date
  data: { [key: string]: string }
}

export interface BasicResult {
  code: number
  error: string
}

const API_BASE = "https://api.riven.im/";

export class UserSession {
  user: string
  passwordHash: string
  jwtAuth: string
  constructor(user: string, password: string) {
    this.user = user;
    this.passwordHash = shajs("sha256").update("_R_M_" + password + "_P_A_").digest("hex");
  }
  async login() {
    let rst = await axios.post(API_BASE + "login", { user: this.user, pass: this.passwordHash }), data = rst.data as BasicResult
    if (data && data.code === 200) {
      this.jwtAuth = rst.headers["Authorization"];
      axios.defaults.headers.common["Authorization"] = this.jwtAuth;
      return true
    } else
      return false
  }
  async resetpassword() {
    let rst = await axios.post(API_BASE + "resetpassword", { user: this.user }), data = rst.data as BasicResult
    if (data && data.code === 200) {
      axios.defaults.headers.common["Authorization"] = rst.headers["Authorization"];
      return true
    } else
      return false
  }

  get jwtData() {
    let ob = JSON.parse(Base64.decode(this.jwtAuth))
    return ob
  }
}
