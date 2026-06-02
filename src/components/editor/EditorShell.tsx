"use client";
import Toolbar from "./Toolbar";
import Sidebar from "./Sidebar";
import CanvasArea from "./CanvasArea/index";
import BottomPanel from "./BottomPanel";
import { useState } from "react";
import { CanvasObject } from "./CanvasArea/type";

export default function EditorShell() {

const [selectedObjectId, setSelectedObjectId] = useState<number|null>(null);
const [objects, setObjects] = useState<CanvasObject[]>([]);
const addObject = () => {
  setObjects([
    ...objects,
    {
      id: Date.now(),
      type:"shape",
      x: 200,
      y: 200,
    },
  ]);
};
  return (
    <div className="h-screen flex flex-col">
      
      <Toolbar />

      <div className="flex flex-1">
        <CanvasArea objects={objects}
        selectedObjectId={selectedObjectId}
        setSelectedObjectId={setSelectedObjectId}
        />
        <Sidebar />
      </div>

      <BottomPanel addObject={addObject}/>
    </div>
  );
}