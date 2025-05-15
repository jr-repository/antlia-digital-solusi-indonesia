import React, { createContext, useContext, useState, useEffect } from 'react';

// Types
export interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  features: string[];
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
}

export interface Testimonial {
  id: number;
  name: string;
  company: string;
  image: string;
  testimonial: string;
}

type DataContextType = {
  articles: Article[];
  services: Service[];
  pricing: PricingPlan[];
  clients: Client[];
  testimonials: Testimonial[];
  addArticle: (article: Omit<Article, 'id'>) => void;
  updateArticle: (id: string, article: Partial<Article>) => void;
  deleteArticle: (id: string) => void;
  getArticleById: (id: string) => Article | undefined;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

// Sample data
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
  },
];

const sampleServices: Service[] = [
  {
    id: '1',
    name: 'ERP',
    description: 'Enterprise Resource Planning untuk mengintegrasikan semua proses bisnis Anda',
    icon: 'database',
    features: ['Manajemen Inventaris', 'Akuntansi & Keuangan', 'Manajemen Pesanan', 'HR & Penggajian', 'Laporan & Analitik'],
  },
  {
    id: '2',
    name: 'WMS',
    description: 'Warehouse Management System untuk mengoptimalkan operasi gudang Anda',
    icon: 'boxes',
    features: ['Manajemen Inventaris', 'Optimasi Penyimpanan', 'Picking & Packing', 'Pelacakan Barcode/RFID', 'Integrasi Omnichannel'],
  },
  {
    id: '3',
    name: 'TMS',
    description: 'Transport Management System untuk mengelola operasi transportasi dengan efisien',
    icon: 'truck',
    features: ['Optimasi Rute', 'Pelacakan Pengiriman', 'Manajemen Armada', 'Analisis Biaya', 'Dokumentasi Elektronik'],
  },
  {
    id: '4',
    name: 'HRM',
    description: 'Human Resource Management System untuk mengoptimalkan pengelolaan SDM',
    icon: 'users',
    features: ['Rekrutmen', 'Onboarding', 'Manajemen Kinerja', 'Penggajian & Tunjangan', 'Pelatihan & Pengembangan'],
  },
  {
    id: '5',
    name: 'CRM',
    description: 'Customer Relationship Management untuk meningkatkan hubungan dengan pelanggan',
    icon: 'heart-handshake',
    features: ['Manajemen Kontak', 'Pipeline Penjualan', 'Pelacakan Interaksi', 'Email Marketing', 'Analitik Pelanggan'],
  },
  {
    id: '6',
    name: 'IoT',
    description: 'Internet of Things untuk mengubah bisnis Anda menjadi lebih pintar dan terhubung',
    icon: 'wifi',
    features: ['Sensor & Monitoring', 'Analitik Data', 'Otomatisasi', 'Pemeliharaan Prediktif', 'Integrasi Sistem'],
  },
];

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
  },
  {
    id: '2',
    name: 'LogisTech',
    logo: '/assets/client-2.png',
    industry: 'Logistik',
    location: 'Surabaya',
    implementation: 'WMS & TMS',
  },
  {
    id: '3',
    name: 'RetailOne',
    logo: '/assets/client-3.png',
    industry: 'Retail',
    location: 'Bandung',
    implementation: 'POS & ERP',
  },
  {
    id: '4',
    name: 'AgriBisnis',
    logo: '/assets/client-4.png',
    industry: 'Pertanian',
    location: 'Medan',
    implementation: 'IoT & ERP',
  },
  {
    id: '5',
    name: 'HealthPlus',
    logo: '/assets/client-5.png',
    industry: 'Kesehatan',
    location: 'Makassar',
    implementation: 'HRM & CRM',
  },
  {
    id: '6',
    name: 'EduTech',
    logo: '/assets/client-6.png',
    industry: 'Pendidikan',
    location: 'Yogyakarta',
    implementation: 'CRM',
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

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [services] = useState<Service[]>(sampleServices);
  const [pricing] = useState<PricingPlan[]>(samplePricing);
  const [clients] = useState<Client[]>(sampleClients);
  const [testimonials] = useState<Testimonial[]>(sampleTestimonials);

  // Initialize data
  useEffect(() => {
    // Check if we have articles in localStorage
    const storedArticles = localStorage.getItem('antlia_articles');
    if (storedArticles) {
      setArticles(JSON.parse(storedArticles));
    } else {
      // Use sample data if no stored articles
      setArticles(sampleArticles);
      localStorage.setItem('antlia_articles', JSON.stringify(sampleArticles));
    }
  }, []);

  // Add new article
  const addArticle = (article: Omit<Article, 'id'>) => {
    const newArticle = {
      ...article,
      id: Date.now().toString(),
    };
    
    const updatedArticles = [...articles, newArticle];
    setArticles(updatedArticles);
    localStorage.setItem('antlia_articles', JSON.stringify(updatedArticles));
  };

  // Update article
  const updateArticle = (id: string, updatedArticle: Partial<Article>) => {
    const updatedArticles = articles.map((article) => 
      article.id === id ? { ...article, ...updatedArticle } : article
    );
    
    setArticles(updatedArticles);
    localStorage.setItem('antlia_articles', JSON.stringify(updatedArticles));
  };

  // Delete article
  const deleteArticle = (id: string) => {
    const updatedArticles = articles.filter((article) => article.id !== id);
    setArticles(updatedArticles);
    localStorage.setItem('antlia_articles', JSON.stringify(updatedArticles));
  };

  // Get article by ID
  const getArticleById = (id: string) => {
    return articles.find((article) => article.id === id);
  };

  const value = {
    articles,
    services,
    pricing,
    clients,
    testimonials,
    addArticle,
    updateArticle,
    deleteArticle,
    getArticleById,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
