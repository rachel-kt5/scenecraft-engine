"use client";
import Toolbar from "./Toolbar";
import Sidebar from "./Sidebar";
import CanvasArea from "./CanvasArea/index";
import BottomPanel from "./BottomPanel";
import { useState, useEffect } from "react";
import { CanvasObject } from "./CanvasArea/type";

export default function EditorShell() {

  const [selectedObjectId, setSelectedObjectId] = useState<number | null>(null);
  const [objects, setObjects] = useState<CanvasObject[]>([]);
  const addObject = () => {
    setObjects([
      ...objects,
      {
        id: Date.now(),
        type: "shape",
        x: 200,
        y: 200,
      },
    ]);
  };
  const MoveObject = (
    id: number,
    x: number,
    y: number,
  ) => {
    setObjects(
      objects.map((Object) =>
        Object.id === id ? { ...Object, x, y } : Object
      )
    );
  }
  const deleleObject = () => {
    if (selectedObjectId === null) return;
    setObjects(
      objects.filter(
        object => object.id !== selectedObjectId
      ));
    setSelectedObjectId(null);
  };
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Delete") {
        console.log(event.key);
        deleleObject();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedObjectId, objects]);
  return (
    <div className="h-screen flex flex-col">

      <Toolbar />

      <div className="flex flex-1">
        <CanvasArea objects={objects}
          selectedObjectId={selectedObjectId}
          setSelectedObjectId={setSelectedObjectId}
          moveObject={MoveObject}
        />
        <Sidebar />
      </div>

      <BottomPanel addObject={addObject} />
    </div>
  );
}