import {profileName, profileInfo} from '../utils/constants.js';

export class UserInfo {
  constructor (data) {
    this.name = data.name;
    this.job = data.job;
  }

  getUserInfo() {
    const userdata = {};
    userdata.name = this.name;
    userdata.job = this.job;
    return userdata;
  }

  setUserInfo(item) {
    const newUserData = item._getInputValues();
    profileName.textContent = newUserData.nickname;
    profileInfo.textContent = newUserData.info;
  }
}
