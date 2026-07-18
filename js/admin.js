// 관리자 관리
const ADMIN_HASH = "C6941E071034DF57CF2AF1C6D9983F7EB706711A416B00DCCBE0B029D5332D6F";

async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);                    
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function openAdminModal() {
    const inputPw = prompt("🔒 관리자 전용 액세스 비밀번호를 입력하세요:");
    if (inputPw === null) return; 
    
    const rawHash = await sha256(inputPw.trim());
    const inputHash = rawHash.toUpperCase();
    
    if (inputHash === ADMIN_HASH) {
        document.getElementById('adminModal').style.display = "block";
        document.body.style.overflow = "hidden";
        fetchSuggestions();
        
        // ✅ 공지사항 관리 버튼 표시
        document.getElementById('admin-notice-btn').style.display = 'block';
    } else {
        alert("❌ 비밀번호가 올바르지 않습니다. 관리자 권한이 거부되었습니다.");
    }
}

function closeAdminModal() {
    document.getElementById('adminModal').style.display = "none";
    document.body.style.overflow = "auto";
    document.getElementById('admin-list-target').innerHTML = '<div class="no-data">의견을 불러오는 중입니다...</div>';
    
    // ✅ 버튼 숨기기
    document.getElementById('admin-notice-btn').style.display = 'none';
}

function fetchSuggestions() {
    const targetContainer = document.getElementById('admin-list-target');
    
    fetch(`${firebaseBaseUrl}/suggestions.json`)
        .then(res => res.json())
        .then(data => {
            if (data && typeof data === 'object' && data.error) {
                targetContainer.innerHTML = '<div class="no-data">⚠️ 데이터베이스 접근이 거부되었습니다. Firebase 규칙을 확인해주세요.</div>';
                return;
            }
            if (!data || Object.keys(data).length === 0) {
                targetContainer.innerHTML = '<div class="no-data">📭 등록된 건의 및 요구사항이 전혀 없습니다.</div>';
                return;
            }

            targetContainer.innerHTML = ''; 

            const sortedItems = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            })).reverse();

            sortedItems.forEach(item => {
                if (!item.nickname) return;
                const itemHtml = `
                    <div class="admin-item" id="msg-${item.id}">
                        <button class="item-delete-btn" onclick="deleteSuggestion('${item.id}')">삭제</button>
                        <div class="admin-meta">👤 ${item.nickname} (${item.email || ''}) | 📅 ${item.regDate || ''}</div>
                        <div class="admin-content">${item.content || ''}</div>
                    </div>
                `;
                targetContainer.insertAdjacentHTML('beforeend', itemHtml);
            });
        })
        .catch(err => {
            console.error(err);
            targetContainer.innerHTML = '<div class="no-data">❌ 데이터를 정상적으로 로드하지 못했습니다.</div>';
        });
}

function deleteSuggestion(id) {
    if (!confirm("⚠️ 해당 유저의 의견을 데이터베이스에서 영구 삭제하시겠습니까?")) return;

    fetch(`${firebaseBaseUrl}/suggestions/${id}.json`, {
        method: 'DELETE'
    })
    .then(res => {
        if (res.ok) {
            alert("🗑️ 성실하게 삭제 처리가 완료되었습니다.");
            fetchSuggestions(); 
        } else {
            alert("삭제 요청 처리에 실패했습니다.");
        }
    })
    .catch(err => console.error(err));
}
