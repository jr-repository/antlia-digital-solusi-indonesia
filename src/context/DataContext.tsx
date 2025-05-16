import React, { createContext, useContext, useState, useEffect } from 'react';

// Types
export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  summary: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  featured: boolean;
  image: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  features: string[];
  image: string;
}

export interface PricingPlan {
  id: string;
  price: string;
  name: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface Client {
  id: string;
  name: string;
  logo: string;
  industry: string;
  location: string;
  implementation: string;
  caseStudy?: {
    title: string;
    description: string;
    challenge: string;
    solution: string;
    result: string;
    image: string;
  };
}

export interface Testimonial {
  id: number;
  name: string;
  company: string;
  image: string;
  testimonial: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  photo: string;
  socials: {
    linkedin: string;
    twitter: string;
    instagram: string;
  };
}

export interface FooterInfo {
  companyInfo: {
    description: string;
    socialLinks: {
      instagram: string;
      linkedin: string;
    }
  };
  quickLinks: {
    id: string;
    name: string;
    url: string;
  }[];
  products: {
    id: string;
    name: string;
    url: string;
  }[];
  contactInfo: {
    address: string;
    phone: string;
    officeHours: {
      weekday: string;
      saturday: string;
      support: string;
    };
  };
}

type DataContextType = {
  articles: Article[];
  services: Service[];
  pricing: PricingPlan[];
  clients: Client[];
  testimonials: Testimonial[];
  team: TeamMember[];
  footerInfo: FooterInfo;
  addArticle: (article: Omit<Article, 'id'>) => void;
  updateArticle: (id: string, article: Partial<Article>) => void;
  deleteArticle: (id: string) => void;
  getArticleById: (id: string) => Article | undefined;
  updatePricing: (id: string, plan: Partial<PricingPlan>) => void;
  updateClient: (id: string, client: Partial<Client>) => void;
  addClient: (client: Omit<Client, 'id'>) => void;
  deleteClient: (id: string) => void;
  updateTestimonial: (id: number, testimonial: Partial<Testimonial>) => void;
  addTestimonial: (testimonial: Omit<Testimonial, 'id'>) => void;
  deleteTestimonial: (id: number) => void;
  updateTeam: (id: string, member: Partial<TeamMember>) => void;
  addTeamMember: (member: Omit<TeamMember, 'id'>) => void;
  deleteTeamMember: (id: string) => void;
  updateFooter: (footerInfo: Partial<FooterInfo>) => void;
};

// Sample articles
const sampleArticles: Article[] = [
  {
    id: '1',
    title: 'Pentingnya Implementasi ERP untuk Bisnis Modern',
    slug: 'pentingnya-implementasi-erp-untuk-bisnis-modern',
    summary: 'Sistem ERP dapat meningkatkan efisiensi dan produktivitas perusahaan Anda secara signifikan. Berikut adalah beberapa manfaatnya.',
    content: `<p>Enterprise Resource Planning (ERP) adalah sebuah sistem yang dirancang untuk mengintegrasikan dan mengelola proses bisnis inti dalam suatu perusahaan. Dengan ERP, perusahaan dapat mengotomatisasi banyak aspek operasional dan memberikan akses informasi real-time kepada semua departemen.</p>
    
    <p>Dalam era digital saat ini, implementasi ERP menjadi sangat penting bagi bisnis modern karena beberapa alasan:</p>
    
    <h3>1. Integrasi Data dan Proses Bisnis</h3>
    <p>ERP memungkinkan semua departemen dalam perusahaan untuk bekerja dengan database terpadu, memastikan bahwa informasi yang diakses oleh setiap departemen konsisten dan akurat.</p>
    
    <h3>2. Peningkatan Efisiensi Operasional</h3>
    <p>Dengan otomatisasi proses bisnis, ERP dapat mengurangi waktu yang diperlukan untuk menyelesaikan tugas-tugas rutin, meningkatkan produktivitas, dan mengurangi biaya operasional.</p>
    
    <h3>3. Analisis Data yang Lebih Baik</h3>
    <p>Sistem ERP modern dilengkapi dengan alat analitik yang memungkinkan perusahaan untuk mendapatkan wawasan dari data bisnis mereka, membantu dalam pengambilan keputusan yang lebih baik.</p>
    
    <h3>4. Peningkatan Layanan Pelanggan</h3>
    <p>Dengan akses cepat ke informasi pelanggan dan riwayat pembelian, staf dapat memberikan layanan yang lebih cepat dan lebih personal kepada pelanggan.</p>
    
    <h3>5. Kepatuhan dan Manajemen Risiko</h3>
    <p>ERP membantu perusahaan dalam mematuhi peraturan industri dan pemerintah dengan melacak dan melaporkan data yang diperlukan untuk kepatuhan.</p>
    
    <h3>Kesimpulan</h3>
    <p>Implementasi ERP bukanlah hanya tentang teknologi, tetapi juga tentang mengubah cara bisnis beroperasi. Dengan perencanaan yang matang dan implementasi yang tepat, ERP dapat menjadi alat yang sangat berharga bagi bisnis modern untuk tetap kompetitif di pasar yang cepat berubah.</p>`,
    image: '/assets/article-1.jpg',
    author: 'Tim Antlia',
    date: '2023-10-15',
    category: 'ERP',
    excerpt: 'Sistem ERP dapat meningkatkan efisiensi dan produktivitas perusahaan Anda secara signifikan.',
    tags: ['ERP', 'Bisnis Modern'],
    featured: true,
  },
  {
    id: '2',
    title: 'Manfaat Warehouse Management System dalam Optimasi Logistik',
    slug: 'manfaat-wms-dalam-optimasi-logistik',
    summary: 'WMS modern dapat meningkatkan efisiensi gudang dan menurunkan biaya operasional secara drastis. Pelajari lebih lanjut tentang manfaatnya.',
    content: `<p>Warehouse Management System (WMS) adalah solusi software yang dirancang untuk mengoptimalkan operasi gudang harian. Dengan WMS yang baik, bisnis dapat mengelola inventaris, mengarahkan dan mengoptimalkan tugas penyimpanan stok, dan memberikan laporan inventaris yang akurat.</p>
    
    <p>Berikut adalah beberapa manfaat utama dari mengimplementasikan WMS dalam operasi logistik Anda:</p>
    
    <h3>1. Peningkatan Akurasi Inventaris</h3>
    <p>WMS modern menggunakan teknologi seperti barcode dan RFID untuk melacak pergerakan barang secara real-time, mengurangi kesalahan manusia, dan memberikan visibilitas inventaris yang lebih baik.</p>
    
    <h3>2. Efisiensi Ruang dan Penggunaan Gudang</h3>
    <p>Dengan WMS, ruang gudang dapat dioptimalkan dengan merekomendasikan lokasi penyimpanan terbaik berdasarkan ukuran barang, frekuensi pengambilan, dan faktor lainnya.</p>
    
    <h3>3. Pengurangan Biaya Operasional</h3>
    <p>Dengan mengurangi kebutuhan manual handling dan meningkatkan efisiensi operasi, WMS dapat secara signifikan mengurangi biaya tenaga kerja dan biaya operasional lainnya.</p>
    
    <h3>4. Peningkatan Layanan Pelanggan</h3>
    <p>Akurasi yang lebih tinggi dalam pemrosesan pesanan, pengurangan backorder, dan pengiriman yang lebih cepat semuanya berkontribusi pada peningkatan kepuasan pelanggan.</p>
    
    <h3>5. Integrasi dengan Sistem Lain</h3>
    <p>WMS modern dapat terintegrasi dengan sistem ERP, TMS, dan sistem bisnis lainnya, memungkinkan aliran informasi yang mulus di seluruh rantai pasokan.</p>
    
    <h3>Kesimpulan</h3>
    <p>Implementasi WMS yang sukses dapat menjadi game-changer untuk operasi logistik bisnis Anda. Dengan perencanaan yang tepat dan pemilihan sistem yang sesuai dengan kebutuhan spesifik Anda, WMS dapat memberikan ROI yang substansial melalui peningkatan efisiensi, akurasi, dan layanan pelanggan.</p>`,
    image: '/assets/article-2.jpg',
    author: 'Tim Antlia',
    date: '2023-11-05',
    category: 'WMS',
    excerpt: 'WMS modern dapat meningkatkan efisiensi gudang dan menurunkan biaya operasional secara drastis.',
    tags: ['WMS', 'Logistik'],
    featured: false,
  },
  {
    id: '3',
    title: 'IoT dalam Industri Manufaktur: Transformasi Digital 4.0',
    slug: 'iot-dalam-industri-manufaktur',
    summary: 'Bagaimana Internet of Things (IoT) mengubah lanskap industri manufaktur modern melalui otomatisasi dan analitik real-time.',
    content: `<p>Internet of Things (IoT) telah muncul sebagai pendorong utama Industri 4.0, terutama di sektor manufaktur. Dengan menghubungkan mesin dan peralatan ke internet, perusahaan manufaktur dapat mengumpulkan dan menganalisis data untuk mendapatkan wawasan yang lebih dalam tentang operasi mereka.</p>
    
    <p>Mari kita lihat bagaimana IoT mengubah industri manufaktur:</p>
    
    <h3>1. Pemantauan dan Pemeliharaan Prediktif</h3>
    <p>Sensor IoT dapat memantau kondisi mesin secara real-time dan mengidentifikasi potensi masalah sebelum menyebabkan kerusakan atau downtime yang mahal. Hal ini memungkinkan pemeliharaan prediktif, yang dapat mengurangi biaya perbaikan dan meningkatkan umur peralatan.</p>
    
    <h3>2. Otomatisasi dan Optimasi Produksi</h3>
    <p>IoT memungkinkan otomatisasi yang lebih canggih di lantai produksi. Mesin dapat berkomunikasi satu sama lain, menyesuaikan parameter produksi secara otomatis, dan mengoptimalkan alur kerja untuk efisiensi maksimum.</p>
    
    <h3>3. Manajemen Inventaris dan Rantai Pasokan</h3>
    <p>Dengan melacak bahan dan produk melalui seluruh rantai pasokan, IoT dapat membantu perusahaan manufaktur mengelola inventaris mereka dengan lebih baik, mengurangi kekurangan stok, dan mengoptimalkan tingkat persediaan.</p>
    
    <h3>4. Peningkatan Kualitas dan Keamanan</h3>
    <p>Sensor IoT dapat memantau parameter kualitas selama produksi, mengidentifikasi dan menolak produk cacat, dan memastikan kepatuhan terhadap standar keselamatan dan kualitas.</p>
    
    <h3>5. Analitik Data Besar untuk Pengambilan Keputusan</h3>
    <p>Data yang dikumpulkan dari perangkat IoT dapat dianalisis untuk mendapatkan wawasan berharga tentang operasi manufaktur, memungkinkan keputusan berbasis data yang dapat meningkatkan efisiensi dan profitabilitas.</p>
    
    <h3>Tantangan dan Pertimbangan</h3>
    <p>Meskipun manfaatnya jelas, mengimplementasikan IoT dalam manufaktur juga datang dengan tantangan seperti keamanan siber, biaya awal, dan kebutuhan untuk melatih karyawan dalam keterampilan digital baru.</p>
    
    <h3>Kesimpulan</h3>
    <p>IoT menawarkan peluang luar biasa untuk transformasi digital di industri manufaktur. Perusahaan yang mengadopsi teknologi ini dengan strategi yang jelas dan pendekatan terstruktur akan memiliki keunggulan kompetitif yang signifikan di pasar yang semakin digital.</p>`,
    image: '/assets/article-3.jpg',
    author: 'Tim Antlia',
    date: '2023-12-20',
    category: 'IoT',
    excerpt: 'IoT menawarkan peluang luar biasa untuk transformasi digital di industri manufaktur.',
    tags: ['IoT', 'Manufaktur'],
    featured: true,
  },
];

// Sample services
const sampleServices: Service[] = [
  {
    id: '1',
    name: 'ERP',
    description: 'Enterprise Resource Planning untuk mengintegrasikan semua proses bisnis Anda',
    icon: 'database',
    features: ['Manajemen Inventaris', 'Akuntansi & Keuangan', 'Manajemen Pesanan', 'HR & Penggajian', 'Laporan & Analitik'],
    image: '/assets/service-1.jpg',
  },
  {
    id: '2',
    name: 'WMS',
    description: 'Warehouse Management System untuk mengoptimalkan operasi gudang Anda',
    icon: 'boxes',
    features: ['Manajemen Inventaris', 'Optimasi Penyimpanan', 'Picking & Packing', 'Pelacakan Barcode/RFID', 'Integrasi Omnichannel'],
    image: '/assets/service-2.jpg',
  },
  {
    id: '3',
    name: 'TMS',
    description: 'Transport Management System untuk mengelola operasi transportasi dengan efisien',
    icon: 'truck',
    features: ['Optimasi Rute', 'Pelacakan Pengiriman', 'Manajemen Armada', 'Analisis Biaya', 'Dokumentasi Elektronik'],
    image: '/assets/service-3.jpg',
  },
  {
    id: '4',
    name: 'HRM',
    description: 'Human Resource Management System untuk mengoptimalkan pengelolaan SDM',
    icon: 'users',
    features: ['Rekrutmen', 'Onboarding', 'Manajemen Kinerja', 'Penggajian & Tunjangan', 'Pelatihan & Pengembangan'],
    image: '/assets/service-4.jpg',
  },
  {
    id: '5',
    name: 'CRM',
    description: 'Customer Relationship Management untuk meningkatkan hubungan dengan pelanggan',
    icon: 'heart-handshake',
    features: ['Manajemen Kontak', 'Pipeline Penjualan', 'Pelacakan Interaksi', 'Email Marketing', 'Analitik Pelanggan'],
    image: '/assets/service-5.jpg',
  },
  {
    id: '6',
    name: 'IoT',
    description: 'Internet of Things untuk mengubah bisnis Anda menjadi lebih pintar dan terhubung',
    icon: 'wifi',
    features: ['Sensor & Monitoring', 'Analitik Data', 'Otomatisasi', 'Pemeliharaan Prediktif', 'Integrasi Sistem'],
    image: '/assets/service-6.jpg',
  },
];

// Sample pricing data
const samplePricing: PricingPlan[] = [
  {
    id: '1',
    name: 'ERP Standart',
    price: 'Rp 150K/Month',
    description: 'Solusi ERP dasar untuk bisnis kecil dan menengah',
    features: [
      'Modul Keuangan Dasar',
      'Modul Inventaris',
      'Modul Penjualan',
      'Laporan Standar',
      'Email Support',
    ],
  },
  {
    id: '2',
    name: 'ERP Manufacturer',
    price: 'Rp 350K/Month',
    description: 'Solusi lengkap untuk bisnis manufaktur',
    features: [
      'Semua fitur ERP Standar',
      'Manajemen Produksi',
      'MRP (Material Requirement Planning)',
      'Kontrol Kualitas',
      'Pelacakan Lot & Serial',
      'Phone & Email Support',
    ],
    popular: true,
  },
  {
    id: '3',
    name: 'ERP Custom',
    price: 'Rp 450K/Month',
    description: 'Solusi yang disesuaikan dengan kebutuhan khusus bisnis Anda',
    features: [
      'Semua fitur ERP Manufacturer',
      'Modul Kustom',
      'Integrasi API Kustom',
      'Laporan Kustom',
      'Dedicated Support',
      'Konsultasi Bulanan',
    ],
  },
  {
    id: '4',
    name: 'POS (Retail-F&B-UMKM)',
    price: 'Rp 100K/Month',
    description: 'Sistem Point of Sale untuk retail, F&B, dan UMKM',
    features: [
      'Manajemen Pesanan',
      'Manajemen Inventaris Dasar',
      'Laporan Penjualan',
      'Manajemen Pelanggan',
      'Integrasi Pembayaran',
    ],
  },
  {
    id: '5',
    name: 'IoT',
    price: 'Rp 250K/Month',
    description: 'Solusi Internet of Things untuk bisnis Anda',
    features: [
      'Konektivitas Perangkat',
      'Dashboard Real-time',
      'Notifikasi & Alerts',
      'Analitik Data',
      'Keamanan Data',
    ],
  },
  {
    id: '6',
    name: 'WMS',
    price: 'Rp 250K/Month',
    description: 'Warehouse Management System untuk operasi gudang yang optimal',
    features: [
      'Manajemen Inventaris',
      'Optimasi Penyimpanan',
      'Picking & Packing',
      'Pelacakan Barcode/RFID',
      'Integrasi dengan ERP',
    ],
  },
];

// Sample clients data
const sampleClients: Client[] = [
  {
    id: '1',
    name: 'TechGlobal',
    logo: '/assets/client-1.png',
    industry: 'Manufaktur',
    location: 'Jakarta',
    implementation: 'ERP',
    caseStudy: {
      title: 'Optimalisasi Proses Produksi dengan ERP Antlia',
      description: 'Implementasi ERP yang meningkatkan efisiensi produksi dan mengurangi biaya operasional.',
      challenge: 'TechGlobal menghadapi tantangan dalam mengintegrasikan data produksi yang tersebar di berbagai departemen, menyebabkan keterlambatan pengambilan keputusan dan inefisiensi operasional.',
      solution: 'Implementasi sistem ERP Antlia yang mengintegrasikan seluruh proses bisnis dari pengadaan bahan baku, manajemen produksi, hingga distribusi produk akhir.',
      result: 'Peningkatan efisiensi operasional sebesar 40%, pengurangan biaya inventory sebesar 25%, dan peningkatan akurasi peramalan produksi hingga 60%.',
      image: '/assets/case-1.jpg'
    }
  },
  {
    id: '2',
    name: 'LogisTech',
    logo: '/assets/client-2.png',
    industry: 'Logistik',
    location: 'Surabaya',
    implementation: 'WMS & TMS',
    caseStudy: {
      title: 'Transformasi Digital Logistik dengan WMS & TMS Terintegrasi',
      description: 'Implementasi sistem WMS dan TMS yang meningkatkan efisiensi pengiriman dan mengurangi biaya logistik.',
      challenge: 'LogisTech mengalami kesulitan dalam mengelola inventaris gudang dan mengoptimalkan rute pengiriman yang menyebabkan keterlambatan pengiriman dan biaya logistik yang tinggi.',
      solution: 'Penerapan sistem WMS dan TMS terintegrasi dari Antlia yang mencakup manajemen gudang, perencanaan rute, dan pelacakan pengiriman real-time.',
      result: 'Pengurangan waktu pengiriman hingga 30%, pengurangan biaya logistik sebesar 25%, dan peningkatan kepuasan pelanggan sebesar 45%.',
      image: '/assets/case-2.jpg'
    }
  },
  {
    id: '3',
    name: 'RetailOne',
    logo: '/assets/client-3.png',
    industry: 'Retail',
    location: 'Bandung',
    implementation: 'POS & ERP',
    caseStudy: {
      title: 'Modernisasi Sistem Retail dengan POS & ERP',
      description: 'Transformasi digital bisnis retail melalui implementasi sistem POS dan ERP yang terintegrasi.',
      challenge: 'RetailOne menghadapi kesulitan dalam mengelola inventaris multi-toko dan melacak penjualan secara real-time, yang menghambat pengambilan keputusan strategis dan manajemen stok.',
      solution: 'Implementasi sistem POS dan ERP Antlia yang menghubungkan seluruh gerai, dengan fitur analitik penjualan, manajemen inventaris, dan program loyalitas pelanggan.',
      result: 'Peningkatan akurasi inventaris hingga 95%, peningkatan penjualan sebesar 28%, dan pengurangan waktu stock-out sebesar 60%.',
      image: '/assets/case-3.jpg'
    }
  },
  {
    id: '4',
    name: 'AgriBisnis',
    logo: '/assets/client-4.png',
    industry: 'Pertanian',
    location: 'Medan',
    implementation: 'IoT & ERP',
    caseStudy: {
      title: 'Smart Farming dengan Teknologi IoT',
      description: 'Penerapan teknologi IoT untuk memantau dan mengoptimalkan operasi pertanian.',
      challenge: 'AgriBisnis kesulitan memantau kondisi tanaman dan penggunaan sumber daya di area perkebunan yang luas, menyebabkan ketidakefisienan penggunaan air dan pupuk serta hasil panen yang tidak optimal.',
      solution: 'Pengembangan jaringan sensor IoT dan sistem ERP khusus pertanian yang memungkinkan pemantauan kondisi tanah, kelembaban, dan pertumbuhan tanaman secara real-time.',
      result: 'Peningkatan hasil panen sebesar 30%, pengurangan penggunaan air sebesar 40%, dan peningkatan efisiensi penggunaan pupuk hingga 35%.',
      image: '/assets/case-4.jpg'
    }
  },
  {
    id: '5',
    name: 'HealthPlus',
    logo: '/assets/client-5.png',
    industry: 'Kesehatan',
    location: 'Makassar',
    implementation: 'HRM & CRM',
    caseStudy: {
      title: 'Meningkatkan Layanan Kesehatan dengan HRM & CRM',
      description: 'Optimalisasi manajemen sumber daya manusia dan hubungan dengan pasien di fasilitas kesehatan.',
      challenge: 'HealthPlus mengalami kesulitan dalam menjadwalkan staf medis dan mengelola hubungan dengan pasien, yang berdampak pada kualitas layanan dan kepuasan pasien.',
      solution: 'Implementasi sistem HRM dan CRM terintegrasi yang memungkinkan penjadwalan otomatis, manajemen rekam medis, dan komunikasi pasien yang lebih baik.',
      result: 'Peningkatan efisiensi jadwal staf sebesar 35%, pengurangan waktu tunggu pasien sebesar 50%, dan peningkatan skor kepuasan pasien dari 7.2 menjadi 9.1.',
      image: '/assets/case-5.jpg'
    }
  },
  {
    id: '6',
    name: 'EduTech',
    logo: '/assets/client-6.png',
    industry: 'Pendidikan',
    location: 'Yogyakarta',
    implementation: 'CRM',
    caseStudy: {
      title: 'Meningkatkan Engagement Siswa dengan CRM Pendidikan',
      description: 'Penerapan sistem CRM untuk meningkatkan komunikasi dan layanan pendidikan.',
      challenge: 'EduTech kesulitan mengelola komunikasi dengan ribuan siswa dan orangtua, serta melacak kemajuan akademik siswa secara efektif.',
      solution: 'Implementasi CRM Antlia yang disesuaikan untuk sektor pendidikan, dengan fitur manajemen siswa, komunikasi otomatis, dan dashboard kemajuan akademik.',
      result: 'Peningkatan tingkat retensi siswa sebesar 25%, peningkatan keterlibatan orangtua sebesar 60%, dan pengurangan beban administratif staf sebesar 45%.',
      image: '/assets/case-6.jpg'
    }
  },
];

// Sample testimonials data
const sampleTestimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Budi Santoso',
    company: 'TechGlobal',
    image: '/assets/testimonial-1.jpg',
    testimonial: 'Implementasi ERP dari Antlia telah meningkatkan efisiensi operasional kami sebesar 40% dalam 6 bulan pertama.',
  },
  {
    id: 2,
    name: 'Nina Wijaya',
    company: 'LogisTech',
    image: '/assets/testimonial-2.jpg',
    testimonial: 'Sistem WMS dan TMS yang terintegrasi membantu kami mengoptimalkan rute pengiriman dan mengurangi biaya logistik hingga 25%.',
  },
  {
    id: 3,
    name: 'Hendro Wibowo',
    company: 'RetailOne',
    image: '/assets/testimonial-3.jpg',
    testimonial: 'Solusi POS dari Antlia sangat user-friendly dan membantu kami mengelola multi-cabang dengan lebih efisien.',
  },
  {
    id: 4,
    name: 'Dewi Lestari',
    company: 'AgriBisnis',
    image: '/assets/testimonial-4.jpg',
    testimonial: 'Teknologi IoT Antlia membantu kami memantau kondisi lahan pertanian secara real-time, meningkatkan hasil panen hingga 30%.',
  },
  {
    id: 5,
    name: 'Rahman Hakim',
    company: 'HealthPlus',
    image: '/assets/testimonial-5.jpg',
    testimonial: 'Sistem HRM Antlia membantu kami mengelola jadwal staf medis dengan lebih efisien, meningkatkan kepuasan pasien.',
  },
];

// Sample team data
const sampleTeam: TeamMember[] = [
  {
    id: '1',
    name: 'Ahmad Rasyid',
    position: 'CEO & Founder',
    bio: 'Berpengalaman lebih dari 15 tahun dalam industri teknologi dan rantai pasok.',
    photo: '/assets/team-1.jpg',
    socials: {
      linkedin: 'https://linkedin.com/in/ahmadrasyid',
      twitter: 'https://twitter.com/ahmadrasyid',
      instagram: 'https://instagram.com/ahmadrasyid'
    }
  },
  {
    id: '2',
    name: 'Sinta Dewi',
    position: 'CTO',
    bio: 'Ahli dalam pengembangan solusi teknologi terintegrasi untuk rantai pasok global.',
    photo: '/assets/team-2.jpg',
    socials: {
      linkedin: 'https://linkedin.com/in/sintadewi',
      twitter: 'https://twitter.com/sintadewi',
      instagram: 'https://instagram.com/sintadewi'
    }
  },
  {
    id: '3',
    name: 'Bima Putra',
    position: 'COO',
    bio: 'Spesialis operasional dengan fokus pada optimalisasi proses dan efisiensi.',
    photo: '/assets/team-3.jpg',
    socials: {
      linkedin: 'https://linkedin.com/in/bimaputra',
      twitter: 'https://twitter.com/bimaputra',
      instagram: 'https://instagram.com/bimaputra'
    }
  },
  {
    id: '4',
    name: 'Laras Ayu',
    position: 'Head of Product',
    bio: 'Mengelola pengembangan produk dengan fokus pada solusi yang berpusat pada pengguna.',
    photo: '/assets/team-4.jpg',
    socials: {
      linkedin: 'https://linkedin.com/in/larasayu',
      twitter: 'https://twitter.com/larasayu',
      instagram: 'https://instagram.com/larasayu'
    }
  }
];

// Sample footer data
const sampleFooterInfo: FooterInfo = {
  companyInfo: {
    description: 'Solusi teknologi inovatif untuk rantai pasok global, dengan fokus meningkatkan produktivitas, menekan biaya, dan mendukung keberlanjutan.',
    socialLinks: {
      instagram: 'https://instagram.com/antlia.id',
      linkedin: 'https://linkedin.com/company/antlia'
    }
  },
  quickLinks: [
    {
      id: '1',
      name: 'Home',
      url: '/'
    },
    {
      id: '2',
      name: 'Tentang Kami',
      url: '/tentang'
    },
    {
      id: '3',
      name: 'Produk & Layanan',
      url: '/layanan'
    },
    {
      id: '4',
      name: 'Solusi',
      url: '/solusi'
    },
    {
      id: '5',
      name: 'Klien',
      url: '/klien'
    },
    {
      id: '6',
      name: 'Artikel',
      url: '/artikel'
    }
  ],
  products: [
    {
      id: '1',
      name: 'Enterprise Resource Planning',
      url: '/layanan'
    },
    {
      id: '2',
      name: 'Warehouse Management',
      url: '/layanan'
    },
    {
      id: '3',
      name: 'Transport Management',
      url: '/layanan'
    },
    {
      id: '4',
      name: 'HRM System',
      url: '/layanan'
    },
    {
      id: '5',
      name: 'CRM System',
      url: '/layanan'
    },
    {
      id: '6',
      name: 'IoT Technologies',
      url: '/layanan'
    }
  ],
  contactInfo: {
    address: 'BSD, Tangerang Selatan, Banten',
    phone: '+62 877-6287-7273',
    officeHours: {
      weekday: 'Senin - Jumat: 8.00-17.00',
      saturday: 'Sabtu: 08.00-14.00',
      support: 'Customer Services: 24/7'
    }
  }
};

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [services] = useState<Service[]>(sampleServices);
  const [pricing, setPricing] = useState<PricingPlan[]>(samplePricing);
  const [clients, setClients] = useState<Client[]>(sampleClients);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(sampleTestimonials);
  const [team, setTeam] = useState<TeamMember[]>(sampleTeam);
  const [footerInfo, setFooterInfo] = useState<FooterInfo>(sampleFooterInfo);

  // Initialize data
  useEffect(() => {
    setArticles(sampleArticles);
  }, []);

  // Article functions
  const addArticle = (article: Omit<Article, 'id'>) => {
    const newArticle = {
      ...article,
      id: Date.now().toString(),
      tags: article.tags || [],
      featured: article.featured || false,
      excerpt: article.excerpt || article.summary,
    };
    setArticles([newArticle, ...articles]);
  };

  const updateArticle = (id: string, article: Partial<Article>) => {
    setArticles(articles.map(item => 
      item.id === id ? { ...item, ...article } : item
    ));
  };

  const deleteArticle = (id: string) => {
    setArticles(articles.filter(article => article.id !== id));
  };

  // Fungsi untuk mendapatkan article berdasarkan ID
  const getArticleById = (id: string) => {
    return articles.find(article => article.id === id);
  };

  // Pricing functions
  const updatePricing = (id: string, plan: Partial<PricingPlan>) => {
    setPricing(pricing.map(item => 
      item.id === id ? { ...item, ...plan } : item
    ));
  };

  // Client functions
  const updateClient = (id: string, client: Partial<Client>) => {
    setClients(clients.map(item => 
      item.id === id ? { ...item, ...client } : item
    ));
  };

  const addClient = (client: Omit<Client, 'id'>) => {
    const newClient = {
      ...client,
      id: Date.now().toString(),
    };
    setClients([...clients, newClient]);
  };

  const deleteClient = (id: string) => {
    setClients(clients.filter(client => client.id !== id));
  };

  // Testimonial functions
  const updateTestimonial = (id: number, testimonial: Partial<Testimonial>) => {
    setTestimonials(testimonials.map(item => 
      item.id === id ? { ...item, ...testimonial } : item
    ));
  };

  const addTestimonial = (testimonial: Omit<Testimonial, 'id'>) => {
    const newId = testimonials.length > 0 
      ? Math.max(...testimonials.map(t => t.id)) + 1 
      : 1;
    
    const newTestimonial = {
      ...testimonial,
      id: newId,
    };
    setTestimonials([...testimonials, newTestimonial]);
  };

  const deleteTestimonial = (id: number) => {
    setTestimonials(testimonials.filter(testimonial => testimonial.id !== id));
  };

  // Team functions
  const updateTeam = (id: string, member: Partial<TeamMember>) => {
    setTeam(team.map(item => 
      item.id === id ? { ...item, ...member } : item
    ));
  };

  const addTeamMember = (member: Omit<TeamMember, 'id'>) => {
    const newMember = {
      ...member,
      id: Date.now().toString(),
    };
    setTeam([...team, newMember]);
  };

  const deleteTeamMember = (id: string) => {
    setTeam(team.filter(member => member.id !== id));
  };

  // Footer functions
  const updateFooter = (info: Partial<FooterInfo>) => {
    setFooterInfo({ ...footerInfo, ...info });
  };

  const value = {
    articles,
    services,
    pricing,
    clients,
    testimonials,
    team,
    footerInfo,
    addArticle,
    updateArticle,
    deleteArticle,
    getArticleById,
    updatePricing,
    updateClient,
    addClient,
    deleteClient,
    updateTestimonial,
    addTestimonial,
    deleteTestimonial,
    updateTeam,
    addTeamMember,
    deleteTeamMember,
    updateFooter,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
