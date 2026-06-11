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
  const [isCtrlPressed, setIsCtrlPressed] = useState(false);
  
  const addObject = () => {
    setObjects([
      ...objects,
      {
        id: Date.now(),
        type: "shape",
        x: 200,
        y: 200,
        width: 300,
        height: 100,
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
      objects.filter((object) => {

        return object.id !== selectedObjectId;
      })
    );
  };
  useEffect(() => {

    const handleKeyDown = (event: KeyboardEvent) => {
      //console.log("key pressed:", event.key);
      if (event.key === "Delete" || event.key === "Backspace") {
        //console.log(event.key);
        deleleObject();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedObjectId, objects]);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Control") {
        setIsCtrlPressed(true);
      }
    };
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Control") {
        setIsCtrlPressed(false)
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
  }, []);

  

  const duplicateObject = (id: number) => {
    const object = objects.find(
      (object) => object.id === id
    );
    if (!object) return null;
    const newObject = {
      ...object,
      id: Date.now(),
      x: object.x,
      y: object.y,
      width: object.width,
      heigth: object.height,
    };
    setObjects([
      ...objects, newObject,
    ]);
    return newObject.id;
  };
  const ResizeObject = (
    id: number,
    x:number,
    y:number,
    width: number,
    height: number,
  ) => {
    
    setObjects(
      objects.map((Object) =>
        Object.id === id ? { ...Object,x,y, width, height, } : Object
      )
    );
  };
  return (
    <div className="h-screen flex flex-col">

      <Toolbar />

      <div className="flex flex-1">
        <CanvasArea objects={objects}
          selectedObjectId={selectedObjectId}
          setSelectedObjectId={setSelectedObjectId}
          moveObject={MoveObject}
          isCtrlPressed={isCtrlPressed}
          duplicateObject={duplicateObject}
          ResizeObject={ResizeObject}
        />
        <Sidebar />
      </div>

      <BottomPanel addObject={addObject} />
    </div>
  );
}