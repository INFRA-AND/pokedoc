// 다크모드 테마 관리
function initTheme() {
    const savedTheme = localStorage.getItem('pokedoc_main_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeButton(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('pokedoc_main_theme', newTheme);
    updateThemeButton(newTheme);
}

function updateThemeButton(theme) {
    const themeBtn = document.getElementById('theme-btn');
    if (theme === 'dark') {
        themeBtn.innerText = "☀️ 라이트 모드로 보기";
    } else {
        themeBtn.innerText = "🌙 다크 모드로 보기";
    }
}
