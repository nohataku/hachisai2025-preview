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
        
        // 要素が見つからない場合、少し待ってから再試行
        setTimeout(() => {
            console.log('ハンバーガーメニューの初期化を再試行します');
            initHamburgerMenu();
        }, 500);
        return;
    }

    console.log('要素が見つかりました、イベントリスナーを設定します');

    // 既存のイベントリスナーを削除（重複を防ぐ）
    const newHamburger = hamburger.cloneNode(true);
    hamburger.parentNode.replaceChild(newHamburger, hamburger);    function closeMenu() {
        const currentHamburger = document.getElementById('hamburger');
        const currentNav = document.getElementById('mainNav');
        const currentOverlay = document.querySelector('.nav-overlay');
        
        if (currentHamburger && currentNav && currentOverlay) {
            currentHamburger.classList.remove('active');
            currentNav.classList.remove('open');
            currentOverlay.classList.remove('open');
            
            // ドロップダウンメニューも閉じる
            document.querySelectorAll('.dropdown.open').forEach(dropdown => {
                dropdown.classList.remove('open');
                const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                if (dropdownMenu) {
                    dropdownMenu.style.maxHeight = '0';
                }
            });
            
            console.log('メニューを閉じました');
        }
    }

    // ハンバーガーメニューのクリックイベント
    document.getElementById('hamburger').addEventListener('click', function(e) {
        console.log('ハンバーガーがクリックされました');
        e.preventDefault();
        e.stopPropagation();
        
        const currentNav = document.getElementById('mainNav');
        const currentOverlay = document.querySelector('.nav-overlay');
        
        if (!currentNav || !currentOverlay) return;
        
        const isOpen = currentNav.classList.contains('open');
        if (isOpen) {
            closeMenu();
        } else {
            this.classList.add('active');
            currentNav.classList.add('open');
            currentOverlay.classList.add('open');
            console.log('メニューを開きました');
        }
    });

    // メニュー内のクリックイベントの伝播を停止
    nav.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // オーバーレイクリックでメニューを閉じる
    overlay.addEventListener('click', closeMenu);

    // 画面のどこかをクリックしたらメニューを閉じる
    document.addEventListener('click', function(e) {
        const currentNav = document.getElementById('mainNav');
        const currentHamburger = document.getElementById('hamburger');
        
        if (currentNav && currentNav.classList.contains('open') && 
            !currentNav.contains(e.target) && 
            !currentHamburger.contains(e.target)) {
            closeMenu();
        }
    });

    // スクロール時にメニューを閉じる
    window.addEventListener('scroll', function() {
        const currentNav = document.getElementById('mainNav');
        if (currentNav && currentNav.classList.contains('open')) {
            closeMenu();
        }
    });    
    console.log('ハンバーガーメニューの初期化が完了しました');
}

// 動的読み込み環境では include.js から呼び出されるため、自動初期化は無効化
// initHamburgerMenu関数は include.js から呼び出されます