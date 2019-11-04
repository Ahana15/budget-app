import React, { useState } from "react";
import "../styles/EditBudget.sass";
import Axios from "axios";
import Button from "@material-ui/core/Button";
import { TextField, CardContent, Card } from "@material-ui/core";

export default function EditProfile(props) {
  const [updateBudgetInfo, setUpdateBudgetInfo] = useState({
    amount: "",
    goal_type: "budget",
    name: "budget",
    start_date: null,
    end_date: null
  });
  function updateBudget() {
    Axios.post("http://localhost:3000/goals", updateBudgetInfo, {
      withCredentials: true
    });
  }
  return (
    <div className="edit-budget">
      <Card>
        <CardContent>
          <div>
            <TextField
              style={{ margin: "5px", width: "80%" }}
              placeholder="Enter a new Budget"
              value={updateBudgetInfo.amount}
              onChange={e =>
                setUpdateBudgetInfo({
                  ...updateBudgetInfo,
                  amount: e.target.value
                })
              }
            ></TextField>
          </div>
          <div className="submit-button">
            <Button
              onClick={() => {
                if (updateBudgetInfo.amount > 0) {
                  props.closeEditBudget();
                  updateBudget();
                  setUpdateBudgetInfo({ ...updateBudgetInfo, amount: "" });
                }
              }}
            >
              Update Budget
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
