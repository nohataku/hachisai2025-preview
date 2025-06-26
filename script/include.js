// 共通パーツ読み込み
function includeHTML(id, file, basePath = '') {
    return fetch(file)
        .then(res => res.text())
        .then(data => {
            // サブディレクトリにいる場合は、HTMLの中の相対パスも修正する
            if (basePath) {
                console.log('Fixing paths with basePath:', basePath);
                
                // 画像パスの修正（src属性）
                data = data.replace(/src="([^"]*\.(png|jpg|jpeg|gif|svg|webp))"/gi, (match, fullPath, ext) => {
                    if (fullPath.startsWith('../') || fullPath.startsWith('http://') || fullPath.startsWith('https://') || fullPath.startsWith('/')) {
                        return match; // 既に絶対パスまたは修正済みの場合はそのまま
                    }
                    return `src="${basePath}${fullPath}"`;
                });
                
                // 背景画像パス修正（CSSのurl()）
                data = data.replace(/url\(['"]?([^'"]*\.(png|jpg|jpeg|gif|svg|webp))['"]?\)/gi, (match, fullPath, ext) => {
                    if (fullPath.startsWith('../') || fullPath.startsWith('http://') || fullPath.startsWith('https://') || fullPath.startsWith('/')) {
                        return match;
                    }
                    return `url('${basePath}${fullPath}')`;
                });
                
                // CSSファイルパスの修正
                data = data.replace(/href="([^"]*\.css)"/g, (match, filename) => {
                    if (filename.startsWith('../') || filename.startsWith('http://') || filename.startsWith('https://') || filename.startsWith('/')) {
                        return match;
                    }
                    return `href="${basePath}${filename}"`;
                });
                
                // JSファイルパスの修正
                data = data.replace(/src="([^"]*\.js)"/g, (match, filename) => {
                    if (filename.startsWith('../') || filename.startsWith('http://') || filename.startsWith('https://') || filename.startsWith('/')) {
                        return match;
                    }
                    return `src="${basePath}${filename}"`;
                });
                
                // HTMLリンクパスの修正（.htmlファイルへのリンク）
                data = data.replace(/href="([^"]*\.html)"/g, (match, filename) => {
                    // 既に../で始まっている場合や、http://で始まる外部リンク、#で始まるアンカーは除外
                    if (filename.startsWith('../') || filename.startsWith('http://') || filename.startsWith('https://') || filename.startsWith('#') || filename.startsWith('/')) {
                        return match;
                    }
                    return `href="${basePath}${filename}"`;
                });
                
                console.log('Path fixing completed');
            }
            
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
    
    // ローディング中は初期化を遅らせる（ただし、スプラッシュ画面がない場合は5秒でタイムアウト）
    if (document.body.classList.contains('loading')) {
        const splashScreen = document.querySelector('.splash-screen');
        if (splashScreen) {
            console.log('ローディング中のため、ロケットボタンの初期化を遅らせます');
            setTimeout(() => {
                initRocketButton();
            }, 1000);
            return;
        } else {
            // スプラッシュ画面がない場合はローディングクラスを強制削除
            console.log('スプラッシュ画面が存在しないため、loadingクラスを削除します');
            document.body.classList.remove('loading');
        }
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
    
    // 現在のページのパスを確認して、適切な相対パスを設定
    const currentPath = window.location.pathname;
    const isInSubdirectory = currentPath.includes('/Notice/') || currentPath.includes('\\Notice\\');
    const basePath = isInSubdirectory ? '../' : '';
    
    console.log('Current path:', currentPath);
    console.log('Is in subdirectory:', isInSubdirectory);
    console.log('Base path:', basePath);
    
    // すべてのHTMLファイルを並行して読み込み
    Promise.all([
        includeHTML("header-include", basePath + "header.html", basePath),
        includeHTML("footer-include", basePath + "footer.html", basePath),
        includeHTML("rocket-include", basePath + "rocket-button.html", basePath)
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
            
            // ドロップダウンメニューの初期化
            if (typeof initDropdownMenu === 'function') {
                console.log('include.js: ドロップダウンメニューの初期化を実行');
                initDropdownMenu();
            }
            
        }, 200);
    }).catch(error => {
        console.error('include.js: HTML読み込みエラー:', error);
    });
});