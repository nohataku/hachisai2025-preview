# 八王子祭2025 プレビュー版 - 認証システム

## パスワード情報

- **パスワード**: `hachisai-technology`
- **ハッシュ化**: SHA-256 + ソルト (`hachisai2025salt`)
- **ハッシュ値**: `e1c8fadc3f4cf0a26217492c0df3ae6367798b618606d74f3036cbf29448eb01`

## 利用可能なコマンド

```bash
# main版からの同期
npm run sync-from-main

# 認証機能の再適用
npm run add-auth

# 初期環境セットアップ
npm run setup
```

## 認証システム概要

### 保護対象

- **全ページ**: index.html, About.html, Projects.html, Guide.html, Notice.html, Event.html, Stage.html, Food.html, Exhibit.html, Access.html, Theme.html, Ponhachi.html, Singer.html, Comedian.html, TimeSchedule.html
- **例外**: login.html (認証ページ自体)

### セキュリティ機能

- SHA-256ハッシュ化 + ソルト
- セッションストレージによる認証状態管理
- 初期状態での全ページ非表示
- GitHub Pages環境対応リダイレクト

## 同期システム

### 移植元

- **リポジトリ**: <https://github.com/takamura0926/HachiojiFes2025-HP.git>
- **ブランチ**: main
- **方式**: Git Clone + ファイルコピー

### フォールバック機能

1. GitHub API経由での個別ファイル取得
2. Git Cloneでの一括取得 (メイン手法)
3. 既存ファイル保護 (auth.js等)

## ファイル構成

```text
script/
├── sync-from-main.js  # 同期メインスクリプト
├── add-auth.js        # 認証機能追加スクリプト
└── auth.js            # 認証チェック機能

login.html             # ログインページ
package.json           # NPMスクリプト定義
```
