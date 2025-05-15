
import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Trash, Check, X } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Settings = () => {
  const { footerInfo, updateFooter } = useData();
  const [editedFooter, setEditedFooter] = useState({ ...footerInfo });
  const [newQuickLink, setNewQuickLink] = useState({ name: '', url: '' });
  const [newProduct, setNewProduct] = useState({ name: '', url: '' });

  const handleSaveFooter = () => {
    updateFooter(editedFooter);
    toast.success('Informasi footer berhasil disimpan!');
  };

  const handleAddQuickLink = () => {
    if (!newQuickLink.name || !newQuickLink.url) {
      toast.error('Nama dan URL harus diisi!');
      return;
    }

    const updatedLinks = [...editedFooter.quickLinks, { ...newQuickLink, id: Date.now().toString() }];
    setEditedFooter({ ...editedFooter, quickLinks: updatedLinks });
    setNewQuickLink({ name: '', url: '' });
  };

  const handleRemoveQuickLink = (id: string) => {
    const updatedLinks = editedFooter.quickLinks.filter(link => link.id !== id);
    setEditedFooter({ ...editedFooter, quickLinks: updatedLinks });
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.url) {
      toast.error('Nama dan URL harus diisi!');
      return;
    }

    const updatedProducts = [...editedFooter.products, { ...newProduct, id: Date.now().toString() }];
    setEditedFooter({ ...editedFooter, products: updatedProducts });
    setNewProduct({ name: '', url: '' });
  };

  const handleRemoveProduct = (id: string) => {
    const updatedProducts = editedFooter.products.filter(product => product.id !== id);
    setEditedFooter({ ...editedFooter, products: updatedProducts });
  };

  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-6 w-full max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Pengaturan Website</h1>
          <p className="text-gray-500">Kelola informasi dan konfigurasi website</p>
        </div>

        <Tabs defaultValue="footer" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="footer">Footer</TabsTrigger>
            <TabsTrigger value="general">Umum</TabsTrigger>
          </TabsList>
          
          <TabsContent value="footer">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Company Info */}
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Informasi Perusahaan</CardTitle>
                  <CardDescription>Kelola deskripsi dan tautan media sosial</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="company-description">Deskripsi</Label>
                    <Textarea
                      id="company-description"
                      value={editedFooter.companyInfo.description}
                      onChange={(e) => setEditedFooter({
                        ...editedFooter,
                        companyInfo: {
                          ...editedFooter.companyInfo,
                          description: e.target.value
                        }
                      })}
                      className="mt-1"
                      rows={4}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="instagram-link">Instagram</Label>
                    <Input
                      id="instagram-link"
                      value={editedFooter.companyInfo.socialLinks.instagram}
                      onChange={(e) => setEditedFooter({
                        ...editedFooter,
                        companyInfo: {
                          ...editedFooter.companyInfo,
                          socialLinks: {
                            ...editedFooter.companyInfo.socialLinks,
                            instagram: e.target.value
                          }
                        }
                      })}
                      className="mt-1"
                      placeholder="https://instagram.com/username"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="linkedin-link">LinkedIn</Label>
                    <Input
                      id="linkedin-link"
                      value={editedFooter.companyInfo.socialLinks.linkedin}
                      onChange={(e) => setEditedFooter({
                        ...editedFooter,
                        companyInfo: {
                          ...editedFooter.companyInfo,
                          socialLinks: {
                            ...editedFooter.companyInfo.socialLinks,
                            linkedin: e.target.value
                          }
                        }
                      })}
                      className="mt-1"
                      placeholder="https://linkedin.com/company/name"
                    />
                  </div>
                </CardContent>
              </Card>
              
              {/* Contact Info */}
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Informasi Kontak</CardTitle>
                  <CardDescription>Kelola alamat, nomor telepon, dan jam operasional</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="address">Alamat</Label>
                    <Input
                      id="address"
                      value={editedFooter.contactInfo.address}
                      onChange={(e) => setEditedFooter({
                        ...editedFooter,
                        contactInfo: {
                          ...editedFooter.contactInfo,
                          address: e.target.value
                        }
                      })}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Nomor Telepon</Label>
                    <Input
                      id="phone"
                      value={editedFooter.contactInfo.phone}
                      onChange={(e) => setEditedFooter({
                        ...editedFooter,
                        contactInfo: {
                          ...editedFooter.contactInfo,
                          phone: e.target.value
                        }
                      })}
                      className="mt-1"
                      placeholder="+62 8xx-xxxx-xxxx"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Jam Operasional</Label>
                    
                    <div>
                      <Label htmlFor="office-hours-weekday" className="text-xs">Hari Kerja</Label>
                      <Input
                        id="office-hours-weekday"
                        value={editedFooter.contactInfo.officeHours.weekday}
                        onChange={(e) => setEditedFooter({
                          ...editedFooter,
                          contactInfo: {
                            ...editedFooter.contactInfo,
                            officeHours: {
                              ...editedFooter.contactInfo.officeHours,
                              weekday: e.target.value
                            }
                          }
                        })}
                        className="mt-1"
                        placeholder="Senin - Jumat: 8.00-17.00"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="office-hours-saturday" className="text-xs">Sabtu</Label>
                      <Input
                        id="office-hours-saturday"
                        value={editedFooter.contactInfo.officeHours.saturday}
                        onChange={(e) => setEditedFooter({
                          ...editedFooter,
                          contactInfo: {
                            ...editedFooter.contactInfo,
                            officeHours: {
                              ...editedFooter.contactInfo.officeHours,
                              saturday: e.target.value
                            }
                          }
                        })}
                        className="mt-1"
                        placeholder="Sabtu: 08.00-14.00"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="office-hours-support" className="text-xs">Customer Service</Label>
                      <Input
                        id="office-hours-support"
                        value={editedFooter.contactInfo.officeHours.support}
                        onChange={(e) => setEditedFooter({
                          ...editedFooter,
                          contactInfo: {
                            ...editedFooter.contactInfo,
                            officeHours: {
                              ...editedFooter.contactInfo.officeHours,
                              support: e.target.value
                            }
                          }
                        })}
                        className="mt-1"
                        placeholder="Customer Services: 24/7"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Quick Links */}
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Tautan Cepat</CardTitle>
                  <CardDescription>Kelola tautan yang ditampilkan di footer</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {editedFooter.quickLinks.map((link) => (
                      <div key={link.id} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                        <div>
                          <p className="font-medium">{link.name}</p>
                          <p className="text-xs text-gray-500">{link.url}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-100"
                          onClick={() => handleRemoveQuickLink(link.id)}
                        >
                          <Trash size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 border-t pt-4">
                    <h4 className="text-sm font-medium mb-2">Tambah Tautan Baru</h4>
                    <div className="space-y-2">
                      <div>
                        <Label htmlFor="new-link-name" className="text-xs">Nama</Label>
                        <Input
                          id="new-link-name"
                          value={newQuickLink.name}
                          onChange={(e) => setNewQuickLink({ ...newQuickLink, name: e.target.value })}
                          className="mt-1"
                          placeholder="Nama Tautan"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="new-link-url" className="text-xs">URL</Label>
                        <Input
                          id="new-link-url"
                          value={newQuickLink.url}
                          onChange={(e) => setNewQuickLink({ ...newQuickLink, url: e.target.value })}
                          className="mt-1"
                          placeholder="/halaman"
                        />
                      </div>
                      
                      <Button
                        onClick={handleAddQuickLink}
                        size="sm"
                        className="mt-1 w-full bg-antlia-blue hover:bg-antlia-blue/90"
                      >
                        <Plus size={16} className="mr-1" />
                        Tambah Tautan
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Products */}
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Produk</CardTitle>
                  <CardDescription>Kelola daftar produk yang ditampilkan di footer</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {editedFooter.products.map((product) => (
                      <div key={product.id} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.url}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-100"
                          onClick={() => handleRemoveProduct(product.id)}
                        >
                          <Trash size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 border-t pt-4">
                    <h4 className="text-sm font-medium mb-2">Tambah Produk Baru</h4>
                    <div className="space-y-2">
                      <div>
                        <Label htmlFor="new-product-name" className="text-xs">Nama Produk</Label>
                        <Input
                          id="new-product-name"
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                          className="mt-1"
                          placeholder="Nama Produk"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="new-product-url" className="text-xs">URL</Label>
                        <Input
                          id="new-product-url"
                          value={newProduct.url}
                          onChange={(e) => setNewProduct({ ...newProduct, url: e.target.value })}
                          className="mt-1"
                          placeholder="/layanan"
                        />
                      </div>
                      
                      <Button
                        onClick={handleAddProduct}
                        size="sm"
                        className="mt-1 w-full bg-antlia-blue hover:bg-antlia-blue/90"
                      >
                        <Plus size={16} className="mr-1" />
                        Tambah Produk
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Footer Save */}
            <div className="mt-6 flex justify-end">
              <Button
                onClick={handleSaveFooter}
                className="bg-antlia-blue hover:bg-antlia-blue/90"
              >
                <Check size={16} className="mr-1" />
                Simpan Perubahan
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="general">
            <Card className="shadow-md mb-6">
              <CardHeader>
                <CardTitle>Pengaturan Umum</CardTitle>
                <CardDescription>Pengaturan dasar website</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Fitur pengaturan umum akan tersedia dalam update mendatang.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Settings;
