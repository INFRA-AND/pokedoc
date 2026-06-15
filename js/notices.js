// const 대신 var를 사용하여 다른 파일과의 충돌을 완벽 방지합니다.
var firebaseBaseUrl = "https://pokedoc-f09af-default-rtdb.asia-southeast1.firebasedatabase.app";
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

    fetch(`${firebaseBaseUrl}/${type}s.json`)
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
