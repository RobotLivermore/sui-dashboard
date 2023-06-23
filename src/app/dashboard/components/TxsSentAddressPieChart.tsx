'use client'
import GridItemContentContainer from "@/components/GridLayout/GridItemContentContainer";
import { QueryTaskContext } from "@/components/QueryTaskProvider/context";
import { useContext, useEffect } from "react";
import SimplePieChart from "@/components/PieChart";
import { top10TxSentAddressQuery, top10TxSentAddressQuerySql } from '../utils/top10TxSentAddressQuery'
import { formatAddressToDisplay } from "@/utils/formatter";

export default function TxsSentAddressPieChart() {

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
  const data = task?.data?.map((r: { sender: any; total: any; }) => ({ name: r.sender, value: Number(r.total) })) || []
  console.log(task)
  return (
    <GridItemContentContainer title="Top Accounts by Number of Transactions Sent" outerUrl={`https://console.chainbase.com/dataCloud?sql=${encodeURIComponent(top10TxSentAddressQuerySql)}`} dragable>
      <SimplePieChart data={data} nameFormatter={formatAddressToDisplay} />
    </GridItemContentContainer>
  );
}
