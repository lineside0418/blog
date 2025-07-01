document.addEventListener('DOMContentLoaded', () => {
    // スムーズスクロール (任意)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // ここにブログポストページ固有のJavaScriptを追加できるよ
    // 例: 目次を動的に生成する、記事内の画像をギャラリー表示にする、など
    console.log("ブログ本文ページが読み込まれたよ！");
});