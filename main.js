// ========================================
// スムーススクロール
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // アンカーリンクのスムーススクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========================================
    // スクロールアニメーション
    // ========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, observerOptions);

    // アニメーション対象の要素
    const animatedElements = document.querySelectorAll(
        '.reason-card, .facility-item, .employment-card'
    );

    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // ========================================
    // CTAボタンのクリックトラッキング
    // ========================================
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // フィードバックアニメーション
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            // LINE、電話のクリックログ（必要に応じて）
            const buttonType = this.classList.contains('cta-button-line') ? 'LINE' : 'Phone';
            console.log(`CTA Button Clicked: ${buttonType}`);
        });
    });

    // ========================================
    // カードホバーエフェクト強化
    // ========================================
    const cards = document.querySelectorAll(
        '.reason-card, .facility-item, .employment-card'
    );

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // ========================================
    // バッジのパルスアニメーション制御
    // ========================================
    const badge = document.querySelector('.hero-badge');
    if (badge) {
        // 5秒ごとにパルスアニメーションを再起動
        setInterval(() => {
            badge.style.animation = 'none';
            setTimeout(() => {
                badge.style.animation = 'pulse 2s ease-in-out infinite';
            }, 10);
        }, 5000);
    }

    // ========================================
    // 電話番号のクリップボードコピー機能（オプション）
    // ========================================
    const phoneButton = document.querySelector('.cta-button-phone');
    if (phoneButton) {
        // 長押しでコピー
        let pressTimer;
        phoneButton.addEventListener('mousedown', function() {
            pressTimer = setTimeout(() => {
                const phoneNumber = this.querySelector('span').textContent;
                copyToClipboard(phoneNumber);
                showCopyNotification();
            }, 1000);
        });

        phoneButton.addEventListener('mouseup', function() {
            clearTimeout(pressTimer);
        });

        phoneButton.addEventListener('mouseleave', function() {
            clearTimeout(pressTimer);
        });
    }

    // ========================================
    // ヘルパー関数
    // ========================================
    function copyToClipboard(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                console.log('電話番号をコピーしました:', text);
            }).catch(err => {
                console.error('コピーに失敗しました:', err);
            });
        }
    }

    function showCopyNotification() {
        // 簡易的な通知表示
        const notification = document.createElement('div');
        notification.textContent = '電話番号をコピーしました！';
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 15px 30px;
            border-radius: 10px;
            font-size: 14px;
            font-weight: 700;
            z-index: 9999;
            animation: fadeInOut 2s ease-in-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
    }

    // ========================================
    // パフォーマンス最適化：画像遅延読み込み
    // ========================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// ========================================
// CSSアニメーション（JavaScriptから制御）
// ========================================
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .fade-in-visible {
        opacity: 1;
        transform: translateY(0);
    }

    @keyframes fadeInOut {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    }
`;
document.head.appendChild(style);
