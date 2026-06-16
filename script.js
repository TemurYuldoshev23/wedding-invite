document.addEventListener("DOMContentLoaded", () => {
    const envelopeScreen = document.getElementById('envelopeScreen');
    const openBtn = document.getElementById('openBtn');
    const musicBtn = document.getElementById('musicBtn');
    const bgMusic = document.getElementById('bgMusic');
    const musicIcon = document.getElementById('musicIcon');
    const musicText = document.getElementById('musicText');

    // 1. Konvert bosilganda ochish va musiqani pley qilish
    if (openBtn) {
        openBtn.addEventListener('click', () => {
            envelopeScreen.classList.add('envelope-hidden');
            
            bgMusic.play().then(() => {
                musicText.innerText = "MUSIC: ON";
                musicIcon.innerText = "🎵";
            }).catch(e => console.log("Avtomatik ijro to'sildi, tugma kutilmoqda."));
        });
    }

    // 2. Musiqa tugmasi on/off nazorati
    if (musicBtn) {
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

    // 3. Jonli teskari taymer hisobi (Sana: 26-Iyun, 2026)
    const weddingDate = new Date("June 26, 2026 18:00:00").getTime();

    setInterval(() => {
        const now = new Date().getTime();
        const diff = weddingDate - now;

        if (diff < 0) return;

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        if (document.getElementById("days")) {
            document.getElementById("days").innerText = d < 10 ? "0" + d : d;
            document.getElementById("hours").innerText = h < 10 ? "0" + h : h;
            document.getElementById("minutes").innerText = m < 10 ? "0" + m : m;
            document.getElementById("seconds").innerText = s < 10 ? "0" + s : s;
        }
    }, 1000);

    // 4. RSVP Telegram ulashish qismi
    const rsvpForm = document.getElementById('rsvpForm');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('guestName').value;
            const status = document.getElementById('attendance').value;
            const textMessage = `✨ To'yga Tashrif Tasdig'i (Canva Style):%0A👤 Mehmon: ${name}%0A✉️ Holati: ${status}%0A💍 Kimga: Ziyodullo %26 Ruxshona`;
            window.open(`https://t.me/share/url?url=${textMessage}`, '_blank');
        });
    }
});
