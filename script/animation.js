document.addEventListener('DOMContentLoaded', function() {
    const splash = document.querySelector('.splash-screen');
    const splashContent = document.querySelector('.splash-content');
    const meteorContainer = document.querySelector('.meteor-container');
    
    // 0.5秒後にロゴを左に移動し、タイトルを表示
    setTimeout(() => {
        splashContent.classList.add('animate-splash');
    }, 500);
    
    // 1.5秒後に流星エフェクトを開始
    setTimeout(() => {
        meteorContainer.style.opacity = '1';
    }, 1500);
    
    // 2.5秒後にスプラッシュ画面をフェードアウト
    setTimeout(() => {
        splash.classList.add('hide-splash');
    }, 2500);
});