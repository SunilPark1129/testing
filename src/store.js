import { create } from "zustand";
import { persist } from "zustand/middleware";

const store = (set) => ({
  refAddress: null,
  tasks: [],
  draggedTask: null,
  droppable: null,
  isDragging: false,
  isLongtap: false,
  optionOpen: null,
  reNew: () => set((store) => ({ tasks: [] })),
  addTask: (title, state) =>
    set((store) => ({ tasks: [...store.tasks, { title, state }] })),
  deleteTask: (title) =>
    set((store) => ({
      tasks: store.tasks.filter((task) => task.title !== title),
    })),
  optionOpenTask: (title) => set((store) => ({ optionOpen: title })),
  editTask: (title, state, newVal) =>
    set((store) => ({
      tasks: store.tasks.map((task) =>
        task.title === title ? { title: newVal, state } : task
      ),
    })),
  setRefAddress: (title) => set({ refAddress: title }),
  setLongtap: (title) => set({ isLongtap: title }),
  setDragging: (title) => set({ isDragging: title }),
  setDraggedTask: (title) => set({ draggedTask: title }),
  setDroppable: (title) => set({ droppable: title }),
  moveTask: (title, state) =>
    set((store) => ({
      tasks: store.tasks.map((task) =>
        task.title === title ? { title, state } : task
      ),
    })),
});

export const useStore = create(persist(store, { name: "" }));
