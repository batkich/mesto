import { Card } from "../components/Card";
import { newPopupImage } from "../pages/index.js";

export function createNewCard (item) {
    const card = new Card(item, '#newcard', {handleCardClick: (element) =>{
    newPopupImage.open(element);
  }});
  return card;
}
