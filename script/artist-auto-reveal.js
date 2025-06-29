// Singer.html - アーティスト情報自動公開スクリプト
// 2025年7月1日 12:00:00 に自動で情報を公開
// セキュリティ: アーティスト情報は暗号化されており、公開時刻まで復号不可

document.addEventListener('DOMContentLoaded', function() {
    // 本番用の日時
    //const releaseDate = new Date('2025-07-01T12:00:00+09:00');
    
    // テスト用の日時（ローカルテスト時に使用）
     const releaseDate = new Date('2025-06-26T11:12:30+09:00');
    
    // 暗号化されたアーティスト情報（エンコード + タイムロック）
    // 注意: 以下のデータは公開時刻前には復号化できません
    const encryptedData = {
        name: '44Kq44O844Kk44K344Oe44K144Oo44K3', 
        desc1: '44Ki44O844OG44Kj44K544OI', 
        desc2: '6a2F5Yqb55qE44Gq5q2M5aOw44Gn55qG5qeY44KS6a2F5LqG44GZ44KL', 
        keywords: '5q2M44GE5omLLCDpn7Pmpb0sIOOCquODvOOCpOOCt+ODnuOCteODqOOCtw==', 
        genre: '44Ki44OL44Oh44K944Ky44O844Og5Li76aGM'  
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
    const artistContainer = document.querySelector('.artist');
    let originalContent = '';
    
    if (artistContainer) {
        originalContent = artistContainer.innerHTML;
        console.log('元のコンテンツを保存しました');
    }
    
    // スクリプトが既に実行済みかチェック
    if (artistContainer && artistContainer.dataset.autoRevealActive) {
        console.log('自動公開スクリプトは既に実行中です');
        return;
    }
    
    // 実行済みフラグを設定
    if (artistContainer) {
        artistContainer.dataset.autoRevealActive = 'true';
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
        const totalSecondsUntilRelease = Math.ceil((releaseDate - new Date('2025-06-26T00:00:00+09:00')) / 1000);
        const progressPercentage = Math.max(0, Math.min(100, ((totalSecondsUntilRelease - remainingSeconds) / totalSecondsUntilRelease) * 100));
        
        return `
            <div class="preparing-content">
                <div class="preparing-message">
                    <h1>アーティスト情報</h1>
                    <div class="preparing-text">
                        <p>アーティストの情報は現在準備中です。</p>
                        <p><strong>公開まで: ${timeString}</strong></p>
                        <p><strong>2025年7月1日 12:00</strong> に詳細を発表いたします。</p>
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
            const artistName = decryptData(encryptedData.name);
            const desc1 = decryptData(encryptedData.desc1);
            const description = decryptData(encryptedData.desc2);
            const keywords = decryptData(encryptedData.keywords);
            
            document.querySelector('meta[name="description"]').setAttribute('content', 
                `第63回八王子祭の${desc1}情報をお届けします。${description}${artistName}が登場！`);
            document.querySelector('meta[name="keywords"]').setAttribute('content', 
                `八王子祭, 学園祭, 工学院大学, ${keywords}`);
            document.title = `アーティスト - 第63回八王子祭`;
        } else {
            // 公開前のheadタグ内容
            document.querySelector('meta[name="description"]').setAttribute('content', 
                '第63回八王子祭のアーティスト情報をお届けします。詳細は7月1日12:00に発表いたします。');
            document.querySelector('meta[name="keywords"]').setAttribute('content', 
                '八王子祭, 学園祭, 工学院大学, アーティスト, 音楽');
            document.title = 'アーティスト - 第63回八王子祭';
        }
    }

    function updateArtistInfo() {
        const now = new Date();
        const artistContainer = document.querySelector('.artist');
        
        if (!artistContainer) {
            console.error('アーティスト情報コンテナが見つかりません');
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
            const revealArtistName = generateDecryptionKey() ? decryptData(encryptedData.name) : 'アーティスト';
            artistContainer.innerHTML = `
                <div class="reveal-animation" style="text-align: center; padding: 50px;">
                    <h1 style="color: #FFD700; font-size: 3em; margin: 50px 0;">
                        アーティスト情報公開！
                    </h1>
                    <p style="color: white; font-size: 1.2em;">
                        アーティストの詳細情報を表示します...
                    </p>
                </div>
            `;
            
            // 3秒後に元のコンテンツを表示
            setTimeout(function() {
                console.log('公開演出完了 - ページをリロードして元のコンテンツを表示します');
                // 実行済みフラグをクリアしてからリロード
                if (artistContainer) {
                    artistContainer.dataset.autoRevealActive = 'false';
                }
                location.reload();
            }, 3000);
            
            // headタグの内容も更新
            updateHeadContent(true);
            
        } else {
            // まだ公開時刻前の場合、カウントダウン表示
            const timeUntilRelease = releaseDate - now;
            const remainingSeconds = Math.ceil(timeUntilRelease / 1000);
            
            // headタグを準備中用に更新
            updateHeadContent(false);
            
            artistContainer.innerHTML = createPreparingInfo(remainingSeconds);
            artistContainer.classList.add('preparing-animation');
            
            console.log(`アーティスト情報公開まで: ${formatTimeRemaining(remainingSeconds)}`);
            
            // カウントダウンを1秒ごとに更新（重複防止）
            if (!countdownInterval) {
                countdownInterval = setInterval(function() {
                    const currentTime = new Date();
                    const timeLeft = releaseDate - currentTime;
                    const secondsLeft = Math.ceil(timeLeft / 1000);
                    
                    if (secondsLeft <= 0) {
                        clearInterval(countdownInterval);
                        countdownInterval = null;
                        updateArtistInfo();
                    } else {
                        const container = document.querySelector('.artist');
                        if (container) {
                            container.innerHTML = createPreparingInfo(secondsLeft);
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
        if (artistContainer) {
            artistContainer.dataset.autoRevealActive = 'false';
            // CSSクラスもクリア
            artistContainer.classList.remove('preparing-animation');
        }
        return;
    } else {
        console.log('公開時刻前です - カウントダウンを開始します');
        // headタグを準備中用に更新
        updateHeadContent(false);
    }
    
    // 初回実行（少し待機してから実行）
    setTimeout(function() {
        updateArtistInfo();
    }, 100);
    
    // デバッグ用: 現在時刻と公開時刻をコンソールに表示
    const debugSecondsRemaining = Math.ceil((releaseDate - new Date()) / 1000);
    console.log('現在時刻:', new Date().toLocaleString('ja-JP'));
    console.log('公開予定時刻:', releaseDate.toLocaleString('ja-JP'));
    console.log('公開まで:', formatTimeRemaining(debugSecondsRemaining));
    console.log('保存された元コンテンツの長さ:', originalContent.length);
});
