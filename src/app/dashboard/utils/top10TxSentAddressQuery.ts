import { TaskValue } from "@/components/QueryTaskProvider/context";

export const top10TxSentAddressQuerySql = "SELECT\n    sender,\n    count() as total\nFROM\n    sui.transactions\nWHERE\n    sender != \"0x0000000000000000000000000000000000000000000000000000000000000000\"\nGROUP BY\n    sender\nORDER BY\n    total DESC\nLIMIT\n    10"

export const top10TxSentAddressQuery: TaskValue = {
  id: 'txs-sent-address-query',
  task: async () => {
    const res = await fetch('/api/chainbase/dw/query', {
      method: 'POST',
      body: JSON.stringify({
        query: top10TxSentAddressQuerySql,
      }),
      headers: {
        "Content-Type": 'application/json'
      }
    });
    const result = await res.json();
    return result?.data?.result
  },
  data: [],
  status: 'idle'
}