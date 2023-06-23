import { TaskValue } from "@/components/QueryTaskProvider/context";

export const queryString = "SELECT\n    sender,\n    sum(total_gas_cost) / 10e8 as total\nFROM\n    sui.transactions\nGROUP BY\n    sender\nORDER BY\n    total DESC\nLIMIT 10"

export const top10GasUsageAddressQuery: TaskValue = {
  id: 'gas-usage-address-query',
  task: async () => {
    const res = await fetch('/api/chainbase/dw/query', {
      method: 'POST',
      body: JSON.stringify({
        query: queryString,
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