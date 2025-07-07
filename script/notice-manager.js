/**
 * お知らせ自動読み込み機能
 * Notice フォルダの notices.json を読み込んで自動的にお知らせを表示します
 */

class NoticeManager {
    constructor() {
        this.notices = [];
        this.loadNotices();
    }

    /**
     * notices.json からお知らせデータを読み込み
     */
    async loadNotices() {
        try {
            const response = await fetch('Notice/notices.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.notices = data.notices.sort((a, b) => new Date(b.date) - new Date(a.date));
            
            // ページの種類に応じて適切なレンダリング関数を呼び出し
            if (document.querySelector('.notice-items-container')) {
                this.renderNotices();
            }
            if (document.querySelector('.notice-list')) {
                this.renderHomeNotices();
            }
        } catch (error) {
            console.error('お知らせの読み込みに失敗しました:', error);
            this.renderErrorMessage();
        }
    }

    /**
     * お知らせ一覧ページでお知らせを表示
     */
    renderNotices() {
        const noticeContainer = document.querySelector('.notice-items-container');
        if (!noticeContainer) return;

        if (this.notices.length === 0) {
            noticeContainer.innerHTML = `
                <div class="no-notice">
                    <p>現在、お知らせはありません。</p>
                </div>
            `;
            return;
        }

        noticeContainer.innerHTML = this.notices.map(notice => `
            <div class="notice-item" onclick="this.navigateToNotice('Notice/${notice.file}', event)" style="cursor: pointer;">
                <div class="notice-date">${notice.date}</div>
                <h3 class="notice-title">
                    ${notice.title}
                </h3>
                <p class="notice-summary">${notice.summary}</p>
            </div>
        `).join('');

        // クリックイベントハンドラーを追加
        const noticeItems = noticeContainer.querySelectorAll('.notice-item');
        noticeItems.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                this.navigateToNotice(`Notice/${this.notices[index].file}`, e);
            });
        });
    }

    /**
     * ホームページでお知らせリストを表示
     */
    renderHomeNotices() {
        const homeNoticeList = document.querySelector('.notice-list');
        if (!homeNoticeList) return;

        if (this.notices.length === 0) {
            homeNoticeList.innerHTML = `
                <li>現在、お知らせはありません。</li>
                <li>今後のお知らせは随時こちらに掲載します。</li>
            `;
            return;
        }

        // 最新3件のお知らせを表示
        const recentNotices = this.notices.slice(0, 3);
        const noticeItems = recentNotices.map(notice => `
            <li>
                <span class="notice-date">${notice.date}</span>
                <a href="Notice/${notice.file}">${notice.title}</a>
            </li>
        `);

        // 「今後のお知らせは...」のメッセージも追加
        noticeItems.push('<li>今後のお知らせは随時こちらに掲載します。</li>');

        homeNoticeList.innerHTML = noticeItems.join('');
    }

    /**
     * エラーメッセージを表示
     */
    renderErrorMessage() {
        const noticeContainer = document.querySelector('.notice-items-container');
        const homeNoticeList = document.querySelector('.notice-list');
        
        const errorMessage = `
            <div class="error-message">
                <p>お知らせの読み込み中にエラーが発生しました。</p>
                <p>しばらく時間をおいてから再度お試しください。</p>
            </div>
        `;

        if (noticeContainer) {
            noticeContainer.innerHTML = errorMessage;
        }

        if (homeNoticeList) {
            homeNoticeList.innerHTML = `
                <li>お知らせの読み込み中にエラーが発生しました。</li>
                <li>しばらく時間をおいてから再度お試しください。</li>
            `;
        }
    }

    /**
     * 新しいお知らせを追加（管理用）
     */
    async addNotice(noticeData) {
        try {
            // 新しいお知らせをリストに追加
            this.notices.unshift(noticeData);
            
            // JSON データを更新（実際の運用では、サーバーサイドで処理）
            const updatedData = {
                notices: this.notices
            };
            
            console.log('新しいお知らせが追加されました:', noticeData);
            console.log('更新されたデータ:', updatedData);
            
            // 表示を更新
            this.renderNotices();
            this.renderHomeNotices();
            
        } catch (error) {
            console.error('お知らせの追加に失敗しました:', error);
        }
    }

    /**
     * お知らせ詳細ページへ遷移（アニメーションなし）
     */
    navigateToNotice(url, event) {
        event.preventDefault();
        
        // アニメーションなしで直接遷移
        window.location.href = url;
    }
}

// ページ読み込み完了時に初期化
document.addEventListener('DOMContentLoaded', () => {
    const noticeManager = new NoticeManager();
    
    // グローバルに公開（管理用）
    window.noticeManager = noticeManager;
});

// 新しいお知らせ追加のヘルパー関数（管理用）
window.addNewNotice = function(id, date, title, summary, filename) {
    if (window.noticeManager) {
        const noticeData = {
            id: id,
            date: date,
            title: title,
            summary: summary,
            file: filename
        };
        window.noticeManager.addNotice(noticeData);
    }
};
