'use client'
import GridItemContentContainer from "@/components/GridLayout/GridItemContentContainer";
import { QueryTaskContext } from "@/components/QueryTaskProvider/context";
import { useContext, useEffect } from "react";
import { top10GasUsageAddressQuery, queryString } from '../utils/top10GasUsageAddressQuery'
import SimplePieChart from "@/components/PieChart";
import { formatAddressToDisplay } from "@/utils/formatter";

const valueFormatter = (value: number) => `${value.toFixed(2)} Sui`

export default function GasUsageAddressPieChart() {

  const queryTaskVaule = useContext(QueryTaskContext)
  
  const task = queryTaskVaule?.tasks.find(t => t.id === top10GasUsageAddressQuery.id)

  useEffect(() => {
    if (!task) {
      queryTaskVaule?.addTask(top10GasUsageAddressQuery)
    }
    if (task?.status === 'idle') {
      queryTaskVaule?.callTask(top10GasUsageAddressQuery.id)
    }
  }, [queryTaskVaule, task])
  
  const data = task?.data?.map((r: { sender: any; total: any; }) => ({ name: r.sender, value: r.total })) || []

  return (
    <GridItemContentContainer title="Gas Usage Address Table" outerUrl={`https://console.chainbase.com/dataCloud?sql=${encodeURIComponent(queryString)}`} dragable>
      <SimplePieChart data={data} nameFormatter={formatAddressToDisplay} valueFormatter={valueFormatter} />
    </GridItemContentContainer>
  );
}