// 메인 초기화 및 카드 생성, 모달 관리

function renderCards() {
    const menuGrid = document.getElementById('menu-grid');
    menuGrid.innerHTML = '';

    CARDS_DATA.forEach(card => {
        const cardElement = document.createElement('a');
        cardElement.href = card.href;
        cardElement.className = `menu-card ${card.class}`;
        cardElement.setAttribute('data-type', card.type);
        cardElement.setAttribute('data-storage', card.storage);
        cardElement.setAttribute('data-total', card.total);

        cardElement.innerHTML = `
            <img src="${card.image}" alt="${card.title}">
            <h2>${card.title}</h2>
            <p>${card.description}</p>
            <div class="progress-box"></div>
        `;

        menuGrid.appendChild(cardElement);
    });
}

const modalTexts = {
    about: {
        title: "ℹ️ 사이트 소개 (About Us)",
        content: "안녕하세요! '포켓몬 띠부실 도감 보관소'에 오신 것을 환영합니다.\n\n본 사이트는 수집가분들이 다양한 시즌의 포켓몬 띠부씰 및 스티커 수집 현황을 직관적이고 편리하게 기록하고 관리할 수 있도록 지원하는 개인 수집용 대시보드 허브 공간입니다.\n\n[주요 기능]\n- 역대 시즌별 포켓몬 띠부씰 도감 리스트 대시보드 제공\n- 실시간 클릭 수집 현황 체크 및 자동 진행률 바 저장 시스템\n- 브라우저 로컬 저장소(localStorage) 기반 무서버 내역 유지 기술 적용\n\n앞으로도 깔끔한 수집 편의성을 제공하기 위해 지속적으로 보완해 나갈 예정입니다. 이용해 주셔서 감사합니다!"
    },
    privacy: {
        title: "🔒 개인정보처리방침 (Privacy Policy)",
        content: "본 '포켓몬 띠부실 도감 보관소'는 이용자의 개인정보를 매우 소중하게 생각하며, 관련된 법령을 준수합니다.\n\n1. 개인정보의 수집 항목 및 목적\n본 사이트는 회원가입 시스템이 없는 완전 개방형 사이트로, 이용자의 이름, 전화번호, 비밀번호 등 어떠한 민감 개인정보도 서버에 수집하거나 요구하지 않습니다.\n\n2. 데이터의 저장 (웹 로컬스토리지 활용)\n사용자가 도감에서 체크하는 수집 진행 내역은 이용자 본인의 PC/모바일 브라우저 임시 저장소인 'localStorage'에만 안전하게 기록됩니다. 이 데이터는 외부 서버로 전송되지 않으며 브라우저 쿠키 삭제 시 초기화될 수 있습니다.\n\n3. 쿠키 및 서드파티 분석 툴 활용\n본 사이트는 통합 방문자 수 카운팅 및 향후 구글 애드센스(Google AdSense) 광고 게재 등을 위하여 무인성 비식별 로그/쿠키 데이터를 활용할 수 있습니다. 구글은 쿠키를 사용하여 사용자의 이전 방문을 기반으로 광고를 게재하며, 사용자는 구글 광고 설정에서 맞춤설정 광고를 해제할 수 있습니다."
    }
};

function openModal(type) {
    const modal = document.getElementById('infoModal');
    const header = document.getElementById('modalHeader');
    const body = document.getElementById('modalBody');
    
    if(modalTexts[type]) {
        header.innerText = modalTexts[type].title;
        body.innerText = modalTexts[type].content;
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
    }
}

function closeModal() {
    const modal = document.getElementById('infoModal');
    modal.style.display = "none";
    document.body.style.overflow = "auto";
}

function updateIntegratedCounter() {
    const apiEndpoint = `${firebaseBaseUrl}/visits.json`;

    fetch(apiEndpoint)
        .then(res => res.json())
        .then(currentValue => {
            const newValue = currentValue ? Number(currentValue) + 1 : 1;
            fetch(apiEndpoint, { method: 'PUT', body: JSON.stringify(newValue) })
            .then(() => {
                const countDisplay = document.getElementById('main-visitor-count');
                if (countDisplay) countDisplay.innerText = newValue.toLocaleString();
            });
        })
        .catch(err => {
            const countDisplay = document.getElementById('main-visitor-count');
            if (countDisplay) countDisplay.innerText = "1";
        });
}

// 윈도우 모달 클릭 닫기
window.onclick = function(event) {
    const infoModal = document.getElementById('infoModal');
    const suggestModal = document.getElementById('suggestModal');
    const adminModal = document.getElementById('adminModal');
    if (event.target == infoModal) closeModal();
    if (event.target == suggestModal) closeSuggestModal();
    if (event.target == adminModal) closeAdminModal();
}

// 초기화 실행
window.addEventListener('DOMContentLoaded', () => {
    renderCards();
    initTheme();
    calculateProgress();
    updateIntegratedCounter();
    
    // 🔄 3초마다 자동 업데이트
    setInterval(calculateProgress, 3000);
});

// 페이지 복귀 시 즉시 업데이트
window.addEventListener('focus', calculateProgress);

// 탭 전환 시 업데이트
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        calculateProgress();
    }
});
