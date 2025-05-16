
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Check, Plus, Trash, X } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

const Packages = () => {
  const [pricing, setPricing] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedPlan, setEditedPlan] = useState<any>(null);
  const [newFeature, setNewFeature] = useState('');

  // Fetch pricing plans from Supabase
  useEffect(() => {
    fetchPricingPlans();
  }, []);

  const fetchPricingPlans = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('pricing_plans')
        .select('*');
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setPricing(data);
      }
    } catch (error) {
      console.error('Error fetching pricing plans:', error);
      toast.error('Gagal memuat paket layanan');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: string) => {
    const plan = pricing.find(p => p.id === id);
    if (!plan) return;
    
    setEditedPlan({ ...plan });
    setEditingId(id);
  };

  const handleSave = async () => {
    if (!editedPlan) return;
    
    try {
      const { data, error } = await supabase
        .from('pricing_plans')
        .update({
          name: editedPlan.name,
          price: editedPlan.price,
          description: editedPlan.description,
          features: editedPlan.features,
          popular: editedPlan.popular || false
        })
        .eq('id', editedPlan.id)
        .select();
      
      if (error) throw error;
      
      // Update local state
      setPricing(pricing.map(plan => 
        plan.id === editedPlan.id ? { ...plan, ...editedPlan } : plan
      ));
      
      setEditingId(null);
      setEditedPlan(null);
      toast.success('Paket berhasil diperbarui!');
    } catch (error) {
      console.error('Error updating pricing plan:', error);
      toast.error('Gagal memperbarui paket');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedPlan(null);
  };

  const handleAddFeature = () => {
    if (!newFeature.trim() || !editedPlan) return;
    
    setEditedPlan({
      ...editedPlan,
      features: [...editedPlan.features, newFeature]
    });
    setNewFeature('');
  };

  const handleRemoveFeature = (index: number) => {
    if (!editedPlan) return;
    
    const newFeatures = [...editedPlan.features];
    newFeatures.splice(index, 1);
    
    setEditedPlan({
      ...editedPlan,
      features: newFeatures
    });
  };

  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-6 w-full max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Kelola Paket & Layanan</h1>
            <p className="text-gray-500">Perbarui paket yang ditampilkan di halaman Produk & Layanan</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-antlia-blue border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-gray-600">Memuat data paket layanan...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pricing.map((plan) => (
              <Card key={plan.id} className={`shadow-md transition-all ${plan.popular ? 'border-antlia-blue ring-1 ring-antlia-blue/30' : ''}`}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex justify-between items-center">
                    {editingId === plan.id ? (
                      <Input 
                        value={editedPlan?.name || ''} 
                        onChange={(e) => setEditedPlan({ ...editedPlan, name: e.target.value })} 
                        className="font-bold"
                      />
                    ) : (
                      <span>{plan.name}</span>
                    )}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {editingId === plan.id ? (
                    <>
                      <div>
                        <Label htmlFor={`price-${plan.id}`}>Harga</Label>
                        <Input 
                          id={`price-${plan.id}`}
                          value={editedPlan?.price || ''} 
                          onChange={(e) => setEditedPlan({ ...editedPlan, price: e.target.value })} 
                          className="mt-1 text-xl font-bold"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor={`description-${plan.id}`}>Deskripsi</Label>
                        <Textarea 
                          id={`description-${plan.id}`}
                          value={editedPlan?.description || ''} 
                          onChange={(e) => setEditedPlan({ ...editedPlan, description: e.target.value })} 
                          className="mt-1"
                          rows={3}
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch
                          id={`popular-${plan.id}`}
                          checked={editedPlan?.popular || false}
                          onCheckedChange={(checked) => setEditedPlan({ ...editedPlan, popular: checked })}
                        />
                        <Label htmlFor={`popular-${plan.id}`}>Tandai sebagai Populer</Label>
                      </div>
                      
                      <div>
                        <Label>Fitur-fitur</Label>
                        <ul className="mt-2 space-y-2">
                          {editedPlan?.features.map((feature: string, idx: number) => (
                            <li key={idx} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                              <div className="flex items-start">
                                <Check size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                <span>{feature}</span>
                              </div>
                              <button 
                                onClick={() => handleRemoveFeature(idx)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash size={16} />
                              </button>
                            </li>
                          ))}
                        </ul>
                        
                        <div className="flex items-center mt-3">
                          <Input 
                            placeholder="Tambah fitur baru" 
                            value={newFeature}
                            onChange={(e) => setNewFeature(e.target.value)}
                            className="flex-1"
                          />
                          <Button 
                            onClick={handleAddFeature}
                            type="button"
                            size="sm"
                            className="ml-2"
                          >
                            <Plus size={16} />
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-2xl font-bold">{plan.price}</div>
                      <p className="text-gray-600">{plan.description}</p>
                      <ul className="space-y-2">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <Check size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </CardContent>

                <CardFooter className="pt-3 flex justify-end">
                  {editingId === plan.id ? (
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        onClick={handleCancel}
                        size="sm"
                      >
                        <X size={16} className="mr-1" />
                        Batal
                      </Button>
                      <Button
                        onClick={handleSave}
                        size="sm"
                        className="bg-antlia-blue hover:bg-antlia-blue/90"
                      >
                        <Check size={16} className="mr-1" />
                        Simpan
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => handleEdit(plan.id)}
                      variant="outline"
                      size="sm"
                    >
                      Edit Paket
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Packages;
