// イベント管理スクリプト
document.addEventListener('DOMContentLoaded', function() {
    loadEvents();
});

async function loadEvents() {
    try {
        const response = await fetch('data/events.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayEvents(data.events);
        displayEventSchedule(data.schedule);
        displayEventNotes(data.notes);
    } catch (error) {
        console.error('イベントデータの読み込みに失敗しました:', error);
        const container = document.querySelector('.stage-content');
        if (container) {
            container.innerHTML = '<div class="error">イベント情報の読み込みに失敗しました。</div>';
        }
    }
}

function displayEvents(events) {
    const container = document.querySelector('.stage-content');
    if (!container) return;

    if (!events || events.length === 0) {
        container.innerHTML = '<div class="no-data">現在、イベント情報はありません。</div>';
        return;
    }

    const eventsHTML = events.map(event => `
        <section class="stage-section">
            <div class="stage-photo-wrap">
                <img src="${event.image}" alt="${event.name}" class="stage-photo">
            </div>
            <div class="stage-info">
                <h2 class="stage-title">${event.name}</h2>
                <p class="stage-type">【${event.organization}】</p>
                <div class="stage-description">
                    ${event.description.map(desc => `<p>${desc}</p>`).join('')}
                </div>
            </div>
        </section>
    `).join('');

    // イベントスケジュール
    const scheduleHTML = `
        <section class="stage-schedule-section">
            <h2>イベントスケジュール</h2>
            <div class="schedule-info">
                <div class="schedule-item">
                    <span class="schedule-date">2025年9月6日（土）</span>
                    <span class="schedule-details">各種イベントを順次開催予定</span>
                </div>
                <div class="schedule-item">
                    <span class="schedule-date">2025年9月7日（日）</span>
                    <span class="schedule-details">宇宙舞踏会、八乱闘 他、各種イベント開催</span>
                </div>
                <p class="schedule-note">詳細なタイムスケジュールや参加方法については、後日公式SNSにてお知らせいたします。</p>
            </div>
        </section>
    `;

    // 参加について
    const notesHTML = `
        <section class="stage-attention-section">
            <h2>イベント参加について</h2>
            <div class="attention-content">
                ・各イベントの参加方法や定員については、詳細発表時にお知らせします。<br>
                ・一部のイベントは事前申し込みが必要な場合があります。<br>
                ・天候や諸事情により、内容やスケジュールが変更になる場合があります。<br>
                ・イベント参加時は他の参加者の方への配慮をお願いします。<br>
                ・会場内でのマナーを守り、スタッフの指示に従ってください。<br>
                ・最新情報は公式SNSで随時更新いたします。<br>
            </div>
            <div class="stage-hachi">工学院大学 学園祭実行委員会 八王子祭実行部</div>
        </section>
    `;

    container.innerHTML = eventsHTML + scheduleHTML + notesHTML;
}

function displayEventSchedule(schedule) {
    // スケジュール情報は displayEvents 内で処理
}

function displayEventNotes(notes) {
    // 注意事項は displayEvents 内で処理
}
