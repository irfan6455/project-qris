// Menunggu seluruh dokumen HTML siap dimuat
document.addEventListener('DOMContentLoaded', () => {

    // 1. ELEMEN SELECTOR
    const btnBuy = document.getElementById('btnBuy');
    const btnClose = document.getElementById('btnClose');
    const paymentModal = document.getElementById('paymentModal');
    
    const paymentBtns = document.querySelectorAll('.payment-btn');
    const sectionQris = document.getElementById('sectionQris');
    const sectionDana = document.getElementById('sectionDana');
    
    const btnCopy = document.getElementById('btnCopy');
    const danaNumber = document.getElementById('danaNumber');
    const btnConfirm = document.getElementById('btnConfirm');
    const toast = document.getElementById('toast');
    const countdownEl = document.getElementById('countdown');

    let timerInterval = null;

    // 2. FUNGSI BUKA & TUTUP MODAL
    btnBuy.addEventListener('click', () => {
        paymentModal.style.display = 'flex';
        startTimer(300); // Jalankan timer 5 menit (300 detik)
    });

    btnClose.addEventListener('click', closeModal);

    // Tutup modal jika klik di luar area modal content
    window.addEventListener('click', (event) => {
        if (event.target === paymentModal) {
            closeModal();
        }
    });

    function closeModal() {
        paymentModal.style.display = 'none';
        clearInterval(timerInterval); // Hentikan timer saat modal ditutup
    }

    // 3. LOGIKA TABS PEMBAYARAN (QRIS VS DANA)
    paymentBtns.forEach(button => {
        button.addEventListener('click', () => {
            // Hapus status active dari semua tombol
            paymentBtns.forEach(btn => btn.classList.remove('active'));
            // Tambahkan status active ke tombol yang diklik
            button.classList.add('active');

            const method = button.getAttribute('data-method');
            if (method === 'qris') {
                sectionQris.classList.remove('hidden');
                sectionDana.classList.add('hidden');
            } else if (method === 'dana') {
                sectionDana.classList.remove('hidden');
                sectionQris.classList.add('hidden');
            }
        });
    });

    // 4. FUNGSI SALIN NOMOR DANA
    btnCopy.addEventListener('click', () => {
        const numberText = danaNumber.innerText.replace(/-/g, ''); // Hapus tanda strip
        navigator.clipboard.writeText(numberText).then(() => {
            showToast("Nomor DANA berhasil disalin!");
        }).catch(err => {
            console.error("Gagal menyalin text: ", err);
        });
    });

    // 5. FUNGSI TIMER HITUNG MUNDUR (COUNTDOWN)
    function startTimer(seconds) {
        clearInterval(timerInterval);
        let timeLeft = seconds;

        timerInterval = setInterval(() => {
            const minutes = Math.floor(timeLeft / 60);
            const remainingSeconds = timeLeft % 60;

            // Format tampilan agar 00:00 (misal: 05:09)
            countdownEl.textContent = 
                `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                alert('Waktu pembayaran telah habis. Silakan ulangi transaksi.');
                closeModal();
            }
            timeLeft--;
        }, 1000);
    }

    // 6. KONFIRMASI PEMBAYARAN
    btnConfirm.addEventListener('click', () => {
        alert('Terima kasih! Pembayaran Anda sedang diverifikasi secara otomatis.');
        closeModal();
    });

    // 7. HELPER: NOTIFIKASI TOAST
    function showToast(message) {
        toast.textContent = message;
        toast.classList.remove('hidden');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
    }
});
