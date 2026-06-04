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
        congrats: document.getElementById('congratsSection'),
        momo: document.getElementById('momoSection'),
        momoBirthday: document.getElementById('momoBirthdaySection')
    };

    // ==========================================
    // 2. CEK STATUS LOGIN (FITUR BARU)
    // ==========================================
    // Jika browser mengingat bahwa user sudah login, langsung lewati halaman login
    if (localStorage.getItem('isLoggedIn') === 'true') {
        pages.login.classList.add('hidden');
        pages.navbar.classList.remove('hidden');
        pages.home.classList.remove('hidden');
    }

    // ==========================================
    // 3. FUNGSI ANIMASI PINDAH HALAMAN
    // ==========================================
    function changePage(targetKey) {
        const currentActive = document.querySelector('.section-container:not(.hidden)');
        
        if (currentActive && pages[targetKey]) {
            currentActive.classList.add('slide-out-left');
            
            setTimeout(() => {
                currentActive.classList.add('hidden');
                currentActive.classList.remove('slide-out-left');
                
                pages[targetKey].classList.remove('hidden');
                pages[targetKey].classList.add('fade-in');
                
                window.scrollTo(0, 0);
            }, 700);
        }
    }

    function addClick(id, callback) {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', callback);
    }

    // ==========================================
    // 4. FITUR LOGIN & PASSWORD
    // ==========================================
    const masukBtn = document.getElementById('masukBtn');
    const passwordInput = document.getElementById('password');
    const eyeBtn = document.getElementById('togglePassword');

    if (masukBtn && passwordInput) {
        masukBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (passwordInput.value === 'momosayangcia') {
                
                // --- SIMPAN INGATAN LOGIN KE BROWSER ---
                localStorage.setItem('isLoggedIn', 'true');

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
    // 5. NAVIGASI NAVBAR (MENU ATAS) & LOGOUT
    // ==========================================
    addClick('homeLink', (e) => { e.preventDefault(); changePage('home'); });
    addClick('loveLetterLink', (e) => { e.preventDefault(); changePage('loveLetter'); });
    
    // --- FITUR LOGOUT BARU ---
    addClick('logoutBtn', (e) => { 
        e.preventDefault(); 
        // Hapus ingatan login dari browser
        localStorage.removeItem('isLoggedIn'); 
        // Refresh halaman agar kembali ke layar login
        window.location.reload(); 
    });

    // ==========================================
    // 6. NAVIGASI KARTU MENU UTAMA
    // ==========================================
    addClick('momoCardBtn', () => changePage('momo'));
    addClick('ciaCardBtn', () => changePage('cia'));
    
    addClick('btnGoToBirthday', () => changePage('birthday'));
    addClick('btnGoToCongrats', () => changePage('congrats'));
    addClick('cakeClickBtn', () => changePage('wish'));

    // ==========================================
    // 7. LOGIKA GALERI GAMBAR MOMO BIRTHDAY
    // ==========================================
    const momoImages = [
        'img/momo bday pg 1.jpg',
        'img/momo bday pg 2.jpg',
        'img/momo bday pg 3.jpg',
        'img/momo bday pg 4.jpg',
        'img/momo bday pg 5.jpg'
    ];
    let currentMomoIndex = 0; 

    addClick('btnGoToMomoBirthday', () => {
        currentMomoIndex = 0; 
        
        const imgEl = document.getElementById('momoGalleryImg');
        if (imgEl) imgEl.src = momoImages[currentMomoIndex];
        
        document.getElementById('btnNextMomo').classList.remove('hidden');
        document.getElementById('btnBackFromMomoGallery').classList.add('hidden');
        
        changePage('momoBirthday');
    });

    addClick('btnNextMomo', () => {
        currentMomoIndex++; 
        
        if (currentMomoIndex < momoImages.length) {
            document.getElementById('momoGalleryImg').src = momoImages[currentMomoIndex];
            
            if (currentMomoIndex === momoImages.length - 1) {
                document.getElementById('btnNextMomo').classList.add('hidden'); 
                document.getElementById('btnBackFromMomoGallery').classList.remove('hidden'); 
            }
        }
    });

    // ==========================================
    // 8. KUMPULAN TOMBOL BACK
    // ==========================================
    addClick('btnBackFromMomo', () => changePage('loveLetter'));
    addClick('btnBackFromMomoGallery', () => changePage('momo'));
    addClick('btnBackToCia', () => changePage('cia'));
    addClick('btnBackToBday', () => changePage('birthday'));
    addClick('btnBackFromCongrats', () => changePage('cia'));

});
