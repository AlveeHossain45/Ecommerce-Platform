import React, { useState } from 'react';
import { useApi, useMutation, useOptimisticMutation } from './premium-hooks';

// Premium User Interface Components
const PremiumCard = ({ children, className = '' }) => (
  <div className={`premium-card ${className}`}>
    <div className="premium-glow"></div>
    {children}
  </div>
);

const LoadingSpinner = ({ size = 'medium' }) => (
  <div className={`premium-spinner premium-spinner-${size}`}>
    <div className="spinner-ring"></div>
    <div className="spinner-ring"></div>
    <div className="spinner-ring"></div>
  </div>
);

const StatusBadge = ({ status, children }) => (
  <span className={`status-badge status-${status}`}>
    {children}
  </span>
);

// Premium API Demo Component
export const PremiumUserDashboard = () => {
  const [userId, setUserId] = useState(1);
  const [newUserName, setNewUserName] = useState('');

  // Premium useApi hook with enhanced features
  const {
    data: userData,
    loading: userLoading,
    error: userError,
    refetch: refetchUser,
    reset: resetUser,
    isFetching: userFetching
  } = useApi(
    () => fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then(res => res.json()),
    {
      enabled: true,
      retryCount: 3,
      cacheTime: 300000, // 5 minutes
      staleTime: 60000, // 1 minute
      onSuccess: (data) => {
        console.log('🎉 User data fetched successfully:', data);
      },
      onError: (error) => {
        console.error('❌ Failed to fetch user:', error);
      }
    }
  );

  // Premium useMutation hook for updates
  const {
    mutate: updateUser,
    loading: updating,
    error: updateError,
    status: updateStatus,
    reset: resetUpdate
  } = useMutation(
    (userData) => 
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then(res => res.json()),
    {
      retryCount: 2,
      onSuccess: (data) => {
        console.log('✅ User updated successfully:', data);
        refetchUser(); // Auto-refresh after mutation
      },
      onError: (error) => {
        console.error('❌ Failed to update user:', error);
      }
    }
  );

  // Optimistic mutation for instant UI updates
  const {
    mutate: createUser,
    loading: creating,
    error: createError,
    isOptimistic
  } = useOptimisticMutation(
    (userName) =>
      fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify({
          name: userName,
          email: `${userName.toLowerCase()}@example.com`,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then(res => res.json()),
    {
      optimisticUpdate: (userName) => ({
        id: Date.now(), // Temporary ID
        name: userName,
        email: `${userName.toLowerCase()}@example.com`,
        username: userName.toLowerCase(),
        _optimistic: true
      }),
      onSuccess: (data) => {
        console.log('🚀 User created successfully:', data);
        setNewUserName('');
      }
    }
  );

  const handleUpdateUser = () => {
    if (userData) {
      updateUser({
        ...userData,
        name: `${userData.name} (Updated)`
      });
    }
  };

  const handleCreateUser = () => {
    if (newUserName.trim()) {
      createUser(newUserName.trim());
    }
  };

  return (
    <div className="premium-dashboard">
      {/* Header Section */}
      <div className="dashboard-header">
        <h1 className="premium-title">
          🚀 Premium User Dashboard
        </h1>
        <p className="premium-subtitle">
          Advanced data management with smart caching & optimistic updates
        </p>
      </div>

      <div className="dashboard-grid">
        {/* User Data Card */}
        <PremiumCard className="data-card">
          <div className="card-header">
            <h2>👤 User Information</h2>
            <div className="card-actions">
              <button 
                onClick={() => setUserId(prev => Math.max(1, prev - 1))}
                disabled={userLoading}
                className="premium-btn premium-btn-outline"
              >
                ← Previous
              </button>
              <button 
                onClick={refetchUser}
                disabled={userLoading}
                className="premium-btn premium-btn-primary"
              >
                {userFetching ? '🔄 Refreshing...' : '🔄 Refresh'}
              </button>
              <button 
                onClick={() => setUserId(prev => prev + 1)}
                disabled={userLoading}
                className="premium-btn premium-btn-outline"
              >
                Next →
              </button>
            </div>
          </div>

          <div className="card-content">
            {userLoading && !userData && (
              <div className="loading-state">
                <LoadingSpinner />
                <p>Loading user data...</p>
              </div>
            )}

            {userError && (
              <div className="error-state">
                <div className="error-icon">⚠️</div>
                <h3>Failed to load user</h3>
                <p>{userError}</p>
                <button 
                  onClick={refetchUser}
                  className="premium-btn premium-btn-secondary"
                >
                  Retry
                </button>
              </div>
            )}

            {userData && (
              <div className="user-info">
                <div className="info-grid">
                  <div className="info-item">
                    <label>ID</label>
                    <span>{userData.id}</span>
                  </div>
                  <div className="info-item">
                    <label>Name</label>
                    <span>{userData.name}</span>
                  </div>
                  <div className="info-item">
                    <label>Email</label>
                    <span>{userData.email}</span>
                  </div>
                  <div className="info-item">
                    <label>Username</label>
                    <span>{userData.username}</span>
                  </div>
                  <div className="info-item">
                    <label>Phone</label>
                    <span>{userData.phone}</span>
                  </div>
                  <div className="info-item">
                    <label>Website</label>
                    <span>{userData.website}</span>
                  </div>
                </div>
                
                <div className="status-indicators">
                  {userFetching && (
                    <StatusBadge status="fetching">
                      🔄 Syncing...
                    </StatusBadge>
                  )}
                  <StatusBadge status="success">
                    ✅ Cached
                  </StatusBadge>
                </div>
              </div>
            )}
          </div>
        </PremiumCard>

        {/* Actions Card */}
        <PremiumCard className="actions-card">
          <div className="card-header">
            <h2>⚡ Quick Actions</h2>
          </div>

          <div className="action-buttons">
            <button
              onClick={handleUpdateUser}
              disabled={updating || !userData}
              className={`premium-btn premium-btn-warning ${updating ? 'loading' : ''}`}
            >
              {updating ? (
                <>
                  <LoadingSpinner size="small" />
                  Updating...
                </>
              ) : (
                '✏️ Update User'
              )}
            </button>

            <button
              onClick={resetUser}
              disabled={userLoading}
              className="premium-btn premium-btn-outline"
            >
              🗑️ Clear Cache
            </button>

            <button
              onClick={resetUpdate}
              disabled={!updateError}
              className="premium-btn premium-btn-outline"
            >
              🧹 Reset Update
            </button>
          </div>

          {/* Update Status */}
          {updateStatus && updateStatus !== 'idle' && (
            <div className={`status-message status-${updateStatus}`}>
              {updateStatus === 'loading' && '🔄 Updating user...'}
              {updateStatus === 'success' && '✅ User updated successfully!'}
              {updateStatus === 'error' && `❌ Update failed: ${updateError}`}
            </div>
          )}
        </PremiumCard>

        {/* Create User Card */}
        <PremiumCard className="create-card">
          <div className="card-header">
            <h2>👥 Create New User</h2>
            {isOptimistic && (
              <StatusBadge status="optimistic">
                ⚡ Optimistic
              </StatusBadge>
            )}
          </div>

          <div className="create-form">
            <input
              type="text"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              placeholder="Enter user name..."
              className="premium-input"
              disabled={creating}
            />
            
            <button
              onClick={handleCreateUser}
              disabled={creating || !newUserName.trim()}
              className={`premium-btn premium-btn-success ${creating ? 'loading' : ''}`}
            >
              {creating ? (
                <>
                  <LoadingSpinner size="small" />
                  {isOptimistic ? 'Creating...' : 'Saving...'}
                </>
              ) : (
                '🚀 Create User'
              )}
            </button>
          </div>

          {createError && (
            <div className="error-message">
              ⚠️ {createError}
            </div>
          )}
        </PremiumCard>

        {/* Stats Card */}
        <PremiumCard className="stats-card">
          <div className="card-header">
            <h2>📊 Performance Stats</h2>
          </div>
          
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">{userId}</div>
              <div className="stat-label">Current User ID</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">
                {userData ? '✅' : '❌'}
              </div>
              <div className="stat-label">Data Loaded</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">
                {userFetching ? '🔄' : '✅'}
              </div>
              <div className="stat-label">Cache Status</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">
                {updateStatus === 'success' ? '✅' : '⚡'}
              </div>
              <div className="stat-label">Mutation Ready</div>
            </div>
          </div>
        </PremiumCard>
      </div>
    </div>
  );
};

// Premium Loading Component
export const PremiumSkeletonLoader = () => (
  <PremiumCard>
    <div className="skeleton-loader">
      <div className="skeleton-header"></div>
      <div className="skeleton-content">
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line short"></div>
      </div>
    </div>
  </PremiumCard>
);

// Premium Error Boundary Component
export const PremiumErrorBoundary = ({ error, onRetry }) => (
  <PremiumCard className="error-boundary">
    <div className="error-content">
      <div className="error-icon">🚨</div>
      <h2>Something went wrong</h2>
      <p className="error-message">{error}</p>
      <div className="error-actions">
        <button onClick={onRetry} className="premium-btn premium-btn-primary">
          🔄 Try Again
        </button>
        <button onClick={() => window.location.reload()} className="premium-btn premium-btn-outline">
          🔃 Reload Page
        </button>
      </div>
    </div>
  </PremiumCard>
);

export default PremiumUserDashboard;