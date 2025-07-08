/**
 * お知らせ詳細ページの公開日時を検証するスクリプト
 */
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // 現在のページのファイル名を取得
        const path = window.location.pathname;
        const filename = path.split('/').pop();

        // notices.jsonを読み込む
        const response = await fetch('notices.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // 対応するお知らせデータを検索
        const notice = data.notices.find(n => n.file === filename);

        if (notice) {
            const now = new Date();
            const publicDate = new Date(notice.datetime);

            // 公開日時を過ぎていない場合は、お知らせ一覧ページにリダイレクト
            if (publicDate > now) {
                // ユーザーにメッセージを表示してからリダイレクト
                alert('このお知らせはまだ公開されていません。');
                window.location.href = '../Notice.html';
            }
        } else {
            // notices.jsonに該当するファイルが見つからない場合
            // (例: ファイル名が間違っている、古いお知らせなど)
            console.warn(`お知らせ「${filename}」はnotices.jsonに存在しません。`);
            // 必要であれば、ここでもリダイレクト処理を追加できます
            // alert('指定されたお知らせは見つかりませんでした。');
            // window.location.href = '../Notice.html';
        }

    } catch (error) {
        console.error('お知らせの検証中にエラーが発生しました:', error);
        // エラーが発生した場合も、念のためリダイレクトするなどのフォールバック処理が可能
        // alert('エラーが発生したため、お知らせ一覧ページに戻ります。');
        // window.location.href = '../Notice.html';
    }
});
