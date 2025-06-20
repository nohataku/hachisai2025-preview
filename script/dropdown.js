// ドロップダウンメニューの制御
console.log('ドロップダウンメニューのスクリプトを読み込みました');

function initDropdownMenu() {
    console.log('ドロップダウンメニューの初期化を開始します');

    // モバイルでドロップダウンメニューを強制的に非表示にする
    function hideDropdownsOnMobile() {
        if (window.innerWidth <= 768) {
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

    // モバイルでのドロップダウン制御
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            // モバイル表示の場合、企画情報とご案内は直接リンクとして動作
            if (window.innerWidth <= 768) {
                const toggleText = this.textContent.trim();
                
                // 企画情報とご案内の場合は直接リンクとして動作
                if (toggleText === '企画情報') {
                    e.preventDefault();
                    window.location.href = 'Projects.html';
                    return;
                } else if (toggleText === 'ご案内') {
                    e.preventDefault();
                    window.location.href = 'Guide.html';
                    return;
                }
                
                // その他のドロップダウンも無効化（モバイルでは全てのドロップダウンを無効化）
                e.preventDefault();
                return;
            } else {
                // PC表示の場合は従来通りpreventDefaultでドロップダウン動作
                e.preventDefault();
            }
        });
    });
      // ウィンドウリサイズ時にドロップダウンを閉じる
    window.addEventListener('resize', function() {
        hideDropdownsOnMobile();
        
        if (window.innerWidth > 768) {
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
