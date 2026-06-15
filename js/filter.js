// 검색 및 필터링 관리
let currentFilterTag = 'all';

function filterCards() {
    const query = document.getElementById('search-bar').value.toLowerCase().trim();
    const cards = document.querySelectorAll('.menu-card');

    cards.forEach(card => {
        const title = card.querySelector('h2').innerText.toLowerCase();
        const desc = card.querySelector('p').innerText.toLowerCase();
        const cardType = card.getAttribute('data-type');

        const matchesSearch = title.includes(query) || desc.includes(query);
        const matchesTag = (currentFilterTag === 'all') || (cardType === currentFilterTag);

        card.style.display = (matchesSearch && matchesTag) ? 'flex' : 'none';
    });
}

function filterTag(tag) {
    currentFilterTag = tag;
    const tags = document.querySelectorAll('.tag-btn');
    tags.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.tag-btn[data-filter="${tag}"]`).classList.add('active');
    filterCards();
}
