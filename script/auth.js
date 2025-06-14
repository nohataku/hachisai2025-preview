// 認証状態をチェックする
function checkAuth() {
    // 現在のパスを取得
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    
    // デバッグ用ログ
    console.log('Current path:', currentPath);
    console.log('Current page:', currentPage);
    
    // ログインページでは認証チェックをスキップ
    if (currentPage === 'login.html' || currentPath.endsWith('login.html')) {
        console.log('Login page detected, skipping auth check');
        return;
    }

    // セッションストレージから認証状態を確認
    const isAuthenticated = sessionStorage.getItem('authenticated') === 'true';
    console.log('Is authenticated:', isAuthenticated);

    // 認証されていない場合、ログインページにリダイレクト
    if (!isAuthenticated) {
        console.log('Not authenticated, redirecting to login');
        // GitHub Pages環境を考慮したリダイレクト
        const basePath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
        window.location.href = basePath + 'login.html';
    } else {
        // 認証済みの場合、bodyを表示
        console.log('Authenticated, showing body');
        document.body.classList.remove('auth-hidden');
    }
}

// ページ読み込み時に認証チェックを実行
document.addEventListener('DOMContentLoaded', checkAuth);
