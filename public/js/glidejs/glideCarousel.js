
const carousel = document.querySelector('.glide');

if (carousel) {

    new Glide('.glide', {
        type: 'carousel',
        startAt: 0
    }).mount()

}