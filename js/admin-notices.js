var adminCurrentTab = 'notice';

function openAdminNoticeModal() {
    document.getElementById('adminModal').style.display = "none"; // 기존 관리자 창 숨기기
    document.getElementById('adminNoticeModal').style.display = "block"; // 새 공지관리 창 띄우기
    loadAdminNotices('notice');
}

function closeAdminNoticeModal() {
    document.getElementById('adminNoticeModal').style.display = "none";
    document.getElementById('adminModal').style.display = "block"; // 다시 관리자 창으로 복귀
}

function switchAdminNoticeTab(tab) {
    adminCurrentTab = tab;
    const tabs = document.querySelectorAll('.admin-notice-tab');
    tabs.forEach(t => t.classList.remove('active'));
    document.querySelector(`.admin-notice-tab[data-tab="${tab}"]`).classList.add('active');
    
    const contents = document.querySelectorAll('.admin-notice-content');
    contents.forEach(c => c.style.display = 'none');
    document.getElementById(`admin-${tab}-content`).style.display = 'block';
    
    loadAdminNotices(tab);
}

function loadAdminNotices(type) {
    const container = document.getElementById(`admin-${type}-list`);
    if(!container) return;
    container.innerHTML = '<div class="loading" style="padding:20px; text-align:center; color:#64748b;">데이터를 불러오는 중입니다...</div>';

    const dbUrl = "https://pokedoc-f09af-default-rtdb.asia-southeast1.firebasedatabase.app";

    fetch(`${dbUrl}/${type}s.json`)
        .then(res => res.json())
        .then(data => {
            if (data && typeof data === 'object' && data.error) {
                container.innerHTML = '<div class="no-data" style="padding:20px; text-align:center; color:#ef4444;">⚠️ 데이터베이스 접근이 거부되었습니다. Firebase 규칙을 확인해주세요.</div>';
                return;
            }
            if (!data || Object.keys(data).length === 0) {
                container.innerHTML = '<div class="no-data" style="padding:20px; text-align:center; color:#64748b;">📭 등록된 항목이 없습니다.</div>';
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
                    <div class="admin-notice-item">
                        <div class="admin-notice-header">
                            <h4 style="margin:0;">${item.title}</h4>
                            <button class="btn-delete" onclick="deleteNotice('${type}', '${item.id}')">삭제</button>
                        </div>
                        <div style="font-size: 0.8rem; color: #64748b; margin-bottom: 8px;">${item.date || ''}</div>
                        <div style="font-size: 0.9rem;">${item.content.replace(/\n/g, '<br>')}</div>
                    </div>
                `;
                container.insertAdjacentHTML('beforeend', itemHtml);
            });
        })
        .catch(err => {
            console.error(err);
            container.innerHTML = '<div class="no-data" style="padding:20px; text-align:center; color:red;">❌ 데이터를 불러오지 못했습니다.</div>';
        });
}

function submitNotice(type) {
    const titleInput = document.getElementById(`${type}-title`);
    const contentInput = document.getElementById(`${type}-content`);
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (!title || !content) {
        alert('제목과 내용을 모두 입력해주세요.');
        return;
    }

    const dbUrl = "https://pokedoc-f09af-default-rtdb.asia-southeast1.firebasedatabase.app";
    const payload = {
        title: title,
        content: content,
        date: new Date().toLocaleDateString('ko-KR')
    };

    fetch(`${dbUrl}/${type}s.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(res => {
        if (res.ok) {
            alert('✅ 성공적으로 게시되었습니다.');
            titleInput.value = '';
            contentInput.value = '';
            loadAdminNotices(type);
        } else {
            alert('❌ 작성에 실패했습니다.');
        }
    })
    .catch(err => {
        console.error(err);
        alert('네트워크 오류가 발생했습니다.');
    });
}

function deleteNotice(type, id) {
    if (!confirm('정말 삭제하시겠습니까? (복구 불가)')) return;

    const dbUrl = "https://pokedoc-f09af-default-rtdb.asia-southeast1.firebasedatabase.app";
    
    fetch(`${dbUrl}/${type}s/${id}.json`, {
        method: 'DELETE'
    })
    .then(res => {
        if (res.ok) {
            alert('✅ 삭제되었습니다.');
            loadAdminNotices(type);
        } else {
            alert('❌ 삭제에 실패했습니다.');
        }
    })
    .catch(err => console.error(err));
}
