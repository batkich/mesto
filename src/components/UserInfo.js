export class UserInfo {
  constructor({ profileName, profileInfo, profileAvatar, profileId }) {
    this.name = profileName;
    this.info = profileInfo;
    this.profileAvatar = profileAvatar;
    this.profileId = profileId;
  }

  getUserInfo() {
    const userdata = {};
    userdata.nickname = this.name.textContent;
    userdata.info = this.info.textContent;
    return userdata;
  }

  setUserInfo(item) {
    this.name.textContent = item.name;
    this.info.textContent = item.about;
    this.profileAvatar.src = item.avatar;
    this.profileId = item._id;
  }
}
