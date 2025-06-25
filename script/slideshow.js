// スライドショー機能
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    // 最初のスライドをアクティブに
    if (slides.length > 0) {
        slides[currentSlide].classList.add('active');
    }

    // スライドを切り替える関数
    function showNextSlide() {
        if (slides.length === 0) return;

        // 現在のスライドから active クラスを削除
        slides[currentSlide].classList.remove('active');

        // 次のスライドのインデックスを計算
        currentSlide = (currentSlide + 1) % slides.length;

        // 次のスライドに active クラスを追加
        slides[currentSlide].classList.add('active');
    }    // 5秒間隔でスライドを切り替え
    if (slides.length > 1) {
        setInterval(showNextSlide, 5000);
    }
});
