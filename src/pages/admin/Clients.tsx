
import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, Plus, Trash, X, Edit, Upload, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

const Clients = () => {
  const { clients, testimonials, updateClient, addClient, deleteClient, updateTestimonial, addTestimonial, deleteTestimonial } = useData();
  const [editingClientId, setEditingClientId] = useState<string | null>(null);
  const [editedClient, setEditedClient] = useState<any>(null);
  const [isAddingClient, setIsAddingClient] = useState(false);
  const [newClient, setNewClient] = useState({
    id: '',
    name: '',
    logo: '/assets/placeholder.svg',
    industry: '',
    location: '',
    implementation: '',
    caseStudy: {
      title: '',
      description: '',
      challenge: '',
      solution: '',
      result: '',
      image: '/assets/placeholder.svg'
    }
  });
  
  const [editingTestimonialId, setEditingTestimonialId] = useState<number | null>(null);
  const [editedTestimonial, setEditedTestimonial] = useState<any>(null);
  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({
    id: 0,
    name: '',
    company: '',
    image: '/assets/placeholder.svg',
    testimonial: ''
  });

  // Client handlers
  const handleEditClient = (id: string) => {
    const client = clients.find(c => c.id === id);
    if (!client) return;
    
    setEditedClient({ ...client });
    setEditingClientId(id);
  };

  const handleSaveClient = () => {
    if (!editedClient) return;
    
    updateClient(editedClient.id, editedClient);
    setEditingClientId(null);
    setEditedClient(null);
    toast.success('Klien berhasil diperbarui!');
  };

  const handleCancelEditClient = () => {
    setEditingClientId(null);
    setEditedClient(null);
  };

  const handleAddClient = () => {
    if (!newClient.name || !newClient.industry) {
      toast.error('Nama dan industri harus diisi!');
      return;
    }
    
    addClient(newClient);
    setNewClient({
      id: '',
      name: '',
      logo: '/assets/placeholder.svg',
      industry: '',
      location: '',
      implementation: '',
      caseStudy: {
        title: '',
        description: '',
        challenge: '',
        solution: '',
        result: '',
        image: '/assets/placeholder.svg'
      }
    });
    setIsAddingClient(false);
    toast.success('Klien baru berhasil ditambahkan!');
  };

  const handleDeleteClient = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus klien ini?')) {
      deleteClient(id);
      toast.success('Klien berhasil dihapus!');
    }
  };

  // Testimonial handlers
  const handleEditTestimonial = (id: number) => {
    const testimonial = testimonials.find(t => t.id === id);
    if (!testimonial) return;
    
    setEditedTestimonial({ ...testimonial });
    setEditingTestimonialId(id);
  };

  const handleSaveTestimonial = () => {
    if (!editedTestimonial) return;
    
    updateTestimonial(editedTestimonial.id, editedTestimonial);
    setEditingTestimonialId(null);
    setEditedTestimonial(null);
    toast.success('Testimonial berhasil diperbarui!');
  };

  const handleCancelEditTestimonial = () => {
    setEditingTestimonialId(null);
    setEditedTestimonial(null);
  };

  const handleAddTestimonial = () => {
    if (!newTestimonial.name || !newTestimonial.testimonial) {
      toast.error('Nama dan testimonial harus diisi!');
      return;
    }
    
    addTestimonial(newTestimonial);
    setNewTestimonial({
      id: 0,
      name: '',
      company: '',
      image: '/assets/placeholder.svg',
      testimonial: ''
    });
    setIsAddingTestimonial(false);
    toast.success('Testimonial baru berhasil ditambahkan!');
  };

  const handleDeleteTestimonial = (id: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus testimonial ini?')) {
      deleteTestimonial(id);
      toast.success('Testimonial berhasil dihapus!');
    }
  };

  const getClientForm = (client: any, isNew = false) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor={`name-${isNew ? 'new' : client.id}`}>Nama Perusahaan</Label>
          <Input
            id={`name-${isNew ? 'new' : client.id}`}
            value={client.name}
            onChange={(e) => {
              if (isNew) {
                setNewClient({ ...newClient, name: e.target.value });
              } else {
                setEditedClient({ ...client, name: e.target.value });
              }
            }}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor={`industry-${isNew ? 'new' : client.id}`}>Industri</Label>
          <Input
            id={`industry-${isNew ? 'new' : client.id}`}
            value={client.industry}
            onChange={(e) => {
              if (isNew) {
                setNewClient({ ...newClient, industry: e.target.value });
              } else {
                setEditedClient({ ...client, industry: e.target.value });
              }
            }}
            className="mt-1"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor={`location-${isNew ? 'new' : client.id}`}>Lokasi</Label>
          <Input
            id={`location-${isNew ? 'new' : client.id}`}
            value={client.location}
            onChange={(e) => {
              if (isNew) {
                setNewClient({ ...newClient, location: e.target.value });
              } else {
                setEditedClient({ ...client, location: e.target.value });
              }
            }}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor={`implementation-${isNew ? 'new' : client.id}`}>Implementasi</Label>
          <Input
            id={`implementation-${isNew ? 'new' : client.id}`}
            value={client.implementation}
            onChange={(e) => {
              if (isNew) {
                setNewClient({ ...newClient, implementation: e.target.value });
              } else {
                setEditedClient({ ...client, implementation: e.target.value });
              }
            }}
            className="mt-1"
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor={`logo-${isNew ? 'new' : client.id}`}>Logo</Label>
        <div className="mt-1 flex items-center">
          <div className="w-24 h-24 rounded-md overflow-hidden border">
            <AspectRatio ratio={1/1}>
              <img 
                src={isNew ? newClient.logo : client.logo} 
                alt="Preview" 
                className="object-contain w-full h-full p-2" 
              />
            </AspectRatio>
          </div>
          <Button variant="outline" size="sm" className="ml-4">
            <Upload size={16} className="mr-1" />
            Upload Logo
          </Button>
        </div>
      </div>
      
      <div className="border-t pt-4">
        <h3 className="font-medium mb-2">Studi Kasus</h3>
        
        <div className="space-y-3">
          <div>
            <Label htmlFor={`case-title-${isNew ? 'new' : client.id}`}>Judul</Label>
            <Input
              id={`case-title-${isNew ? 'new' : client.id}`}
              value={isNew ? (newClient.caseStudy?.title || '') : (client.caseStudy?.title || '')}
              onChange={(e) => {
                if (isNew) {
                  setNewClient({
                    ...newClient,
                    caseStudy: { ...newClient.caseStudy, title: e.target.value }
                  });
                } else {
                  setEditedClient({
                    ...client,
                    caseStudy: { ...client.caseStudy, title: e.target.value }
                  });
                }
              }}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor={`case-desc-${isNew ? 'new' : client.id}`}>Deskripsi Singkat</Label>
            <Textarea
              id={`case-desc-${isNew ? 'new' : client.id}`}
              value={isNew ? (newClient.caseStudy?.description || '') : (client.caseStudy?.description || '')}
              onChange={(e) => {
                if (isNew) {
                  setNewClient({
                    ...newClient,
                    caseStudy: { ...newClient.caseStudy, description: e.target.value }
                  });
                } else {
                  setEditedClient({
                    ...client,
                    caseStudy: { ...client.caseStudy, description: e.target.value }
                  });
                }
              }}
              className="mt-1"
              rows={2}
            />
          </div>
          
          <div>
            <Label htmlFor={`case-challenge-${isNew ? 'new' : client.id}`}>Tantangan</Label>
            <Textarea
              id={`case-challenge-${isNew ? 'new' : client.id}`}
              value={isNew ? (newClient.caseStudy?.challenge || '') : (client.caseStudy?.challenge || '')}
              onChange={(e) => {
                if (isNew) {
                  setNewClient({
                    ...newClient,
                    caseStudy: { ...newClient.caseStudy, challenge: e.target.value }
                  });
                } else {
                  setEditedClient({
                    ...client,
                    caseStudy: { ...client.caseStudy, challenge: e.target.value }
                  });
                }
              }}
              className="mt-1"
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor={`case-solution-${isNew ? 'new' : client.id}`}>Solusi</Label>
            <Textarea
              id={`case-solution-${isNew ? 'new' : client.id}`}
              value={isNew ? (newClient.caseStudy?.solution || '') : (client.caseStudy?.solution || '')}
              onChange={(e) => {
                if (isNew) {
                  setNewClient({
                    ...newClient,
                    caseStudy: { ...newClient.caseStudy, solution: e.target.value }
                  });
                } else {
                  setEditedClient({
                    ...client,
                    caseStudy: { ...client.caseStudy, solution: e.target.value }
                  });
                }
              }}
              className="mt-1"
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor={`case-result-${isNew ? 'new' : client.id}`}>Hasil</Label>
            <Textarea
              id={`case-result-${isNew ? 'new' : client.id}`}
              value={isNew ? (newClient.caseStudy?.result || '') : (client.caseStudy?.result || '')}
              onChange={(e) => {
                if (isNew) {
                  setNewClient({
                    ...newClient,
                    caseStudy: { ...newClient.caseStudy, result: e.target.value }
                  });
                } else {
                  setEditedClient({
                    ...client,
                    caseStudy: { ...client.caseStudy, result: e.target.value }
                  });
                }
              }}
              className="mt-1"
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor={`case-image-${isNew ? 'new' : client.id}`}>Gambar Studi Kasus</Label>
            <div className="mt-1 flex items-center">
              <div className="w-32 h-24 rounded-md overflow-hidden border">
                <AspectRatio ratio={4/3}>
                  <img 
                    src={isNew ? (newClient.caseStudy?.image || '/assets/placeholder.svg') : (client.caseStudy?.image || '/assets/placeholder.svg')} 
                    alt="Preview" 
                    className="object-cover w-full h-full" 
                  />
                </AspectRatio>
              </div>
              <Button variant="outline" size="sm" className="ml-4">
                <Upload size={16} className="mr-1" />
                Upload Gambar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const getTestimonialForm = (testimonial: any, isNew = false) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor={`testimonial-name-${isNew ? 'new' : testimonial.id}`}>Nama</Label>
          <Input
            id={`testimonial-name-${isNew ? 'new' : testimonial.id}`}
            value={testimonial.name}
            onChange={(e) => {
              if (isNew) {
                setNewTestimonial({ ...newTestimonial, name: e.target.value });
              } else {
                setEditedTestimonial({ ...testimonial, name: e.target.value });
              }
            }}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor={`testimonial-company-${isNew ? 'new' : testimonial.id}`}>Perusahaan</Label>
          <Input
            id={`testimonial-company-${isNew ? 'new' : testimonial.id}`}
            value={testimonial.company}
            onChange={(e) => {
              if (isNew) {
                setNewTestimonial({ ...newTestimonial, company: e.target.value });
              } else {
                setEditedTestimonial({ ...testimonial, company: e.target.value });
              }
            }}
            className="mt-1"
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor={`testimonial-text-${isNew ? 'new' : testimonial.id}`}>Testimonial</Label>
        <Textarea
          id={`testimonial-text-${isNew ? 'new' : testimonial.id}`}
          value={testimonial.testimonial}
          onChange={(e) => {
            if (isNew) {
              setNewTestimonial({ ...newTestimonial, testimonial: e.target.value });
            } else {
              setEditedTestimonial({ ...testimonial, testimonial: e.target.value });
            }
          }}
          className="mt-1"
          rows={4}
        />
      </div>
      
      <div>
        <Label htmlFor={`testimonial-image-${isNew ? 'new' : testimonial.id}`}>Foto</Label>
        <div className="mt-1 flex items-center">
          <div className="w-20 h-20 rounded-full overflow-hidden border">
            <AspectRatio ratio={1/1}>
              <img 
                src={testimonial.image} 
                alt="Preview" 
                className="object-cover w-full h-full" 
              />
            </AspectRatio>
          </div>
          <Button variant="outline" size="sm" className="ml-4">
            <Upload size={16} className="mr-1" />
            Upload Foto
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-6 w-full max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Kelola Klien & Studi Kasus</h1>
          <p className="text-gray-500">Perbarui klien, studi kasus, dan testimonial yang ditampilkan di website</p>
        </div>
        
        <Tabs defaultValue="clients" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="clients" className="flex items-center">
              <Building size={16} className="mr-2" />
              Klien & Studi Kasus
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex items-center">
              <FileText size={16} className="mr-2" />
              Testimonial
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="clients">
            <div className="flex justify-end mb-4">
              <Button 
                onClick={() => setIsAddingClient(true)}
                className="bg-antlia-blue hover:bg-antlia-blue/90"
              >
                <Plus size={16} className="mr-1" />
                Tambah Klien
              </Button>
            </div>
            
            {/* Form Tambah Klien Baru */}
            {isAddingClient && (
              <Card className="mb-6 shadow-md">
                <CardHeader>
                  <CardTitle>Tambah Klien Baru</CardTitle>
                </CardHeader>
                <CardContent>
                  {getClientForm(newClient, true)}
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsAddingClient(false)}
                  >
                    <X size={16} className="mr-1" />
                    Batal
                  </Button>
                  <Button
                    onClick={handleAddClient}
                    className="bg-antlia-blue hover:bg-antlia-blue/90"
                  >
                    <Check size={16} className="mr-1" />
                    Simpan
                  </Button>
                </CardFooter>
              </Card>
            )}
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {clients.map((client) => (
                <Card key={client.id} className="shadow-md overflow-hidden">
                  {editingClientId !== client.id ? (
                    <>
                      <CardHeader className="pb-2 flex flex-row items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-12 h-12 mr-4">
                            <AspectRatio ratio={1/1}>
                              <img
                                src={client.logo}
                                alt={client.name}
                                className="object-contain"
                              />
                            </AspectRatio>
                          </div>
                          <CardTitle>{client.name}</CardTitle>
                        </div>
                        <div className="flex space-x-1">
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8"
                            onClick={() => handleEditClient(client.id)}
                          >
                            <Edit size={16} />
                          </Button>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8 text-red-500 hover:text-white hover:bg-red-500"
                            onClick={() => handleDeleteClient(client.id)}
                          >
                            <Trash size={16} />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-4">
                          <div>
                            <span className="font-medium text-gray-500">Industri:</span> {client.industry}
                          </div>
                          <div>
                            <span className="font-medium text-gray-500">Lokasi:</span> {client.location}
                          </div>
                          <div>
                            <span className="font-medium text-gray-500">Implementasi:</span> {client.implementation}
                          </div>
                        </div>
                        
                        {client.caseStudy?.title && (
                          <div className="mt-4 border-t pt-4">
                            <h3 className="font-medium mb-2">Studi Kasus</h3>
                            <h4 className="font-medium text-antlia-blue">{client.caseStudy.title}</h4>
                            <p className="text-sm mt-1">{client.caseStudy.description}</p>
                          </div>
                        )}
                      </CardContent>
                    </>
                  ) : (
                    <>
                      <CardHeader>
                        <CardTitle>Edit Klien</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {getClientForm(editedClient)}
                      </CardContent>
                      <CardFooter className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          onClick={handleCancelEditClient}
                        >
                          <X size={16} className="mr-1" />
                          Batal
                        </Button>
                        <Button
                          onClick={handleSaveClient}
                          className="bg-antlia-blue hover:bg-antlia-blue/90"
                        >
                          <Check size={16} className="mr-1" />
                          Simpan
                        </Button>
                      </CardFooter>
                    </>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="testimonials">
            <div className="flex justify-end mb-4">
              <Button 
                onClick={() => setIsAddingTestimonial(true)}
                className="bg-antlia-blue hover:bg-antlia-blue/90"
              >
                <Plus size={16} className="mr-1" />
                Tambah Testimonial
              </Button>
            </div>
            
            {/* Form Tambah Testimonial Baru */}
            {isAddingTestimonial && (
              <Card className="mb-6 shadow-md">
                <CardHeader>
                  <CardTitle>Tambah Testimonial Baru</CardTitle>
                </CardHeader>
                <CardContent>
                  {getTestimonialForm(newTestimonial, true)}
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsAddingTestimonial(false)}
                  >
                    <X size={16} className="mr-1" />
                    Batal
                  </Button>
                  <Button
                    onClick={handleAddTestimonial}
                    className="bg-antlia-blue hover:bg-antlia-blue/90"
                  >
                    <Check size={16} className="mr-1" />
                    Simpan
                  </Button>
                </CardFooter>
              </Card>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="shadow-md">
                  {editingTestimonialId !== testimonial.id ? (
                    <>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                              <AspectRatio ratio={1/1}>
                                <img
                                  src={testimonial.image}
                                  alt={testimonial.name}
                                  className="object-cover"
                                />
                              </AspectRatio>
                            </div>
                            <div>
                              <h3 className="font-medium">{testimonial.name}</h3>
                              <p className="text-sm text-gray-500">{testimonial.company}</p>
                            </div>
                          </div>
                          <div className="flex space-x-1">
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8"
                              onClick={() => handleEditTestimonial(testimonial.id)}
                            >
                              <Edit size={16} />
                            </Button>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8 text-red-500 hover:text-white hover:bg-red-500"
                              onClick={() => handleDeleteTestimonial(testimonial.id)}
                            >
                              <Trash size={16} />
                            </Button>
                          </div>
                        </div>
                        <div className="relative">
                          <p className="text-sm italic text-gray-700">"{testimonial.testimonial}"</p>
                        </div>
                      </CardContent>
                    </>
                  ) : (
                    <>
                      <CardHeader>
                        <CardTitle>Edit Testimonial</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {getTestimonialForm(editedTestimonial)}
                      </CardContent>
                      <CardFooter className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          onClick={handleCancelEditTestimonial}
                        >
                          <X size={16} className="mr-1" />
                          Batal
                        </Button>
                        <Button
                          onClick={handleSaveTestimonial}
                          className="bg-antlia-blue hover:bg-antlia-blue/90"
                        >
                          <Check size={16} className="mr-1" />
                          Simpan
                        </Button>
                      </CardFooter>
                    </>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Clients;
