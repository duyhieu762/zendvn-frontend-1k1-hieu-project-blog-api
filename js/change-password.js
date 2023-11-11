const elAuthForm = document.getElementById('auth-form');

elAuthForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(elAuthForm);
    const data = Object.fromEntries(formData);
    console.log(data);

    // const data = {
    //     email: elEmail.value,
    //     password: elPassword.value
    // }
    API.callWithToken().put('auth/change-password', data).then(res => {
        Toastify({
            text: "Thay đổi mật khẩu thành công",
            duration: 3000,
            close: true
        }).showToast();

    })
})