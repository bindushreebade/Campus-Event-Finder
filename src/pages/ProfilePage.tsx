
import React from 'react';
import UserProfile from '@/components/profile/UserProfile';

const ProfilePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div className="section-container pt-24">
        <UserProfile />
      </div>
    </div>
  );
};

export default ProfilePage;
