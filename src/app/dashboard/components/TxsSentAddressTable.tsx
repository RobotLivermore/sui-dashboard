'use client'
import GridItemContentContainer from "@/components/GridLayout/GridItemContentContainer";
import { QueryTaskContext } from "@/components/QueryTaskProvider/context";
import ResultTable from "@/components/ResultTable";
import { useContext, useEffect } from "react";
import { top10TxSentAddressQuery, top10TxSentAddressQuerySql } from '../utils/top10TxSentAddressQuery'

export default function TxsSentAddressTable() {

  const queryTaskVaule = useContext(QueryTaskContext)
  
  const task = queryTaskVaule?.tasks.find(t => t.id === top10TxSentAddressQuery.id)

  useEffect(() => {
    if (!task) {
      queryTaskVaule?.addTask(top10TxSentAddressQuery)
    }
    if (task?.status === 'idle') {
      queryTaskVaule?.callTask(top10TxSentAddressQuery.id)
    }
  }, [queryTaskVaule, task])
  
  const columns = [{ title:"Address", dataIndex: 'sender' }, { title: "Total", dataIndex: 'total' }];
  console.log(queryTaskVaule?.tasks)
  return (
    <GridItemContentContainer title="Top Accounts by Number of Transactions Sent" outerUrl={`https://console.chainbase.com/dataCloud?sql=${encodeURIComponent(top10TxSentAddressQuerySql)}`} dragable>
      <ResultTable columns={columns} data={task?.data || []} />
    </GridItemContentContainer>
  );
}
