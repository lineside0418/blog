document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeTransitionOverlay = document.getElementById('theme-transition-overlay');
    const themeTransitionText = document.getElementById('theme-transition-text');

    // 初期テーマ設定
    // ユーザー設定またはOS設定に基づいてダークモードを適用
    if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        body.classList.add('dark-mode');
        themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        const isDarkMode = body.classList.contains('dark-mode');
        const textContent = isDarkMode ? 'Loading...' : 'Loading...'; // 切り替わるテーマを表示
        const transitionDuration = 500; // ここを200msから500msに変更したよ！（オーバーレイが表示される時間）

        // オーバーレイの背景色を切り替える前に設定
        if (isDarkMode) {
            // ダークモードからライトモードへ切り替わる場合、明るめの色にする
            themeTransitionOverlay.style.backgroundColor = 'rgba(200, 200, 200, 0.9)'; // 例: 少しグレーがかった白
        } else {
            // ライトモードからダークモードへ切り替わる場合、黒にする
            themeTransitionOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        }

        themeTransitionText.innerHTML = ''; // テキストをクリア
        textContent.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.animationDelay = `${index * 0.05}s`; // 各文字の表示を少し遅らせる
            themeTransitionText.appendChild(span);
        });

        // オーバーレイを表示
        themeTransitionOverlay.classList.add('active');

        // 少し遅れてテーマを切り替える
        setTimeout(() => {
            if (isDarkMode) {
                body.classList.remove('dark-mode');
                themeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'light');
            } else {
                body.classList.add('dark-mode');
                themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'dark');
            }

            // テーマ切り替え後、少し遅れてオーバーレイを非表示にする
            // ここでオーバーレイの非表示処理と、背景色を元に戻す処理を同時に行う
            setTimeout(() => {
                themeTransitionOverlay.classList.remove('active');
                // オーバーレイの背景色を透明に戻しておく（次の切り替えに備える）
                themeTransitionOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0)'; 
            }, 100); 
            
        }, transitionDuration); // ここも`transitionDuration`に合わせて変更されたよ
    });
});