
import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, Plus, Trash, X, Edit, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const Team = () => {
  const { team, updateTeam, addTeamMember, deleteTeamMember } = useData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedMember, setEditedMember] = useState<any>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newMember, setNewMember] = useState({
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

  const handleEdit = (id: string) => {
    const member = team.find(t => t.id === id);
    if (!member) return;
    
    setEditedMember({ ...member });
    setEditingId(id);
  };

  const handleSave = () => {
    if (!editedMember) return;
    
    updateTeam(editedMember.id, editedMember);
    setEditingId(null);
    setEditedMember(null);
    toast.success('Anggota tim berhasil diperbarui!');
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedMember(null);
  };

  const handleAddMember = () => {
    if (!newMember.name || !newMember.position) {
      toast.error('Nama dan jabatan harus diisi!');
      return;
    }
    
    addTeamMember(newMember);
    setNewMember({
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
  };

  const handleDeleteMember = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus anggota tim ini?')) {
      deleteTeamMember(id);
      toast.success('Anggota tim berhasil dihapus!');
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
                setEditedMember({ ...member, name: e.target.value });
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
                setEditedMember({ ...member, position: e.target.value });
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
                setEditedMember({ ...member, bio: e.target.value });
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
                    setEditedMember({
                      ...member,
                      socials: { ...member.socials, linkedin: e.target.value }
                    });
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
                    setEditedMember({
                      ...member,
                      socials: { ...member.socials, twitter: e.target.value }
                    });
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
                    setEditedMember({
                      ...member,
                      socials: { ...member.socials, instagram: e.target.value }
                    });
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
                    {getMemberForm(editedMember)}
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
        </div>
      </div>
    </AdminLayout>
  );
};

export default Team;
