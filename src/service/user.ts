import axios from "axios";

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
  userQuery: string
  sessionPass: string
  constructor(userQuery: string, sessionPass: string) {
    [this.userQuery, this.sessionPass] = [userQuery, sessionPass]
  }
  api(api: string) {
    return axios.get(API_BASE + api)
  }
  async login() {
    let rst = await this.api("login"), data = rst.data as BasicResult
    if (data && data.code === 200) {
      axios.defaults.headers.common["Authorization"] = rst.headers["Authorization"];
      return true
    } else
      return false
  }
  async forgetPassword() {
    let rst = await this.api("forget_password"), data = rst.data as BasicResult
    if (data && data.code === 200) {
      axios.defaults.headers.common["Authorization"] = rst.headers["Authorization"];
      return true
    } else
      return false
  }
}