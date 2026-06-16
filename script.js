// Premium Dinamik To'y Veb-Interaktivligi
document.addEventListener("DOMContentLoaded", () => {
    const envelopeScreen = document.getElementById('envelopeScreen');
    const openBtn = document.getElementById('openBtn');
    const musicBtn = document.getElementById('musicBtn');
    const bgMusic = document.getElementById('bgMusic');
    const musicIcon = document.getElementById('musicIcon');
    const musicText = document.getElementById('musicText');
    const flowerContainer = document.getElementById('flower-container');

    // 1. Ekrandan mayin tushadigan hashamatli gullar yomg'iri tizimi
    const createPetal = () => {
        if (!flowerContainer) return;
        const petal = document.createElement('div');
        petal.classList.add('petal');
        
        // Tasodifiy o'lcham va joylashuv parametrlari
        const size = Math.random() * 10 + 8 + 'px';
        petal.style.width = size;
        petal.style.height = size;
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.animationDuration = Math.random() * 3 + 4 + 's'; // 4-7 soniya orasida tushadi
        
        // Bir oz oltin tus aralashtirish
        if (Math.random() > 0.6) {
            petal.style.background = "linear-gradient(135deg, #fceabe 0%, #c5a059 100%)";
        }

        flowerContainer.appendChild(petal);

        // Xotirani tozalash
        setTimeout(() => {
            petal.remove();
        }, 7000);
    };

    // 2. Konvertni ochish va musiqani avtomatik ijro etish
    if (openBtn && envelopeScreen) {
        openBtn.addEventListener('click', () => {
            envelopeScreen.classList.add('envelope-fadeout');
            
            // Gullar yomg'irini boshlash
            setInterval(createPetal, 250);

            // Musiqa ijrosini boshlash (Enrique Iglesias - Ring My Bells)
            if (bgMusic) {
                bgMusic.play().then(() => {
                    musicText.innerText = "MUSIQA: ON";
                    musicIcon.innerText = "🎵";
                }).catch(err => {
                    console.log("Avtomatik ijro bloklandi, sababi: " + err);
                });
            }
        });
    }

    // 3. Musiqani yoqish/o'chirish qo'lda boshqarish dasturi
    if (musicBtn && bgMusic) {
        musicBtn.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play();
                musicText.innerText = "MUSIQA: ON";
                musicIcon.innerText = "🎵";
            } else {
                bgMusic.pause();
                musicText.innerText = "MUSIQA: OFF";
                musicIcon.innerText = "🔇";
            }
        });
    }

    // 4. Jonli Countdown Taymer (26-Iyun 2026, 18:00)
    const weddingDate = new Date("June 26, 2026 18:00:00").getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const diff = weddingDate - now;

        if (diff < 0) return;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const dEl = document.getElementById("days");
        const hEl = document.getElementById("hours");
        const mEl = document.getElementById("minutes");
        const sEl = document.getElementById("seconds");

        if (dEl) dEl.innerText = days < 10 ? "0" + days : days;
        if (hEl) hEl.innerText = hours < 10 ? "0" + hours : hours;
        if (mEl) mEl.innerText = minutes < 10 ? "0" + minutes : minutes;
        if (sEl) sEl.innerText = seconds < 10 ? "0" + seconds : seconds;
    };

    setInterval(updateCountdown, 1000);

    // 5. RSVP Telegram bilan xavfsiz bog'lanish
    const rsvpForm = document.getElementById('rsvpForm');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('guestName').value;
            const status = document.getElementById('attendance').value;
            const message = `👑 NIKOH TO'YI RSVP TASDIQLASH:%0A👤 Mehmon: ${name}%0A✉️ Istak: ${status}%0A💍 To'y egalari: Ziyodullo %26 Ruxshona`;
            window.open(`https://t.me/share/url?url=${message}`, '_blank');
        });
    }
});
