// 教室展示管理スクリプト
document.addEventListener('DOMContentLoaded', function() {
    loadExhibits();
});

async function loadExhibits() {
    try {
        const response = await fetch('data/exhibits.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayExhibits(data.exhibits);
    } catch (error) {
        console.error('教室展示データの読み込みに失敗しました:', error);
        const container = document.querySelector('.exhibit-content');
        if (container) {
            container.innerHTML = '<div class="error">教室展示情報の読み込みに失敗しました。</div>';
        }
    }
}

function displayExhibits(exhibits) {
    const container = document.querySelector('.exhibit-content');
    if (!container) return;

    if (!exhibits || exhibits.length === 0) {
        container.innerHTML = '<div class="no-data">現在、教室展示情報はありません。</div>';
        return;
    }

    const exhibitsHTML = exhibits.map(exhibit => `
        <section class="exhibit-section">
            <div class="exhibit-photo-wrap">
                <img src="${exhibit.image}" alt="${exhibit.name}" class="exhibit-photo">
            </div>
            <div class="exhibit-info">
                <h2 class="exhibit-title">${exhibit.name}</h2>
                <p class="room-location">開催教室：${exhibit.room}</p>
                <div class="exhibit-description">
                    ${exhibit.description.map(desc => `<p>${desc}</p>`).join('')}
                </div>
            </div>
        </section>
    `).join('');

    container.innerHTML = exhibitsHTML;
}
