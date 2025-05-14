
import React, { useState } from 'react';
import { Save } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useToast } from '@/components/ui/use-toast';

const Settings = () => {
  const { toast } = useToast();
  
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Antlia',
    siteDescription: 'Solusi Teknologi Digital Indonesia',
    contactEmail: 'info@antlia.id',
    contactPhone: '+62 815-7363-5143',
    address: 'Jl. Teknologi Digital No. 123, Jakarta, Indonesia',
  });
  
  const [socialSettings, setSocialSettings] = useState({
    facebook: 'https://facebook.com/antlia',
    twitter: 'https://twitter.com/antlia',
    instagram: 'https://instagram.com/antlia',
    linkedin: 'https://linkedin.com/company/antlia',
  });
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGeneralSettings(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSocialSettings(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, you would save this to a database
    // For now, we'll just show a success toast
    toast({
      title: 'Pengaturan Disimpan',
      description: 'Pengaturan umum telah berhasil disimpan.',
    });
  };
  
  const handleSocialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: 'Pengaturan Disimpan',
      description: 'Pengaturan media sosial telah berhasil disimpan.',
    });
  };
  
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: 'Error',
        description: 'Password baru dan konfirmasi tidak cocok.',
        variant: 'destructive',
      });
      return;
    }
    
    if (passwordForm.currentPassword !== 'antliaadmin') {
      toast({
        title: 'Error',
        description: 'Password saat ini tidak valid.',
        variant: 'destructive',
      });
      return;
    }
    
    toast({
      title: 'Password Diperbarui',
      description: 'Password telah berhasil diubah.',
    });
    
    // Reset form
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Pengaturan</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* General Settings */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Pengaturan Umum</h2>
            </div>
            
            <div className="p-6">
              <form onSubmit={handleGeneralSubmit} className="space-y-4">
                <div>
                  <label htmlFor="siteName" className="block text-gray-700 mb-2">
                    Nama Situs
                  </label>
                  <input
                    type="text"
                    id="siteName"
                    name="siteName"
                    value={generalSettings.siteName}
                    onChange={handleGeneralChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-antlia-blue"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="siteDescription" className="block text-gray-700 mb-2">
                    Deskripsi Situs
                  </label>
                  <input
                    type="text"
                    id="siteDescription"
                    name="siteDescription"
                    value={generalSettings.siteDescription}
                    onChange={handleGeneralChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-antlia-blue"
                  />
                </div>
                
                <div>
                  <label htmlFor="contactEmail" className="block text-gray-700 mb-2">
                    Email Kontak
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    value={generalSettings.contactEmail}
                    onChange={handleGeneralChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-antlia-blue"
                  />
                </div>
                
                <div>
                  <label htmlFor="contactPhone" className="block text-gray-700 mb-2">
                    Telepon Kontak
                  </label>
                  <input
                    type="text"
                    id="contactPhone"
                    name="contactPhone"
                    value={generalSettings.contactPhone}
                    onChange={handleGeneralChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-antlia-blue"
                  />
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-gray-700 mb-2">
                    Alamat
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={generalSettings.address}
                    onChange={handleGeneralChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-antlia-blue"
                  />
                </div>
                
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 bg-antlia-blue text-white font-medium rounded-md hover:bg-opacity-90 transition-colors"
                >
                  <Save size={16} className="mr-2" />
                  Simpan Pengaturan
                </button>
              </form>
            </div>
          </div>
          
          {/* Social Media Settings */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Media Sosial</h2>
            </div>
            
            <div className="p-6">
              <form onSubmit={handleSocialSubmit} className="space-y-4">
                <div>
                  <label htmlFor="facebook" className="block text-gray-700 mb-2">
                    Facebook
                  </label>
                  <input
                    type="url"
                    id="facebook"
                    name="facebook"
                    value={socialSettings.facebook}
                    onChange={handleSocialChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-antlia-blue"
                  />
                </div>
                
                <div>
                  <label htmlFor="twitter" className="block text-gray-700 mb-2">
                    Twitter
                  </label>
                  <input
                    type="url"
                    id="twitter"
                    name="twitter"
                    value={socialSettings.twitter}
                    onChange={handleSocialChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-antlia-blue"
                  />
                </div>
                
                <div>
                  <label htmlFor="instagram" className="block text-gray-700 mb-2">
                    Instagram
                  </label>
                  <input
                    type="url"
                    id="instagram"
                    name="instagram"
                    value={socialSettings.instagram}
                    onChange={handleSocialChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-antlia-blue"
                  />
                </div>
                
                <div>
                  <label htmlFor="linkedin" className="block text-gray-700 mb-2">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    id="linkedin"
                    name="linkedin"
                    value={socialSettings.linkedin}
                    onChange={handleSocialChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-antlia-blue"
                  />
                </div>
                
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 bg-antlia-blue text-white font-medium rounded-md hover:bg-opacity-90 transition-colors"
                >
                  <Save size={16} className="mr-2" />
                  Simpan Media Sosial
                </button>
              </form>
            </div>
          </div>
          
          {/* Change Password */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Ubah Password</h2>
            </div>
            
            <div className="p-6">
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label htmlFor="currentPassword" className="block text-gray-700 mb-2">
                    Password Saat Ini
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-antlia-blue"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="newPassword" className="block text-gray-700 mb-2">
                    Password Baru
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-antlia-blue"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">
                    Konfirmasi Password Baru
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-antlia-blue"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 bg-antlia-blue text-white font-medium rounded-md hover:bg-opacity-90 transition-colors"
                >
                  <Save size={16} className="mr-2" />
                  Ubah Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;
