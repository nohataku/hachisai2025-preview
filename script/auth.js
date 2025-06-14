// 認証状態をチェックする
function checkAuth() {
    // ログインページでは認証チェックをスキップ
    if (window.location.pathname.endsWith('login.html')) {
        return;
    }

    // セッションストレージから認証状態を確認
    const isAuthenticated = sessionStorage.getItem('authenticated') === 'true';

    // 認証されていない場合、ログインページにリダイレクト
    if (!isAuthenticated) {
        window.location.href = 'login.html';
    } else {
        // 認証済みの場合、bodyを表示
        document.body.classList.remove('auth-hidden');
    }
}

// ページ読み込み時に認証チェックを実行
document.addEventListener('DOMContentLoaded', checkAuth);
