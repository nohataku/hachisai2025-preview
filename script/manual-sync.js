const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// カラー出力用の関数
const colors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    reset: '\x1b[0m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

// 手動同期プロセス
function manualSync() {
    log('=== 手動同期プロセス開始 ===', 'blue');
    
    try {
        // ステップ1: ファイルコピー
        log('\n📁 ステップ1: HachiojiFes2025-HPからファイルをコピー中...', 'yellow');
        
        const sourceDir = 'C:\\Users\\nohataku\\Desktop\\Programming\\HachiojiFes2025-HP';
        const targetDir = 'C:\\Users\\nohataku\\Desktop\\Programming\\hachisai2025-preview';
        
        // ソースディレクトリの存在確認
        if (!fs.existsSync(sourceDir)) {
            throw new Error(`ソースディレクトリが見つかりません: ${sourceDir}`);
        }
        
        // robocopyコマンドでファイルをコピー (.git と .gitattributes を除外)
        const robocopyCmd = `robocopy "${sourceDir}" "${targetDir}" /E /XD .git /XF .gitattributes`;
        
        try {
            execSync(robocopyCmd, { stdio: 'inherit' });
            log('✓ ファイルコピー完了', 'green');
        } catch (error) {
            // robocopyは成功時でもexit code 1を返すことがあるので、特定のエラーのみ処理
            if (error.status > 7) {
                throw new Error(`robocopyコマンドが失敗しました: ${error.message}`);
            }
            log('✓ ファイルコピー完了', 'green');
        }
        
        // ステップ2: 認証機能の復元
        log('\n🔐 ステップ2: 認証機能の復元中...', 'yellow');
        
        // backup-auth/auth.js を script/auth.js にコピー
        const authSourcePath = path.join(targetDir, 'backup-auth', 'auth.js');
        const authTargetPath = path.join(targetDir, 'script', 'auth.js');
        
        if (!fs.existsSync(authSourcePath)) {
            throw new Error(`認証ファイルが見つかりません: ${authSourcePath}`);
        }
        
        fs.copyFileSync(authSourcePath, authTargetPath);
        log('✓ auth.js をコピー', 'green');
        
        // backup-auth/login.html を root/login.html にコピー
        const loginSourcePath = path.join(targetDir, 'backup-auth', 'login.html');
        const loginTargetPath = path.join(targetDir, 'login.html');
        
        if (!fs.existsSync(loginSourcePath)) {
            throw new Error(`ログインファイルが見つかりません: ${loginSourcePath}`);
        }
        
        fs.copyFileSync(loginSourcePath, loginTargetPath);
        log('✓ login.html をコピー', 'green');
        
        // add-auth.js を実行
        log('🔧 認証機能をHTMLファイルに追加中...', 'yellow');
        execSync('node script/add-auth.js', { stdio: 'inherit' });
        log('✓ 認証機能の追加完了', 'green');
        
        // ステップ3: 検証（簡易版）
        log('\n🔍 ステップ3: 同期結果の検証中...', 'yellow');
        
        // 主要ファイルの存在確認
        const criticalFiles = [
            'index.html', 'About.html', 'login.html', 
            'script/auth.js', 'css/hachisai.css'
        ];
        
        let allFilesExist = true;
        for (const file of criticalFiles) {
            const filePath = path.join(targetDir, file);
            if (!fs.existsSync(filePath)) {
                log(`✗ 重要ファイルが見つかりません: ${file}`, 'red');
                allFilesExist = false;
            } else {
                log(`✓ ${file} 存在確認`, 'green');
            }
        }
        
        if (!allFilesExist) {
            throw new Error('重要ファイルが不足しています');
        }
        
        // 認証機能の確認
        const indexPath = path.join(targetDir, 'index.html');
        const indexContent = fs.readFileSync(indexPath, 'utf8');
        
        if (indexContent.includes('script/auth.js') && 
            indexContent.includes('auth-hidden') && 
            indexContent.includes('<body class="auth-hidden">')) {
            log('✓ 認証機能が正しく適用されています', 'green');
        } else {
            throw new Error('認証機能の適用に問題があります');
        }
        
        log('\n🎉 手動同期プロセス完了！', 'green');
        log('💡 プレビュー版の準備が整いました', 'blue');
        
    } catch (error) {
        log(`\n❌ エラーが発生しました: ${error.message}`, 'red');
        process.exit(1);
    }
}

// 実行
if (require.main === module) {
    manualSync();
}

module.exports = { manualSync };
