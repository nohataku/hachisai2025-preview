const { manualSync } = require('./manual-sync');
const { cleanupUnnecessaryFiles } = require('./cleanup');

// カラー出力用の関数
const colors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
    reset: '\x1b[0m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

// 完全自動同期プロセス
async function fullAutoSync() {
    log('=== 八王子祭2025 プレビュー版 - 完全自動同期 ===', 'cyan');
    log('HachiojiFes2025-HP から最新ファイルを同期し、認証機能を復元します\n', 'blue');
    
    try {
        // ステップ1-3: 手動同期プロセス実行
        manualSync();
        
        log('\n' + '='.repeat(50), 'cyan');
        
        // ステップ4: 不要ファイル削除
        cleanupUnnecessaryFiles();
        
        log('\n' + '='.repeat(50), 'cyan');
        log('🚀 完全自動同期プロセス完了！', 'green');
        log('📝 次の機能が利用可能です:', 'blue');
        log('  - パスワード認証: hachisai-technology', 'yellow');
        log('  - 全ページ保護済み (login.html以外)', 'yellow');
        log('  - 最新のHachiojiFes2025-HP内容を反映', 'yellow');
        
    } catch (error) {
        log(`\n💥 完全自動同期プロセス中にエラーが発生しました: ${error.message}`, 'red');
        process.exit(1);
    }
}

// 実行
if (require.main === module) {
    fullAutoSync();
}

module.exports = { fullAutoSync };
