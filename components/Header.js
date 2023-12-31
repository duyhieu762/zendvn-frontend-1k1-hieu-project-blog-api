class Header extends HTMLElement {

    constructor() {
        super();
    }


    connectedCallback() {
        this.innerHTML = /* html */`
        <div id="preloader">
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        
        <header class="echo-header-area header-three header-eight">
        
        <!-- Start Home-1 Menu & Site Logo & Social Media -->
            <div class="echo-home-1-menu header-three">
                <div class="echo-site-main-logo-menu-social">
                    <div class="container hm-7-container">
                        <div class="echo-site-main">
                            <div class="row align-items-center">
                                <div class="col-xl-2 col-lg-2 col-md-8 col-sm-8 col-6">
                                    <div class="echo-site-logo">
                                        <a href="index.html"><img src="assets/images/home-1/site-logo/site-logo7.svg" alt="Echo"></a>
                                    </div>
                                </div>
                                <div class="col-xl-7 col-lg-7 d-none d-lg-block">
                                    <nav>
                                        <div class="echo-home-1-menu">
                                            <ul class="list-unstyled echo-desktop-menu" id="nav-menu"></ul>
                                        </div>
                                    </nav>
                                </div>
                                <div class="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6">
                                    <div class="echo-home-1-social-media-icons">
                                        <a href="#" id="search" class="echo-header-top-search-btn search-icon action-item icon">
                                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9.11556 16.431C13.3485 16.431 16.78 12.9996 16.78 8.76665C16.78 4.53373 13.3485 1.10226 9.11556 1.10226C4.88264 1.10226 1.45117 4.53373 1.45117 8.76665C1.45117 12.9996 4.88264 16.431 9.11556 16.431Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                <path d="M14.4463 14.4954L17.4512 17.4925" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>
                                        </a>
                                        <div class="search-input-area">
                                            <div class="container">
                                               <form action="search.html" method="GET">
                                                    <div class="search-input-inner">
                                                        <div class="input-div">
                                                            <input id="searchInput1" name="keyword" class="search-input" type="text" placeholder="Search by keyword or #">
                                                        </div>
                                                        <div class="search-close-icon"><i class="fa-regular fa-xmark-large rt-xmark"></i></div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div class="rts-darkmode">
                                            <a id="rts-data-toggle" class="rts-dark-light">
                                                <i class="rts-go-dark fal fa-moon"></i>
                                                <i class="rts-go-light far fa-sun"></i>
                                            </a>
                                        </div>
                                        <div class="echo-header-top-menu-bar echo-off-canvas menu-btn d-block d-lg-none">
                                            <a href="javascript:void(0)">
                                                <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0.526001 0.953461H20V3.11724H0.526001V0.953461ZM7.01733 8.52668H20V10.6905H7.01733V8.52668ZM0.526001 16.0999H20V18.2637H0.526001V16.0999Z" fill="#5E5E5E" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End Home-1 Menu & Site Logo & Social Media -->
        </header>
        <div id="side-bar" class="side-bar header-one">
        
        <!-- mobile menu area start -->
        <div class="mobile-menu d-block d-lg-none">
                <nav class="nav-main mainmenu-nav mt--30" id="nav-mobile">
                    <ul class="mainmenu" id="mobile-menu-active">
                        
                    </ul>
                </nav>

                <div class="social-wrapper-one">
                    <ul>
                        <li>
                            <a href="#">
                                <i class="fa-brands fa-facebook-f"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="fa-brands fa-twitter"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="fa-brands fa-youtube"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="fa-brands fa-instagram"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="fa-brands fa-linkedin-in"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- mobile menu area end -->
        </div>
        `
    }
}
window.customElements.define('x-header', Header);