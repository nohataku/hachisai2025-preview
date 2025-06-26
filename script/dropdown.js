// ドロップダウンメニューの制御
console.log('ドロップダウンメニューのスクリプトを読み込みました');

function initDropdownMenu() {
    console.log('ドロップダウンメニューの初期化を開始します');

    // モバイル・タブレットでドロップダウンメニューを強制的に非表示にする
    function hideDropdownsOnMobile() {
        if (window.innerWidth <= 1200) {
            const dropdownMenus = document.querySelectorAll('.dropdown-menu');
            dropdownMenus.forEach(menu => {
                menu.style.display = 'none';
                menu.style.visibility = 'hidden';
                menu.style.opacity = '0';
                menu.style.maxHeight = '0';
            });
            
            // ドロップダウンクラスも削除
            document.querySelectorAll('.dropdown.open').forEach(dropdown => {
                dropdown.classList.remove('open');
            });
        }
    }

    // 初期化時に実行
    hideDropdownsOnMobile();

    // ドロップダウントグルのクリック制御
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            // モバイル・タブレット表示の場合のみドロップダウンを無効化
            if (window.innerWidth <= 1200) {
                // モバイル・タブレットでは全てのドロップダウンを無効化し、直接リンクとして動作
                // preventDefaultを呼ばずに、自然なリンク動作を許可
                return;
            }
            // PC表示の場合は自然なリンク動作を許可（ドロップダウンはCSSのhoverで制御）
            // preventDefaultを削除してリンク先に遷移できるようにする
        });
    });
      // ウィンドウリサイズ時にドロップダウンを閉じる
    window.addEventListener('resize', function() {
        hideDropdownsOnMobile();
        
        if (window.innerWidth > 1200) {
            document.querySelectorAll('.dropdown.open').forEach(dropdown => {
                dropdown.classList.remove('open');
                const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                if (dropdownMenu) {
                    dropdownMenu.style.maxHeight = '0';
                    // PC表示時は元のスタイルに戻す
                    dropdownMenu.style.display = '';
                    dropdownMenu.style.visibility = '';
                    dropdownMenu.style.opacity = '';
                }
            });
        }
    });
    
    console.log('ドロップダウンメニューの初期化が完了しました');
}

// 既存のハンバーガーメニューが閉じられた時にドロップダウンも閉じる
document.addEventListener('click', function(e) {
    const nav = document.getElementById('mainNav');
    if (nav && !nav.classList.contains('open')) {
        document.querySelectorAll('.dropdown.open').forEach(dropdown => {
            dropdown.classList.remove('open');
            const dropdownMenu = dropdown.querySelector('.dropdown-menu');
            if (dropdownMenu) {
                dropdownMenu.style.maxHeight = '0';
            }
        });
    }
});

// DOM読み込み完了時に初期化
document.addEventListener('DOMContentLoaded', function() {
    initDropdownMenu();
});
