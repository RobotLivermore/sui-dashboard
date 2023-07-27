"use client";
import React, { useCallback, useState } from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const COLORS = ["#fd7f6f", "#7eb0d5", "#b2e061", "#bd7ebe", "#ffb55a", "#ffee65", "#beb9db", "#fdcce5", "#8bd3c7"]

interface PieDataItem {
  name: string
  value: number
}

interface SimpleBarChartProps {
  data: PieDataItem[]
}

export default function SimpleBarChart({ data }: SimpleBarChartProps) {

  console.log(data);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#15527b" />
        </BarChart>
    </ResponsiveContainer>
  );
}
