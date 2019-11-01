import React, { useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@material-ui/core";
import GoalForm from "./GoalForm";

export default function CreateGoal(props) {
  const [active, setActive] = useState(false);

  const onSave = newState => {
    axios
      .post(
        "http://localhost:3000/goals",
        {
          goal: {
            goal_type: "saving",
            amount: parseInt(newState.amount),
            name: newState.name,
            start_date: newState.start_date,
            end_date: newState.end_date
          }
        },
        { withCredentials: true }
      )
      .then(res => {
        const newGoalArray = [...props.newGoal.goals];
        newGoalArray.unshift({
          id: res.data.goal.id,
          amount: res.data.goal.amount,
          name: res.data.goal.name,
          start_date: new Date(res.data.goal.start_date),
          end_date: new Date(res.data.goal.end_date)
        });
        props.setNewGoal({
          ...props.newGoal,
          goals: newGoalArray
        });
      })
      .then(() => {
        setActive(!active);
      });
  };

  return (
    <Card>
      <CardContent>
        {!active && (
          <div onClick={() => setActive(!active)}>
            <h2>Create Goal</h2>
          </div>
        )}
        {active && (
          <div>
            <GoalForm
              active={active}
              setActive={setActive}
              name={props.newGoal.createGoal.name}
              amount={props.newGoal.createGoal.amount}
              start_date={props.newGoal.createGoal.start_date}
              end_date={props.newGoal.createGoal.end_date}
              onSave={onSave}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
