// 관리자 전용: 공지사항/업데이트 작성/수정/삭제

function openAdminNoticeModal() {
    // 기존 관리자 인증 후 실행
    document.getElementById('adminNoticeModal').style.display = "block";
    document.body.style.overflow = "hidden";
    loadAdminNotices();
}

function closeAdminNoticeModal() {
    document.getElementById('adminNoticeModal').style.display = "none";
    document.body.style.overflow = "auto";
}

function switchAdminNoticeTab(tab) {
    const tabs = document.querySelectorAll('.admin-notice-tab');
    tabs.forEach(t => t.classList.remove('active'));
    document.querySelector(`.admin-notice-tab[data-tab="${tab}"]`).classList.add('active');
    
    const contents = document.querySelectorAll('.admin-notice-content');
    contents.forEach(c => c.style.display = 'none');
    document.getElementById(`admin-${tab}-content`).style.display = 'block';
    
    loadAdminNotices(tab);
}

function loadAdminNotices(type = 'notice') {
    const container = document.getElementById(`admin-${type}-list`);
    container.innerHTML = '<div class="loading">로딩 중...</div>';

    fetch(`${firebaseBaseUrl}/${type}s.json`)
        .then(res => res.json())
        .then(data => {
            if (!data || Object.keys(data).length === 0) {
                container.innerHTML = '<div class="no-data">📭 항목이 없습니다.</div>';
                return;
            }

            container.innerHTML = '';

            const sortedItems = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            })).reverse();

            sortedItems.forEach(item => {
                const itemHtml = `
                    <div class="admin-notice-item">
                        <div class="admin-notice-header">
                            <h4>${item.title}</h4>
                            <div class="admin-notice-actions">
                                <button class="btn-edit" onclick="editNotice('${type}', '${item.id}', '${escapeQuotes(item.title)}', '${escapeQuotes(item.content)}')">수정</button>
                                <button class="btn-delete" onclick="deleteNotice('${type}', '${item.id}')">삭제</button>
                            </div>
                        </div>
                        <div class="admin-notice-info">${item.date}</div>
                        <div class="admin-notice-preview">${item.content.substring(0, 100)}...</div>
                    </div>
                `;
                container.insertAdjacentHTML('beforeend', itemHtml);
            });
        })
        .catch(err => {
            console.error(err);
            container.innerHTML = '<div class="no-data">❌ 데이터를 불러오지 못했습니다.</div>';
        });
}

function submitNotice(type) {
    const titleInput = document.getElementById(`${type}-title`);
    const contentInput = document.getElementById(`${type}-content`);
    
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (!title || !content) {
        alert('제목과 내용을 입력해주세요.');
        return;
    }

    const today = new Date().toLocaleDateString('ko-KR');
    
    const payload = {
        title: title,
        content: content,
        date: today
    };

    fetch(`${firebaseBaseUrl}/${type}s.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(res => {
        if (res.ok) {
            alert('✅ 작성되었습니다.');
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

function editNotice(type, id, title, content) {
    const newTitle = prompt('제목을 입력하세요:', title);
    if (newTitle === null) return;

    const newContent = prompt('내용을 입력하세요:', content);
    if (newContent === null) return;

    const today = new Date().toLocaleDateString('ko-KR');

    const payload = {
        title: newTitle,
        content: newContent,
        date: today
    };

    fetch(`${firebaseBaseUrl}/${type}s/${id}.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(res => {
        if (res.ok) {
            alert('✅ 수정되었습니다.');
            loadAdminNotices(type);
        } else {
            alert('❌ 수정에 실패했습니다.');
        }
    })
    .catch(err => {
        console.error(err);
        alert('네트워크 오류가 발생했습니다.');
    });
}

function deleteNotice(type, id) {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    fetch(`${firebaseBaseUrl}/${type}s/${id}.json`, {
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
    .catch(err => {
        console.error(err);
        alert('네트워크 오류가 발생했습니다.');
    });
}

function escapeQuotes(str) {
    return str.replace(/'/g, "\\'");
}
