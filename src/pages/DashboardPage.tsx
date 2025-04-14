
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  PlusCircle, 
  BarChart3, 
  CalendarDays, 
  Users, 
  MessageSquare,
  Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockEvents } from '@/data/mockEvents';
import DashboardEventList from '@/components/dashboard/DashboardEventList';
import DashboardStats from '@/components/dashboard/DashboardStats';
import DashboardNotifications from '@/components/dashboard/DashboardNotifications';
import DashboardAttendees from '@/components/dashboard/DashboardAttendees';

const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const myEvents = mockEvents.slice(0, 5); // Simulate user's events
  const totalAttendees = myEvents.reduce((sum, event) => sum + event.attendees, 0);
  const totalComments = 24; // Simulated total comments
  const totalRSVPs = totalAttendees; // For demo purposes
  
  return (
    <div className="min-h-screen">
      <div className="section-container pt-24 pb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Organizer Dashboard</h1>
            <p className="text-muted-foreground">Manage your events and track engagement</p>
          </div>
          
          <Link to="/create-event">
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Create New Event
            </Button>
          </Link>
        </div>
        
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-muted-foreground text-sm">Total Events</p>
                  <h3 className="text-3xl font-bold">{myEvents.length}</h3>
                </div>
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CalendarDays className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-muted-foreground text-sm">Total RSVPs</p>
                  <h3 className="text-3xl font-bold">{totalRSVPs}</h3>
                </div>
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-muted-foreground text-sm">Comments</p>
                  <h3 className="text-3xl font-bold">{totalComments}</h3>
                </div>
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-muted-foreground text-sm">Engagement Rate</p>
                  <h3 className="text-3xl font-bold">87%</h3>
                </div>
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Dashboard Tabs */}
        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="events">My Events</TabsTrigger>
            <TabsTrigger value="attendees">Attendees</TabsTrigger>
            <TabsTrigger value="notifications">
              Notifications
              <span className="ml-2 h-5 w-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">3</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-8">
            <DashboardStats events={myEvents} />
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Events</CardTitle>
                <CardDescription>Your most recent events and their performance</CardDescription>
              </CardHeader>
              <CardContent>
                <DashboardEventList events={myEvents.slice(0, 3)} />
              </CardContent>
              <CardFooter>
                <Button variant="outline" onClick={() => setActiveTab('events')} className="w-full">
                  View All Events
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="events">
            <Card className="border-none shadow-none">
              <CardHeader>
                <CardTitle>All Events</CardTitle>
                <CardDescription>Manage and monitor all your events</CardDescription>
              </CardHeader>
              <CardContent>
                <DashboardEventList events={myEvents} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="attendees">
            <Card className="border-none shadow-none">
              <CardHeader>
                <CardTitle>Attendees</CardTitle>
                <CardDescription>People who have RSVP'd to your events</CardDescription>
              </CardHeader>
              <CardContent>
                <DashboardAttendees totalAttendees={totalAttendees} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card className="border-none shadow-none">
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Recent activity and alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <DashboardNotifications />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardPage;
