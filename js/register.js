const elAuthForm = document.getElementById('auth-form');
const elName = document.getElementById('name');
const elEmail = document.getElementById('email');
const elPassword = document.getElementById('password');
const elPhone = document.getElementById('phone');
const elAddress = document.getElementById('address');
const elMessages = document.getElementById('messages');


    API.callWithToken().get('auth/me').then(res=>{
        window.location.href = 'index.html'
    })

elAuthForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // const data = {
    //     name: elName.value,
    //     email: elEmail.value,
    //     password: elPassword.value,
    //     phone: elPhone.value,
    //     address: elAddress.value
    // }

    const formData = new FormData(elAuthForm);
    const data = Object.fromEntries(formData);
    
    API.call().post('users/register', data).then(res => {
        API.call().post('auth/login', {
            email: data.email,
            password: data.password
        }).then(res => {
            console.log(res);
            const token = res.data.access_token;
            localStorage.setItem('TOKEN_ACCESS', token);
            window.location.href = 'index.html'
        })

    }).catch(function (error) {
        const err = error.response.data.errors;
        console.log(err);
        html = '';
        for (const property in err) {
            html+= /* html */ `
            <li>${err[property]}</li>`
        }
       elMessages.innerHTML = `<div class="alert alert-danger"><ul>${html}</ul></div>`
    })
})