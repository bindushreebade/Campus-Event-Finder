
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Event } from '@/data/mockEvents';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardStatsProps {
  events: Event[];
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ events }) => {
  // Transform events data for the chart
  const chartData = events.map(event => ({
    name: event.title.length > 15 ? event.title.substring(0, 15) + '...' : event.title,
    attendees: event.attendees,
    capacity: event.capacity,
    fill: '#8884d8',
  }));

  const attendanceRate = events.length > 0 
    ? Math.round((events.reduce((sum, e) => sum + e.attendees, 0) / 
        events.reduce((sum, e) => sum + e.capacity, 0)) * 100)
    : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Event Analytics</CardTitle>
        <CardDescription>Attendance and engagement metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end"
                height={70}
                stroke="#888888"
              />
              <YAxis stroke="#888888" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                }}
              />
              <Bar 
                dataKey="attendees" 
                fill="var(--primary)" 
                radius={[4, 4, 0, 0]}
                name="Attendees"
              />
              <Bar 
                dataKey="capacity" 
                fill="var(--primary-foreground)" 
                radius={[4, 4, 0, 0]} 
                opacity={0.2}
                name="Capacity"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-muted/30 p-4 rounded-md">
            <p className="text-muted-foreground text-sm">Total Attendance</p>
            <h4 className="text-2xl font-bold">
              {events.reduce((sum, e) => sum + e.attendees, 0)}
            </h4>
          </div>
          <div className="bg-muted/30 p-4 rounded-md">
            <p className="text-muted-foreground text-sm">Attendance Rate</p>
            <h4 className="text-2xl font-bold">{attendanceRate}%</h4>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardStats;
