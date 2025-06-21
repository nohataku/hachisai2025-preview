const fs = require('fs');
const path = require('path');

// HTMLファイルに認証機能を追加する関数
function addAuthToHtmlFiles() {
    console.log('HTMLファイルに認証機能を追加中...');
      const htmlFiles = [
        'index.html', 'About.html', 'Projects.html', 'Guide.html',
        'Notice.html', 'Event.html', 'Stage.html', 'Food.html',
        'Exhibit.html', 'Access.html', 'Theme.html', 'Ponhachi.html',
        'Singer.html', 'Comedian.html', 'TimeSchedule.html'  // 全てのページに認証を適用
    ];
      for (const htmlFile of htmlFiles) {
        const filePath = path.join(__dirname, '../', htmlFile); // __dirnameを使用
        if (!fs.existsSync(filePath)) {
            console.log(`⚠ ${htmlFile} が見つかりません (${filePath})`);
            continue;
        }
        
        try {
            let content = fs.readFileSync(filePath, 'utf8');
            let hasChanges = false;
            
            // 認証スクリプトの追加（headセクション内）
            if (!content.includes('script/auth.js')) {
                content = content.replace(
                    /(<link rel="icon"[^>]*>)/,
                    `$1
    <script src="script/auth.js"></script>`
                );
                hasChanges = true;
                console.log(`  - ${htmlFile}: 認証スクリプトを追加`);
            }
            
            // 認証用スタイルの追加
            if (!content.includes('auth-hidden')) {
                content = content.replace(
                    /<\/head>/,
                    `    <style>
        body.auth-hidden { display: none !important; }
        /* 初期状態でもbodyを非表示 */
        body { display: none; }
        body:not(.auth-hidden) { display: block; }
    </style>
</head>`
                );
                hasChanges = true;
                console.log(`  - ${htmlFile}: 認証用スタイルを追加`);
            }
            
            // bodyタグにauth-hiddenクラスを追加
            if (!content.includes('class="auth-hidden"')) {
                content = content.replace(
                    /<body>/,
                    '<body class="auth-hidden">'
                );
                hasChanges = true;
                console.log(`  - ${htmlFile}: bodyにauth-hiddenクラスを追加`);
            }
            
            if (hasChanges) {
                fs.writeFileSync(filePath, content);
                console.log(`✓ ${htmlFile} に認証機能を追加しました`);
            } else {
                console.log(`- ${htmlFile}: 既に認証機能が設定済みです`);
            }
            
        } catch (error) {
            console.error(`✗ ${htmlFile} の認証機能追加に失敗: ${error.message}`);
        }
    }
    
    console.log('\\n認証機能の追加が完了しました！');
}

// 実行
addAuthToHtmlFiles();
