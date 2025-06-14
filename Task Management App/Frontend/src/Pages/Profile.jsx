import { useQuery } from '@tanstack/react-query';
import api from '../api';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const { data: userData, isLoading } = useQuery({
    queryKey: ['user-profile'],
    queryFn: () => api.get(`/users/${user.id}`).then(res => res.data.data)
  });

  if (isLoading) return <div>Loading profile...</div>;

  return (
  <>
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</h3>
                <p className="mt-1 text-sm">{userData.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h3>
                <p className="mt-1 text-sm">{userData.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Role</h3>
                <p className="mt-1 text-sm capitalize">{userData.role}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Member Since</h3>
                <p className="mt-1 text-sm">
                  {new Date(userData.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="mt-6">
              <Button variant="outline">Edit Profile</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </>

  );
}

export default Profile;