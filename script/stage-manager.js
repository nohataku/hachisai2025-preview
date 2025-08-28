// ステージ企画管理スクリプト
document.addEventListener('DOMContentLoaded', function() {
    loadStages();
});

async function loadStages() {
    try {
        const response = await fetch('data/stages.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayStages(data.stages);
    } catch (error) {
        console.error('ステージ企画データの読み込みに失敗しました:', error);
        const container = document.querySelector('.stage-content');
        if (container) {
            container.innerHTML = '<div class="error">ステージ企画情報の読み込みに失敗しました。</div>';
        }
    }
}

function displayStages(stages) {
    const container = document.querySelector('.stage-content');
    if (!container) return;

    if (!stages || stages.length === 0) {
        container.innerHTML = '<div class="no-data">現在、ステージ企画情報はありません。</div>';
        return;
    }

    const stagesHTML = stages.map(stage => `
        <section class="stage-section">
            <div class="stage-photo-wrap">
                <img src="${stage.image}" alt="${stage.name}" class="stage-photo">
            </div>
            <div class="stage-info">
                <h2 class="stage-title">${stage.name}</h2>
                ${stage.organization && stage.organization !== 'null' ? `<p class="stage-type">【${stage.organization}】</p>` : ''}
                <div class="stage-description">
                    ${stage.description.map(desc => `<p>${desc}</p>`).join('')}
                </div>
            </div>
        </section>
    `).join('');

    container.innerHTML = stagesHTML;
}
