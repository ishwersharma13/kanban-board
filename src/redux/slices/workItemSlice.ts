import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type WorkItemState = {
  id: string;
  title: string;
  description: string;
  dueDate?: string; // Optional due date property
  color: "red" | "yellow" | "green" | "blue";
  status: "todo" | "in-progress" | "completed";
};

type User = {
  id: string;
  username: string;
};

type WorkItemsState = {
  workitems: WorkItemState[];
  user: User;
};

const initialWorkItems: WorkItemState[] = [
  {
    id: "1",
    title: "Draggable Work 1",
    description: "This is a sample Description for Draggable Work 1",
    dueDate: "2023-12-31", // Optional due date
    color: "yellow",
    status: "todo",
  },
  {
    id: "2",
    title: "Draggable Work 2",
    description: "This is a sample Description for Draggable Work 3",
    dueDate: "2023-11-15", // Optional due date
    color: "blue",
    status: "todo",
  },
  {
    id: "3",
    title: "Draggable Work 3",
    description: "This is a sample Description for Draggable Work 3",
    dueDate: "2023-11-30", // Optional due date
    color: "green",
    status: "todo",
  },
  {
    id: "4",
    title: "Draggable Work 4",
    description: "This is a sample Description for Draggable Work 4",
    dueDate: "2023-11-30", // Optional due date
    color: "red",
    status: "todo",
  },
];

const initialState: WorkItemsState = {
  user: {
    id: "1",
    username: "Ishwer Sharma",
  },
  workitems: initialWorkItems,
};

export const workItemSlice = createSlice({
  name: "workitem",
  initialState,
  reducers: {
    createWorkItem: (state, action: PayloadAction<WorkItemState>) => {
      console.log("create work item called with: ");
      console.log(action);

      state.workitems.push(action.payload);
    },
    deleteWorkItem: (state, action: PayloadAction<string>) => {
      state.workitems = state.workitems.filter(
        (workitem) => workitem.id !== action.payload
      );
    },
    updateWorkItemStatus: (
      state,
      action: PayloadAction<Pick<WorkItemState, "id" | "status">>
    ) => {
      const workitem = state.workitems.find(
        (workitem) => workitem.id === action.payload.id
      );
      if (workitem && action.payload.status) {
        workitem.status = action.payload.status;
      }
    },
    
    updateWorkItem: (
      state,
      action: PayloadAction<Pick<WorkItemState, "id" | "title" | "description">>
    ) => {
      const workitem = state.workitems.find((w) => w.id === action.payload.id);
      if (workitem) {
        workitem.title = action.payload.title;
        workitem.description = action.payload.description;
      }
    },    
  },
});

export const { createWorkItem, deleteWorkItem,updateWorkItem, updateWorkItemStatus } =
  workItemSlice.actions;
export default workItemSlice.reducer;
