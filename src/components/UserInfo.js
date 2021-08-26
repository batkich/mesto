export class UserInfo {
  constructor({ profileName, profileInfo }) {
    this.name = profileName;
    this.info = profileInfo;
  }

  getUserInfo() {
    const userdata = {};
    userdata.nickname = this.name.textContent;
    userdata.info = this.info.textContent;
    return userdata;
  }

  setUserInfo(item) {
    this.name.textContent = item.nickname;
    this.info.textContent = item.info;
  }
}
