import { Popup } from "./Popup.js";
import { popupPicture } from "../utils/constants.js";
import { popupPictureTitle } from "../utils/constants.js";

export class PopupWithImage extends Popup {
  constructor (formSelector) {
    super(formSelector);
  }

  open({pictureName, pictureLink}) {
    popupPicture.setAttribute('src', pictureLink);
    popupPicture.setAttribute('alt', pictureName);
    popupPictureTitle.textContent = pictureName;
    super.open();
  }

}
