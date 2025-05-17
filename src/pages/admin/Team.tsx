
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, Plus, Trash, X, Edit, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Json } from '@/integrations/supabase/types';

interface TeamMember {
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

interface TeamMemberFromDB {
  id: string;
  name: string;
  position: string;
  bio: string;
  photo: string;
  socials: Json;
  created_at: string;
  updated_at: string;
}

const Team = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedMember, setEditedMember] = useState<TeamMember | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newMember, setNewMember] = useState<TeamMember>({
    id: '',
    name: '',
    position: '',
    bio: '',
    photo: '/assets/placeholder.svg',
    socials: {
      linkedin: '',
      twitter: '',
      instagram: ''
    }
  });

  // Fetch team members from Supabase
  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('team_members')
        .select('*');
      
      if (error) {
        throw error;
      }
      
      if (data) {
        // Transform the data to match our TeamMember interface
        const formattedTeam = data.map((member: TeamMemberFromDB) => ({
          id: member.id,
          name: member.name,
          position: member.position,
          bio: member.bio,
          photo: member.photo,
          socials: member.socials as unknown as {
            linkedin: string;
            twitter: string;
            instagram: string;
          }
        }));
        setTeam(formattedTeam);
      }
    } catch (error) {
      console.error('Error fetching team members:', error);
      toast.error('Gagal memuat data tim');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: string) => {
    const member = team.find(t => t.id === id);
    if (!member) return;
    
    setEditedMember({ ...member });
    setEditingId(id);
  };

  const handleSave = async () => {
    if (!editedMember) return;
    
    try {
      const { data, error } = await supabase
        .from('team_members')
        .update({
          name: editedMember.name,
          position: editedMember.position,
          bio: editedMember.bio,
          photo: editedMember.photo,
          socials: editedMember.socials as any
        })
        .eq('id', editedMember.id)
        .select();
      
      if (error) throw error;
      
      // Update local state
      setTeam(team.map(member => 
        member.id === editedMember.id ? editedMember : member
      ));
      
      setEditingId(null);
      setEditedMember(null);
      toast.success('Anggota tim berhasil diperbarui!');
    } catch (error) {
      console.error('Error updating team member:', error);
      toast.error('Gagal memperbarui anggota tim');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedMember(null);
  };

  const handleAddMember = async () => {
    if (!newMember.name || !newMember.position) {
      toast.error('Nama dan jabatan harus diisi!');
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('team_members')
        .insert({
          name: newMember.name,
          position: newMember.position,
          bio: newMember.bio,
          photo: newMember.photo,
          socials: newMember.socials as any
        })
        .select();
      
      if (error) throw error;
      
      if (data) {
        // Transform the data to match our TeamMember interface
        const newTeamMember: TeamMember = {
          id: data[0].id,
          name: data[0].name,
          position: data[0].position,
          bio: data[0].bio,
          photo: data[0].photo,
          socials: data[0].socials as unknown as {
            linkedin: string;
            twitter: string;
            instagram: string;
          }
        };
        setTeam([...team, newTeamMember]);
      }
      
      setNewMember({
        id: '',
        name: '',
        position: '',
        bio: '',
        photo: '/assets/placeholder.svg',
        socials: {
          linkedin: '',
          twitter: '',
          instagram: ''
        }
      });
      setIsAddingNew(false);
      toast.success('Anggota tim baru berhasil ditambahkan!');
    } catch (error) {
      console.error('Error adding team member:', error);
      toast.error('Gagal menambahkan anggota tim');
    }
  };

  const handleDeleteMember = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus anggota tim ini?')) {
      try {
        const { error } = await supabase
          .from('team_members')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        
        setTeam(team.filter(member => member.id !== id));
        toast.success('Anggota tim berhasil dihapus!');
      } catch (error) {
        console.error('Error deleting team member:', error);
        toast.error('Gagal menghapus anggota tim');
      }
    }
  };

  const getMemberForm = (member: any, isNew = false) => (
    <>
      <div className="space-y-4">
        <div>
          <Label htmlFor={`photo-${isNew ? 'new' : member.id}`}>Foto</Label>
          <div className="mt-1 flex items-center">
            <div className="w-24 h-24 rounded-md overflow-hidden border">
              <AspectRatio ratio={1/1}>
                <img src={member.photo} alt="Preview" className="object-cover w-full h-full" />
              </AspectRatio>
            </div>
            <Button variant="outline" size="sm" className="ml-4">
              <Upload size={16} className="mr-1" />
              Upload Foto
            </Button>
          </div>
        </div>
        
        <div>
          <Label htmlFor={`name-${isNew ? 'new' : member.id}`}>Nama</Label>
          <Input
            id={`name-${isNew ? 'new' : member.id}`}
            value={member.name}
            onChange={(e) => {
              if (isNew) {
                setNewMember({ ...newMember, name: e.target.value });
              } else {
                setEditedMember(editedMember ? { ...editedMember, name: e.target.value } : null);
              }
            }}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor={`position-${isNew ? 'new' : member.id}`}>Jabatan</Label>
          <Input
            id={`position-${isNew ? 'new' : member.id}`}
            value={member.position}
            onChange={(e) => {
              if (isNew) {
                setNewMember({ ...newMember, position: e.target.value });
              } else {
                setEditedMember(editedMember ? { ...editedMember, position: e.target.value } : null);
              }
            }}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor={`bio-${isNew ? 'new' : member.id}`}>Biografi</Label>
          <Input
            id={`bio-${isNew ? 'new' : member.id}`}
            value={member.bio}
            onChange={(e) => {
              if (isNew) {
                setNewMember({ ...newMember, bio: e.target.value });
              } else {
                setEditedMember(editedMember ? { ...editedMember, bio: e.target.value } : null);
              }
            }}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label>Media Sosial</Label>
          <div className="space-y-2 mt-1">
            <div>
              <Label htmlFor={`linkedin-${isNew ? 'new' : member.id}`} className="text-xs">LinkedIn</Label>
              <Input
                id={`linkedin-${isNew ? 'new' : member.id}`}
                value={member.socials.linkedin}
                onChange={(e) => {
                  if (isNew) {
                    setNewMember({
                      ...newMember,
                      socials: { ...newMember.socials, linkedin: e.target.value }
                    });
                  } else {
                    setEditedMember(editedMember ? {
                      ...editedMember,
                      socials: { ...editedMember.socials, linkedin: e.target.value }
                    } : null);
                  }
                }}
                placeholder="https://linkedin.com/in/username"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor={`twitter-${isNew ? 'new' : member.id}`} className="text-xs">Twitter</Label>
              <Input
                id={`twitter-${isNew ? 'new' : member.id}`}
                value={member.socials.twitter}
                onChange={(e) => {
                  if (isNew) {
                    setNewMember({
                      ...newMember,
                      socials: { ...newMember.socials, twitter: e.target.value }
                    });
                  } else {
                    setEditedMember(editedMember ? {
                      ...editedMember,
                      socials: { ...editedMember.socials, twitter: e.target.value }
                    } : null);
                  }
                }}
                placeholder="https://twitter.com/username"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor={`instagram-${isNew ? 'new' : member.id}`} className="text-xs">Instagram</Label>
              <Input
                id={`instagram-${isNew ? 'new' : member.id}`}
                value={member.socials.instagram}
                onChange={(e) => {
                  if (isNew) {
                    setNewMember({
                      ...newMember,
                      socials: { ...newMember.socials, instagram: e.target.value }
                    });
                  } else {
                    setEditedMember(editedMember ? {
                      ...editedMember,
                      socials: { ...editedMember.socials, instagram: e.target.value }
                    } : null);
                  }
                }}
                placeholder="https://instagram.com/username"
                className="mt-1"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-6 w-full max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Kelola Tim</h1>
            <p className="text-gray-500">Perbarui anggota tim yang ditampilkan di halaman Tentang Kami</p>
          </div>
          <Button 
            onClick={() => setIsAddingNew(true)}
            className="bg-antlia-blue hover:bg-antlia-blue/90"
          >
            <Plus size={16} className="mr-1" />
            Tambah Anggota
          </Button>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-antlia-blue border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-gray-600">Memuat data tim...</p>
          </div>
        )}

        {/* Form Tambah Anggota Baru */}
        {isAddingNew && (
          <Card className="mb-6 shadow-md">
            <CardHeader>
              <CardTitle>Tambah Anggota Tim Baru</CardTitle>
            </CardHeader>
            <CardContent>
              {getMemberForm(newMember, true)}
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsAddingNew(false)}
              >
                <X size={16} className="mr-1" />
                Batal
              </Button>
              <Button
                onClick={handleAddMember}
                className="bg-antlia-blue hover:bg-antlia-blue/90"
              >
                <Check size={16} className="mr-1" />
                Simpan
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Team members grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <Card key={member.id} className="shadow-md overflow-hidden">
                {editingId !== member.id ? (
                  <>
                    <div className="relative h-48">
                      <AspectRatio ratio={3/2}>
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </AspectRatio>
                      <div className="absolute top-2 right-2 flex space-x-1">
                        <Button
                          size="icon"
                          variant="outline"
                          className="bg-white h-8 w-8"
                          onClick={() => handleEdit(member.id)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          className="bg-white h-8 w-8 text-red-500 hover:text-white hover:bg-red-500"
                          onClick={() => handleDeleteMember(member.id)}
                        >
                          <Trash size={16} />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="pt-4">
                      <h3 className="text-lg font-bold">{member.name}</h3>
                      <p className="text-gray-500">{member.position}</p>
                      <p className="mt-2 text-sm text-gray-700">{member.bio}</p>
                    </CardContent>
                  </>
                ) : (
                  <>
                    <CardHeader>
                      <CardTitle>Edit Anggota Tim</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {editedMember && getMemberForm(editedMember)}
                    </CardContent>
                    <CardFooter className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        onClick={handleCancel}
                      >
                        <X size={16} className="mr-1" />
                        Batal
                      </Button>
                      <Button
                        onClick={handleSave}
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
            
            {team.length === 0 && !loading && !isAddingNew && (
              <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500">Belum ada anggota tim. Klik "Tambah Anggota" untuk menambahkan.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Team;
