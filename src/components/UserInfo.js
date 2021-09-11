export class UserInfo {
  constructor({ profileName, profileInfo, profileAvatar, profile_Id }) {
    this.name = profileName;
    this.info = profileInfo;
    this.profileAvatar = profileAvatar;
    this.profile_Id = profile_Id;
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
    this.profileAvatar = item.avatar;
    this.profile_Id = item._id;
  }
}
