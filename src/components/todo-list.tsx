"use client";

import React, { useState, useRef } from "react";
import useLocalStorage from "@/hooks/use-local-storage";
import TodoItem from "./todo-item";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export type Todo = {
  id: string;
  content: string;
  position: { top: number; left: number };
  color: string;
};

const colors = [
  "bg-accent/80",
  "bg-sky-400/80",
  "bg-emerald-400/80",
  "bg-rose-400/80",
  "bg-violet-400/80",
  "bg-orange-400/80",
];


export default function TodoList() {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const dragInfo = useRef<{ id: string, offset: { x: number, y: number } } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const addTodo = () => {
    const container = containerRef.current;
    if (!container) return;
    
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      content: "New Note...",
      position: {
        top: Math.random() * (container.clientHeight - 256),
        left: Math.random() * (container.clientWidth - 256),
      },
      color: colors[Math.floor(Math.random() * colors.length)],
    };
    setTodos([...todos, newTodo]);
  };

  const updateTodo = (id: string, newProps: Partial<Omit<Todo, 'id'>>) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, ...newProps } : todo))
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    const element = document.getElementById(id);
    if (element) {
        const rect = element.getBoundingClientRect();
        dragInfo.current = {
            id,
            offset: {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            },
        };
        e.dataTransfer.effectAllowed = "move";
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!dragInfo.current || !containerRef.current) return;
    
    const { id, offset } = dragInfo.current;
    const containerRect = containerRef.current.getBoundingClientRect();
    
    let top = e.clientY - containerRect.top - offset.y;
    let left = e.clientX - containerRect.left - offset.x;

    // Clamp positions to be within the container
    top = Math.max(0, Math.min(top, containerRect.height - 256));
    left = Math.max(0, Math.min(left, containerRect.width - 256));

    const newPosition = { top, left };

    updateTodo(id, { position: newPosition });
    dragInfo.current = null;
  };


  return (
    <div 
        ref={containerRef} 
        className="relative w-full h-full rounded-lg"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
    >
      {todos.length === 0 ? (
        <motion.div 
          className="w-full h-full flex flex-col items-center justify-center text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-foreground/80">Rainy Windows</h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground">Your calm space.</p>
          <Button
            onClick={addTodo}
            className="mt-8 rounded-full shadow-lg"
            size="lg"
          >
            <Plus className="mr-2 h-5 w-5" />
            Add Your First Note
          </Button>
        </motion.div>
      ) : (
        <>
          <AnimatePresence>
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                {...todo}
                availableColors={colors}
                onUpdate={updateTodo}
                onDelete={deleteTodo}
                onDragStart={handleDragStart}
              />
            ))}
          </AnimatePresence>
          <Button
            onClick={addTodo}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 rounded-full shadow-lg"
            size="lg"
          >
            <Plus className="mr-2 h-5 w-5" />
            Add Note
          </Button>
        </>
      )}
    </div>
  );
}