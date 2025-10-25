import React, { useState } from 'react';
import { ChevronDown, ChevronRight, User, Stethoscope, Database, Pill, FileText, BarChart, Settings, Shield, Image, MessageSquare } from 'lucide-react';

const BackendMenuStructure = () => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (id) => {
    setExpandedSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const menuStructure = [
    {
      id: 'auth',
      title: 'Authentication & Authorization',
      icon: Shield,
      color: 'bg-blue-500',
      description: 'Sistem keamanan dan manajemen akses user',
      features: [
        {
          name: 'Register',
          endpoint: 'POST /api/v1/auth/register',
          functions: [
            'Pendaftaran user baru (petani/ahli/admin)',
            'Validasi email & username unik',
            'Password hashing dengan bcrypt',
            'Kirim email verifikasi',
            'Auto-create user profile'
          ]
        },
        {
          name: 'Login',
          endpoint: 'POST /api/v1/auth/login',
          functions: [
            'Autentikasi user dengan email/username',
            'Generate JWT access & refresh token',
            'Track login history & device',
            'Return user profile & permissions',
            'Set session timeout'
          ]
        },
        {
          name: 'Refresh Token',
          endpoint: 'POST /api/v1/auth/refresh',
          functions: [
            'Generate new access token',
            'Validasi refresh token',
            'Extend session jika valid',
            'Track token refresh activity'
          ]
        },
        {
          name: 'Logout',
          endpoint: 'POST /api/v1/auth/logout',
          functions: [
            'Invalidate JWT token',
            'Clear server-side session',
            'Log logout activity',
            'Revoke refresh token'
          ]
        },
        {
          name: 'Password Reset',
          endpoint: 'POST /api/v1/auth/reset-password',
          functions: [
            'Request reset link via email',
            'Generate secure reset token',
            'Validate token & update password',
            'Send confirmation email'
          ]
        }
      ]
    },
    {
      id: 'diagnosis',
      title: 'Diagnosis System',
      icon: Stethoscope,
      color: 'bg-green-500',
      description: 'Sistem inti untuk diagnosa penyakit padi',
      features: [
        {
          name: 'Start Diagnosis Session',
          endpoint: 'POST /api/v1/diagnosis/start',
          functions: [
            'Buat session diagnosis baru',
            'Generate unique session ID',
            'Catat informasi awal (lokasi, varietas padi, umur tanam)',
            'Set status: in_progress',
            'Initialize session data di Redis untuk caching',
            'Return session ID untuk tracking'
          ]
        },
        {
          name: 'Upload Disease Image',
          endpoint: 'POST /api/v1/diagnosis/{session_id}/upload-image',
          functions: [
            'Upload foto penyakit (multiple upload)',
            'Validasi format image (jpg, png)',
            'Compress & optimize image',
            'Upload ke cloud storage (S3/Cloudinary)',
            'Trigger AI image analysis (background job)',
            'Store image metadata di database',
            'Return image URL & analysis status'
          ]
        },
        {
          name: 'AI Image Analysis',
          endpoint: 'GET /api/v1/diagnosis/{session_id}/analysis',
          functions: [
            'Run CNN model untuk deteksi penyakit',
            'Return top 3-5 kandidat penyakit',
            'Confidence score untuk setiap prediksi',
            'Deteksi area terinfeksi (bounding box)',
            'Severity estimation dari gambar',
            'Store hasil analisis di database'
          ]
        },
        {
          name: 'Generate Follow-up Questions',
          endpoint: 'GET /api/v1/diagnosis/{session_id}/questions',
          functions: [
            'Generate pertanyaan berdasarkan hasil AI',
            'Pertanyaan dinamis sesuai kandidat penyakit',
            'Skala penilaian 0-5 untuk setiap gejala',
            'Pertanyaan dengan foto contoh gejala',
            'Prioritas pertanyaan (discriminative symptoms)',
            'Adaptive questioning (skip jika confidence tinggi)'
          ]
        },
        {
          name: 'Submit Symptom Answers',
          endpoint: 'POST /api/v1/diagnosis/{session_id}/answer',
          functions: [
            'Simpan jawaban user untuk setiap gejala',
            'Validasi skala jawaban (0-5)',
            'Update diagnosis confidence score real-time',
            'Determine jika perlu pertanyaan tambahan',
            'Track progress (berapa pertanyaan sudah dijawab)',
            'Auto-save untuk prevent data loss'
          ]
        },
        {
          name: 'Run Final Analysis',
          endpoint: 'POST /api/v1/diagnosis/{session_id}/analyze',
          functions: [
            'Combine hasil AI image + symptom responses',
            'Weighted scoring (60% image, 40% symptoms)',
            'Rule-based expert system validation',
            'Calculate final confidence score',
            'Determine primary & secondary diseases',
            'Generate AI reasoning/explanation',
            'Set session status: completed'
          ]
        },
        {
          name: 'Get Diagnosis Result',
          endpoint: 'GET /api/v1/diagnosis/{session_id}/result',
          functions: [
            'Return diagnosis final dengan confidence',
            'Informasi lengkap penyakit terdeteksi',
            'Severity level (ringan/sedang/parah)',
            'AI explanation dalam bahasa Indonesia',
            'Alternative diagnosis jika confidence rendah',
            'Link ke treatment recommendations'
          ]
        },
        {
          name: 'Get Treatment Plan',
          endpoint: 'GET /api/v1/diagnosis/{session_id}/treatment',
          functions: [
            'Generate treatment plan step-by-step',
            'AI-generated detailed instructions',
            'Rekomendasi obat/pestisida specific',
            'Dosis & cara aplikasi yang tepat',
            'Timeline penanganan (hari 1-7, minggu 2-4)',
            'Tindakan pencegahan untuk mencegah penyebaran',
            'Monitoring checklist pasca-treatment',
            'Export ke PDF untuk di-print'
          ]
        },
        {
          name: 'Submit Feedback',
          endpoint: 'POST /api/v1/diagnosis/{session_id}/feedback',
          functions: [
            'User rating diagnosis accuracy (1-5)',
            'Feedback apakah treatment berhasil',
            'Upload foto hasil treatment (optional)',
            'Notes tambahan dari user',
            'Store untuk improvement model AI',
            'Analytics untuk track success rate'
          ]
        }
      ]
    },
    {
      id: 'diseases',
      title: 'Disease Management',
      icon: Database,
      color: 'bg-red-500',
      description: 'Database dan manajemen penyakit padi',
      features: [
        {
          name: 'List All Diseases',
          endpoint: 'GET /api/v1/diseases',
          functions: [
            'Tampilkan semua penyakit padi',
            'Filter by category (fungal, bacterial, viral, pest)',
            'Filter by severity level',
            'Search by name',
            'Pagination support',
            'Sort by name/severity/frequency'
          ]
        },
        {
          name: 'Get Disease Detail',
          endpoint: 'GET /api/v1/diseases/{id}',
          functions: [
            'Informasi lengkap satu penyakit',
            'Deskripsi & karakteristik',
            'Daftar gejala utama & sekunder',
            'Foto-foto contoh penyakit',
            'Statistik kasus (berapa kali terdeteksi)',
            'Related diseases (mirip)',
            'Treatment protocols tersedia'
          ]
        },
        {
          name: 'Create Disease (Admin)',
          endpoint: 'POST /api/v1/diseases',
          functions: [
            'Admin tambah penyakit baru',
            'Input data lengkap penyakit',
            'Upload foto referensi',
            'Link ke symptoms terkait',
            'Set severity level & category',
            'Validasi data completeness'
          ]
        },
        {
          name: 'Update Disease (Admin)',
          endpoint: 'PUT /api/v1/diseases/{id}',
          functions: [
            'Edit informasi penyakit',
            'Update foto & deskripsi',
            'Modify linked symptoms',
            'Change severity classification',
            'Track revision history',
            'Notify users jika ada update major'
          ]
        },
        {
          name: 'Delete Disease (Admin)',
          endpoint: 'DELETE /api/v1/diseases/{id}',
          functions: [
            'Soft delete penyakit',
            'Archive historical diagnosis data',
            'Prevent deletion jika ada diagnosis aktif',
            'Log deletion activity'
          ]
        },
        {
          name: 'Disease Statistics',
          endpoint: 'GET /api/v1/diseases/{id}/statistics',
          functions: [
            'Total kasus terdeteksi',
            'Trend per bulan/tahun',
            'Geographic distribution',
            'Success rate treatment',
            'Most affected rice varieties',
            'Seasonal patterns'
          ]
        }
      ]
    },
    {
      id: 'symptoms',
      title: 'Symptoms Management',
      icon: FileText,
      color: 'bg-yellow-500',
      description: 'Database gejala penyakit untuk diagnosis',
      features: [
        {
          name: 'List All Symptoms',
          endpoint: 'GET /api/v1/symptoms',
          functions: [
            'Daftar semua gejala penyakit padi',
            'Filter by category (leaf, stem, root, panicle)',
            'Search by description',
            'Group by affected plant part',
            'Show associated diseases'
          ]
        },
        {
          name: 'Get Symptom Detail',
          endpoint: 'GET /api/v1/symptoms/{id}',
          functions: [
            'Detail lengkap satu gejala',
            'Deskripsi visual & tekstual',
            'Foto contoh berbagai tingkat severity',
            'Diseases yang memiliki gejala ini',
            'Discriminative power (seberapa spesifik)',
            'Differential diagnosis hints'
          ]
        },
        {
          name: 'Create Symptom (Admin)',
          endpoint: 'POST /api/v1/symptoms',
          functions: [
            'Tambah gejala baru',
            'Set category & severity indicator',
            'Upload foto contoh',
            'Link ke diseases terkait',
            'Set weight/importance untuk diagnosis'
          ]
        },
        {
          name: 'Update Symptom (Admin)',
          endpoint: 'PUT /api/v1/symptoms/{id}',
          functions: [
            'Edit informasi gejala',
            'Update foto & deskripsi',
            'Modify disease associations',
            'Adjust diagnostic weight'
          ]
        },
        {
          name: 'Symptom Correlation Analysis',
          endpoint: 'GET /api/v1/symptoms/correlation',
          functions: [
            'Analisis gejala yang sering muncul bersamaan',
            'Correlation matrix antar gejala',
            'Pattern discovery untuk improve diagnosis',
            'Suggest question sequences'
          ]
        }
      ]
    },
    {
      id: 'medications',
      title: 'Medication Database',
      icon: Pill,
      color: 'bg-purple-500',
      description: 'Database obat dan pestisida untuk treatment',
      features: [
        {
          name: 'List Medications',
          endpoint: 'GET /api/v1/medications',
          functions: [
            'Daftar semua obat/pestisida tersedia',
            'Filter by type (fungicide, insecticide, bactericide)',
            'Filter by form (liquid, powder, granule)',
            'Search by name/active ingredient',
            'Filter by safety level',
            'Show availability status'
          ]
        },
        {
          name: 'Get Medication Detail',
          endpoint: 'GET /api/v1/medications/{id}',
          functions: [
            'Informasi lengkap obat',
            'Komposisi & bahan aktif',
            'Brand names & manufacturers',
            'Harga kisaran (jika ada)',
            'Safety data sheet',
            'Foto produk',
            'Registration number & approval',
            'Diseases yang bisa ditangani',
            'User reviews/ratings (optional)'
          ]
        },
        {
          name: 'Search Medications',
          endpoint: 'GET /api/v1/medications/search',
          functions: [
            'Search by disease',
            'Search by active ingredient',
            'Filter by price range',
            'Sort by effectiveness rating',
            'Show alternatives/generic versions',
            'Availability by location'
          ]
        },
        {
          name: 'Get Usage Instructions',
          endpoint: 'GET /api/v1/medications/{id}/instructions',
          functions: [
            'Panduan penggunaan detail',
            'Dosis untuk berbagai severity levels',
            'Cara aplikasi (spray, inject, soil drench)',
            'Timing optimal (pagi/sore, before/after rain)',
            'Frekuensi aplikasi',
            'Durasi treatment',
            'Safety precautions',
            'Storage instructions',
            'What to do if overdose/underdose'
          ]
        },
        {
          name: 'Medication Compatibility',
          endpoint: 'GET /api/v1/medications/{id}/compatibility',
          functions: [
            'Check kompatibilitas dengan obat lain',
            'Tank mix compatibility',
            'Interactions & contraindications',
            'Sequential application guidelines',
            'Warn jika ada incompatibility'
          ]
        },
        {
          name: 'Create Medication (Admin)',
          endpoint: 'POST /api/v1/medications',
          functions: [
            'Tambah obat baru ke database',
            'Input data lengkap',
            'Upload product images',
            'Set safety classifications',
            'Link to applicable diseases'
          ]
        }
      ]
    },
    {
      id: 'treatments',
      title: 'Treatment Protocols',
      icon: MessageSquare,
      color: 'bg-teal-500',
      description: 'Protokol penanganan penyakit',
      features: [
        {
          name: 'Get Treatment by Disease',
          endpoint: 'GET /api/v1/treatments/disease/{disease_id}',
          functions: [
            'Treatment protocols untuk penyakit specific',
            'Step-by-step instructions',
            'Multiple treatment approaches (organic, chemical, integrated)',
            'Timeline penanganan lengkap',
            'Expected outcomes & success indicators',
            'Alternative treatments jika gagal'
          ]
        },
        {
          name: 'Generate Custom Treatment Plan',
          endpoint: 'POST /api/v1/treatments/generate',
          functions: [
            'AI-generated treatment plan',
            'Customized berdasarkan severity & context',
            'Consider umur tanaman',
            'Consider lokasi & musim',
            'Adjust untuk varietas padi specific',
            'Include budget considerations (optional)',
            'Generate PDF report'
          ]
        },
        {
          name: 'Get Treatment Steps',
          endpoint: 'GET /api/v1/treatments/{treatment_id}/steps',
          functions: [
            'Detail setiap langkah treatment',
            'Step number & sequence',
            'Durasi setiap step',
            'Required materials & tools',
            'Video tutorials (jika ada)',
            'Common mistakes to avoid',
            'Success checkpoints'
          ]
        },
        {
          name: 'Treatment Progress Tracking',
          endpoint: 'POST /api/v1/treatments/{treatment_id}/progress',
          functions: [
            'User update progress treatment',
            'Mark steps as completed',
            'Upload progress photos',
            'Notes untuk setiap step',
            'Calculate completion percentage',
            'Reminder untuk next step',
            'Alert jika ada deviation dari protocol'
          ]
        },
        {
          name: 'Create Treatment Protocol (Admin)',
          endpoint: 'POST /api/v1/treatments',
          functions: [
            'Buat protocol treatment baru',
            'Define steps dengan detail',
            'Link medications required',
            'Set timeline & monitoring points',
            'Add video/image guides',
            'Peer review before publish'
          ]
        }
      ]
    },
    {
      id: 'user',
      title: 'User Management',
      icon: User,
      color: 'bg-indigo-500',
      description: 'Manajemen profil dan data user',
      features: [
        {
          name: 'Get User Profile',
          endpoint: 'GET /api/v1/user/profile',
          functions: [
            'Data profil user lengkap',
            'Personal information',
            'Farm details (luas lahan, varietas, dll)',
            'Contact information',
            'Account settings',
            'Subscription status (if any)'
          ]
        },
        {
          name: 'Update Profile',
          endpoint: 'PUT /api/v1/user/profile',
          functions: [
            'Edit informasi pribadi',
            'Update farm details',
            'Change profile photo',
            'Update preferences',
            'Language selection'
          ]
        },
        {
          name: 'Diagnosis History',
          endpoint: 'GET /api/v1/user/history',
          functions: [
            'Riwayat semua diagnosis',
            'Filter by date range',
            'Filter by disease',
            'Show status (completed, ongoing)',
            'Quick access ke results & treatments',
            'Statistics personal (total diagnoses, success rate)',
            'Export history to CSV/PDF'
          ]
        },
        {
          name: 'Get Diagnosis Detail from History',
          endpoint: 'GET /api/v1/user/history/{session_id}',
          functions: [
            'Recall diagnosis session lengkap',
            'Semua data & images uploaded',
            'Questions & answers submitted',
            'Final diagnosis & confidence',
            'Treatment plan yang diberikan',
            'Progress updates (if tracked)',
            'Outcome feedback (if submitted)'
          ]
        },
        {
          name: 'Bookmarks/Favorites',
          endpoint: 'GET /api/v1/user/favorites',
          functions: [
            'Save articles/tips favorite',
            'Bookmark medications useful',
            'Save custom treatment plans',
            'Quick access resources'
          ]
        },
        {
          name: 'Notifications',
          endpoint: 'GET /api/v1/user/notifications',
          functions: [
            'Notifikasi sistem',
            'Treatment reminders',
            'New disease alerts di area user',
            'Update dari diagnosis sebelumnya',
            'Tips & recommendations',
            'Mark as read functionality'
          ]
        }
      ]
    },
    {
      id: 'analytics',
      title: 'Analytics & Reports',
      icon: BarChart,
      color: 'bg-pink-500',
      description: 'Analitik dan laporan sistem (Admin)',
      features: [
        {
          name: 'Disease Distribution Analytics',
          endpoint: 'GET /api/v1/analytics/diseases',
          functions: [
            'Distribusi penyakit by region',
            'Trend penyakit per bulan/tahun',
            'Most common diseases',
            'Emerging diseases',
            'Seasonal patterns',
            'Heatmap geographic',
            'Prediction spread disease (optional)'
          ]
        },
        {
          name: 'Diagnosis Accuracy Metrics',
          endpoint: 'GET /api/v1/analytics/accuracy',
          functions: [
            'Overall accuracy rate',
            'Accuracy per disease',
            'False positive/negative rates',
            'Confidence score distribution',
            'User feedback correlation',
            'Model performance tracking',
            'Improvement over time'
          ]
        },
        {
          name: 'User Engagement Analytics',
          endpoint: 'GET /api/v1/analytics/users',
          functions: [
            'Total users & growth rate',
            'Active users (DAU, MAU)',
            'Diagnosis frequency per user',
            'Feature usage statistics',
            'User retention metrics',
            'Geographic distribution users',
            'Device & platform statistics'
          ]
        },
        {
          name: 'Treatment Effectiveness',
          endpoint: 'GET /api/v1/analytics/treatment-effectiveness',
          functions: [
            'Success rate per treatment protocol',
            'Most effective medications',
            'Treatment duration analysis',
            'Cost-effectiveness comparison',
            'User compliance rates',
            'Factors affecting success'
          ]
        },
        {
          name: 'System Performance Metrics',
          endpoint: 'GET /api/v1/analytics/system',
          functions: [
            'API response times',
            'Image processing times',
            'AI model latency',
            'Error rates & types',
            'Server resource usage',
            'Database query performance',
            'Uptime & availability'
          ]
        },
        {
          name: 'Generate Reports',
          endpoint: 'POST /api/v1/analytics/reports/generate',
          functions: [
            'Generate custom reports',
            'Select date range & metrics',
            'Export to PDF/Excel',
            'Schedule recurring reports',
            'Email reports to stakeholders',
            'Visual dashboards'
          ]
        }
      ]
    },
    {
      id: 'admin',
      title: 'Admin Panel',
      icon: Settings,
      color: 'bg-gray-500',
      description: 'Panel administrasi sistem',
      features: [
        {
          name: 'User Management',
          endpoint: 'GET /api/v1/admin/users',
          functions: [
            'View all users',
            'User roles management (admin, expert, user)',
            'Ban/suspend users',
            'Reset passwords',
            'View user activity logs',
            'Manage subscriptions'
          ]
        },
        {
          name: 'Content Moderation',
          endpoint: 'GET /api/v1/admin/moderation',
          functions: [
            'Review user-uploaded images',
            'Moderate user feedback/reviews',
            'Flag inappropriate content',
            'Approve/reject user contributions',
            'Handle reported content'
          ]
        },
        {
          name: 'AI Model Management',
          endpoint: 'GET /api/v1/admin/ai-models',
          functions: [
            'View active ML models',
            'Switch between model versions',
            'Upload new trained models',
            'Monitor model performance',
            'Trigger retraining pipelines',
            'A/B testing models'
          ]
        },
        {
          name: 'Database Maintenance',
          endpoint: 'POST /api/v1/admin/maintenance',
          functions: [
            'Backup database',
            'Cleanup old data',
            'Optimize queries',
            'Rebuild indexes',
            'Data migration tools',
            'Import/export bulk data'
          ]
        },
        {
          name: 'System Configuration',
          endpoint: 'GET /api/v1/admin/config',
          functions: [
            'Update system settings',
            'API rate limits',
            'Feature flags (enable/disable features)',
            'Email templates',
            'Notification settings',
            'Integration credentials'
          ]
        },
        {
          name: 'Audit Logs',
          endpoint: 'GET /api/v1/admin/audit-logs',
          functions: [
            'View all system activities',
            'User actions tracking',
            'Admin actions log',
            'API access logs',
            'Security events',
            'Filter & search logs',
            'Export logs for compliance'
          ]
        }
      ]
    },
    {
      id: 'knowledge',
      title: 'Knowledge Base',
      icon: FileText,
      color: 'bg-orange-500',
      description: 'Basis pengetahuan & edukasi',
      features: [
        {
          name: 'Articles & Tips',
          endpoint: 'GET /api/v1/knowledge/articles',
          functions: [
            'Articles tentang perawatan padi',
            'Tips pencegahan penyakit',
            'Best practices farming',
            'Seasonal recommendations',
            'Category & tag based filtering',
            'Search articles'
          ]
        },
        {
          name: 'FAQs',
          endpoint: 'GET /api/v1/knowledge/faqs',
          functions: [
            'Frequently asked questions',
            'Category-based FAQs',
            'Search FAQs',
            'Helpful votes (upvote/downvote)',
            'Suggest new questions'
          ]
        },
        {
          name: 'Video Tutorials',
          endpoint: 'GET /api/v1/knowledge/videos',
          functions: [
            'Video guides step-by-step',
            'How-to treatments',
            'Proper pesticide application',
            'Disease identification guides',
            'Category & duration filters'
          ]
        },
        {
          name: 'Disease Encyclopedia',
          endpoint: 'GET /api/v1/knowledge/encyclopedia',
          functions: [
            'Comprehensive disease information',
            'Visual identification guides',
            'Life cycle pathogens',
            'Prevention strategies',
            'Historical context',
            'Research papers & references'
          ]
        },
        {
          name: 'Seasonal Calendar',
          endpoint: 'GET /api/v1/knowledge/calendar',
          functions: [
            'Planting calendar',
            'Disease risk periods',
            'Optimal treatment timing',
            'Maintenance schedules',
            'Regional variations',
            'Weather-based recommendations'
          ]
        }
      ]
    }
  ];

  const FeatureItem = ({ feature }) => (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 mb-3">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-gray-800">{feature.name}</h4>
        <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
          {feature.endpoint}
        </code>
      </div>
      <ul className="space-y-1 mt-3">
        {feature.functions.map((func, idx) => (
          <li key={idx} className="text-sm text-gray-600 flex items-start">
            <span className="text-green-500 mr-2 mt-1">✓</span>
            <span>{func}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  const MenuSection = ({ section }) => {
    const Icon = section.icon;
    const isExpanded = expandedSections[section.id];

    return (
      <div className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection(section.id)}
          className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className={`${section.color} p-2 rounded-lg`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-gray-800">{section.title}</h3>
              <p className="text-sm text-gray-500">{section.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
              {section.features.length} fitur
            </span>
            {isExpanded ? (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </button>
        
        {isExpanded && (
          <div className="p-4 bg-gray-50">
            {section.features.map((feature, idx) => (
              <FeatureItem key={idx} feature={feature} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Struktur Menu Backend - Sistem Pakar Padi
          </h1>
          <p className="text-gray-600">
            Dokumentasi lengkap fitur dan fungsi setiap menu dalam sistem backend
          </p>
          <div className="mt-4 flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">
                Total: <strong>{menuStructure.length}</strong> Menu Utama
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600">
                Total: <strong>
                  {menuStructure.reduce((sum, section) => sum + section.features.length, 0)}
                </strong> Fitur/Endpoint
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {menuStructure.map((section) => (
            <MenuSection key={section.id} section={section} />
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 mt-6 text-white">
          <h3 className="text-xl font-bold mb-3">Ringkasan Sistem</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
              <div className="text-3xl font-bold mb-1">
                {menuStructure.length}
              </div>
              <div className="text-sm text-blue-100">Menu Utama</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
              <div className="text-3xl font-bold mb-1">
                {menuStructure.reduce((sum, s) => sum + s.features.length, 0)}
              </div>
              <div className="text-sm text-blue-100">Total Fitur</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
              <div className="text-3xl font-bold mb-1">
                {menuStructure.reduce((sum, s) => 
                  sum + s.features.reduce((fsum, f) => fsum + f.functions.length, 0), 0
                )}
              </div>
              <div className="text-sm text-blue-100">Total Fungsi</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackendMenuStructure;