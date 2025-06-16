// 共通パーツ読み込み
function includeHTML(id, file) {
    return fetch(file)
        .then(res => res.text())
        .then(data => {
            const element = document.getElementById(id);
            if (element) {
                element.innerHTML = data;
            }
        })
        .catch(error => {
            console.error('Error loading ' + file + ':', error);
        });
}

// ロケットボタンの初期化
function initRocketButton() {
    console.log('ロケットボタンの初期化を開始します');
    
    // ローディング中は初期化を遅らせる
    if (document.body.classList.contains('loading')) {
        console.log('ローディング中のため、ロケットボタンの初期化を遅らせます');
        setTimeout(() => {
            initRocketButton();
        }, 1000);
        return;
    }
    
    const rocket = document.getElementById('rocket-button');
      if (!rocket) {
        console.log('ロケットボタンが見つかりません、再試行します');
        setTimeout(() => {
            initRocketButton();
        }, 500);
        return;
    }

    console.log('ロケットボタンが見つかりました');

    // スクロール位置に応じてロケットの表示/非表示を制御
    function checkScroll() {
        if (window.scrollY > 100) { // スクロール100px超で表示
            rocket.classList.add('show');
        } else {
            rocket.classList.remove('show');
        }
    }

    // 初回チェック
    checkScroll();

    // 既存のイベントリスナーを削除（重複を防ぐ）
    window.removeEventListener('scroll', window.rocketScrollHandler);
    
    // 新しいイベントリスナーを追加
    window.rocketScrollHandler = checkScroll;
    window.addEventListener('scroll', window.rocketScrollHandler);

    // ロケットボタンのクリックイベント（重複を防ぐため一度削除）
    const newRocket = rocket.cloneNode(true);
    rocket.parentNode.replaceChild(newRocket, rocket);
      document.getElementById('rocket-button').addEventListener('click', function(e) {
        e.preventDefault();
        console.log('ロケットボタンがクリックされました');
          // ロケットを飛ばすアニメーション用のクラスを追加
        this.classList.add('flying');
        
        // ページトップへスムーズスクロール
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // アニメーション終了を確実に検知
        const handleAnimationEnd = () => {
            this.classList.remove('flying');
            // 一時的に非表示にする
            this.style.opacity = '0';
            this.style.visibility = 'hidden';
            
            // 少し待ってから再表示の判定を行う
            setTimeout(() => {
                this.style.opacity = '';
                this.style.visibility = '';
                // スクロール位置をチェックして表示状態を更新
                if (window.scrollY > 100) {
                    this.classList.add('show');
                } else {
                    this.classList.remove('show');
                }
            }, 300);
            
            // イベントリスナーを削除
            this.removeEventListener('animationend', handleAnimationEnd);
            this.removeEventListener('webkitAnimationEnd', handleAnimationEnd);
        };

        // 複数のアニメーション終了イベントを監視
        this.addEventListener('animationend', handleAnimationEnd);
        this.addEventListener('webkitAnimationEnd', handleAnimationEnd);
        
        // フォールバック：一定時間後に強制実行
        setTimeout(() => {
            if (this.classList.contains('flying')) {
                handleAnimationEnd();
            }
        }, 1000);
    });
    
    console.log('ロケットボタンの初期化が完了しました');
}

window.addEventListener('DOMContentLoaded', function() {
    console.log('include.js: DOMContentLoaded');
    
    // すべてのHTMLファイルを並行して読み込み
    Promise.all([
        includeHTML("header-include", "header.html"),
        includeHTML("footer-include", "footer.html"),
        includeHTML("rocket-include", "rocket-button.html")
    ]).then(() => {
        console.log('include.js: すべてのHTMLの読み込み完了');
        
        // 少し待ってからスクリプトを初期化
        setTimeout(() => {
            // ハンバーガーメニューの初期化
            if (typeof initHamburgerMenu === 'function') {
                console.log('include.js: ハンバーガーメニューの初期化を実行');
                initHamburgerMenu();
            } else {
                console.error('include.js: initHamburgerMenu関数が見つかりません');
            }
            
            // ロケットボタンの初期化
            initRocketButton();
            
        }, 500);
    }).catch(error => {
        console.error('include.js: HTML読み込みエラー:', error);
    });
});