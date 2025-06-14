document.addEventListener('DOMContentLoaded', function() {
    const rocket = document.getElementById('rocket-button');
    
    if (!rocket) {
        console.log('ロケットボタンが見つかりません');
        return;
    }

    console.log('ロケットボタンが見つかりました');

    // スクロール位置に応じてロケットの表示/非表示を制御
    function checkScroll() {
        if (window.scrollY > 300) {
            rocket.classList.add('show');
        } else {
            rocket.classList.remove('show');
        }
    }

    // 初回チェック
    checkScroll();

    window.addEventListener('scroll', checkScroll);

    // ロケットボタンのクリックイベント
    rocket.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('ロケットボタンがクリックされました');
        
        // ロケットを飛ばすアニメーション用のクラスを追加
        rocket.classList.add('flying');
        
        // ページトップへスムーズスクロール
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // アニメーション終了後にクラスを削除
        setTimeout(() => {
            rocket.classList.remove('flying');
        }, 800);
    });
});