const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

// GitHubからファイルを取得する関数
async function fetchFromGitHub(repoUrl, filePath) {
    const apiUrl = repoUrl.replace('github.com', 'api.github.com/repos').replace('.git', '') + '/contents/' + filePath;
    console.log(`Fetching: ${apiUrl}`);
    
    return new Promise((resolve, reject) => {
        https.get(apiUrl, {
            headers: {
                'User-Agent': 'Node.js'
            }
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    if (json.content) {
                        const content = Buffer.from(json.content, 'base64').toString('utf8');
                        resolve(content);
                    } else {
                        reject(new Error(`ファイルが見つかりません: ${filePath}`));
                    }
                } catch (error) {
                    reject(error);
                }
            });
        }).on('error', reject);
    });
}

// main版からpreview版への同期スクリプト
async function syncFromMain() {
    const mainRepoUrl = 'https://github.com/takamura0926/HachiojiFes2025-HP.git';
    const previewPath = '../'; // scriptフォルダから一つ上のディレクトリ
    
    console.log('main版からpreview版への同期を開始...');
    
    // 同期対象ファイルリスト
    const filesToSync = [
        // HTMLファイル
        'index.html', 'About.html', 'Projects.html', 'Guide.html',
        'Notice.html', 'Event.html', 'Stage.html', 'Food.html',
        'Exhibit.html', 'Access.html', 'Theme.html', 'Ponhachi.html',
        'Singer.html', 'Comedian.html', 'TimeSchedule.html',
        'header.html', 'footer.html', 'rocket-button.html',
        
        // CSSファイル
        'css/hachisai.css',
        'css/CSS_STYLE_GUIDE.md'
    ];
    
    let syncCount = 0;
    let errorCount = 0;
    
    // 個別ファイルの同期
    for (const filePath of filesToSync) {
        try {
            console.log(`同期中: ${filePath}`);
            const content = await fetchFromGitHub(mainRepoUrl, filePath);
            
            const destPath = path.join(previewPath, filePath);
            const destDir = path.dirname(destPath);
            
            // ディレクトリが存在しない場合は作成
            if (!fs.existsSync(destDir)) {
                fs.mkdirSync(destDir, { recursive: true });
            }
            
            fs.writeFileSync(destPath, content, 'utf8');
            syncCount++;
            console.log(`✓ ${filePath} を同期しました`);
            
        } catch (error) {
            console.error(`✗ ${filePath} の同期に失敗: ${error.message}`);
            errorCount++;
        }
    }
      // gitを使って一括でクローンしてコピーする方法
    try {
        console.log('\\nGitを使用してmain版をクローンします...');
        const tempDir = path.join(__dirname, '../../temp_main');
        
        // 既存の一時ディレクトリを削除
        if (fs.existsSync(tempDir)) {
            fs.rmSync(tempDir, { recursive: true });
        }
        
        // main版をクローン
        execSync(`git clone ${mainRepoUrl} "${tempDir}"`, { stdio: 'inherit' });
        
        // 特定のディレクトリを同期
        const dirsToSync = ['css', 'photo', 'font', 'script'];
          for (const dir of dirsToSync) {
            const srcDir = path.join(tempDir, dir);
            const destDir = path.join(previewPath, dir);
            
            if (fs.existsSync(srcDir)) {
                console.log(`ディレクトリを同期: ${dir}`);
                if (dir === 'script') {
                    // scriptフォルダの場合、auth.jsは除外してコピー
                    copyDirectory(srcDir, destDir, ['auth.js']);
                    // 既存のauth.jsが存在する場合は保持
                    const existingAuthJs = path.join(destDir, 'auth.js');
                    if (fs.existsSync(existingAuthJs)) {
                        console.log('既存のauth.jsを保持します');
                    }
                } else {
                    copyDirectory(srcDir, destDir);
                }
            }
        }
        
        // 一時ディレクトリを削除
        fs.rmSync(tempDir, { recursive: true });
        console.log('一時ディレクトリを削除しました');
        
    } catch (error) {
        console.error('Git同期でエラーが発生:', error.message);
    }
    
    // preview版に認証機能を追加
    await addAuthenticationToPreview();
    
    console.log(`\\n同期完了: ${syncCount}個のファイルを同期しました`);
    if (errorCount > 0) {
        console.log(`エラー: ${errorCount}個のファイルで問題が発生しました`);
    }
}

// ディレクトリを再帰的にコピー（除外ファイル指定可能）
function copyDirectory(src, dest, excludeFiles = []) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    
    const items = fs.readdirSync(src, { withFileTypes: true });
    
    for (const item of items) {
        // 除外ファイルをスキップ
        if (excludeFiles.includes(item.name)) {
            console.log(`スキップ: ${item.name}`);
            continue;
        }
        
        const srcPath = path.join(src, item.name);
        const destPath = path.join(dest, item.name);
        
        if (item.isDirectory()) {
            copyDirectory(srcPath, destPath, excludeFiles);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

// preview版に認証機能を追加
async function addAuthenticationToPreview() {
    console.log('\\npreview版に認証機能を追加中...');
      const htmlFiles = [
        'index.html', 'About.html', 'Projects.html', 'Guide.html',
        'Notice.html', 'Event.html', 'Stage.html', 'Food.html',
        'Exhibit.html', 'Access.html', 'Theme.html', 'Ponhachi.html',
        'Singer.html', 'Comedian.html', 'TimeSchedule.html'  // 全てのページに認証を適用
    ];
      for (const htmlFile of htmlFiles) {
        const filePath = path.join('../', htmlFile); // scriptフォルダから一つ上のディレクトリ
        if (!fs.existsSync(filePath)) continue;
        
        try {
            let content = fs.readFileSync(filePath, 'utf8');
            
            // 認証スクリプトの追加（headセクション内）
            if (!content.includes('script/auth.js')) {
                content = content.replace(
                    /(<link rel="icon"[^>]*>)/,
                    `$1
    <script src="script/auth.js"></script>`
                );
            }
              // 認証用スタイルの追加
            if (!content.includes('auth-hidden')) {
                content = content.replace(
                    /<\/head>/,
                    `    <style>
        body.auth-hidden { display: none !important; }
        /* 初期状態でbodyを非表示 */
        body { display: none; }
        body:not(.auth-hidden) { display: block; }
    </style>
</head>`
                );
            }
            
            // bodyタグにauth-hiddenクラスを追加
            if (!content.includes('class="auth-hidden"')) {
                content = content.replace(
                    /<body>/,
                    '<body class="auth-hidden">'
                );
            }
            
            fs.writeFileSync(filePath, content);
            console.log(`✓ ${htmlFile} に認証機能を追加しました`);
            
        } catch (error) {
            console.error(`✗ ${htmlFile} の認証機能追加に失敗: ${error.message}`);
        }
    }
    
    // 認証関連ファイルの作成/更新
    await createAuthFiles();
}

// 認証関連ファイルの作成
async function createAuthFiles() {
    console.log('認証関連ファイルを作成/更新中...');
      // auth.jsファイルの作成
    const authJsContent = `// 認証状態をチェックする
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
document.addEventListener('DOMContentLoaded', checkAuth);`;const authJsPath = path.join('../script', 'auth.js'); // 同じscriptフォルダ内
    if (!fs.existsSync(path.dirname(authJsPath))) {
        fs.mkdirSync(path.dirname(authJsPath), { recursive: true });
    }
    fs.writeFileSync(authJsPath, authJsContent);
    console.log('✓ auth.js を作成しました');
      // login.htmlファイルの作成
    const loginHtmlContent = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ログイン</title>
    <link rel="stylesheet" href="css/hachisai.css">
    <style>
        .login-container {
            max-width: 400px;
            margin: 100px auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .login-form {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        .login-form input {
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
        }
        .login-form button {
            padding: 10px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }
        .login-form button:hover {
            background-color: #45a049;
        }
        .error-message {
            color: red;
            display: none;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <h1>八祭2025</h1>
        <p>このページを閲覧するにはパスワードが必要です。</p>
        <div class="login-form">
            <input type="password" id="password" placeholder="パスワードを入力">
            <button onclick="checkPassword()">ログイン</button>
            <p id="error-message" class="error-message">パスワードが間違っています。</p>
        </div>
    </div>
    <script>
        // SHA-256ハッシュ化関数
        async function sha256(text)
        {
            const encoder = new TextEncoder();
            const data = encoder.encode(text);
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        }
        const correctHash = 'e1c8fadc3f4cf0a26217492c0df3ae6367798b618606d74f3036cbf29448eb01';
        
        async function checkPassword()
        {
            const password = document.getElementById('password').value;
            const salt = 'hachisai2025salt';
            const hashedPassword = await sha256(password + salt);

            console.log('Login attempt:', password);
            console.log('Hash:', hashedPassword);
            console.log('Expected:', correctHash);

            if (hashedPassword === correctHash) {
                console.log('Authentication successful');
                sessionStorage.setItem('authenticated', 'true');
                
                // GitHub Pages環境を考慮したリダイレクト
                const basePath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
                const targetUrl = basePath + 'index.html';
                console.log('Redirecting to:', targetUrl);
                window.location.href = targetUrl;
            } else {
                console.log('Authentication failed');
                document.getElementById('error-message').style.display = 'block';
            }
        }
        
        // エンターキーでログインできるようにする
        document.getElementById('password').addEventListener('keypress', async function(event) {
            if (event.key === 'Enter') {
                await checkPassword();
            }
        });
    </script>
</body>
</html>`;fs.writeFileSync('../login.html', loginHtmlContent); // プロジェクトルートに作成
    console.log('✓ login.html を作成しました');
      console.log('\\n認証関連ファイルの作成が完了しました');
    console.log('すべてのページで認証が必要になります');
    console.log('パスワード: hachisai-technology (ソルト付きハッシュ化)');
}

// 実行
if (require.main === module) {
    syncFromMain().catch(console.error);
}

module.exports = { syncFromMain };
