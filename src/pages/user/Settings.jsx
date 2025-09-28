import React, { useState } from 'react';
import { Save, Bell, Globe, Moon, Sun, Shield, Trash2 } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { Modal } from '../../components/ui/modal.jsx'; // Assuming Modal is in ui folder

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    language: 'en',
    currency: 'USD'
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleSave = () => {
    // Save settings logic would go here
    console.log('Settings saved:', settings);
  };

  const handleDeleteAccount = () => {
    // Delete account logic would go here
    console.log('Account deletion requested for user:', user.email);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Settings</h1>

        <div className="space-y-8">
          {/* Profile Settings */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Profile Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue={user?.name}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue={user?.email}
                  className="input-field"
                  disabled
                />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="text-primary-500" size={24} />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Notifications
              </h2>
            </div>
            
            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Email Notifications</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Receive order updates and promotions via email
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={e => setSettings(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                  className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">SMS Notifications</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Receive order updates via SMS
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.smsNotifications}
                  onChange={e => setSettings(prev => ({ ...prev, smsNotifications: e.target.checked }))}
                  className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Marketing Emails</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Receive special offers and product updates
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.marketingEmails}
                  onChange={e => setSettings(prev => ({ ...prev, marketingEmails: e.target.checked }))}
                  className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                />
              </label>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="card p-6 border border-red-200 dark:border-red-800">
            <div className="flex items-center gap-3 mb-4">
              <Trash2 className="text-red-500" size={24} />
              <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">
                Danger Zone
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Delete Account
            </button>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button onClick={handleSave} className="btn-primary flex items-center gap-2">
              <Save size={20} />
              Save Changes
            </button>
          </div>
        </div>

        {/* Delete Account Modal */}
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title="Delete Account"
          size="md"
        >
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              Are you sure you want to delete your account? This action cannot be undone.
              All your data will be permanently removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDeleteAccount}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Delete Account
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Settings;