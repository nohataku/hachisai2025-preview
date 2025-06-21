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

// 不要ファイル削除
function cleanupUnnecessaryFiles() {
    log('=== 不要ファイル削除開始 ===', 'blue');
    
    try {
        const projectRoot = process.cwd();        // 削除対象ファイル・フォルダのリスト
        const itemsToDelete = [
            // 開発依存関係（静的サイトなので不要）
            {
                path: path.join(projectRoot, 'node_modules'),
                type: 'directory',
                reason: 'NPM依存関係（静的サイトでは不要）'
            },
            {
                path: path.join(projectRoot, '.husky'),
                type: 'directory',
                reason: 'Git hooks（静的サイトでは不要）'
            },
            {
                path: path.join(projectRoot, 'package-lock.json'),
                type: 'file',
                reason: 'NPMロックファイル（依存関係削除により不要）'
            }
        ];
        
        log('\n🗑️  削除対象ファイルの確認中...', 'yellow');
        log('ℹ️  注意: backup-authフォルダは認証機能の復元に必要なため保持されます', 'blue');
        
        let deletedItems = 0;
        let skippedItems = 0;
        
        for (const item of itemsToDelete) {
            if (fs.existsSync(item.path)) {
                try {
                    if (item.type === 'directory') {
                        // ディレクトリの削除（再帰的）
                        fs.rmSync(item.path, { recursive: true, force: true });
                        log(`✓ フォルダを削除: ${path.basename(item.path)} (${item.reason})`, 'green');
                    } else {
                        // ファイルの削除
                        fs.unlinkSync(item.path);
                        log(`✓ ファイルを削除: ${path.basename(item.path)} (${item.reason})`, 'green');
                    }
                    deletedItems++;
                } catch (error) {
                    log(`✗ 削除失敗: ${path.basename(item.path)} - ${error.message}`, 'red');
                }
            } else {
                log(`- スキップ: ${path.basename(item.path)} (存在しません)`, 'yellow');
                skippedItems++;
            }
        }
        
        log(`\n📊 削除結果:`, 'blue');
        log(`  - 削除されたアイテム: ${deletedItems}`, 'green');
        log(`  - スキップされたアイテム: ${skippedItems}`, 'yellow');
        
        if (deletedItems > 0) {
            log('\n🎉 不要ファイルの削除完了！', 'green');
        } else {
            log('\n💡 削除対象のファイルはありませんでした', 'blue');
        }
        
    } catch (error) {
        log(`\n❌ エラーが発生しました: ${error.message}`, 'red');
        process.exit(1);
    }
}

// 実行
if (require.main === module) {
    cleanupUnnecessaryFiles();
}

module.exports = { cleanupUnnecessaryFiles };
