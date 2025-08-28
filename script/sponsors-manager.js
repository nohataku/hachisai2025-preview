// 協賛企業管理スクリプト
document.addEventListener('DOMContentLoaded', function() {
    // 9月1日10時の公開日時を設定
    //const releaseDate = new Date('2025-09-01T10:00:00+09:00');

    // debug
    const releaseDate = new Date('2025-08-01T10:00:00+09:00');
    const currentDate = new Date();
    
    if (currentDate >= releaseDate) {
        loadSponsors();
    } else {
        displayPreparationMessage();
    }
});

function displayPreparationMessage() {
    const containers = [
        { id: 'sponsors-grid', message: '協賛企業情報は9月1日10時に公開予定です' },
        { id: 'advertising-sponsors-list', message: '広告協賛企業情報は9月1日10時に公開予定です' },
        { id: 'goods-sponsors-list', message: '物品協賛企業情報は9月1日10時に公開予定です' }
    ];
    
    containers.forEach(({ id, message }) => {
        const container = document.getElementById(id);
        if (container) {
            container.innerHTML = `<div class="preparation-message">${message}</div>`;
        }
    });
}

async function loadSponsors() {
    try {
        const response = await fetch('data/sponsors.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displaySponsors(data.sponsors);
        displayAdvertisingSponsors(data.advertisingSponsors);
        displayGoodsSponsors(data.goodsSponsors);
    } catch (error) {
        console.error('協賛企業データの読み込みに失敗しました:', error);
        const container = document.getElementById('sponsors-grid');
        if (container) {
            container.innerHTML = '<div class="error">協賛企業情報の読み込みに失敗しました。</div>';
        }
        const adContainer = document.getElementById('advertising-sponsors-list');
        if (adContainer) {
            adContainer.innerHTML = '<div class="error">広告協賛企業情報の読み込みに失敗しました。</div>';
        }
        const goodsContainer = document.getElementById('goods-sponsors-list');
        if (goodsContainer) {
            goodsContainer.innerHTML = '<div class="error">物品協賛企業情報の読み込みに失敗しました。</div>';
        }
    }
}

function displaySponsors(sponsors) {
    const container = document.getElementById('sponsors-grid');
    if (!container) return;

    if (!sponsors || sponsors.length === 0) {
        container.innerHTML = '<div class="no-sponsors">現在、協賛企業情報はありません。</div>';
        return;
    }

    container.innerHTML = sponsors.map(sponsor => `
        <div class="sponsor-card">
            <img src="${sponsor.image}" alt="${sponsor.name}" class="sponsor-image" loading="lazy">
            <h3 class="sponsor-name">${sponsor.name}</h3>
        </div>
    `).join('');
}

function displayAdvertisingSponsors(sponsors) {
    const container = document.getElementById('advertising-sponsors-list');
    if (!container) return;

    if (!sponsors || sponsors.length === 0) {
        container.innerHTML = '<div class="no-sponsors">現在、広告協賛企業情報はありません。</div>';
        return;
    }

    container.innerHTML = `
        <ul class="sponsor-list">
            ${sponsors.map(sponsor => `<li class="sponsor-list-item">${sponsor}</li>`).join('')}
        </ul>
    `;
}

function displayGoodsSponsors(sponsors) {
    const container = document.getElementById('goods-sponsors-list');
    if (!container) return;

    if (!sponsors || sponsors.length === 0) {
        container.innerHTML = '<div class="no-sponsors">現在、物品協賛企業情報はありません。</div>';
        return;
    }

    container.innerHTML = `
        <ul class="sponsor-list">
            ${sponsors.map(sponsor => `<li class="sponsor-list-item">${sponsor}</li>`).join('')}
        </ul>
    `;
}

// ホームページ用の協賛企業表示関数
function displaySponsorsOnHome(sponsors) {
    const container = document.getElementById('sponsors-home-grid');
    if (!container) return;

    if (!sponsors || sponsors.length === 0) {
        container.innerHTML = '<div class="no-sponsors">協賛企業情報を読み込み中...</div>';
        return;
    }

    container.innerHTML = sponsors.map(sponsor => `
        <img src="${sponsor.image}" alt="${sponsor.name}" class="sponsor-logo" loading="lazy">
    `).join('');
}

// ホームページ用の協賛企業読み込み
async function loadSponsorsForHome() {
    // 9月1日10時の公開日時を設定
    //const releaseDate = new Date('2025-09-01T10:00:00+09:00');

    // debug
    const releaseDate = new Date('2025-08-01T10:00:00+09:00');
    const currentDate = new Date();
    
    if (currentDate < releaseDate) {
        const container = document.getElementById('sponsors-home-grid');
        if (container) {
            container.innerHTML = '<div class="preparation-message">協賛企業情報は9月1日10時に公開予定です</div>';
        }
        return;
    }
    
    try {
        const response = await fetch('data/sponsors.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displaySponsorsOnHome(data.sponsors);
    } catch (error) {
        console.error('協賛企業データの読み込みに失敗しました:', error);
        const container = document.getElementById('sponsors-home-grid');
        if (container) {
            container.innerHTML = '<div class="error">協賛企業情報の読み込みに失敗しました。</div>';
        }
    }
}
