"use client";

import { useWorkItemDispatch, useWorkItemSelector } from "@/redux/hooks";
import { WorkItemState } from "@/redux/slices/workItemSlice";
import  { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteWorkItem, updateWorkItemStatus,updateWorkItem } from "@/redux/slices/workItemSlice";

function Board() {
  const workItems = useWorkItemSelector(
    (state) => state.workitemsReducer.workitems
  );
  const dispatch = useWorkItemDispatch();

  function handleDragOver(event: React.DragEvent<HTMLElement>) {
    event.preventDefault();
    const section = event.target as HTMLElement;
  }

  function handleTaskDrop(event: React.DragEvent<HTMLElement>) {
    event.preventDefault();
    const droppedElement = document.getElementById(
      event.dataTransfer.getData("text")
    );
    (event.target as HTMLElement).appendChild(droppedElement!);
  }
  return (
    <section className="w-full p-4 rounded-md h-full grid grid-cols-3 gap-8">
    <section className="border-2 border-gray-200 bg-gray-100 rounded-md h-full flex flex-col gap-2 p-2">
      <h2 className="p-4 text-center text-lg font-mono font-medium text-gray-600">
        TO DO
      </h2>
      <section
        className="flex-auto w-full flex flex-col gap-2"
        onDragOver={handleDragOver}
        onDrop={handleTaskDrop}
        onDragLeave={(e) => {
          console.log("leaving");
          console.log(e.target);
        }}
        onDragEnter={(e) => {
          console.log("entering");
          console.log(e.target);
        }
        }>
        {workItems.map((workItem) => (
          <WorkItem key={workItem.id} workItem={workItem} />
       ) )}
  
      </section>
    </section>
    <section className="border-2 border-gray-200 bg-gray-100 rounded-md h-full flex flex-col gap-2 p-2">
      <h2 className="p-4 text-center text-lg font-mono font-medium text-gray-600">
        In Progress
      </h2>
      <section
        className="flex-auto w-full flex flex-col gap-2"
        onDragOver={handleDragOver}
        onDrop={handleTaskDrop}
      ></section>
    </section>
    <section className="border-2 border-gray-200 bg-gray-100 rounded-md h-full flex flex-col gap-2 p-2">
      <h2 className="p-4 text-center text-lg font-mono font-medium text-gray-600">
        Completed
      </h2>
      <section
        className="flex-auto w-full flex flex-col gap-2"
        onDragOver={handleDragOver}
        onDrop={handleTaskDrop}
      ></section>
    </section>
  </section>
  );
}

function WorkItem({ workItem }: { workItem: WorkItemState }) {
  const dispatch = useDispatch();
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(workItem.title);
  const [newDescription, setNewDescription] = useState(workItem.description);

  const openEditForm = () => {
    setIsEditFormOpen(true);
  };

  const closeEditForm = () => {
    setIsEditFormOpen(false);
  };

  const handleDelete = () => {
    dispatch(deleteWorkItem(workItem.id));
  };

  const handleUpdate = () => {
    // Dispatch an action to update the work item status
    // dispatch(updateWorkItemStatus({ id: workItem.id, status: "updated" }));

    // Dispatch an action to update the work item with newTitle and newDescription
    dispatch(
      updateWorkItem({
        id: workItem.id,
        title: newTitle,
        description: newDescription,
      })
    );

    // Close the edit form
    closeEditForm();
  };


  return (
    <span
    className={`border-2 w-full rounded-md p-2 ${workItem.color}`}
    id={workItem.id}
    draggable
    onDragStart={(e: React.DragEvent<HTMLSpanElement>) => {
      e.dataTransfer.effectAllowed = "move";

      e.dataTransfer.setData("text", (e.target as HTMLSpanElement).id);
  }}
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "16px",
    borderRadius: "8px",
    border: `2px solid ${workItem.color}`,
    transition: "transform 0.2s",
  }}
>
  <h1
    style={{
      fontSize: "20px",
      marginBottom: "8px",
      fontWeight: "bold",
      color: "#333",
    }}
  >
    {workItem.title}
  </h1>
  <p
    style={{
      fontSize: "14px",
      color: "#666",
    }}
  >
    {workItem.description}
  </p>
  {workItem.dueDate && (
    <p
      className="text-sm font-semibold"
      style={{
        fontSize: "12px",
        color: "#F88E0A",
      }}
    >
      Due Date: {workItem.dueDate}
    </p>
  )}
      <button className="bg-green-500 text-white px-3 py-1 rounded mt-2" onClick={handleDelete}>Delete</button>
      <button className="bg-green-500 text-white px-3 py-1 rounded mt-2" onClick={openEditForm}>Edit</button>
      {isEditFormOpen && (
        <div className="mt-4">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full p-2 bg-blue-200 border rounded"
            placeholder="Enter title"
          />
          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="w-full p-2 border rounded bg-blue-200"
            placeholder="Enter description"
          />
          <button onClick={handleUpdate} className="bg-green-500 text-white px-3 py-1 rounded mt-2">Update</button>
        </div>
      )}
    </span>
  );
}




export default Board;
