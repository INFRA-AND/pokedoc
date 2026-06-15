// 전역 변수 충돌 방지를 위해 const firebaseBaseUrl 제거
var currentNoticeTab = 'notice'; 

function openNoticeModal() {
    document.getElementById('noticeModal').style.display = "block";
    document.body.style.overflow = "hidden";
    fetchNotices('notice');
}

function closeNoticeModal() {
    document.getElementById('noticeModal').style.display = "none";
    document.body.style.overflow = "auto";
}

function switchNoticeTab(tab) {
    currentNoticeTab = tab;
    const noticeTabs = document.querySelectorAll('.notice-tab');
    noticeTabs.forEach(t => t.classList.remove('active'));
    document.querySelector(`.notice-tab[data-tab="${tab}"]`).classList.add('active');
    fetchNotices(tab);
}

function fetchNotices(type) {
    const container = document.getElementById('notice-list-container');
    container.innerHTML = '<div class="loading" style="padding:20px; text-align:center; color:#64748b;">데이터를 불러오는 중입니다...</div>';

    // 변수 충돌을 완벽 방지하기 위해 함수 내부 지역변수로 선언
    const dbUrl = "https://pokedoc-f09af-default-rtdb.asia-southeast1.firebasedatabase.app";

    fetch(`${dbUrl}/${type}s.json`)
        .then(res => res.json())
        .then(data => {
            if (!data || Object.keys(data).length === 0) {
                container.innerHTML = `<div class="no-data" style="padding:20px; text-align:center; color:#64748b;">📭 아직 등록된 ${type === 'notice' ? '공지사항' : '업데이트'} 내역이 없습니다.</div>`;
                return;
            }
            container.innerHTML = '';
            
            // 최신 글이 맨 위로 오도록 정렬
            const sortedItems = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            })).reverse();

            sortedItems.forEach(item => {
                const itemHtml = `
                    <div class="notice-item">
                        <div class="notice-header">
                            <h3>${item.title}</h3>
                            <span class="notice-date">${item.date}</span>
                        </div>
                        <div class="notice-content">${item.content.replace(/\n/g, '<br>')}</div>
                    </div>
                `;
                container.insertAdjacentHTML('beforeend', itemHtml);
            });
        })
        .catch(err => {
            console.error(err);
            container.innerHTML = '<div class="no-data" style="padding:20px; text-align:center; color:red;">❌ 서버와 연결할 수 없습니다.</div>';
        });
}
