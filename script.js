
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const gameCards = [...document.querySelectorAll(".game-card")];
const gameCount = document.getElementById("gameCount");
const emptyState = document.getElementById("emptyState");
const clearSearch = document.getElementById("clearSearch");

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

const settingsDialog = document.getElementById("settingsDialog");
const settingsLink = document.getElementById("settingsLink");
const closeSettings = document.getElementById("closeSettings");
const saveSettings = document.getElementById("saveSettings");
const darkModeToggle = document.getElementById("darkModeToggle");

// Pencarian dan filter kategori
function filterGames() {
    const keyword = searchInput.value.trim().toLowerCase();
    const category = categoryFilter.value;
    let visibleCount = 0;

    gameCards.forEach((card) => {
        const title = card.dataset.title.toLowerCase();
        const genre = card.dataset.category;
        const description = card.querySelector(".game-info p")
            .textContent.toLowerCase();

        const matchesKeyword =
            title.includes(keyword) || description.includes(keyword);

        const matchesCategory =
            category === "all" || genre === category;

        const isVisible = matchesKeyword && matchesCategory;

        card.hidden = !isVisible;

        if (isVisible) {
            visibleCount++;
        }
    });

    gameCount.textContent = `${visibleCount} Game`;
    emptyState.hidden = visibleCount !== 0;
    clearSearch.hidden = keyword.length === 0;
}

searchInput.addEventListener("input", filterGames);
categoryFilter.addEventListener("change", filterGames);

// Hapus pencarian
clearSearch.addEventListener("click", () => {
    searchInput.value = "";
    filterGames();
    searchInput.focus();
});

// Reset filter
document.getElementById("resetFilter").addEventListener("click", () => {
    searchInput.value = "";
    categoryFilter.value = "all";
    filterGames();
});

// Menu mobile
menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("show");

    menuToggle.innerHTML = isOpen
        ? '<i class="bi bi-x-lg"></i>'
        : '<i class="bi bi-list"></i>';

    menuToggle.setAttribute("aria-expanded", String(isOpen));
});

// Tutup menu setelah link diklik
document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("show");
        menuToggle.innerHTML = '<i class="bi bi-list"></i>';
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

// Buka pengaturan
settingsLink.addEventListener("click", (event) => {
    event.preventDefault();
    navMenu.classList.remove("show");
    menuToggle.innerHTML = '<i class="bi bi-list"></i>';

    if (!settingsDialog.open) {
        settingsDialog.showModal();
    }
});

// Pengaturan mode gelap
function applyDarkMode(enabled) {
    document.body.classList.toggle("dark-mode", enabled);
}

darkModeToggle.addEventListener("change", () => {
    applyDarkMode(darkModeToggle.checked);
});

closeSettings.addEventListener("click", () => {
    settingsDialog.close();
});

saveSettings.addEventListener("click", () => {
    settingsDialog.close();
});

// Tombol Mainkan
document.querySelectorAll("[data-play]").forEach((button) => {
    button.addEventListener("click", () => {
        const card = button.closest(".game-card");
        const gameUrl = card.dataset.url;

        // Buka halaman game jika URL tujuan sudah tersedia.
        if (gameUrl) {
            window.location.href = gameUrl;
        }
    });
});

// Tahun otomatis
document.getElementById("currentYear").textContent =
    new Date().getFullYear();

// Inisialisasi
filterGames();
