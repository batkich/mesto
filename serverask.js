fetch('https://mesto.nomoreparties.co/v1/cohort-27/cards', {
  headers: {
    authorization: '235ae6c2-9d59-4d94-a816-03a2b688c17b'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });
