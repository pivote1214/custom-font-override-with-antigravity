# Custom Font Override

Webページのフォントをカスタムフォントに上書きするChrome拡張機能です。

## 機能

- **通常テキスト用フォント**: ページ全体のテキストフォントを変更
- **コードブロック用フォント**: `<code>`, `<pre>`などのコード要素に適用
- **数式用フォント**: MathJax, KaTeXなどの数式レンダリングに適用
- ON/OFFトグルで簡単に有効/無効を切り替え
- 設定はブラウザに保存され、再起動後も維持

## デフォルト設定

| カテゴリ | デフォルトフォント |
|---------|-------------------|
| 通常テキスト | Noto Sans JP |
| コードブロック | Cascade Mono |
| 数式 | Cambria Math |

## インストール方法

1. このリポジトリをクローンまたはダウンロード
   ```bash
   git clone https://github.com/yourusername/custom-font-override-with-antigravity.git
   ```

2. Chromeで `chrome://extensions/` を開く

3. 右上の「デベロッパーモード」を有効化

4. 「パッケージ化されていない拡張機能を読み込む」をクリック

5. ダウンロードしたフォルダを選択

## 使い方

1. Chromeツールバーの拡張機能アイコンをクリック
2. 各カテゴリのフォント名を入力
3. 「💾 保存して適用」をクリック
4. ページが自動的に再読み込みされ、新しいフォントが適用されます

## 注意事項

- 指定するフォントはお使いのPCにインストールされている必要があります
- 一部のWebサイトでは、特殊なスタイル設定により上書きが効かない場合があります
- Google Fontsなどのウェブフォントを使用したい場合は、フォント名をそのまま入力してください

## ファイル構成

```
custom-font-override-with-antigravity/
├── manifest.json      # 拡張機能の設定
├── content.js         # フォント上書きスクリプト
├── popup/
│   ├── popup.html     # ポップアップUI
│   ├── popup.css      # スタイル
│   └── popup.js       # ロジック
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md
```

## ライセンス

MIT License