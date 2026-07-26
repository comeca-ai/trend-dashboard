'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Trends } from '@/types';

interface TrendChartProps {
  trends: Trends[];
}

export default function TrendChart({ trends }: TrendChartProps) {
  const chartData = trends.slice(0, 5).map((trend) => ({
    name: trend.title.substring(0, 15),
    value: trend.search_volume || 0,
    growth: trend.growth_rate || 0,
  }));

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h2 className="text-2xl font-semibold mb-6">Evolução de Tendências</h2>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="name" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#6366f1"
            strokeWidth={2}
            dot={{ fill: '#6366f1' }}
          />
          <Line
            type="monotone"
            dataKey="growth"
            stroke="#ec4899"
            strokeWidth={2}
            dot={{ fill: '#ec4899' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
