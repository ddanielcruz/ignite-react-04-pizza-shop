import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const data = [
  { date: new Date('2024-04-01T00:00:00'), revenue: 400 },
  { date: new Date('2024-04-02T00:00:00'), revenue: 200 },
  { date: new Date('2024-04-03T00:00:00'), revenue: 100 },
  { date: new Date('2024-04-04T00:00:00'), revenue: 500 },
  { date: new Date('2024-04-05T00:00:00'), revenue: 300 },
  { date: new Date('2024-04-06T00:00:00'), revenue: 600 },
  { date: new Date('2024-04-07T00:00:00'), revenue: 800 },
  { date: new Date('2024-04-08T00:00:00'), revenue: 630 },
  { date: new Date('2024-04-09T00:00:00'), revenue: 1100 },
]

export function RevenueChart() {
  return (
    <Card className="col-span-6">
      <CardHeader className="pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data} style={{ fontSize: 12 }}>
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tickFormatter={(value: Date) =>
                value.toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                })
              }
              dy={16}
              stroke="#888"
            />
            <YAxis
              stroke="#888"
              axisLine={false}
              tickLine={false}
              width={80}
              tickFormatter={(value: number) =>
                value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })
              }
            />
            <CartesianGrid vertical={false} className="stroke-muted" />
            <Line
              type="linear"
              strokeWidth={2}
              dataKey="revenue"
              stroke={colors.violet['500']}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
