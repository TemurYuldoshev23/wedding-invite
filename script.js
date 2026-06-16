document.addEventListener("DOMContentLoaded", () => {
    const envelopeWrapper = document.getElementById('envelopeWrapper');
    const envelopeScreen = document.getElementById('envelopeScreen');
    const letterCard = document.getElementById('letterCard');
    const bgMusic = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicBtn');
    const musicIcon = document.getElementById('musicIcon');
    const musicText = document.getElementById('musicText');
    const envTitle = document.getElementById('envTitle');
    const envHint = document.getElementById('envHint');

    // 1. Konvertni bosganda animatsiyani ishga tushirish
    if (envelopeWrapper) {
        envelopeWrapper.addEventListener('click', (e) => {
            // Animatsiyani boshlash klassini qo'shish
            envelopeWrapper.classList.add('open');
            if (envTitle) envTitle.style.opacity = '0';
            if (envHint) envHint.style.opacity = '0';

            // Musiqani chiroyli ijro etish
            if (bgMusic && bgMusic.paused) {
                bgMusic.play().then(() => {
                    musicText.innerText = "MUSIC: ON";
                    musicIcon.innerText = "🎵";
                }).catch(err => console.log(err));
            }

            // Karta to'liq chiqib bo'lgach (1.5 soniyadan keyin) asosiy ekran ochiladi
            setTimeout(() => {
                if (envelopeScreen) {
                    envelopeScreen.classList.add('envelope-fadeout');
                }
            }, 2200);
        });
    }

    // 2. Musiqa tugmasi sozlamasi
    if (musicBtn && bgMusic) {
        musicBtn.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play();
                musicText.innerText = "MUSIC: ON";
                musicIcon.innerText = "🎵";
            } else {
                bgMusic.pause();
                musicText.innerText = "MUSIC: OFF";
                musicIcon.innerText = "🔇";
            }
        });
    }

    // 3. Taymer (26-Iyun 2026, 18:00)
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

    // 4. RSVP to Telegram
    const rsvpForm = document.getElementById('rsvpForm');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('guestName').value;
            const status = document.getElementById('attendance').value;
            const message = `⚜️ TO'Y RSVP TASDIQLASH:%0A👤 Mehmon: ${name}%0A✉️ Javob: ${status}%0A💍 To'y egalari: Ziyodullo %26 Ruxshona`;
            window.open(`https://t.me/share/url?url=${message}`, '_blank');
        });
    }
});
