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

    const dbUrl = "https://pokedoc-f09af-default-rtdb.asia-southeast1.firebasedatabase.app";

    fetch(`${dbUrl}/${type}s.json`)
        .then(res => res.json())
        .then(data => {
            if (data && typeof data === 'object' && data.error) {
                container.innerHTML = `<div class="no-data" style="padding:20px; text-align:center; color:#64748b;">⚠️ 데이터를 불러올 수 없습니다. 잠시 후 다시 시도해 주세요.</div>`;
                return;
            }
            if (!data || Object.keys(data).length === 0) {
                container.innerHTML = `<div class="no-data" style="padding:20px; text-align:center; color:#64748b;">📭 아직 등록된 ${type === 'notice' ? '공지사항' : '업데이트'} 내역이 없습니다.</div>`;
                return;
            }
            container.innerHTML = '';
            
            const sortedItems = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            })).reverse();

            sortedItems.forEach(item => {
                if (!item.title || !item.content) return;
                const itemHtml = `
                    <div class="notice-item">
                        <div class="notice-header">
                            <h3>${item.title}</h3>
                            <span class="notice-date">${item.date || ''}</span>
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
