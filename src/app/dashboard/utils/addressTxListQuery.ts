import { TaskValue } from "@/components/QueryTaskProvider/context";

export const getQueryString = (addr: string) => `SELECT\n    transaction_digest,\n    timestamp\nFROM\n    sui.transactions\nwhere\n    sender = \"${addr}\"\norder by\n    timestamp DESC`

export const addressTxListQuery: TaskValue = {
  id: 'address-tx-query',
  task: async (params: {address: string}) => {
    const res = await fetch('/api/chainbase/dw/query', {
      method: 'POST',
      body: JSON.stringify({
        query: getQueryString(params.address),
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