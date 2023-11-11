const elAuthForm = document.getElementById('auth-form');
const elEmail = document.getElementById('email');
const elPassword = document.getElementById('password');


API.callWithToken().get('auth/me').then(res => {
    window.location.href = 'index.html'
})


elAuthForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(elAuthForm);
    const data = Object.fromEntries(formData);
    console.log(data);

    // const data = {
    //     email: elEmail.value,
    //     password: elPassword.value
    // }
    API.call().post('auth/login', data).then(res => {
        console.log(res);
        const token = res.data.access_token;
        localStorage.setItem('TOKEN_ACCESS', token);
        window.location.href = 'index.html'
    }).catch(function (error) {
        alert('Thông tin đăng nhập không đúng')
    })
})