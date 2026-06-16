// Premium Interaktiv Funksiyalar va Voqealar Boshqaruvi
document.addEventListener("DOMContentLoaded", () => {
    const envelopeScreen = document.getElementById('envelopeScreen');
    const openBtn = document.getElementById('openBtn');
    const musicBtn = document.getElementById('musicBtn');
    const bgMusic = document.getElementById('bgMusic');
    const musicIcon = document.getElementById('musicIcon');
    const musicText = document.getElementById('musicText');

    // 1. Konvertni ochish hamda Musiqa pleyerini start qilish
    if (openBtn && envelopeScreen) {
        openBtn.addEventListener('click', () => {
            envelopeScreen.classList.add('envelope-fadeout');
            
            // Brauzer avtomatik ijro xavfsizlik cheklovini foydalanuvchi kliki orqali yechish
            if (bgMusic) {
                bgMusic.play().then(() => {
                    musicText.innerText = "MUSIQA: ON";
                    musicIcon.innerText = "🎵";
                }).catch(err => {
                    console.log("Musiqa ijrosida cheklov: " + err);
                });
            }
        });
    }

    // 2. Musiqa tugmasi (On / Off) nazorati
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

    // 3. To'y kuniga Countdown Canli Taymer xizmati
    const weddingDate = new Date("June 26, 2026 18:00:00").getTime();

    const updateTimer = () => {
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

    setInterval(updateTimer, 1000);

    // 4. RSVP Formasini Telegram shaxsiy ulashish tizimiga uzatish
    const rsvpForm = document.getElementById('rsvpForm');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('guestName').value;
            const status = document.getElementById('attendance').value;
            const message = `✨ To'yga Tashrif Tasdig'i:%0A👤 Mehmon: ${name}%0A✉️ Holati: ${status}%0A💍 Kimga: Ziyodullo %26 Ruxshona`;
            window.open(`https://t.me/share/url?url=${message}`, '_blank');
        });
    }
});
