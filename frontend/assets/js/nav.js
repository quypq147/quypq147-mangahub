(function () {
    function getBasePath() {
        return window.NAV_BASE_PATH || "";
    }

    function renderNav() {
        const container = document.getElementById("site-nav");
        if (!container) return;

        const base = getBasePath();

        container.innerHTML = `
        <nav class="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    <div class="flex items-center">
                        <a href="${base}index.html" class="text-2xl font-bold text-blue-500">Manga<span
                                class="text-white">Hub</span></a>
                        <div class="hidden md:block">
                            <div class="user-nav ml-10 flex items-baseline space-x-4">
                                <a href="${base}manga/index.html"
                                    class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Manga</a>
                                <a href="${base}forum/index.html"
                                    class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Thảo
                                    luận</a>
                                <a href="${base}about-us.html"
                                    class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Về
                                    chúng tôi</a>
                            </div>
                        </div>
                    </div>

                    <div id="auth-container" class="flex items-center gap-5 relative">
                        <a href="${base}sign-in/index.html"
                            class="text-red-400 border border-red-400 hover:bg-red-400 hover:text-white px-3 py-1 rounded-md text-sm transition">
                            <i class="fa-solid fa-lock"></i> Đăng nhập
                        </a>
                    </div>
                </div>
            </div>
        </nav>`;
    }

    function checkLoginStatus() {
        const authContainer = document.getElementById("auth-container");
        const navContainer = document.querySelector(".user-nav");
        if (!authContainer || !navContainer) return;

        const token = localStorage.getItem("token");
        const userStr = localStorage.getItem("user");
        const base = getBasePath();

        if (token && userStr) {
            const user = JSON.parse(userStr);
            const initial = user.username ? user.username.charAt(0).toUpperCase() : "U";

            if (user.role === "admin" && !document.getElementById("nav-admin-link")) {
                const adminLinkHTML = `
                    <a href="${base}admin/" id="nav-admin-link" class="text-yellow-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                        <i class="fa-solid fa-user-shield mr-1"></i> Quản trị
                    </a>
                `;
                navContainer.insertAdjacentHTML("beforeend", adminLinkHTML);
            }

            const allowedRoles = ["admin", "uploader"];
            const showUploadLink = allowedRoles.includes(user.role);
            const uploadLinkHTML = showUploadLink
                ? `<a href="${base}upload/index.html" class="block px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition">
                     <i class="fa-solid fa-cloud-upload mr-2 text-green-500"></i> Tải lên truyện
                   </a>`
                : "";

            authContainer.innerHTML = `
                <div class="relative group z-50">
                    <button class="flex items-center gap-3 focus:outline-none">
                        <div class="text-right hidden md:block">
                            <p class="text-sm font-bold text-white">${user.fullname || user.username}</p>
                            <p class="text-xs text-green-400 capitalize">${user.role}</p>
                        </div>
                        <div class="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg border-2 border-gray-700 group-hover:border-blue-500 transition">
                            ${initial}
                        </div>
                    </button>

                    <div class="absolute right-0 pt-2 w-56 hidden group-hover:block animate-fade-in">
                        <div class="bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden">
                            <div class="px-4 py-3 border-b border-gray-700 bg-gray-750">
                                <p class="text-sm text-white font-bold truncate">${user.username}</p>
                                <p class="text-xs text-gray-400 truncate">${user.email}</p>
                            </div>
                            <a href="${base}user/" class="block px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition">
                                <i class="fa-solid fa-user mr-2 text-blue-500"></i> Hồ sơ cá nhân
                            </a>
                            ${uploadLinkHTML}
                            <a href="${base}user/book-marked.html" class="block px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition">
                                <i class="fa-solid fa-bookmark mr-2 text-yellow-500"></i> Truyện đã lưu
                            </a>
                            <div class="border-t border-gray-700 my-1"></div>
                            <button onclick="handleLogout()" class="block w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-900/20 hover:text-red-300 transition">
                                <i class="fa-solid fa-right-from-bracket mr-2"></i> Đăng xuất
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    function handleLogout() {
        if (confirm("Bạn có chắc chắn muốn đăng xuất?")) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.reload();
        }
    }

    window.handleLogout = handleLogout;

    document.addEventListener("DOMContentLoaded", function () {
        renderNav();
        checkLoginStatus();
    });
})();
