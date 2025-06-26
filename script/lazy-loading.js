// 遅延読み込み（Lazy Loading）機能
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer API をサポートしているかチェック
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('.lazy-image');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy-image');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            // 画像がビューポートの50%見えたら読み込み開始
            threshold: 0.1,
            // 100px前から読み込み開始
            rootMargin: '100px'
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Intersection Observer をサポートしていない場合は通常読み込み
        const lazyImages = document.querySelectorAll('.lazy-image');
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy-image');
        });
    }
});
