import { TaskValue } from "@/components/QueryTaskProvider/context";
import { reverse } from 'lodash-es'

export const dailyNewAddressSql = "select\n    toDate(first_appearance_time) as date,\n    count(*) as total\nfrom\n    sui.addresses\ngroup by\n    date\norder by\n    date desc \nlimit 60;"

export const dailyNewAddressQuery: TaskValue = {
  id: 'daily-new-address-query',
  task: async () => {
    const res = await fetch('/api/chainbase/dw/query', {
      method: 'POST',
      body: JSON.stringify({
        query: dailyNewAddressSql,
      }),
      headers: {
        "Content-Type": 'application/json'
      }
    });
    const result = await res.json();
    return reverse(result?.data?.result)
  },
  data: [],
  status: 'idle'
}