// 模擬店管理スクリプト
document.addEventListener('DOMContentLoaded', function() {
    loadFoodShops();
});

async function loadFoodShops() {
    try {
        const response = await fetch('data/food.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayFoodShops(data.shops);
        displayFoodSchedule(data.schedule);
        displayFoodNotes(data.notes);
    } catch (error) {
        console.error('模擬店データの読み込みに失敗しました:', error);
        const container = document.querySelector('.food-content');
        if (container) {
            container.innerHTML = '<div class="error">模擬店情報の読み込みに失敗しました。</div>';
        }
    }
}

function displayFoodShops(shops) {
    const container = document.querySelector('.food-content');
    if (!container) return;

    if (!shops || shops.length === 0) {
        container.innerHTML = '<div class="no-data">現在、模擬店情報はありません。</div>';
        return;
    }

    const shopsHTML = shops.map(shop => `
        <section class="food-section">
            <div class="food-photo-wrap">
                <img src="${shop.image}" alt="${shop.name}" class="food-photo">
            </div>
            <div class="food-info">
                <h2 class="food-title">${shop.name}</h2>
                <p class="food-type">【${shop.organization}】</p>
                <div class="food-description">
                    ${shop.description.map(desc => `<p>${desc}</p>`).join('')}
                </div>
            </div>
        </section>
    `).join('');

    // 営業時間・場所情報
    const scheduleHTML = `
        <section class="food-schedule-section">
            <h2>営業時間・場所</h2>
            <div class="schedule-info">
                <div class="schedule-item">
                    <span class="schedule-date">2025年9月6日（土）</span>
                    <span class="schedule-details">10:00～17:00 八王子キャンパス内各所</span>
                </div>
                <div class="schedule-item">
                    <span class="schedule-date">2025年9月7日（日）</span>
                    <span class="schedule-details">10:00～16:00 八王子キャンパス内各所</span>
                </div>
                <p class="schedule-note">詳細な場所については、当日配布のマップや案内板をご確認ください。</p>
            </div>
        </section>
    `;

    // 模擬店ランキング
    const rankingHTML = `
        <section class="food-ranking-section">
            <h2>模擬店ランキング</h2>
            <div class="ranking-content">
                <p class="ranking-description">
                    八王子祭では、来場者の皆様による模擬店ランキング投票を実施しています！<br>
                    お気に入りの模擬店に投票して、No.1模擬店を決めよう！
                </p>
                <div class="ranking-link-container">
                    <a href="https://www.ns.kogakuin.ac.jp/hachisai/shop-ranking/#/customer" 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       class="ranking-link">
                        <span class="ranking-icon">🏆</span>
                        模擬店ランキング投票ページ
                        <span class="ranking-arrow">→</span>
                    </a>
                </div>
                <p class="ranking-note">
                    ※投票は八王子祭開催期間中のみ有効です<br>
                    ※投票結果は後日公式サイトで発表予定です
                </p>
            </div>
        </section>
    `;

    // 注意事項
    const notesHTML = `
        <section class="food-attention-section">
            <h2>ご利用について</h2>
            <div class="attention-content">
                ・模擬店は現金のみのお取り扱いとなります。<br>
                ・食べ歩きの際は他の来場者の方にご配慮ください。<br>
                ・ゴミは各模擬店の指定場所またはエコステーションにお捨てください。<br>
                ・食品アレルギーをお持ちの方は、各模擬店のスタッフにお声がけください。<br>
                ・食材がなくなり次第、営業終了となる場合があります。<br>
                ・天候や諸事情により、営業時間や内容が変更になる場合があります。<br>
                ・最新情報は公式SNSでお知らせします。<br>
            </div>
            <div class="food-hachi">工学院大学 学園祭実行委員会 八王子祭実行部</div>
        </section>
    `;

    container.innerHTML = shopsHTML + scheduleHTML + rankingHTML + notesHTML;
}

function displayFoodSchedule(schedule) {
    // スケジュール情報は displayFoodShops 内で処理
}

function displayFoodNotes(notes) {
    // 注意事項は displayFoodShops 内で処理
}
