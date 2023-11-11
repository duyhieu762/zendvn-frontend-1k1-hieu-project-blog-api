API.callWithToken().get('auth/me').then(resMe => {

}).catch(err => {
    window.location.href = 'index.html'
})

let editor

ClassicEditor
    .create(document.querySelector('#content')).then((newEditor) => {
        editor = newEditor;
    })
    .catch(error => {
        console.error(error);
    });

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = parseInt(urlParams.get('id'));

const elAuthForm = document.getElementById('auth-form');
const elFormMessage = document.getElementById('form-messages');
const elThumb = document.getElementById('thumb');
const elTitle = document.getElementById('title');
const elCategoryId = document.getElementById('category_id');
const elDescription = document.getElementById('description');
const elContent = document.getElementById('content');
const elThumbReview = document.getElementById('thumb-review');
const elRandomThumb = document.getElementById('random-thumb');

API.call().get(`articles/${id}`).then(response => {
    const data = response.data.data;
    console.log(data);
    elThumbReview.src = data.thumb;
    elThumb.value = data.thumb;
    elTitle.value = data.title;
    elCategoryId.value = data.category.id;
    elDescription.value = data.description;
    elContent.value = data.content;
    editor.setData(data.content)

})

elRandomThumb.addEventListener('click', function () {
    API.call().get('https://api.unsplash.com/photos/random?client_id=201WbiO4NUJpR-x9_5a3ylhS3ABUICO5gYuBfuS--ns&orientation=landscape').then(res => {
        const urlThumb = res.data.urls.regular;
        elThumb.value = urlThumb;
        elThumbReview.src = urlThumb;
    })
})

elThumb.addEventListener('change', function () {
    if (elThumb.value) elThumbReview.src = elThumb.value;
})

elAuthForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(elAuthForm);
    const data = Object.fromEntries(formData);
    console.log(data);


    API.callWithToken().put(`articles/${id}`, data).then(res => {
        window.location.href = 'admin-list-article.html'
    }).catch(err => {
        showFormErrorMessage(err, elFormMessage);
    })
})