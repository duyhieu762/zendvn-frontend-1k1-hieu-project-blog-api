const elAuthForm = document.getElementById('auth-form');
const elName = document.getElementById('name');
const elEmail = document.getElementById('email');

const elPhone = document.getElementById('phone');
const elAddress = document.getElementById('address');
const elMessages = document.getElementById('messages');


API.callWithToken().get('auth/me').then(res => {

    const data = res.data.data;
    elName.value = data.name;
    elEmail.value = data.email;
    elPhone.value = data.phone;
    elAddress.value = data.address;

})

elAuthForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(elAuthForm);
    const data = Object.fromEntries(formData);
    API.callWithToken().put('auth/update', data).then(res => {
        Toastify({
            text: "Cập nhật thông tin thành công",
            duration: 3000,
            close: true
        }).showToast();
    })

})