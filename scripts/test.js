const test = document.querySelector('.content');

const elements = document.querySelectorAll('.element')
elements.forEach(function(item) {
    item.addEventListener('click', function (evt) {
        const target = evt.target;
        console.log(target)
        if (target.classList.contains ('element__button'))
        {target.classList.toggle('red')}
    });
})



