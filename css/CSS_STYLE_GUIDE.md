# 八王子祭HP CSSスタイルガイド

## 概要

このドキュメントは八王子祭HPのCSSファイル構造と、制作側が統一性を保つためのガイドラインを提供します。

## ファイル構造の改善点

### 1. CSS変数の導入

`css/components/variables.css`にて、サイト全体で共通して使用される値を定義しました。

#### カラーパレット

```css
--primary-color: #00bcd4;        /* メインカラー */
--secondary-color: #3e4cb8;      /* セカンダリカラー */
--accent-color: #40b8f0;         /* アクセントカラー */
--warning-color: #FFD700;        /* 警告・注意カラー */
--background-primary: #0a1333;   /* 背景メイン */
--text-primary: #fff;            /* メインテキスト */
--text-secondary: #e0e7ff;       /* セカンダリテキスト */
```

#### フォントファミリー

```css
--font-primary: 'Kaisotai Next UP B', '游ゴシック体', 'Yu Gothic', 'Meiryo', sans-serif;
--font-secondary: '游ゴシック体', 'Yu Gothic', 'YuGothic', 'Meiryo', sans-serif;
--font-heading: 'MPLUSRounded1c-Bold', 'GenEiMGothic2-Bold', 'Arial Black', sans-serif;
```

#### スペーシング

```css
--spacing-xs: 8px;
--spacing-sm: 16px;
--spacing-md: 24px;
--spacing-lg: 32px;
--spacing-xl: 40px;
--spacing-xxl: 56px;
```

### 2. ベースクラスの統合

`css/components/base.css`にて、よく使用される基本的なクラスを定義しました。

#### 基本コンポーネント

- `.page-background` - 基本的なページ背景
- `.content-background` - コンテンツ背景
- `.card` - 基本的なカードスタイル
- `.btn`, `.btn-primary`, `.btn-secondary` - ボタンスタイル

### 3. ユーティリティクラスの拡張

`css/components/utilities.css`を大幅に拡張し、以下のユーティリティを追加しました：

#### マージン・パディング

```css
.m-8, .mt-8, .mr-8, .mb-8, .ml-8     /* 8px */
.m-16, .mt-16, .mr-16, .mb-16, .ml-16 /* 16px */
.m-24, .mt-24, .mr-24, .mb-24, .ml-24 /* 24px */
/* ...その他のサイズ */
```

#### フレックスボックス

```css
.flex, .flex-column, .flex-row
.justify-center, .justify-between, .justify-around
.items-center, .items-start, .items-end
.gap-8, .gap-16, .gap-24, .gap-32, .gap-40
```

#### 表示・非表示

```css
.hidden, .invisible, .visible
```

#### ボーダー半径

```css
.rounded-sm, .rounded-md, .rounded-lg, .rounded-xl
```

### 4. 重複クラスの解消

#### 修正前の問題

- `.back`クラスが`layout.css`と`artist.css`で重複定義
- `.page-title`クラスが`typography.css`と`artist.css`で重複定義
- 色やフォントが各ファイルで個別に定義されている

#### 修正後

- `artist.css`の重複クラスを`.artist-back`固有のスタイルに変更
- CSS変数を使用して統一性を確保
- ファイル間の依存関係を明確化

## 制作側向けのガイドライン

### 1. 新しいスタイルを追加する場合

#### 色を使用する場合

ハードコードされた色値の代わりに、CSS変数を使用してください：

```css
/* ❌ 悪い例 */
.my-element {
    color: #00bcd4;
    background: #0a1333;
}

/* ✅ 良い例 */
.my-element {
    color: var(--primary-color);
    background: var(--background-primary);
}
```

#### スペーシングを使用する場合

固定値の代わりにスペーシング変数を使用してください：

```css
/* ❌ 悪い例 */
.my-element {
    margin: 24px;
    padding: 16px;
}

/* ✅ 良い例 */
.my-element {
    margin: var(--spacing-md);
    padding: var(--spacing-sm);
}
```

#### ユーティリティクラスを活用

基本的なスタイリングにはユーティリティクラスを使用してください：

```html
<!-- ❌ 悪い例 -->
<div class="custom-flex-center">
  <p class="custom-margin-bottom">テキスト</p>
</div>

<!-- ✅ 良い例 -->
<div class="flex items-center justify-center">
  <p class="mb-24">テキスト</p>
</div>
```

### 2. 新しいコンポーネントを作成する場合

#### ファイル命名規則

- `css/components/[component-name].css`
- 機能ごとに分割し、役割を明確にする

#### インポート順序

`css/hachisai.css`での正しいインポート順序：

1. `variables.css` (最初)
2. `base.css` (基本クラス)
3. その他のコンポーネント

### 3. 既存のスタイルを修正する場合

#### 確認事項

1. 同じスタイルが他のファイルでも定義されていないか確認
2. CSS変数が利用可能であれば、それを使用
3. 修正が他のコンポーネントに影響しないか確認

#### 修正手順

1. 対象のファイルを特定
2. 関連するクラスの使用箇所を検索
3. CSS変数やユーティリティクラスに置き換え可能か検討
4. テストして影響範囲を確認

## ファイル構成

```text
css/
├── hachisai.css              # メインCSSファイル（インポートのみ）
└── components/
    ├── variables.css         # CSS変数定義
    ├── base.css             # 基本クラス
    ├── utilities.css        # ユーティリティクラス
    ├── typography.css       # フォント関連
    ├── layout.css           # レイアウト関連
    ├── header.css           # ヘッダー
    ├── header-mobile.css    # モバイルヘッダー
    ├── footer.css           # フッター
    ├── content-sections.css # コンテンツセクション
    ├── artist.css           # アーティスト専用
    ├── access.css           # アクセス専用
    ├── countdown.css        # カウントダウン
    ├── LoadingAnimation.css # ローディングアニメーション
    └── responsive.css       # レスポンシブ対応
```

## 今後の開発で注意すべき点

### 1. 一貫性の維持

- 新しい色やスペーシングを追加する前に、既存の変数が使用できないか確認
- 同じ機能のクラスを複数のファイルで定義しない

### 2. パフォーマンス

- CSS変数を使用することで、テーマ変更や色の統一が容易になる
- ユーティリティクラスを活用することで、CSSファイルサイズの削減と開発速度の向上が期待できる

### 3. 保守性

- 各ファイルの役割を明確にし、適切なファイルに適切なスタイルを配置
- コメントを適切に記述し、他の開発者が理解しやすいコードを心がける

## 質問や提案

このスタイルガイドについて質問や改善提案がある場合は、開発チームまでお知らせください。
