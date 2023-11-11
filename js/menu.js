const elNavMenu = document.getElementById('nav-menu');

API.call().get('categories_news').then(response => {
    const data = response.data.data;
    let html = '';
    let html2 = '';
    data.forEach((item, index) => {
        if (index < 3) {
            html +=/*html*/`
            <li class="menu-item"><a href="category.html?id=${item.id}" class="echo-dropdown-main-element">${item.name}</a></li>`
        } else {
            html2 +=/*html*/`
            <li class="nav-item"><a href="category.html?id=${item.id}">${item.name}</a></li>`
        }
    });
    elNavMenu.innerHTML = html +/*html*/`
    <li class="menu-item echo-has-dropdown">
        <a href="#" class="echo-dropdown-main-element">Danh mục khác</a>
        <ul class="echo-submenu list-unstyled menu-pages">
            ${html2}
        </ul>
    </li>`


    // gọi api lấy thông tin user đã đăng nhập, càn kèm token
    // then -> bổ thêm menu cho user đã đăng nhập
    // catch -> bổ sung menu đăng nhập đăng ký

    const token = localStorage.getItem('TOKEN_ACCESS');
    API.callWithToken().get('auth/me').then(res => {
        const name = res.data.data.name;
        elNavMenu.innerHTML +=/*html*/`
        <li class="menu-item echo-has-dropdown">
            <a href="#" class="echo-dropdown-main-element">${name}</a>
            <ul class="echo-submenu list-unstyled menu-pages">
                <li class="nav-item"><a href="profile.html">Thông tin tài khoản</a></li>
                <li class="nav-item"><a href="change-password.html">Thay đổi mật khẩu</a></li>
                <li class="nav-item"><a href="admin-create-article.html">Thêm bài viết</a></li>
                <li class="nav-item"><a href="admin-list-article.html">Quản lí bài viết</a></li>
                <li class="nav-item" ><a href="#" id="btn-logout">Đăng xuất</a></li>
            </ul>
        </li>`
    }).catch(err => {
        elNavMenu.innerHTML +=/*html*/`
        <li class="menu-item echo-has-dropdown">
            <a href="#" class="echo-dropdown-main-element">Tài khoản</a>
            <ul class="echo-submenu list-unstyled menu-pages">
                <li class="nav-item"><a href="login.html">Đăng nhập</a></li>
                <li class="nav-item"><a href="register.html">Đăng kí</a></li>
            </ul>
        </li>`
    })

})

elNavMenu.addEventListener('click', function (e) {
    const el = e.target;
    
    if (el.id == "btn-logout") {
        
        localStorage.removeItem('TOKEN_ACCESS');
        window.location.href = 'index.html'
    }
})