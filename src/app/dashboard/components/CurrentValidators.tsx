"use client";
import GridItemContentContainer from "@/components/GridLayout/GridItemContentContainer";
import { QueryTaskContext } from "@/components/QueryTaskProvider/context";
import ResultTable from "@/components/ResultTable";
import { useContext, useEffect } from "react";
import {
  CurrentValidatorQuery,
  currentValidatorQuerySql,
} from "../utils/currentValidatorsQuery";

export default function CurrentValidators() {
  const queryTaskVaule = useContext(QueryTaskContext);

  const task = queryTaskVaule?.tasks.find(
    (t) => t.id === CurrentValidatorQuery.id
  );

  useEffect(() => {
    if (!task) {
      queryTaskVaule?.addTask(CurrentValidatorQuery);
    }
    if (task?.status === "idle") {
      queryTaskVaule?.callTask(CurrentValidatorQuery.id);
    }
  }, [queryTaskVaule, task]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (val: any, record: any) => {
        return (
          <span className="inline-flex items-center">
            <img className="w-5 h-5 rounded-full border border-gray-200" src={record.image_url} alt="logo" />
            <span className="ml-2">{val}</span>
          </span>
        );
      },
    },
    { title: "Stake", dataIndex: "stake_balance" },
  ];
  return (
    <GridItemContentContainer
      title="Current Validators"
      outerUrl={`https://console.chainbase.com/dataCloud?sql=${encodeURIComponent(
        currentValidatorQuerySql
      )}`}
      dragable
    >
      <ResultTable columns={columns} data={task?.data || []} />
    </GridItemContentContainer>
  );
}
