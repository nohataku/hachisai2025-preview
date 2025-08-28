// 協賛企業管理スクリプト
document.addEventListener('DOMContentLoaded', function() {
    loadSponsors();
});

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
