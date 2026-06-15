// 건의사항 관리
const firebaseBaseUrl = "https://pokedoc-f09af-default-rtdb.asia-southeast1.firebasedatabase.app";

function openSuggestModal() {
    document.getElementById('suggestModal').style.display = "block";
    document.body.style.overflow = "hidden";
}

function closeSuggestModal() {
    document.getElementById('suggestModal').style.display = "none";
    document.body.style.overflow = "auto";
    document.getElementById('suggestion-form').reset();
}

function submitSuggestion(event) {
    event.preventDefault();

    const nickname = document.getElementById('suggest-nickname').value.trim();
    const email = document.getElementById('suggest-email').value.trim() || "미기입";
    const content = document.getElementById('suggest-content').value.trim();
    const timestamp = new Date().toLocaleString('ko-KR');

    const payload = {
        nickname: nickname,
        email: email,
        content: content,
        regDate: timestamp
    };

    fetch(`${firebaseBaseUrl}/suggestions.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(res => {
        if(res.ok) {
            alert('🎉 의견이 성공적으로 발송되었습니다! 소중한 요구사항 감사합니다.');
            closeSuggestModal();
        } else {
            alert('서버 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.');
        }
    })
    .catch(err => {
        console.error(err);
        alert('네트워크 연결이 불안정합니다.');
    });
}
