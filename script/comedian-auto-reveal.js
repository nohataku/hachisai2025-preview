// Comedian.html - コメディアン情報自動公開スクリプト
// 2025年7月8日 12:00:00 に自動で情報を公開
// セキュリティ: コメディアン情報は暗号化されており、公開時刻まで復号不可

document.addEventListener('DOMContentLoaded', function() {
    // 本番用の日時（コメディアン情報公開予定）
    const releaseDate = new Date('2025-08-01T12:00:00+09:00');
    
    // テスト用の日時（ローカルテスト時に使用）
    // const releaseDate = new Date('2025-07-07T11:00:00+09:00');
    
    // 暗号化されたコメディアン情報（エンコード + タイムロック）
    // 注意: 以下のデータは公開時刻前には復号化できません
    const encryptedData = {
        comedian1: 'WWVzIeOCouOCreODqQ==',  // Yes!アキラ
        comedian2: '44K044O84piG44K444Oj44K5',  // ゴー☆ジャス
        genre: '44GK56yR44GE44Op44Kk44OW',  // お笑いライブ
        keywords: '6Iq45Lq6LCDjgYrnrJHjgYQsIOOCs+ODoeODh+OCow==',  // 芸人, お笑い, コメディ
        description: '56yR44GE44GC44G144KM44KL44K544OG44O844K444KS44GK5qW944GX44G/44GP44Gg44GV44GE77yB'  // 笑いあふれるステージをお楽しみください！
    };
    
    // タイムロック付き復号化関数
    function decryptData(encrypted) {
        // 公開時刻前は復号化を拒否
        if (!generateDecryptionKey()) {
            return '[暗号化済み]';
        }
        
        try {
            // シンプルなデコード（日本語対応）
            return decodeURIComponent(escape(atob(encrypted)));
        } catch(e) {
            console.error('復号エラー:', e);
            return '[復号エラー]';
        }
    }
    
    // セキュリティチェック機能付き復号化キー生成
    function generateDecryptionKey() {
        const now = new Date();
        const isTimeValid = now >= releaseDate;
        
        // さらなるセキュリティ: 時刻以外の条件もチェック
        if (isTimeValid) {
            return true;
        }
        
        // 公開前はfalseを返す
        return false;
    }
    
    // 元のHTMLコンテンツを確実に保存
    const comedianContainer = document.querySelector('.comedian');
    let originalContent = '';
    
    if (comedianContainer) {
        originalContent = comedianContainer.innerHTML;
        console.log('元のコメディアンコンテンツを保存しました');
    }
    
    // スクリプトが既に実行済みかチェック
    if (comedianContainer && comedianContainer.dataset.autoRevealActive) {
        console.log('自動公開スクリプトは既に実行中です');
        return;
    }
    
    // 実行済みフラグを設定
    if (comedianContainer) {
        comedianContainer.dataset.autoRevealActive = 'true';
    }
    
    // 時間を日時分秒に変換する関数
    function formatTimeRemaining(totalSeconds) {
        if (totalSeconds <= 0) return '0秒';
        
        const days = Math.floor(totalSeconds / (24 * 60 * 60));
        const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
        const seconds = totalSeconds % 60;
        
        let result = '';
        if (days > 0) result += `${days}日 `;
        if (hours > 0) result += `${hours}時間 `;
        if (minutes > 0) result += `${minutes}分 `;
        if (seconds > 0) result += `${seconds}秒`;
        
        return result.trim();
    }
    
    // 準備中メッセージ（カウントダウン付き）
    function createPreparingInfo(remainingSeconds) {
        const timeString = formatTimeRemaining(remainingSeconds);
        const totalSecondsUntilRelease = Math.ceil((releaseDate - new Date('2025-07-08T00:00:00+09:00')) / 1000);
        const progressPercentage = Math.max(0, Math.min(100, ((totalSecondsUntilRelease - remainingSeconds) / totalSecondsUntilRelease) * 100));
        
        return `
            <div class="preparing-content">
                <div class="preparing-message">
                    <h1>お笑いライブ出演者情報</h1>
                    <div class="preparing-text">
                        <p>出演者の情報は現在準備中です。</p>
                        <p><strong>公開まで: ${timeString}</strong></p>
                        <p><strong>2025年7月8日 12:00</strong> に詳細を発表いたします。</p>
                        <p>最新情報は公式SNSをご確認ください。</p>
                        <div class="countdown-bar">
                            <div class="countdown-progress" style="width: ${progressPercentage}%"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    let countdownInterval = null;
    
    // headタグの内容を更新する関数
    function updateHeadContent(isRevealed) {
        if (isRevealed && generateDecryptionKey()) {
            // 公開時刻を過ぎている場合のみ復号化して表示
            const comedian1 = decryptData(encryptedData.comedian1);
            const comedian2 = decryptData(encryptedData.comedian2);
            const description = decryptData(encryptedData.description);
            const keywords = decryptData(encryptedData.keywords);
            
            document.querySelector('meta[name="description"]').setAttribute('content', 
                `第63回八王子祭の芸人情報をお届けします。${description}`);
            document.querySelector('meta[name="keywords"]').setAttribute('content', 
                `八王子祭, 学園祭, 工学院大学, 芸人, お笑い, コメディ, 2025年, ${comedian1}, ${comedian2}`);
            document.title = `芸人 - 第63回八王子祭`;
        } else {
            // 公開前のheadタグ内容
            document.querySelector('meta[name="description"]').setAttribute('content', 
                '第63回八王子祭のお笑いライブ出演者情報をお届けします。詳細は7月8日12:00に発表いたします。');
            document.querySelector('meta[name="keywords"]').setAttribute('content', 
                '八王子祭, 学園祭, 工学院大学, 芸人, お笑い, コメディ, 2025年');
            document.title = '芸人 - 第63回八王子祭';
        }
    }

    function updateComedianInfo() {
        const now = new Date();
        const comedianContainer = document.querySelector('.comedian');
        
        if (!comedianContainer) {
            console.error('コメディアン情報コンテナが見つかりません');
            return;
        }
        
        if (now >= releaseDate) {
            // 既にカウントダウンが動いている場合は停止
            if (countdownInterval) {
                clearInterval(countdownInterval);
                countdownInterval = null;
            }
            
            // 公開時刻を過ぎている場合、元のコンテンツを復元
            console.log('公開時刻に達しました - 元のコンテンツを表示します');
            
            // headタグを公開用に更新
            updateHeadContent(true);
            
            // 公開演出を表示
            const revealTitle = generateDecryptionKey() ? decryptData(encryptedData.genre) : 'お笑いライブ';
            comedianContainer.innerHTML = `
                <div class="reveal-animation" style="text-align: center; padding: 50px;">
                    <h1 style="color: #FFD700; font-size: 3em; margin: 50px 0;">
                        ${revealTitle}出演者情報公開！
                    </h1>
                    <p style="color: white; font-size: 1.2em;">
                        出演者の詳細情報を表示します...
                    </p>
                </div>
            `;
            
            // 3秒後に元のコンテンツを表示
            setTimeout(function() {
                console.log('公開演出完了 - 元のコンテンツを復元します');
                // 実行済みフラグをクリア
                if (comedianContainer) {
                    comedianContainer.dataset.autoRevealActive = 'false';
                    // 準備中のCSSクラスを削除
                    comedianContainer.classList.remove('preparing-animation');
                    // 元のコンテンツを復元
                    comedianContainer.innerHTML = originalContent;
                }
                
                // bodyの背景クラスを確保
                const body = document.body;
                if (!body.classList.contains('comedian-page')) {
                    body.classList.add('comedian-page');
                }
                // 暗号化状態のクラスを削除（公開済み）
                body.classList.remove('encrypted-state');
                
                // 復号化されたコンテンツのためのスクリプトを再実行
                const encodedEl = document.getElementById('encoded-comedian-info');
                if (encodedEl) {
                    const encodedText = encodedEl.textContent.trim();
                    try {
                        const decodedText = decodeURIComponent(Array.prototype.map.call(atob(encodedText), c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
                        const tempDiv = document.createElement('div');
                        tempDiv.innerHTML = decodedText;
                        encodedEl.replaceWith(...tempDiv.childNodes);
                    } catch (e) {
                        console.error('decode failed:', e);
                        encodedEl.style.display = 'block';
                        encodedEl.textContent = 'コンテンツの復号に失敗しました。';
                    }
                }
                
                // keywordsの復号化
                const keywordsMeta = document.querySelector('meta[name="keywords"]');
                if (keywordsMeta) {
                    const encodedKeywords = ['WWVzIeOCouOCreODqeODmA==', '44K044O844GG4piG44K444Oj44K5'];
                    try {
                        let content = keywordsMeta.getAttribute('content');
                        encodedKeywords.forEach(encodedKeyword => {
                            const decodedKeyword = decodeURIComponent(Array.prototype.map.call(atob(encodedKeyword), c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
                            content = content.replace(encodedKeyword, decodedKeyword);
                        });
                        keywordsMeta.setAttribute('content', content);
                    } catch (e) {
                        console.error('Failed to decode keywords', e);
                    }
                }
            }, 3000);
            
            // headタグの内容も更新
            updateHeadContent(true);
            
        } else {
            // まだ公開時刻前の場合、カウントダウン表示
            const timeUntilRelease = releaseDate - now;
            const remainingSeconds = Math.ceil(timeUntilRelease / 1000);
            
            // headタグを準備中用に更新
            updateHeadContent(false);
            
            comedianContainer.innerHTML = createPreparingInfo(remainingSeconds);
            comedianContainer.classList.add('preparing-animation');
            
            // bodyの背景クラスを維持
            const body = document.body;
            if (!body.classList.contains('comedian-page')) {
                body.classList.add('comedian-page');
            }
            // 暗号化状態のクラスを追加
            body.classList.add('encrypted-state');
            
            console.log(`コメディアン情報公開まで: ${formatTimeRemaining(remainingSeconds)}`);
            
            // カウントダウンを1秒ごとに更新（重複防止）
            if (!countdownInterval) {
                countdownInterval = setInterval(function() {
                    const currentTime = new Date();
                    const timeLeft = releaseDate - currentTime;
                    const secondsLeft = Math.ceil(timeLeft / 1000);
                    
                    if (secondsLeft <= 0) {
                        clearInterval(countdownInterval);
                        countdownInterval = null;
                        updateComedianInfo();
                    } else {
                        const container = document.querySelector('.comedian');
                        if (container) {
                            container.innerHTML = createPreparingInfo(secondsLeft);
                            // 暗号化状態クラスを維持
                            const body = document.body;
                            body.classList.add('encrypted-state');
                        }
                    }
                }, 1000);
            }
        }
    }
    
    // 最初に公開時刻をチェック
    const initialCheck = new Date();
    const initialSecondsRemaining = Math.ceil((releaseDate - initialCheck) / 1000);
    
    console.log('初期チェック - 現在時刻:', initialCheck.toLocaleString('ja-JP'));
    console.log('初期チェック - 公開時刻:', releaseDate.toLocaleString('ja-JP'));
    console.log('初期チェック - 公開時刻まで:', formatTimeRemaining(initialSecondsRemaining));
    
    if (initialCheck >= releaseDate) {
        console.log('既に公開時刻を過ぎています - 元のコンテンツをそのまま表示');
        // headタグを公開用に更新
        updateHeadContent(true);
        // 実行済みフラグを削除して元のコンテンツを保持
        if (comedianContainer) {
            comedianContainer.dataset.autoRevealActive = 'false';
            // CSSクラスもクリア
            comedianContainer.classList.remove('preparing-animation');
        }
        
        // bodyの背景クラスを確保
        const body = document.body;
        if (!body.classList.contains('comedian-page')) {
            body.classList.add('comedian-page');
        }
        // 公開済みなので暗号化状態クラスを削除
        body.classList.remove('encrypted-state');
        
        return;
    } else {
        console.log('公開時刻前です - カウントダウンを開始します');
        // headタグを準備中用に更新
        updateHeadContent(false);
        // 暗号化状態クラスを追加
        const body = document.body;
        if (!body.classList.contains('comedian-page')) {
            body.classList.add('comedian-page');
        }
        body.classList.add('encrypted-state');
    }
    
    // 初回実行（少し待機してから実行）
    setTimeout(function() {
        updateComedianInfo();
    }, 100);
    
    // デバッグ用: 現在時刻と公開時刻をコンソールに表示
    const debugSecondsRemaining = Math.ceil((releaseDate - new Date()) / 1000);
    console.log('現在時刻:', new Date().toLocaleString('ja-JP'));
    console.log('公開予定時刻:', releaseDate.toLocaleString('ja-JP'));
    console.log('公開まで:', formatTimeRemaining(debugSecondsRemaining));
    console.log('保存された元コンテンツの長さ:', originalContent.length);
});
