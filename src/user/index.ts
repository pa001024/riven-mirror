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

const API_BASE = "https://riven.im/api/";

export class UserSession {
  userQuery: string
  sessionPass: string
  constructor(userQuery: string, sessionPass: string) {
    [this.userQuery, this.sessionPass] = [userQuery, sessionPass]
  }
  access() {
    axios.get(API_BASE + "")
  }
}
