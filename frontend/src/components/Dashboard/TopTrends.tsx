'use client';

import { Trends } from '@/types';
import { TrendingUp } from 'lucide-react';

interface TopTrendsProps {
  trends: Trends[];
}

export default function TopTrends({ trends }: TopTrendsProps) {
  const top10 = trends.slice(0, 10);

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <TrendingUp className="text-primary" />
        Top 10 Tendências
      </h2>
      
      <div className="space-y-4">
        {top10.map((trend, index) => (
          <div
            key={index}
            className="p-4 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-all group cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl font-bold text-primary/50">#{index + 1}</span>
                  <h3 className="text-lg font-semibold group-hover:text-primary transition">
                    {trend.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-400">{trend.description}</p>
              </div>
              <div className="text-right ml-4">
                <div className="text-2xl font-bold text-accent">
                  +{trend.growth_rate}%
                </div>
                <span className="text-xs text-gray-400">crescimento</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
