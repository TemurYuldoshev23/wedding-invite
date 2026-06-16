document.addEventListener("DOMContentLoaded", () => {
    const envelopeScreen = document.getElementById('envelopeScreen');
    const openBtn = document.getElementById('openBtn');
    const musicBtn = document.getElementById('musicBtn');
    const bgMusic = document.getElementById('bgMusic');
    const musicIcon = document.getElementById('musicIcon');
    const musicText = document.getElementById('musicText');

    // 1. PROFESSIONAL OCHILISH VA AUDIO FAOLLASHTIRISH TIZIMI
    if (openBtn) {
        openBtn.addEventListener('click', () => {
            // Konvertni chiroyli ko'tarib yo'qotish
            envelopeScreen.classList.add('envelope-hidden');
            
            // Brauzer xavfsizligidan (Autoplay Block) o'tib musiqani chalish
            bgMusic.play().then(() => {
                musicText.innerText = "MUSIC: ON";
                musicIcon.innerText = "🎵";
            }).catch(error => {
                console.log("Audio ishga tushmadi, tugma orqali yoqish kutilmoqda.");
            });
        });
    }

    // 2. MUSIQA TUGMASI NAZORATI (ON / OFF CHALISH)
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

    // 3. JONLI REAL VAQTDAGI TESKARI TAYMER (Sana: 26-Iyun, 2026 yil 18:00)
    const targetDate = new Date("June 26, 2026 18:00:00").getTime();

    const updateTimer = () => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(timerInterval);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (document.getElementById("days")) {
            document.getElementById("days").innerText = days < 10 ? "0" + days : days;
            document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
            document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
            document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
        }
    };

    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer(); // Birinchi marta darhol ishlashi uchun

    // 4. RSVP FORMASINI TELEGRAMGA INTEGRATSIYA QILISH
    const rsvpForm = document.getElementById('rsvpForm');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const guestName = document.getElementById('guestName').value;
            const attendanceStatus = document.getElementById('attendance').value;
            
            const message = `✨ Premium To'y Taklifnomasi Xabari:%0A👤 Mehmon: ${guestName}%0A✉️ Javob holati: ${attendanceStatus}%0A💍 Kimga: Ziyodullo %26 Ruxshona`;
            window.open(`https://t.me/share/url?url=${message}`, '_blank');
        });
    }
});
