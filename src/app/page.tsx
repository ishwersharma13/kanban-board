"use client";
import Board from "@/components/Board";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { CreateWorkItemForm } from "./CreateWorkItem";

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <main className="h-screen min-w-[720px] flex flex-col">
      <header className="font-mono px-4 pt-4 pb-3 flex gap-12 items-center w-full border-b-2 border-gray-300">
        <span className="text-2xl font-medium">Kanban Board</span>
        <button
          className="bg-blue-600 hover:bg-opacity-95 rounded-md text-slate-50 px-4 py-2"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          + Create Task
        </button>
      </header>
      <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Work Item</DialogTitle>
        
          </DialogHeader>

          <DialogClose asChild>
            <CreateWorkItemForm setIsOpen={setIsOpen} />
          </DialogClose>
        </DialogContent>
      </Dialog>
      <section className="m-8 flex-auto relative flex">
        <Board />
      </section>
    </main>
  );
}
