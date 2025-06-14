// ハンバーガーメニューの制御
console.log('ハンバーガーメニューのスクリプトを読み込みました');

function initHamburgerMenu() {
    console.log('ハンバーガーメニューの初期化を開始します');

    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('mainNav');
    const overlay = document.querySelector('.nav-overlay');
    
    if (!hamburger || !nav || !overlay) {
        console.error('ハンバーガーメニューの要素が見つかりません:', {
            hamburgerExists: !!hamburger,
            navExists: !!nav,
            overlayExists: !!overlay
        });
        return;
    }

    console.log('要素が見つかりました');

    function closeMenu() {
        hamburger.classList.remove('active');
        nav.classList.remove('open');
        overlay.classList.remove('open');
        console.log('メニューを閉じました');
    }

    // ハンバーガーメニューのクリックイベント
    hamburger.addEventListener('click', function(e) {
        console.log('ハンバーガーがクリックされました');
        e.preventDefault();
        e.stopPropagation();
        
        const isOpen = nav.classList.contains('open');
        if (isOpen) {
            closeMenu();
        } else {
            hamburger.classList.add('active');
            nav.classList.add('open');
            overlay.classList.add('open');
        }
        console.log('メニューの状態:', !isOpen);
    });

    // メニュー内のクリックイベントの伝播を停止
    nav.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // オーバーレイクリックでメニューを閉じる
    overlay.addEventListener('click', closeMenu);

    // 画面のどこかをクリックしたらメニューを閉じる
    document.addEventListener('click', function(e) {
        if (nav.classList.contains('open') && !nav.contains(e.target) && !hamburger.contains(e.target)) {
            closeMenu();
        }
    });

    // スクロール時にメニューを閉じる
    window.addEventListener('scroll', function() {
        if (nav.classList.contains('open')) {
            closeMenu();
        }
    });
}

// ページ読み込み完了後に初期化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOMContentLoaded イベント発火');
        setTimeout(initHamburgerMenu, 100);
    });
} else {
    console.log('ページは既に読み込み済み');
    setTimeout(initHamburgerMenu, 100);
}