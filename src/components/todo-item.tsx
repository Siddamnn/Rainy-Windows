"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { X, GripVertical, Palette } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import type { Todo } from "./todo-list";

type TodoItemProps = Todo & {
  onUpdate: (id: string, newProps: Partial<Omit<Todo, "id">>) => void;
  onDelete: (id: string) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
  availableColors: string[];
};

export default function TodoItem({
  id,
  content,
  position,
  color,
  onUpdate,
  onDelete,
  onDragStart,
  availableColors,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(content === "New Note...");
  const [editedContent, setEditedContent] = useState(content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [isEditing]);

  const handleBlur = () => {
    if (editedContent.trim() === "") {
        onDelete(id);
    } else {
        onUpdate(id, { content: editedContent });
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleBlur();
    }
    if (e.key === "Escape") {
      setEditedContent(content);
      setIsEditing(false);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      whileHover={{ scale: 1.05 }}
    >
      <div
        id={id}
        draggable
        onDragStart={(e: React.DragEvent<HTMLDivElement>) => onDragStart(e, id)}
        className={cn(
          "absolute cursor-grab active:cursor-grabbing w-64 h-64 p-4 rounded-lg shadow-lg flex flex-col backdrop-blur-sm border",
          color,
          "border-black/10"
        )}
        style={{ top: position.top, left: position.left }}
      >
      <div className="flex-grow overflow-auto" onDoubleClick={() => setIsEditing(true)}>
        {isEditing ? (
          <Textarea
            ref={textareaRef}
            value={editedContent}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditedContent(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="w-full h-full bg-transparent border-0 resize-none focus-visible:ring-0 text-accent-foreground"
          />
        ) : (
          <p className="whitespace-pre-wrap text-accent-foreground font-body p-2">
            {content || "Double-click to edit"}
          </p>
        )}
      </div>
      <div className="absolute top-1 right-1 flex items-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="w-6 h-6 rounded-full">
              <Palette className="w-4 h-4 text-accent-foreground/70" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2">
            <div className="flex gap-2">
              {availableColors.map((c) => (
                <button
                  key={c}
                  className={cn("w-6 h-6 rounded-full border", c, {
                    "ring-2 ring-ring": color === c,
                  })}
                  onClick={() => onUpdate(id, { color: c })}
                  aria-label={`Change color to ${c}`}
                />
              ))}
            </div>
          </PopoverContent>
        </Popover>
        <GripVertical className="w-5 h-5 text-accent-foreground/50 mr-1 cursor-grab" />
        <Button
          variant="ghost"
          size="icon"
          className="w-6 h-6 rounded-full"
          onClick={() => onDelete(id)}
        >
          <X className="w-4 h-4 text-accent-foreground/70" />
        </Button>
      </div>
      </div>
    </motion.div>
  );
}