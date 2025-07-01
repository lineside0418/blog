document.addEventListener('DOMContentLoaded', () => {
    const postTitleInput = document.getElementById('postTitle');
    const postDateInput = document.getElementById('postDate');
    const postTagsInput = document.getElementById('postTags');
    const postImageInput = document.getElementById('postImage');
    const editorContent = document.getElementById('editorContent'); // div要素に変わったよ
    const generateButton = document.getElementById('generateHtml');
    const generatedHtmlOutput = document.getElementById('generatedHtmlOutput');
    const copyHtmlButton = document.getElementById('copyHtml');

    // ツールバーのボタンとセレクトボックスを取得するよ
    const toolbarButtons = document.querySelectorAll('.editor-toolbar button[data-command]');
    const formatBlockSelect = document.getElementById('formatBlockSelect');
    const foreColorSelect = document.getElementById('foreColorSelect');
    const backColorSelect = document.getElementById('backColorSelect');

    // 今日の日付をデフォルトでセットするよ
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    postDateInput.value = `${year}-${month}-${day}`;

    // --- ワープロ機能の実装 ---
    toolbarButtons.forEach(button => {
        button.addEventListener('click', () => {
            const command = button.dataset.command;
            editorContent.focus(); // エディタにフォーカスを当てる

            if (command === 'createLink') {
                const url = prompt('リンクのURLを入力してね:');
                if (url) {
                    document.execCommand(command, false, url);
                }
            } else if (command === 'insertImage') {
                const imageUrl = prompt('画像のURLを入力してね:');
                if (imageUrl) {
                    document.execCommand(command, false, imageUrl);
                }
            } else if (command === 'insertCodeBlock') {
                // 現在の選択範囲を取得
                const selection = window.getSelection();
                if (selection.rangeCount > 0) {
                    const range = selection.getRangeAt(0);
                    const selectedText = range.toString();
                    if (selectedText) {
                        // 選択テキストがある場合、それをpre-codeで囲む
                        const codeElement = document.createElement('pre');
                        const innerCode = document.createElement('code');
                        innerCode.textContent = selectedText;
                        codeElement.appendChild(innerCode);
                        range.deleteContents();
                        range.insertNode(codeElement);
                    } else {
                        // 選択テキストがない場合、新しい空のコードブロックを挿入
                        const codeElement = document.createElement('pre');
                        const innerCode = document.createElement('code');
                        innerCode.textContent = 'ここにコードを書いてね';
                        codeElement.appendChild(innerCode);
                        range.insertNode(codeElement);
                        // 挿入後、コードブロック内にカーソルを移動
                        range.selectNodeContents(innerCode);
                        selection.removeAllRanges();
                        selection.addRange(range);
                    }
                }
            } else if (command === 'insertBlockquote') {
                 // 現在の選択範囲を取得
                 const selection = window.getSelection();
                 if (selection.rangeCount > 0) {
                     const range = selection.getRangeAt(0);
                     const selectedText = range.toString();
                     const blockquoteElement = document.createElement('blockquote');
                     if (selectedText) {
                         blockquoteElement.textContent = selectedText;
                         range.deleteContents();
                         range.insertNode(blockquoteElement);
                     } else {
                         blockquoteElement.textContent = 'ここに引用文を書いてね';
                         range.insertNode(blockquoteElement);
                         // 挿入後、引用ブロック内にカーソルを移動
                         range.selectNodeContents(blockquoteElement);
                         selection.removeAllRanges();
                         selection.addRange(range);
                     }
                 }
            }
            else {
                document.execCommand(command, false, null);
            }
        });
    });

    // 見出しのセレクトボックスの変更イベント
    formatBlockSelect.addEventListener('change', (event) => {
        const value = event.target.value;
        editorContent.focus();
        document.execCommand('formatBlock', false, value);
    });

    // 文字色のセレクトボックスの変更イベント
    foreColorSelect.addEventListener('change', (event) => {
        const value = event.target.value;
        if (value) {
            editorContent.focus();
            document.execCommand('foreColor', false, value);
        }
    });

    // 背景色のセレクトボックスの変更イベント
    backColorSelect.addEventListener('change', (event) => {
        const value = event.target.value;
        if (value) {
            editorContent.focus();
            document.execCommand('backColor', false, value);
        }
    });


    // --- HTML生成とコピー機能 ---
    generateButton.addEventListener('click', () => {
        const title = postTitleInput.value || "新しい記事タイトル";
        const date = postDateInput.value || "YYYY-MM-DD";
        const tagsRaw = postTagsInput.value || "タグ";
        const imageUrl = postImageInput.value || "https://via.placeholder.com/1000x500/cccccc/ffffff?text=Post+Image";
        
        // エディタのHTMLコンテンツを取得
        const contentHtml = editorContent.innerHTML;

        // タグを処理して # 付きの<span>タグにするよ！
        const tagsHtml = tagsRaw.split(',').map(tag => {
            const trimmedTag = tag.trim();
            return trimmedTag ? `<span class="post-tag">#${trimmedTag}</span>` : '';
        }).filter(Boolean).join('\n                        '); // インデントを合わせて調整

        // create-post.html がルートにある前提なので、他のファイルへのパスは相対パスで設定
        const relativePathPrefix = ''; 

        const generatedHtml = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - 先生のブログ</title>
    <link rel="stylesheet" href="${relativePathPrefix}../style.css">
    <link rel="stylesheet" href="${relativePathPrefix}./blog-post-styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
    <div id="loading-screen">
        <div class="loading-spinner"></div>
        <span id="loading-text"></span>
    </div>

    <div id="theme-transition-overlay">
        <span id="theme-transition-text"></span>
    </div>

    <div class="container">
        <header class="glass-effect">
            <a href="${relativePathPrefix}../index.html" class="logo">先生のブログ</a>
            <nav>
                <a href="${relativePathPrefix}../index.html">ホーム</a>
                <a href="${relativePathPrefix}../about.html">About me</a>
            </nav>
            <button class="theme-toggle-button" id="theme-toggle">
                <i class="fas fa-moon"></i>
            </button>
        </header>

        <main class="blog-main-content">
            <article class="blog-post glass-effect">
                <a href="${relativePathPrefix}../index.html" class="blog-post__back-arrow" aria-label="ホームに戻る">
                    <i class="fas fa-arrow-left"></i>
                </a>

                <h1 class="post-title">${title}</h1>
                <div class="post-meta">
                    <span class="post-date">公開日: ${date}</span>
                    <span class="post-tags-container">
                        ${tagsHtml}
                    </span>
                </div>
                
                <img src="${imageUrl}" alt="記事イメージ" class="post-image">

                <div class="post-content">
                    ${contentHtml}
                </div>
            </article>

            <section class="navigation-links glass-effect">
                <h2 class="section-title">記事をもっと読む</h2>
                <div class="nav-container">
                    <a href="#" class="prev-post"><i class="fas fa-arrow-left"></i> 前の記事へ</a>
                    <a href="#" class="next-post">次の記事へ <i class="fas fa-arrow-right"></i></a>
                </div>
            </section>
        </main>

        <footer>
            <p>© 2025 先生のブログ. All rights reserved.</p>
        </footer>
    </div>

    <script src="${relativePathPrefix}../loading.js"></script>
    <script src="${relativePathPrefix}../dark-mode.js"></script>
    <script src="${relativePathPrefix}./blog-post-script.js"></script>
</body>
</html>`;

        generatedHtmlOutput.textContent = generatedHtml.trim();
    });

    copyHtmlButton.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(generatedHtmlOutput.textContent);
            alert('HTMLコードをクリップボードにコピーしたよ！');
        } catch (err) {
            console.error('HTMLコードのコピーに失敗したよ:', err);
            alert('HTMLコードのコピーに失敗したよ。手動でコピーしてね！');
        }
    });
});