import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { User, Mail, Edit, Save, X } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: user?.name || '', email: user?.email || '' });

  if (!user) {
    return <p className="text-center py-16">Please log in to view your profile.</p>;
  }

  const handleSave = () => setIsEditing(false);
  const handleCancel = () => setIsEditing(false);

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="card overflow-hidden">
        <div className="bg-primary-500 p-6 text-white">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center"><User size={32} /></div>
                    <div>
                        <h1 className="text-2xl font-bold">{user.name}</h1>
                        <p className="text-primary-100">{user.email}</p>
                    </div>
                </div>
                {!isEditing ? <button onClick={() => setIsEditing(true)} className="btn-secondary">Edit</button> : <div className="flex gap-2"><button onClick={handleSave} className="btn-primary">Save</button><button onClick={handleCancel}>Cancel</button></div>}
            </div>
        </div>
        <div className="p-6 space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                {isEditing ? <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="input-field mt-1" /> : <p className="mt-1">{user.name}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <p className="mt-1 text-gray-500">{user.email}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;