'use client'
import GridItemContentContainer from "@/components/GridLayout/GridItemContentContainer";
import { QueryTaskContext } from "@/components/QueryTaskProvider/context";
import ResultTable from "@/components/ResultTable";
import { useContext, useEffect } from "react";
import { top10GasUsageAddressQuery, queryString } from '../utils/top10GasUsageAddressQuery'

export default function GasUsageAddressTable() {

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
  
  const columns = [{ title:"Address", dataIndex: 'sender' }, { title: "Total Usage", dataIndex: 'total' }];
  return (
    <GridItemContentContainer title="Gas Usage Address Table" outerUrl={`https://console.chainbase.com/dataCloud?sql=${encodeURIComponent(queryString)}`} dragable>
      <ResultTable columns={columns} data={task?.data || []} />
    </GridItemContentContainer>
  );
}
