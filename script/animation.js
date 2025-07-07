document.addEventListener('DOMContentLoaded', function() {
    const splash = document.querySelector('.splash-screen');
    const splashContent = document.querySelector('.splash-content');
    const meteorContainer = document.querySelector('.meteor-container');
    
    // ローディング状態を設定
    document.body.classList.add('loading');
    
    // 0.5秒後にロゴを左に移動し、タイトルを表示
    setTimeout(() => {
        splashContent.classList.add('animate-splash');
    }, 500);
    
    // 1.5秒後に流星エフェクトを開始
    setTimeout(() => {
        meteorContainer.style.opacity = '1';
    }, 1500);
    
    // 2.5秒後にスプラッシュ画面をフェードアウト
    setTimeout(() => {
        splash.classList.add('hide-splash');
        // ローディング完了を通知
        document.body.classList.remove('loading');
    }, 2500);

    // Singerページ専用のアニメーション機能
    if (document.body.classList.contains('artist-page')) {
        // スクロールアニメーションの初期化
        initScrollAnimations();
        
        // パララックス効果の初期化
        initParallaxEffect();
        
        // ホバーエフェクトの強化
        enhanceHoverEffects();
    }
});

// スクロールアニメーションの初期化
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // アニメーション対象要素を監視
    const animateElements = document.querySelectorAll('.artist-section, .artist-ticket-section, .artist-attention-section');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// パララックス効果の初期化
function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.artist-photo');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px) scale(1)`;
        });
    });
}

// ホバーエフェクトの強化
function enhanceHoverEffects() {
    const sections = document.querySelectorAll('.artist-section, .artist-ticket-section');
    
    sections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(255, 215, 0, 0.2)';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.4)';
        });
    });

    // タイトルのアニメーション効果
    const titles = document.querySelectorAll('.artist-page h1');
    titles.forEach(title => {
        title.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.6s ease-in-out';
        });
        
        title.addEventListener('mouseleave', function() {
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const targets = document.querySelectorAll('.comedian-content, .comedian-section, .comedian-schedule-section, .comedian-ticket-section, .comedian-attention-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-animated');
                observer.unobserve(entry.target);
            }
            });
        }, { threshold: 0.2 });
    targets.forEach(target => observer.observe(target));
});