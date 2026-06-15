// 진행률 계산 관리
function calculateProgress() {
    const cards = document.querySelectorAll('.menu-card');
    let grandTotalCount = 0;
    let grandCollectedCount = 0;

    cards.forEach(card => {
        const storageKey = card.getAttribute('data-storage');
        const total = parseInt(card.getAttribute('data-total')) || 0;
        
        const collectedData = JSON.parse(localStorage.getItem(storageKey)) || [];
        const collectedCount = collectedData.length;

        grandTotalCount += total;
        grandCollectedCount += collectedCount;

        const percent = total > 0 ? Math.round((collectedCount / total) * 100) : 0;

        const progressBox = card.querySelector('.progress-box');
        if (progressBox) {
            progressBox.innerHTML = `
                <div class="progress-text">
                    <span>진행률</span>
                    <span>${collectedCount}/${total} (${percent}%)</span>
                </div>
                <div class="progress-bar-bg">
                    <div class="progress-bar-fill" style="width: ${percent}%"></div>
                </div>
            `;
        }
    });

    document.getElementById('grand-total').innerText = grandTotalCount.toLocaleString();
    document.getElementById('grand-collected').innerText = grandCollectedCount.toLocaleString();
    const grandPercent = grandTotalCount > 0 ? Math.round((grandCollectedCount / grandTotalCount) * 100) : 0;
    document.getElementById('grand-percent').innerText = grandPercent;
}
