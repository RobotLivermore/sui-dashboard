'use client'
import GridItemContentContainer from "@/components/GridLayout/GridItemContentContainer";
import { QueryTaskContext } from "@/components/QueryTaskProvider/context";
import { useContext, useEffect } from "react";
import SimpleBarChart from "@/components/BarChart";
import { dailyNewAddressQuery, dailyNewAddressSql } from '../utils/dailyNewUserQuery'

export default function DailyNewAddressBarChart() {

  const queryTaskVaule = useContext(QueryTaskContext)
  
  const task = queryTaskVaule?.tasks.find(t => t.id === dailyNewAddressQuery.id)

  useEffect(() => {
    if (!task) {
      queryTaskVaule?.addTask(dailyNewAddressQuery)
    }
    if (task?.status === 'idle') {
      queryTaskVaule?.callTask(dailyNewAddressQuery.id)
    }
  }, [queryTaskVaule, task])
  
  const data = task?.data?.map((r: { date: any; total: any; }) => ({ name: r.date, value: Number(r.total) })) || []

  return (
    <GridItemContentContainer title="Daily New Address" outerUrl={`https://console.chainbase.com/dataCloud?sql=${encodeURIComponent(dailyNewAddressSql)}`} dragable>
      <SimpleBarChart data={data} />
    </GridItemContentContainer>
  );
}
