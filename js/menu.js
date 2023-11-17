const elNavMenu = document.getElementById('nav-menu');
const elNavMenuMobile = document.getElementById('mobile-menu-active');

API.call().get('categories_news').then(response => {
    const data = response.data.data;
    let html = '';
    let html2 = '';
    let htmlMobile='';
    let htmlMobile2='';
    data.forEach((item, index) => {
        if (index < 3) {
            html +=/*html*/`
            <li class="menu-item"><a href="category.html?id=${item.id}" class="echo-dropdown-main-element">${item.name}</a></li>`;
            htmlMobile += /* html */`
            <li class="menu-item"><a class="main mobile-menu-link" href="category.html?id=${item.id}">${item.name}</a></li>`
        } else {
            html2 +=/*html*/`
            <li class="nav-item"><a href="category.html?id=${item.id}">${item.name}</a></li>`;
            htmlMobile2+= /* html */`
            <li><a class="mobile-menu-link" href="ategory.html?id=${item.id}">${item.name}</a></li>`
        }

    });
    elNavMenuMobile.innerHTML = htmlMobile;
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
        elNavMenuMobile.innerHTML+= /* html */`
        <li class="has-droupdown">
            <a href="#" class="main">${name}</a>
            <ul class="submenu">
                <li class="mobile-menu-link"><a href="profile.html">Thông tin tài khoản</a></li>
                <li class="mobile-menu-link"><a href="change-password.html">Thay đổi mật khẩu</a></li>
                <li class="mobile-menu-link"><a href="admin-create-article.html">Thêm bài viết</a></li>
                <li class="mobile-menu-link"><a href="admin-list-article.html">Quản lí bài viết</a></li>
                <li class="mobile-menu-link" ><a href="#" id="btn-logout">Đăng xuất</a></li>
            </ul>
        </li>`
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
        elNavMenuMobile.innerHTML+= /* html */`
        <li class="has-droupdown">
            <a href="#" class="main">Tài khoản</a>
            <ul class="submenu">
                <li class="mobile-menu-link"><a href="login.html">Đăng nhập</a></li>
                <li class="mobile-menu-link"><a href="register.html">Đăng kí</a></li>
            </ul>
        </li>`
        elNavMenu.innerHTML +=/*html*/`
        <li class="menu-item echo-has-dropdown">
            <a href="#" class="echo-dropdown-main-element">Tài khoản</a>
            <ul class="echo-submenu list-unstyled menu-pages">
                <li class="nav-item"><a href="login.html">Đăng nhập</a></li>
                <li class="nav-item"><a href="register.html">Đăng kí</a></li>
            </ul>
        </li>`
    }).finally(function () {
        document.getElementById('preloader').remove();
    });

})

elNavMenu.addEventListener('click', function (e) {
    const el = e.target;

    if (el.id == "btn-logout") {

        localStorage.removeItem('TOKEN_ACCESS');
        window.location.href = 'index.html'
    }
})