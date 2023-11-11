API.callWithToken().get('auth/me').then(resMe => {
}).catch(err => {
    window.location.href = 'index.html'
})
ClassicEditor
    .create(document.querySelector('#content'))
    .catch(error => {
        console.error(error);
    });

const elAuthForm = document.getElementById('auth-form');
const elFormMessage = document.getElementById('form-messages');
const elThumb = document.getElementById('thumb');
const elThumbReview = document.getElementById('thumb-review');
const elRandomThumb = document.getElementById('random-thumb');

elRandomThumb.addEventListener('click', function () {
    API.call().get('https://api.unsplash.com/photos/random?client_id=201WbiO4NUJpR-x9_5a3ylhS3ABUICO5gYuBfuS--ns&orientation=landscape').then(res => {
        const urlThumb = res.data.urls.regular;
        elThumb.value = urlThumb;
        elThumbReview.src = urlThumb;
    })
})

elAuthForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(elAuthForm);
    const data = Object.fromEntries(formData);
    console.log(data);
    API.callWithToken().post('articles/create', data).then(res => {
        elFormMessage.innerHTML = '';
        elAuthForm.reset();
        elThumbReview.src = 'image/defaul.jpg';
        showToastMessage('Thêm bài viết thành công')
    }).catch(err => {
        showFormErrorMessage(err, elFormMessage);
    })
})