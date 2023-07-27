import { TaskValue } from "@/components/QueryTaskProvider/context";

export const currentValidatorQuerySql = "with\n    latest as (\n        select\n            max(epoch) as latest\n        from\n            sui.validators\n    )\nselect\n    name,\n    staking_pool_sui_balance / 1000000000 as stake_balance,\n    \nimage_url\n from\n    sui.validators,\n    latest\nwhere\n    sui.validators.epoch = latest.latest\norder by\n    stake_balance desc;"

export const CurrentValidatorQuery: TaskValue = {
  id: 'current-validator-query',
  task: async () => {
    const res = await fetch('/api/chainbase/dw/query', {
      method: 'POST',
      body: JSON.stringify({
        query: currentValidatorQuerySql,
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