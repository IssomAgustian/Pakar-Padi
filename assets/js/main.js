// ====================================
// MAIN.JS - Pakar Padi Web Application
// ====================================

// ====================================
// KONTAK.HTML - Contact Form Handler
// ====================================
if (document.getElementById('contact-form')) {
    const pesanTextarea = document.getElementById('pesan');
    const charCount = document.getElementById('char-count');

    if (pesanTextarea && charCount) {
        pesanTextarea.addEventListener('input', function() {
            const length = this.value.length;
            charCount.textContent = length;
            
            if (length >= 500) {
                charCount.classList.add('text-red-500', 'font-bold');
            } else {
                charCount.classList.remove('text-red-500', 'font-bold');
            }
        });
    }

    document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const nama = document.getElementById('nama').value;
        const email = document.getElementById('email').value;
        const pesan = document.getElementById('pesan').value;

        const emailBody = `Nama: ${nama}%0D%0AEmail: ${email}%0D%0A%0D%0APesan:%0D%0A${encodeURIComponent(pesan)}`;
        const mailtoLink = `mailto:admin@sistempakapadi.com?subject=Pesan dari ${encodeURIComponent(nama)}&body=${emailBody}`;

        window.location.href = mailtoLink;

        const successMessage = document.getElementById('success-message');
        successMessage.classList.remove('hidden');

        this.reset();
        charCount.textContent = '0';

        setTimeout(() => {
            successMessage.classList.add('hidden');
        }, 5000);
    });
}

// ====================================
// LOGIN.HTML - Login Form Handler
// ====================================
if (document.getElementById('login-form')) {
    document.getElementById('toggle-password').addEventListener('click', function () {
        const passwordInput = document.getElementById('password');
        const eyeIcon = document.getElementById('eye-icon');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            eyeIcon.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            eyeIcon.classList.replace('fa-eye-slash', 'fa-eye');
        }
    });

    document.getElementById('login-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;
        const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            const loginData = {
                email: user.email,
                name: user.name || email.split('@')[0],
                loginTime: new Date().toISOString(),
                remember: remember
            };
            if (remember) localStorage.setItem('userSession', JSON.stringify(loginData));
            else sessionStorage.setItem('userSession', JSON.stringify(loginData));
            alert('Login berhasil! Selamat datang ' + loginData.name);
            window.location.href = 'index.html';
        } else alert('Email atau password salah. Silakan coba lagi.');
    });

    document.getElementById('google-login-btn').addEventListener('click', function () {
        alert('Login dengan Google belum diaktifkan.');
    });
}

// ====================================
// REGISTER.HTML - Register Form Handler
// ====================================
if (document.getElementById('register-form')) {
    document.getElementById('register-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (password !== confirmPassword) {
            alert('Password dan konfirmasi password tidak cocok!');
            return;
        }

        const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        if (users.some(u => u.email === email)) {
            alert('Email sudah terdaftar!');
            return;
        }

        users.push({
            email,
            password
        });
        localStorage.setItem('registeredUsers', JSON.stringify(users));

        alert('Pendaftaran berhasil! Silakan login.');
        window.location.href = 'login.html';
    });

    document.getElementById('google-register-btn').addEventListener('click', function () {
        alert('Pendaftaran dengan Google belum diaktifkan.');
    });
}

// ====================================
// RIWAYAT.HTML - History Management
// ====================================
if (document.getElementById('history-table-body')) {
    const sampleData = [
        {
            id: 1,
            date: '15/01/2025',
            time: '14:30',
            method: 'Certainty Factor',
            disease: 'Hawar Daun Bakteri',
            description: 'Penyakit yang disebabkan oleh bakteri Xanthomonas oryzae yang menyerang daun tanaman padi.',
            confidence: 94,
            solution: 'Gunakan bakterisida berbahan aktif oksitetrasiklin. Lakukan sanitasi lahan dan hindari genangan air berlebih.',
            symptoms: ['Daun menguning di bagian tepi', 'Bercak coklat pada daun', 'Layu pada pucuk']
        },
        {
            id: 2,
            date: '12/01/2025',
            time: '10:15',
            method: 'Forward Chaining',
            disease: 'Tungro',
            description: 'Penyakit virus yang ditularkan oleh wereng hijau, menyebabkan pertumbuhan terhambat.',
            confidence: 87,
            solution: 'Semprot dengan insektisida untuk mengendalikan wereng. Gunakan varietas tahan tungro.',
            symptoms: ['Pertumbuhan terhambat', 'Daun menguning', 'Tanaman kerdil']
        },
        {
            id: 3,
            date: '10/01/2025',
            time: '16:45',
            method: 'Certainty Factor',
            disease: 'Blas',
            description: 'Penyakit jamur Pyricularia oryzae yang menyerang daun, batang, dan malai padi.',
            confidence: 91,
            solution: 'Aplikasi fungisida berbahan aktif trikasiklasol. Atur jarak tanam dan drainase yang baik.',
            symptoms: ['Bercak coklat pada daun', 'Daun mengering', 'Malai patah']
        },
        {
            id: 4,
            date: '08/01/2025',
            time: '09:20',
            method: 'Forward Chaining',
            disease: 'Hawar Daun Bakteri',
            description: 'Penyakit yang disebabkan oleh bakteri Xanthomonas oryzae yang menyerang daun tanaman padi.',
            confidence: 89,
            solution: 'Gunakan bakterisida berbahan aktif oksitetrasiklin. Lakukan sanitasi lahan dan hindari genangan air berlebih.',
            symptoms: ['Daun menguning di bagian tepi', 'Bercak coklat pada daun']
        },
        {
            id: 5,
            date: '05/01/2025',
            time: '13:55',
            method: 'Certainty Factor',
            disease: 'Busuk Batang',
            description: 'Penyakit jamur yang menyerang batang padi menyebabkan busuk dan roboh.',
            confidence: 85,
            solution: 'Gunakan fungisida sistemik. Atur drainase dan hindari genangan air.',
            symptoms: ['Batang busuk dan berbau', 'Batang mudah patah', 'Tanaman roboh']
        },
        {
            id: 6,
            date: '03/01/2025',
            time: '11:30',
            method: 'Forward Chaining',
            disease: 'Kresek',
            description: 'Fase akut dari hawar daun bakteri yang menyebabkan kematian mendadak pada tanaman muda.',
            confidence: 92,
            solution: 'Aplikasi bakterisida segera. Buang tanaman terinfeksi dan sanitasi lahan.',
            symptoms: ['Daun mengering mendadak', 'Tanaman layu', 'Pertumbuhan terhambat']
        },
        {
            id: 7,
            date: '01/01/2025',
            time: '15:10',
            method: 'Certainty Factor',
            disease: 'Tungro',
            description: 'Penyakit virus yang ditularkan oleh wereng hijau, menyebabkan pertumbuhan terhambat.',
            confidence: 88,
            solution: 'Semprot dengan insektisida untuk mengendalikan wereng. Gunakan varietas tahan tungro.',
            symptoms: ['Daun menguning', 'Pertumbuhan terhambat', 'Bulir kosong']
        },
        {
            id: 8,
            date: '29/12/2024',
            time: '08:45',
            method: 'Forward Chaining',
            disease: 'Bercak Daun Coklat',
            description: 'Penyakit jamur Helminthosporium oryzae yang menyebabkan bercak coklat pada daun.',
            confidence: 86,
            solution: 'Aplikasi fungisida berbahan aktif mankoseb. Sanitasi jerami dan sisa tanaman.',
            symptoms: ['Bercak coklat pada daun', 'Daun mengering', 'Produksi menurun']
        },
        {
            id: 9,
            date: '27/12/2024',
            time: '14:20',
            method: 'Certainty Factor',
            disease: 'Blas',
            description: 'Penyakit jamur Pyricularia oryzae yang menyerang daun, batang, dan malai padi.',
            confidence: 93,
            solution: 'Aplikasi fungisida berbahan aktif trikasiklasol. Atur jarak tanam dan drainase yang baik.',
            symptoms: ['Bercak putih pada daun', 'Malai tidak keluar sempurna', 'Batang patah']
        },
        {
            id: 10,
            date: '25/12/2024',
            time: '10:50',
            method: 'Forward Chaining',
            disease: 'Hawar Upih',
            description: 'Penyakit jamur Rhizoctonia solani yang menyerang upih daun padi.',
            confidence: 84,
            solution: 'Gunakan fungisida berbahan aktif validamycin. Atur jarak tanam lebih lebar.',
            symptoms: ['Bercak pada upih daun', 'Upih daun busuk', 'Daun layu']
        },
        {
            id: 11,
            date: '23/12/2024',
            time: '16:15',
            method: 'Certainty Factor',
            disease: 'Busuk Pelepah',
            description: 'Penyakit jamur yang menyerang pelepah daun dan batang padi.',
            confidence: 90,
            solution: 'Aplikasi fungisida sistemik. Perbaiki drainase dan kurangi kelembaban.',
            symptoms: ['Pelepah busuk', 'Bercak coklat pada batang', 'Tanaman mudah roboh']
        },
        {
            id: 12,
            date: '20/12/2024',
            time: '09:30',
            method: 'Forward Chaining',
            disease: 'Tungro',
            description: 'Penyakit virus yang ditularkan oleh wereng hijau, menyebabkan pertumbuhan terhambat.',
            confidence: 86,
            solution: 'Semprot dengan insektisida untuk mengendalikan wereng. Gunakan varietas tahan tungro.',
            symptoms: ['Tanaman kerdil', 'Daun menguning', 'Malai kosong']
        },
        {
            id: 13,
            date: '18/12/2024',
            time: '13:40',
            method: 'Certainty Factor',
            disease: 'Hawar Daun Bakteri',
            description: 'Penyakit yang disebabkan oleh bakteri Xanthomonas oryzae yang menyerang daun tanaman padi.',
            confidence: 95,
            solution: 'Gunakan bakterisida berbahan aktif oksitetrasiklin. Lakukan sanitasi lahan dan hindari genangan air berlebih.',
            symptoms: ['Daun menguning di bagian tepi', 'Bercak coklat', 'Daun mengering']
        },
        {
            id: 14,
            date: '15/12/2024',
            time: '11:05',
            method: 'Forward Chaining',
            disease: 'Blas',
            description: 'Penyakit jamur Pyricularia oryzae yang menyerang daun, batang, dan malai padi.',
            confidence: 89,
            solution: 'Aplikasi fungisida berbahan aktif trikasiklasol. Atur jarak tanam dan drainase yang baik.',
            symptoms: ['Bercak coklat pada daun', 'Malai patah', 'Bulir kosong']
        },
        {
            id: 15,
            date: '12/12/2024',
            time: '15:25',
            method: 'Certainty Factor',
            disease: 'Busuk Batang',
            description: 'Penyakit jamur yang menyerang batang padi menyebabkan busuk dan roboh.',
            confidence: 87,
            solution: 'Gunakan fungisida sistemik. Atur drainase dan hindari genangan air.',
            symptoms: ['Batang busuk', 'Batang berlubang', 'Akar menghitam']
        }
    ];

    let historyData = [...sampleData];
    let currentPage = 1;
    const itemsPerPage = 10;
    let selectedRecord = null;

    function loadHistoryData() {
        const stored = localStorage.getItem('diagnosisHistory');
        
        if (stored) {
            try {
                const parsedData = JSON.parse(stored);
                if (parsedData && parsedData.length > 0) {
                    historyData = parsedData;
                } else {
                    historyData = [...sampleData];
                    localStorage.setItem('diagnosisHistory', JSON.stringify(historyData));
                }
            } catch (e) {
                historyData = [...sampleData];
                localStorage.setItem('diagnosisHistory', JSON.stringify(historyData));
            }
        } else {
            historyData = [...sampleData];
            localStorage.setItem('diagnosisHistory', JSON.stringify(historyData));
        }
    }

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown-toggle') && !e.target.closest('#delete-all-menu-btn')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.remove('show');
            });
        }
    });

    // Toggle dropdown for delete all button
    document.getElementById('delete-all-menu-btn').addEventListener('click', function(e) {
        e.stopPropagation();
        const dropdown = document.getElementById('delete-all-dropdown');
        
        // Close all other dropdowns
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            if (menu.id !== 'delete-all-dropdown') {
                menu.classList.remove('show');
            }
        });
        
        dropdown.classList.toggle('show');
    });

    function renderTable() {
        const tbody = document.getElementById('history-table-body');
        const emptyState = document.getElementById('empty-state');
        
        if (historyData.length === 0) {
            tbody.innerHTML = '';
            emptyState.classList.remove('hidden');
            document.getElementById('pagination-container').classList.add('hidden');
            return;
        }
        
        emptyState.classList.add('hidden');
        document.getElementById('pagination-container').classList.remove('hidden');
        
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageData = historyData.slice(start, end);
        
        tbody.innerHTML = pageData.map(item => `
            <tr class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 text-sm text-gray-700">${item.date}</td>
                <td class="px-6 py-4">
                    <span class="inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        item.method === 'Certainty Factor' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-blue-100 text-blue-800'
                    }">
                        ${item.method}
                    </span>
                </td>
                <td class="px-6 py-4 text-sm font-medium text-gray-800">${item.disease}</td>
                <td class="px-6 py-4">
                    <div class="flex items-center gap-2">
                        <div class="flex-1 bg-gray-200 rounded-full h-2">
                            <div class="bg-green-600 h-2 rounded-full" style="width: ${item.confidence}%"></div>
                        </div>
                        <span class="text-sm font-semibold text-gray-700">${item.confidence}%</span>
                    </div>
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">${item.solution}</td>
                <td class="px-6 py-4">
                    <div class="flex justify-center relative">
                        <button onclick="toggleDropdown(event, ${item.id})" class="dropdown-toggle text-gray-600 hover:text-gray-800 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                        <div id="dropdown-${item.id}" class="dropdown-menu bg-white rounded-lg shadow-lg border border-gray-200 py-1 mt-2">
                            <button onclick="viewDetail(${item.id})" class="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-sm text-gray-700">
                                <i class="fas fa-eye text-blue-600"></i>
                                <span>Lihat Detail</span>
                            </button>
                            <button onclick="deleteRecord(${item.id})" class="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-sm text-gray-700">
                                <i class="fas fa-trash-alt text-red-600"></i>
                                <span>Hapus</span>
                            </button>
                        </div>
                    </div>
                </td>
            </tr>
        `).join('');
        
        renderPagination();
    }

    window.toggleDropdown = function(event, id) {
        event.stopPropagation();
        const dropdown = document.getElementById(`dropdown-${id}`);
        
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            if (menu.id !== `dropdown-${id}`) {
                menu.classList.remove('show');
            }
        });
        
        dropdown.classList.toggle('show');
    }

    function renderPagination() {
        const totalPages = Math.ceil(historyData.length / itemsPerPage);
        const container = document.getElementById('pagination-buttons');
        
        let html = `
            <button onclick="changePage('prev')" class="px-3 py-1 rounded-lg ${
                currentPage === 1 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }" ${currentPage === 1 ? 'disabled' : ''}>
                <i class="fas fa-chevron-left"></i>
            </button>
        `;
        
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
                html += `
                    <button onclick="changePage(${i})" class="px-3 py-1 rounded-lg ${
                        i === currentPage 
                            ? 'bg-green-700 text-white' 
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }">
                        ${i}
                    </button>
                `;
            } else if (i === currentPage - 2 || i === currentPage + 2) {
                html += '<span class="px-2 text-gray-500">...</span>';
            }
        }
        
        html += `
            <button onclick="changePage('next')" class="px-3 py-1 rounded-lg ${
                currentPage === totalPages 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }" ${currentPage === totalPages ? 'disabled' : ''}>
                <i class="fas fa-chevron-right"></i>
            </button>
        `;
        
        container.innerHTML = html;
        
        const start = (currentPage - 1) * itemsPerPage + 1;
        const end = Math.min(currentPage * itemsPerPage, historyData.length);
        document.getElementById('showing-start').textContent = start;
        document.getElementById('showing-end').textContent = end;
        document.getElementById('total-records').textContent = historyData.length;
    }

    window.changePage = function(page) {
        const totalPages = Math.ceil(historyData.length / itemsPerPage);
        
        if (page === 'prev' && currentPage > 1) {
            currentPage--;
        } else if (page === 'next' && currentPage < totalPages) {
            currentPage++;
        } else if (typeof page === 'number') {
            currentPage = page;
        }
        
        renderTable();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    window.viewDetail = function(id) {
        selectedRecord = historyData.find(item => item.id === id);
        if (!selectedRecord) return;
        
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.classList.remove('show');
        });
        
        document.getElementById('modal-date').textContent = selectedRecord.date + ' ' + selectedRecord.time;
        document.getElementById('modal-disease').textContent = selectedRecord.disease;
        document.getElementById('modal-method').textContent = selectedRecord.method;
        document.getElementById('modal-confidence').textContent = selectedRecord.confidence + '%';
        document.getElementById('modal-solution').textContent = selectedRecord.solution;
        
        const symptomsContainer = document.getElementById('modal-symptoms');
        symptomsContainer.innerHTML = selectedRecord.symptoms.map(symptom => `
            <div class="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">
                <i class="fas fa-check-circle text-green-600"></i>
                <span>${symptom}</span>
            </div>
        `).join('');
        
        document.getElementById('detail-modal').classList.remove('hidden');
    }

    document.getElementById('close-modal-btn').addEventListener('click', closeModal);
    document.getElementById('close-modal-bottom-btn').addEventListener('click', closeModal);
    
    function closeModal() {
        document.getElementById('detail-modal').classList.add('hidden');
        selectedRecord = null;
    }

    document.getElementById('print-pdf-modal-btn').addEventListener('click', function() {
        if (!selectedRecord) return;
        
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text('Hasil Diagnosa Penyakit Padi', 105, 20, { align: 'center' });
        
        doc.setFontSize(12);
        doc.text('Tanggal: ' + selectedRecord.date, 20, 40);
        doc.text('Waktu: ' + selectedRecord.time, 20, 50);
        
        doc.setFontSize(14);
        doc.text('Penyakit:', 20, 70);
        doc.setFontSize(12);
        doc.text(selectedRecord.disease, 20, 80);
        
        doc.setFontSize(14);
        doc.text('Deskripsi:', 20, 95);
        doc.setFontSize(11);
        const descLines = doc.splitTextToSize(selectedRecord.description, 170);
        doc.text(descLines, 20, 105);
        
        doc.setFontSize(14);
        doc.text('Solusi Penanganan:', 20, 125);
        doc.setFontSize(11);
        const solLines = doc.splitTextToSize(selectedRecord.solution, 170);
        doc.text(solLines, 20, 135);
        
        doc.setFontSize(14);
        doc.text('Tingkat Keyakinan: ' + selectedRecord.confidence + '%', 20, 155);
        
        doc.setFontSize(14);
        doc.text('Gejala yang Dipilih:', 20, 175);
        doc.setFontSize(11);
        let yPos = 185;
        selectedRecord.symptoms.forEach((symptom, index) => {
            if (yPos > 270) {
                doc.addPage();
                yPos = 20;
            }
            doc.text((index + 1) + '. ' + symptom, 25, yPos);
            yPos += 7;
        });
        
        doc.setFontSize(10);
        doc.text('Pakar Padi - Sistem Pakar Diagnosis Penyakit Tanaman Padi', 105, 280, { align: 'center' });
        
        doc.save('hasil-diagnosa-' + selectedRecord.id + '.pdf');
        
        const originalHTML = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i> <span>PDF Terunduh!</span>';
        this.classList.remove('bg-green-600');
        this.classList.add('bg-green-700');
        
        setTimeout(() => {
            this.innerHTML = originalHTML;
            this.classList.remove('bg-green-700');
            this.classList.add('bg-green-600');
        }, 2000);
    });

    window.deleteRecord = function(id) {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.classList.remove('show');
        });
        
        if (!confirm('Apakah Anda yakin ingin menghapus riwayat ini?')) return;
        
        historyData = historyData.filter(item => item.id !== id);
        localStorage.setItem('diagnosisHistory', JSON.stringify(historyData));
        
        const totalPages = Math.ceil(historyData.length / itemsPerPage);
        if (currentPage > totalPages && totalPages > 0) {
            currentPage = totalPages;
        }
        
        renderTable();
    }

    document.getElementById('delete-all-btn').addEventListener('click', function() {
        if (historyData.length === 0) {
            alert('Tidak ada riwayat untuk dihapus.');
            return;
        }
        document.getElementById('delete-confirm-modal').classList.remove('hidden');
    });

    document.getElementById('confirm-delete-btn').addEventListener('click', function() {
        historyData = [];
        localStorage.setItem('diagnosisHistory', JSON.stringify(historyData));
        currentPage = 1;
        renderTable();
        document.getElementById('delete-confirm-modal').classList.add('hidden');
        
        alert('Semua riwayat diagnosa telah dihapus.');
    });

    document.getElementById('cancel-delete-btn').addEventListener('click', function() {
        document.getElementById('delete-confirm-modal').classList.add('hidden');
    });

    document.getElementById('detail-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });

    document.getElementById('delete-confirm-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.add('hidden');
        }
    });

    loadHistoryData();
    renderTable();

    setInterval(() => {
        loadHistoryData();
        renderTable();
    }, 60000);
}

// ====================================
// DIAGNOSA.HTML - Image Diagnosis Handler
// ====================================
if (document.getElementById('diagnosa-gambar-btn')) {
    document.getElementById('diagnosa-gambar-btn').addEventListener('click', function() {
        document.getElementById('diagnosa-gambar-section').classList.remove('hidden');
        document.getElementById('diagnosa-gambar-section').scrollIntoView({ behavior: 'smooth' });
    });
    
    const uploadArea = document.getElementById('upload-area');
    const imageUploadInput = document.getElementById('image-upload');
    const imagePreviewContainer = document.getElementById('image-preview-container');
    const questionsSection = document.getElementById('questions-section');
    const resultSection = document.getElementById('result-section');
    
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.style.borderColor = '#2e7d32';
        this.style.backgroundColor = '#e8f5e8';
    });
    
    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.style.borderColor = '#2e7d32';
        this.style.backgroundColor = 'transparent';
    });
    
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        this.style.borderColor = '#2e7d32';
        this.style.backgroundColor = 'transparent';
        
        const files = e.dataTransfer.files;
        handleFiles(files);
    });
    
    uploadArea.addEventListener('click', function() {
        imageUploadInput.click();
    });
    
    imageUploadInput.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            handleFiles(e.target.files);
        }
    });
    
    function handleFiles(files) {
        let totalSize = 0;
        for (let i = 0; i < files.length; i++) {
            totalSize += files[i].size;
        }
        
        if (totalSize > 10 * 1024 * 1024) {
            alert('Total ukuran file melebihi batas 10MB');
            return;
        }
        
        imagePreviewContainer.innerHTML = '<div class="flex flex-wrap gap-4"></div>';
        imagePreviewContainer.classList.remove('hidden');
        
        const previewContainer = imagePreviewContainer.querySelector('.flex');
        
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const imgDiv = document.createElement('div');
                imgDiv.className = 'relative w-full md:w-1/2 lg:w-1/3 xl:w-1/4';
                
                const img = document.createElement('img');
                img.src = e.target.result;
                img.className = 'w-full h-48 object-cover rounded-lg';
                
                const removeBtn = document.createElement('button');
                removeBtn.className = 'absolute top-2 right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center';
                removeBtn.innerHTML = '<i class="fas fa-times"></i>';
                removeBtn.addEventListener('click', function() {
                    imgDiv.remove();
                    
                    if (previewContainer.children.length === 0) {
                        imagePreviewContainer.classList.add('hidden');
                        uploadArea.style.display = 'block';
                    }
                });
                
                imgDiv.appendChild(img);
                imgDiv.appendChild(removeBtn);
                previewContainer.appendChild(imgDiv);
                
                uploadArea.style.display = 'none';
            };
            
            reader.readAsDataURL(file);
        }
        
        questionsSection.classList.remove('hidden');
        resultSection.classList.add('hidden');
    }
    
    let selectedAnswers = [null, null, null];
    
    const questionButtons = document.querySelectorAll('.question-btn');
    const prevQuestionBtn = document.getElementById('prev-question');
    const nextQuestionBtn = document.getElementById('next-question');
    let currentQuestion = 1;
    
    questionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const questionContainer = this.closest('.question-container');
            const questionNumber = parseInt(questionContainer.dataset.question);
            
            const buttonsInQuestion = questionContainer.querySelectorAll('.question-btn');
            buttonsInQuestion.forEach(btn => {
                btn.classList.remove('bg-green-700', 'text-white');
                btn.classList.add('bg-white', 'text-green-800');
            });
            
            this.classList.remove('bg-white', 'text-green-800');
            this.classList.add('bg-green-700', 'text-white');
            
            selectedAnswers[questionNumber - 1] = this.textContent;
        });
    });
    
    nextQuestionBtn.addEventListener('click', function() {
        if (selectedAnswers[currentQuestion - 1] === null) {
            alert('Silakan jawab pertanyaan ini terlebih dahulu');
            return;
        }
        
        if (currentQuestion < 3) {
            const currentQuestionDiv = document.querySelector(`.question-container[data-question="${currentQuestion}"]`);
            currentQuestionDiv.classList.add('hidden');
            
            currentQuestion++;
            const nextQuestionDiv = document.querySelector(`.question-container[data-question="${currentQuestion}"]`);
            nextQuestionDiv.classList.remove('hidden');
            
            if (currentQuestion === 3) {
                nextQuestionBtn.innerHTML = 'Mulai Diagnosa <i class="fas fa-play ml-1"></i>';
            }
            
            prevQuestionBtn.disabled = false;
            prevQuestionBtn.classList.remove('disabled:opacity-50', 'disabled:cursor-not-allowed');
        } else {
            questionsSection.classList.add('hidden');
            resultSection.classList.remove('hidden');
        }
    });
    
    prevQuestionBtn.addEventListener('click', function() {
        if (currentQuestion > 1) {
            const currentQuestionDiv = document.querySelector(`.question-container[data-question="${currentQuestion}"]`);
            currentQuestionDiv.classList.add('hidden');
            
            currentQuestion--;
            const prevQuestionDiv = document.querySelector(`.question-container[data-question="${currentQuestion}"]`);
            prevQuestionDiv.classList.remove('hidden');
            
            if (currentQuestion === 1) {
                prevQuestionBtn.disabled = true;
                prevQuestionBtn.classList.add('disabled:opacity-50', 'disabled:cursor-not-allowed');
            }
            
            nextQuestionBtn.innerHTML = 'Selanjutnya <i class="fas fa-arrow-right ml-1"></i>';
        }
    });
    
    document.getElementById('save-to-history').addEventListener('click', function() {
        const diagnosisData = {
            id: Date.now(),
            date: new Date().toLocaleDateString('id-ID'),
            time: new Date().toLocaleTimeString('id-ID'),
            disease: 'Hawar Daun Bakteri (Xanthomonas oryzae)',
            description: 'Penyakit yang disebabkan oleh bakteri Xanthomonas oryzae yang menyerang daun tanaman padi.',
            solution: 'Gunakan bakterisida berbahan aktif oksitetrasiklin. Lakukan sanitasi lahan dan hindari genangan air berlebih.',
            confidence: 94,
            answers: selectedAnswers,
            method: 'Certainty Factor'
        };

        let history = JSON.parse(localStorage.getItem('diagnosisHistory') || '[]');
        
        history.unshift(diagnosisData);
        
        localStorage.setItem('diagnosisHistory', JSON.stringify(history));
        
        const originalHTML = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i> <span>Tersimpan!</span>';
        this.classList.add('bg-green-600');
        this.classList.remove('bg-green-700');
        
        setTimeout(() => {
            this.innerHTML = originalHTML;
            this.classList.remove('bg-green-600');
            this.classList.add('bg-green-700');
        }, 2000);
    });
    
    document.getElementById('print-pdf').addEventListener('click', function() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        const diagnosisData = {
            disease: 'Hawar Daun Bakteri (Xanthomonas oryzae)',
            confidence: '94%',
            description: 'Penyakit yang disebabkan oleh bakteri Xanthomonas oryzae yang menyerang daun tanaman padi.',
            solution: 'Gunakan bakterisida berbahan aktif oksitetrasiklin. Lakukan sanitasi lahan dan hindari genangan air berlebih.',
            answers: selectedAnswers,
            date: new Date().toLocaleDateString('id-ID'),
            time: new Date().toLocaleTimeString('id-ID')
        };

        doc.setFontSize(18);
        doc.text('Hasil Diagnosa Penyakit Padi', 105, 20, { align: 'center' });
        
        doc.setFontSize(12);
        doc.text('Tanggal: ' + diagnosisData.date, 20, 40);
        doc.text('Waktu: ' + diagnosisData.time, 20, 50);
        doc.text('Metode: Certainty Factor', 20, 60);
        
        doc.setFontSize(14);
        doc.text('Penyakit:', 20, 80);
        doc.setFontSize(12);
        doc.text(diagnosisData.disease, 20, 90);
        
        doc.setFontSize(14);
        doc.text('Deskripsi:', 20, 105);
        doc.setFontSize(11);
        const descLines = doc.splitTextToSize(diagnosisData.description, 170);
        doc.text(descLines, 20, 115);
        
        doc.setFontSize(14);
        doc.text('Solusi Penanganan:', 20, 135);
        doc.setFontSize(11);
        const solLines = doc.splitTextToSize(diagnosisData.solution, 170);
        doc.text(solLines, 20, 145);
        
        doc.setFontSize(14);
        doc.text('Tingkat Keyakinan: ' + diagnosisData.confidence, 20, 165);
        
        doc.setFontSize(14);
        doc.text('Jawaban Pengguna:', 20, 185);
        doc.setFontSize(11);
        doc.text('1. Daun menguning di bagian tepi: ' + diagnosisData.answers[0], 25, 195);
        doc.text('2. Bercak coklat pada daun: ' + diagnosisData.answers[1], 25, 205);
        doc.text('3. Batang busuk atau berbau: ' + diagnosisData.answers[2], 25, 215);
        
        doc.setFontSize(10);
        doc.text('Pakar Padi - Sistem Pakar Diagnosis Penyakit Tanaman Padi', 105, 280, { align: 'center' });
        
        doc.save('hasil-diagnosa-' + Date.now() + '.pdf');
        
        const originalHTML = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i> <span>PDF Terunduh!</span>';
        this.classList.add('bg-orange-600');
        this.classList.remove('bg-orange-500');
        
        setTimeout(() => {
            this.innerHTML = originalHTML;
            this.classList.remove('bg-orange-600');
            this.classList.add('bg-orange-500');
        }, 2000);
    });
    
    document.getElementById('retry-diagnosis').addEventListener('click', function() {
        selectedAnswers = [null, null, null];
        currentQuestion = 1;
        
        resultSection.classList.add('hidden');
        
        uploadArea.style.display = 'block';
        imagePreviewContainer.classList.add('hidden');
        imagePreviewContainer.innerHTML = '<div class="flex flex-wrap gap-4"></div>';
        
        questionsSection.classList.add('hidden');
        
        const questionContainers = document.querySelectorAll('.question-container');
        questionContainers.forEach(container => {
            container.classList.add('hidden');
        });
        document.querySelector('.question-container[data-question="1"]').classList.remove('hidden');
        
        questionButtons.forEach(btn => {
            btn.classList.remove('bg-green-700', 'text-white');
            btn.classList.add('bg-white', 'text-green-800');
        });
        
        prevQuestionBtn.disabled = true;
        prevQuestionBtn.classList.add('disabled:opacity-50', 'disabled:cursor-not-allowed');
        nextQuestionBtn.innerHTML = 'Selanjutnya <i class="fas fa-arrow-right ml-1"></i>';
        
        imageUploadInput.value = '';
    });
}

// ====================================
// GEJALA.HTML - Symptom-Based Diagnosis
// ====================================
if (document.getElementById('symptoms-container')) {
    const allSymptoms = [
        { id: 1, name: 'Daun menguning di bagian tepi', category: 'daun', icon: 'fa-leaf' },
        { id: 2, name: 'Bercak coklat pada daun', category: 'daun', icon: 'fa-droplet' },
        { id: 3, name: 'Daun mengering dan layu', category: 'daun', icon: 'fa-water' },
        { id: 4, name: 'Batang busuk dan berbau', category: 'batang', icon: 'fa-exclamation-triangle' },
        { id: 5, name: 'Akar menghitam', category: 'akar', icon: 'fa-root' },
        { id: 6, name: 'Bulir padi kosong', category: 'bulir', icon: 'fa-seedling' },
        { id: 7, name: 'Pertumbuhan terhambat', category: 'pertumbuhan', icon: 'fa-arrows-alt-v' },
        { id: 8, name: 'Bercak putih pada daun', category: 'daun', icon: 'fa-paint-roller' },
        { id: 9, name: 'Daun berlubang-lubang', category: 'daun', icon: 'fa-leaf' },
        { id: 10, name: 'Batang patah mudah', category: 'batang', icon: 'fa-exclamation-triangle' },
        { id: 11, name: 'Akar membusuk', category: 'akar', icon: 'fa-root' },
        { id: 12, name: 'Malai tidak keluar sempurna', category: 'malai', icon: 'fa-seedling' },
        { id: 13, name: 'Daun menggulung', category: 'daun', icon: 'fa-leaf' },
        { id: 14, name: 'Batang berlubang', category: 'batang', icon: 'fa-exclamation-triangle' },
        { id: 15, name: 'Bulir padi berwarna hitam', category: 'bulir', icon: 'fa-seedling' },
        { id: 16, name: 'Tanaman kerdil', category: 'pertumbuhan', icon: 'fa-arrows-alt-v' },
        { id: 17, name: 'Malai kosong', category: 'malai', icon: 'fa-seedling' },
        { id: 18, name: 'Daun berbintik-bintik', category: 'daun', icon: 'fa-leaf' },
        { id: 19, name: 'Akar pendek', category: 'akar', icon: 'fa-root' },
        { id: 20, name: 'Batang menguning', category: 'batang', icon: 'fa-exclamation-triangle' }
    ];

    let selectedSymptoms = [];
    let currentFilter = 'semua';
    let currentPage = 1;
    const itemsPerPage = 8;
    let diagnosisResult = null;

    function getFilteredSymptoms() {
        if (currentFilter === 'semua') {
            return allSymptoms;
        }
        return allSymptoms.filter(symptom => symptom.category === currentFilter);
    }

    function getPaginatedSymptoms() {
        const filtered = getFilteredSymptoms();
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return filtered.slice(start, end);
    }

    function renderSymptoms() {
        const container = document.getElementById('symptoms-container');
        const symptoms = getPaginatedSymptoms();
        
        container.innerHTML = symptoms.map(symptom => `
            <div class="symptom-card ${selectedSymptoms.includes(symptom.id) ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'} p-3 rounded-lg border cursor-pointer hover:shadow-md transition" data-id="${symptom.id}">
                <div class="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center mb-2">
                    <i class="fas ${symptom.icon} text-white text-sm"></i>
                </div>
                <p class="text-sm font-medium text-gray-800">${symptom.name}</p>
                <span class="inline-block px-2 py-1 bg-gray-400 text-white text-xs rounded-full mt-2">${symptom.category.charAt(0).toUpperCase() + symptom.category.slice(1)}</span>
                ${selectedSymptoms.includes(symptom.id) ? '<div class="mt-2 text-green-700"><i class="fas fa-check text-sm"></i></div>' : ''}
            </div>
        `).join('');

        document.querySelectorAll('.symptom-card').forEach(card => {
            card.addEventListener('click', handleSymptomClick);
        });
    }

    function renderPagination() {
        const container = document.getElementById('pagination-container');
        const filtered = getFilteredSymptoms();
        const totalPages = Math.ceil(filtered.length / itemsPerPage);

        let html = `
            <button class="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-800 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}" data-page="prev">
                <i class="fas fa-chevron-left text-xs"></i>
            </button>
        `;

        for (let i = 1; i <= totalPages; i++) {
            html += `
                <button class="w-8 h-8 ${currentPage === i ? 'bg-green-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'} rounded-full flex items-center justify-center" data-page="${i}">
                    ${i}
                </button>
            `;
        }

        html += `
            <button class="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-800 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}" data-page="next">
                <i class="fas fa-chevron-right text-xs"></i>
            </button>
        `;

        container.innerHTML = html;

        document.querySelectorAll('#pagination-container button').forEach(btn => {
            btn.addEventListener('click', handlePaginationClick);
        });

        const start = (currentPage - 1) * itemsPerPage + 1;
        const end = Math.min(currentPage * itemsPerPage, filtered.length);
        document.getElementById('showing-info').textContent = `Menampilkan ${start}-${end} dari ${filtered.length} gejala`;
        document.getElementById('page-info').textContent = `Halaman ${currentPage} dari ${totalPages}`;
    }

    function handleSymptomClick(e) {
        const card = e.currentTarget;
        const id = parseInt(card.dataset.id);
        
        if (selectedSymptoms.includes(id)) {
            selectedSymptoms = selectedSymptoms.filter(sid => sid !== id);
        } else {
            selectedSymptoms.push(id);
        }
        
        renderSymptoms();
        updateSelectedSymptomsList();
        updateButtonState();
    }

    function handlePaginationClick(e) {
        const btn = e.currentTarget;
        const page = btn.dataset.page;
        const filtered = getFilteredSymptoms();
        const totalPages = Math.ceil(filtered.length / itemsPerPage);

        if (page === 'prev' && currentPage > 1) {
            currentPage--;
        } else if (page === 'next' && currentPage < totalPages) {
            currentPage++;
        } else if (page !== 'prev' && page !== 'next') {
            currentPage = parseInt(page);
        }

        renderSymptoms();
        renderPagination();
    }

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => {
                b.classList.remove('bg-green-700', 'text-white');
                b.classList.add('bg-gray-200', 'text-gray-800');
            });
            this.classList.remove('bg-gray-200', 'text-gray-800');
            this.classList.add('bg-green-700', 'text-white');

            currentFilter = this.dataset.category;
            currentPage = 1;

            renderSymptoms();
            renderPagination();
        });
    });

    function updateSelectedSymptomsList() {
        const list = document.getElementById('selected-symptoms-list');
        const total = document.getElementById('total-gejala');
        
        total.textContent = selectedSymptoms.length;
        
        if (selectedSymptoms.length === 0) {
            list.innerHTML = '<p class="text-xs text-gray-500 text-center">Belum ada gejala dipilih</p>';
            return;
        }

        list.innerHTML = selectedSymptoms.map(id => {
            const symptom = allSymptoms.find(s => s.id === id);
            return `
                <div class="flex items-center space-x-2 p-2 bg-white rounded-md">
                    <i class="fas fa-check text-green-600 text-xs"></i>
                    <span class="text-xs">${symptom.name}</span>
                </div>
            `;
        }).join('');
    }

    function updateButtonState() {
        const btn = document.getElementById('proses-diagnosa-btn');
        btn.disabled = selectedSymptoms.length === 0;
    }

    document.getElementById('proses-diagnosa-btn').addEventListener('click', function() {
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';
        this.disabled = true;
        
        setTimeout(() => {
            diagnosisResult = {
                id: Date.now(),
                date: new Date().toLocaleDateString('id-ID'),
                time: new Date().toLocaleTimeString('id-ID'),
                disease: 'Hawar Daun Bakteri (Xanthomonas oryzae)',
                description: 'Penyakit yang disebabkan oleh bakteri Xanthomonas oryzae yang menyerang daun tanaman padi.',
                solution: 'Gunakan bakterisida berbahan aktif oksitetrasiklin. Lakukan sanitasi lahan dan hindari genangan air berlebih.',
                confidence: 94,
                symptoms: selectedSymptoms.map(id => allSymptoms.find(s => s.id === id).name)
            };

            document.getElementById('disease-name').textContent = diagnosisResult.disease;
            document.getElementById('disease-description').textContent = diagnosisResult.description;
            document.getElementById('disease-solution').textContent = diagnosisResult.solution;
            document.getElementById('confidence-level').textContent = diagnosisResult.confidence + '%';

            document.getElementById('diagnosis-result').classList.remove('hidden');
            this.style.display = 'none';
        }, 1500);
    });

    document.getElementById('hapus-semua-btn').addEventListener('click', function() {
        selectedSymptoms = [];
        renderSymptoms();
        updateSelectedSymptomsList();
        updateButtonState();
        
        const btn = document.getElementById('proses-diagnosa-btn');
        btn.innerHTML = '<i class="fas fa-microscope"></i> <span>Proses Diagnosa Sekarang</span>';
        btn.style.display = 'flex';
        btn.disabled = true;
        
        document.getElementById('diagnosis-result').classList.add('hidden');
    });

    document.getElementById('save-to-history-btn').addEventListener('click', function() {
        if (!diagnosisResult) return;

        let history = JSON.parse(localStorage.getItem('diagnosisHistory') || '[]');
        
        history.unshift(diagnosisResult);
        
        localStorage.setItem('diagnosisHistory', JSON.stringify(history));
        
        const originalHTML = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i> <span>Tersimpan!</span>';
        this.classList.add('bg-green-600');
        
        setTimeout(() => {
            this.innerHTML = originalHTML;
            this.classList.remove('bg-green-600');
        }, 2000);
    });

    document.getElementById('print-pdf-btn').addEventListener('click', function() {
        if (!diagnosisResult) return;

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text('Hasil Diagnosa Penyakit Padi', 105, 20, { align: 'center' });
        
        doc.setFontSize(12);
        doc.text('Tanggal: ' + diagnosisResult.date, 20, 40);
        doc.text('Waktu: ' + diagnosisResult.time, 20, 50);
        
        doc.setFontSize(14);
        doc.text('Penyakit:', 20, 70);
        doc.setFontSize(12);
        doc.text(diagnosisResult.disease, 20, 80);
        
        doc.setFontSize(14);
        doc.text('Deskripsi:', 20, 95);
        doc.setFontSize(11);
        const descLines = doc.splitTextToSize(diagnosisResult.description, 170);
        doc.text(descLines, 20, 105);
        
        doc.setFontSize(14);
        doc.text('Solusi Penanganan:', 20, 125);
        doc.setFontSize(11);
        const solLines = doc.splitTextToSize(diagnosisResult.solution, 170);
        doc.text(solLines, 20, 135);
        
        doc.setFontSize(14);
        doc.text('Tingkat Keyakinan: ' + diagnosisResult.confidence + '%', 20, 155);
        
        doc.setFontSize(14);
        doc.text('Gejala yang Dipilih:', 20, 175);
        doc.setFontSize(11);
        let yPos = 185;
        diagnosisResult.symptoms.forEach((symptom, index) => {
            doc.text((index + 1) + '. ' + symptom, 25, yPos);
            yPos += 7;
        });
        
        doc.setFontSize(10);
        doc.text('Pakar Padi - Sistem Pakar Diagnosis Penyakit Tanaman Padi', 105, 280, { align: 'center' });
        
        doc.save('hasil-diagnosa-' + diagnosisResult.id + '.pdf');
        
        const originalHTML = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i> <span>PDF Terunduh!</span>';
        this.classList.add('bg-orange-600');
        
        setTimeout(() => {
            this.innerHTML = originalHTML;
            this.classList.remove('bg-orange-600');
        }, 2000);
    });

    document.getElementById('retry-diagnosis-btn').addEventListener('click', function() {
        selectedSymptoms = [];
        diagnosisResult = null;
        currentPage = 1;
        currentFilter = 'semua';
        
        document.querySelectorAll('.filter-btn').forEach(b => {
            b.classList.remove('bg-green-700', 'text-white');
            b.classList.add('bg-gray-200', 'text-gray-800');
        });
        document.querySelector('.filter-btn[data-category="semua"]').classList.remove('bg-gray-200', 'text-gray-800');
        document.querySelector('.filter-btn[data-category="semua"]').classList.add('bg-green-700', 'text-white');
        
        renderSymptoms();
        renderPagination();
        updateSelectedSymptomsList();
        updateButtonState();
        
        const btn = document.getElementById('proses-diagnosa-btn');
        btn.innerHTML = '<i class="fas fa-microscope"></i> <span>Proses Diagnosa Sekarang</span>';
        btn.style.display = 'flex';
        btn.disabled = true;
        
        document.getElementById('diagnosis-result').classList.add('hidden');
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    renderSymptoms();
    renderPagination();
    updateSelectedSymptomsList();
}