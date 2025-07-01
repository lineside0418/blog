document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingTextElement = document.getElementById('loading-text');

    // 「Loading...」の各文字を<span>で囲んで設定
    const loadingMessage = "Loading...";
    loadingTextElement.innerHTML = '';
    loadingMessage.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        // 各文字にアニメーションの遅延を設定
        span.style.animationDelay = `${index * 0.1}s`;
        loadingTextElement.appendChild(span);
    });

    // ページコンテンツが完全にロードされたらローディングスクリーンを隠す
    window.addEventListener('load', () => {
        loadingScreen.classList.add('hidden');
    });

    // 何らかの理由でloadイベントが発火しない場合のために、タイムアウトを設定
    setTimeout(() => {
        if (!loadingScreen.classList.contains('hidden')) {
            loadingScreen.classList.add('hidden');
        }
    }, 2000); // 2秒後に強制的に隠す
});