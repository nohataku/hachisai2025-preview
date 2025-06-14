// カウントダウン表示
function updateCountdown() {
    const fesDate = new Date('2025-09-06T10:00:00+09:00');
    const now = new Date();
    const diff = fesDate - now;
    const countdownElem = document.getElementById('countdown');
    if (!countdownElem) return;
    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);        countdownElem.innerHTML = `
            <div class="countdown-label">開催まであと</div>
            <div class="countdown-container">
                <div class="countdown-item">
                    <span class="countdown-value">${days}</span>
                    <span class="countdown-unit">日</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-value">${hours}</span>
                    <span class="countdown-unit">時間</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-value">${minutes}</span>
                    <span class="countdown-unit">分</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-value">${seconds}</span>
                    <span class="countdown-unit">秒</span>
                </div>
            </div>`;
    } else if (diff > -1000 * 60 * 60 * 48) { // 2日間開催中
        countdownElem.innerHTML = `<span class="countdown-value">ただいま開催中！</span>`;
    } else {
        countdownElem.innerHTML = `<span class="countdown-value">開催は終了しました</span>`;
    }
}
setInterval(updateCountdown, 1000);
updateCountdown();

//ここに新聞会の動画垂れ流しすかも？