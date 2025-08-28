/**
 * お知らせ詳細ページの公開日時を検証するスクリプト
 */

// カスタムポップアップを作成する関数
function createCustomPopup(message, callback) {
    // 既存のポップアップがあれば削除
    const existingPopup = document.getElementById('custom-popup');
    if (existingPopup) {
        existingPopup.remove();
    }

    // ポップアップのHTML構造を作成
    const popupHTML = `
        <div id="custom-popup" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            backdrop-filter: blur(5px);
        ">
            <div style="
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 20px;
                padding: 2.5rem;
                max-width: 400px;
                width: 90%;
                text-align: center;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                border: 2px solid rgba(255, 255, 255, 0.2);
                animation: popupFadeIn 0.3s ease-out;
            ">
                <div style="
                    font-size: 3rem;
                    margin-bottom: 1rem;
                    animation: rocketBounce 1s ease-in-out infinite;
                ">🚀</div>
                <h3 style="
                    color: #FFD700;
                    font-size: 1.5rem;
                    margin-bottom: 1rem;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
                ">お知らせ</h3>
                <p style="
                    color: white;
                    font-size: 1.1rem;
                    line-height: 1.6;
                    margin-bottom: 2rem;
                ">${message}</p>
                <button id="popup-ok-btn" style="
                    background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
                    color: white;
                    border: none;
                    padding: 0.8rem 2rem;
                    border-radius: 25px;
                    font-size: 1rem;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    了解
                </button>
            </div>
        </div>
    `;

    // スタイルシートを追加（アニメーション用）
    const style = document.createElement('style');
    style.textContent = `
        @keyframes popupFadeIn {
            0% {
                opacity: 0;
                transform: scale(0.8) translateY(-20px);
            }
            100% {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }
        @keyframes rocketBounce {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-10px);
            }
        }
    `;
    document.head.appendChild(style);

    // ポップアップをページに追加
    document.body.insertAdjacentHTML('beforeend', popupHTML);

    // OKボタンのクリックイベント
    document.getElementById('popup-ok-btn').addEventListener('click', () => {
        document.getElementById('custom-popup').remove();
        if (callback) callback();
    });

    // Escapeキーでも閉じられるように
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            const popup = document.getElementById('custom-popup');
            if (popup) {
                popup.remove();
                if (callback) callback();
            }
            document.removeEventListener('keydown', escapeHandler);
        }
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // 現在のページのファイル名を取得
        const path = window.location.pathname;
        const filename = path.split('/').pop();

        // notices.jsonを読み込む
        const response = await fetch('notices.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // 対応するお知らせデータを検索
        const notice = data.notices.find(n => n.file === filename);

        if (notice) {
            const now = new Date();
            const publicDate = new Date(notice.datetime);

            // 公開日時を過ぎていない場合は、カスタムポップアップを表示してからリダイレクト
            if (publicDate > now) {
                const publicDateStr = publicDate.toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
                
                createCustomPopup(
                    `このお知らせは${publicDateStr}に公開予定です。<br>もうしばらくお待ちください。`,
                    () => {
                        window.location.href = '../Notice.html';
                    }
                );
            }
        } else {
            // notices.jsonに該当するファイルが見つからない場合
            console.warn(`お知らせ「${filename}」はnotices.jsonに存在しません。`);
            createCustomPopup(
                '指定されたお知らせは見つかりませんでした。<br>お知らせ一覧ページに戻ります。',
                () => {
                    window.location.href = '../Notice.html';
                }
            );
        }

    } catch (error) {
        console.error('お知らせの検証中にエラーが発生しました:', error);
        createCustomPopup(
            'エラーが発生したため、<br>お知らせ一覧ページに戻ります。',
            () => {
                window.location.href = '../Notice.html';
            }
        );
    }
});
