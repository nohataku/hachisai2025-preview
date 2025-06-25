# 八王子祭2025 プレビュー版 - 認証システム

## パスワード情報

- **パスワード**: `hachisai-technology`
- **ハッシュ化**: SHA-256 + ソルト (`hachisai2025salt`)
- **ハッシュ値**: `e1c8fadc3f4cf0a26217492c0df3ae6367798b618606d74f3036cbf29448eb01`

## 利用可能なコマンド

```bash
# 完全自動同期（推奨）
npm run full-sync

# 手動同期（3ステップを自動実行）
npm run manual-sync

# 不要ファイル削除
npm run cleanup

# 従来のコマンド
npm run sync-from-main    # main版からの同期（非推奨）
npm run add-auth          # 認証機能の再適用
npm run setup            # 初期環境セットアップ
```

## 認証システム概要

### 保護対象

- **全HTMLファイル**: login.html以外のすべてのHTMLファイルを自動的に保護
- **動的保護**: 新しく追加されたHTMLファイルも自動的に保護対象に含まれる
- **例外**: login.html (認証ページ自体)

### セキュリティ機能

- SHA-256ハッシュ化 + ソルト
- セッションストレージによる認証状態管理
- 初期状態での全ページ非表示
- GitHub Pages環境対応リダイレクト

## 同期システム

### 推奨手法（手動同期）

- **コマンド**: `npm run full-sync` または `npm run manual-sync`
- **方式**: Windows robocopy + 認証機能復元
- **対象**: 全ファイル（.git、.gitattributes除く）
- **自動化**: 3ステップを完全自動実行

### 従来手法（非推奨）

- **リポジトリ**: <https://github.com/takamura0926/HachiojiFes2025-HP.git>
- **ブランチ**: main  
- **方式**: Git Clone + ファイルコピー
- **問題**: 動作不安定

## ファイル構成

```text
script/
├── full-auto-sync.js      # 完全自動同期（推奨）
├── manual-sync.js         # 手動同期プロセス
├── cleanup.js             # 不要ファイル削除
├── add-auth.js            # 認証機能追加スクリプト
├── auth.js                # 認証チェック機能
└── sync-from-main.js      # 旧同期スクリプト（非推奨）

backup-auth/               # 認証機能バックアップ（保持）
├── auth.js                # 認証スクリプトのバックアップ
└── login.html             # ログインページのバックアップ
login.html                 # ログインページ
package.json               # NPMスクリプト定義
```
