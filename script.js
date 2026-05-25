document.addEventListener("DOMContentLoaded", function () {
    
    // ==========================================
    // 1. DAFTAR SEMUA HALAMAN (SECTIONS)
    // ==========================================
    const pages = {
        login: document.getElementById('loginSection'),
        navbar: document.getElementById('globalNavbar'),
        home: document.getElementById('homeSection'),
        loveLetter: document.getElementById('loveLetterSection'),
        cia: document.getElementById('ciaSection'),
        birthday: document.getElementById('birthdaySection'),
        wish: document.getElementById('wishSection'),
        congrats: document.getElementById('congratsSection')
    };

    // ==========================================
    // 2. FUNGSI ANIMASI PINDAH HALAMAN
    // ==========================================
    function changePage(targetKey) {
        // Mencari halaman yang saat ini sedang aktif (tidak memiliki class hidden)
        const currentActive = document.querySelector('.section-container:not(.hidden)');
        
        if (currentActive && pages[targetKey]) {
            // Beri animasi geser ke kiri untuk halaman yang mau ditutup
            currentActive.classList.add('slide-out-left');
            
            // Tunggu 0.7 detik sampai animasi selesai
            setTimeout(() => {
                // Sembunyikan halaman lama
                currentActive.classList.add('hidden');
                currentActive.classList.remove('slide-out-left');
                
                // Munculkan halaman baru
                pages[targetKey].classList.remove('hidden');
                pages[targetKey].classList.add('fade-in');
                
                // Kembalikan layar ke posisi paling atas
                window.scrollTo(0, 0);
            }, 700);
        }
    }

    // Fungsi pembantu agar JS tidak error jika ada ID tombol yang typo di HTML
    function addClick(id, callback) {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('click', callback);
        } else {
            console.warn(`Peringatan: Tombol dengan ID '${id}' tidak ditemukan di file HTML.`);
        }
    }

    // ==========================================
    // 3. FITUR LOGIN & PASSWORD
    // ==========================================
    const masukBtn = document.getElementById('masukBtn');
    const passwordInput = document.getElementById('password');
    const eyeBtn = document.getElementById('togglePassword');

    // Tombol Masuk
    if (masukBtn && passwordInput) {
        masukBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (passwordInput.value === 'momosayangcia') {
                pages.login.classList.add('slide-out-right');
                
                setTimeout(() => {
                    pages.login.classList.add('hidden');
                    pages.navbar.classList.remove('hidden');
                    pages.home.classList.remove('hidden');
                    pages.home.classList.add('fade-in');
                }, 700);
            } else {
                alert("Yahh, passwordnya salah! Coba ingat-ingat lagi.");
            }
        });
    }

    // Tombol Mata (Lihat Password)
    if (eyeBtn && passwordInput) {
        eyeBtn.addEventListener('click', () => {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                eyeBtn.textContent = '🙈';
            } else {
                passwordInput.type = 'password';
                eyeBtn.textContent = '👁️';
            }
        });
    }

    // ==========================================
    // 4. NAVIGASI NAVBAR (MENU ATAS)
    // ==========================================
    addClick('homeLink', (e) => { e.preventDefault(); changePage('home'); });
    addClick('loveLetterLink', (e) => { e.preventDefault(); changePage('loveLetter'); });
    addClick('logoutBtn', (e) => { e.preventDefault(); window.location.reload(); }); // Refresh web


    // ==========================================
    // 5. NAVIGASI KARTU DAN TOMBOL BACK
    // ==========================================
    
    // Dari Love Letter -> CIA
    addClick('ciaCardBtn', () => changePage('cia'));

    // Dari CIA -> Birthday
    addClick('btnGoToBirthday', () => changePage('birthday'));
    
    // Dari CIA -> Congrats
    addClick('btnGoToCongrats', () => changePage('congrats'));

    // Tombol Kue -> Ucapan (Wish)
    addClick('cakeClickBtn', () => changePage('wish'));

    // ------------------------------------------
    // KUMPULAN TOMBOL BACK
    // ------------------------------------------
    
    // Back: Dari Birthday -> kembali ke CIA
    addClick('btnBackToCia', () => changePage('cia'));

    // Back: Dari Ucapan (Wish) -> kembali ke Birthday (Kue)
    addClick('btnBackToBday', () => changePage('birthday'));

    // Back: Dari Congrats -> kembali ke CIA
    addClick('btnBackFromCongrats', () => changePage('cia'));

});
