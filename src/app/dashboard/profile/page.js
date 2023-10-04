import Profile from '@/components/profile';
import SideBar from '@/components/sideBar';

export default function page() {
  return (
    <div style={{ display: 'flex' }}>
      <SideBar />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        Profile
        <Profile />
      </div>
    </div>
  );
}
