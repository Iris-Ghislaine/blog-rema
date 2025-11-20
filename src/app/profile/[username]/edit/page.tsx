/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { ImageUpload } from '@/components/editor/ImageUpload';
import { useToast } from '@/context/ToastContext';
import { Spinner } from '@/components/ui/Spinner';
import { User, Camera, Save } from 'lucide-react';

export default function EditProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { data: session, update } = useSession();
  const router = useRouter();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState<string>('');
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    params.then((p) => setUsername(p.username));
  }, [params]);

  useEffect(() => {
    if (username && session) {
      // Check if user owns this profile
      if ((session.user as any)?.username !== username) {
        toast.error('You can only edit your own profile');
        router.push(`/profile/${username}`);
        return;
      }
      
      // Fetch user data
      fetch(`/api/users/${username}`)
        .then(res => res.json())
        .then(data => {
          setUserData(data);
          setFormData({
            name: data.name || '',
            bio: data.bio || '',
            avatar: data.avatar || '',
          });
        });
    }
  }, [username, session, router, toast]);

  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    avatar: '',
  });

  if (!session) {
    router.push('/login');
    return null;
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`/api/users/${username}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to update profile');
      }

      toast.success('Profile updated successfully!');
      
      // Update session with new data
      await update({
        ...session,
        user: {
          ...session.user,
          name: formData.name,
          image: formData.avatar,
        }
      });

      router.push(`/profile/${username}`);
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-gradient-to-r from-orange-600 to-blue-900 p-3 rounded-lg">
            <User className="text-white" size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Edit Profile</h1>
            <p className="text-gray-600">Update your profile information</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Avatar Section */}
          <div className="flex items-center gap-6 pb-8 border-b">
            <Avatar src={formData.avatar} size="xl" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Profile Picture</h3>
              <p className="text-sm text-gray-600 mb-4">
                Upload a new profile picture or enter an image URL
              </p>
              <Input
                placeholder="https://example.com/avatar.jpg"
                value={formData.avatar}
                onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
              />
            </div>
          </div>

          {/* Profile Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <User size={20} />
              Profile Information
            </h3>

            <Input
              label="Display Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="Your full name"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="px-4 py-3 bg-gray-100 rounded-lg text-gray-500">
                @{username}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Username cannot be changed
              </p>
            </div>

            <Textarea
              label="Bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Tell us about yourself..."
              rows={4}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-6 border-t">
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              className="flex-1"
            >
              <Save size={18} className="mr-2" />
              Save Changes
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/profile/${username}`)}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </form>

        {/* Info Box */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mt-6">
          <h3 className="font-semibold text-blue-900 mb-2">
            💡 Profile Tips
          </h3>
          <ul className="text-blue-800 text-sm space-y-1">
            <li>• Use a clear, professional photo</li>
            <li>• Write a compelling bio (max 160 characters recommended)</li>
            <li>• Your profile helps readers connect with your stories</li>
          </ul>
        </div>
      </div>
    </div>
  );
}