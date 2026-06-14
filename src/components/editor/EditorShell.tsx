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
        zIndex: 1,
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

  const ResizeObject = (
    id: number,
    x: number,
    y: number,
    width: number,
    height: number,

  ) => {

    setObjects(
      objects.map((Object) =>
        Object.id === id ? { ...Object, x, y, width, height } : Object
      )
    );
  };
  const bringToFront = (id: number) => {
    const maxZ = Math.max(
      ...objects.map(o => o.zIndex));
    setObjects(
      objects.map(o => o.id === id ?
        {
          ...o, zIndex: maxZ + 1
        } : o
      )
    );
  };
  const sendToBack = (id: number) => {
    console.log("sendToBack", id);
    const selectedObject = objects.find(obj => obj.id === id);
    if (!selectedObject) return;
    const otherObjects = objects.filter(obj => obj.id !== id);
    const sortedObjects = otherObjects.sort((a, b) => a.zIndex - b.zIndex);
    let currentZ = 1;
    const reordered = [selectedObject, ...sortedObjects,];
    const normalized = reordered.map((obj, index) => ({
      ...obj, zIndex: index + 1,
    })
    );
    setObjects(normalized);
  };
  const bringForword = (id: number) => {
    console.log("bringForword", id);
    const sortedObjects = [...objects].sort((a, b) => a.zIndex - b.zIndex);
    const index = sortedObjects.findIndex(obj => obj.id === id);
    if (index === sortedObjects.length - 1) { return; }
    [sortedObjects[index], sortedObjects[index + 1]] = [sortedObjects[index + 1], sortedObjects[index]];
    const normalized = sortedObjects.map((obj, index) => ({
      ...obj, zIndex: index + 1,
    })
    );
    setObjects(normalized);
  };
  const sendBackword = (id: number) => {
    console.log("sendBackword", id);
    const sortedObjects = [...objects].sort((a, b) => a.zIndex - b.zIndex);
    const index = sortedObjects.findIndex(obj => obj.id === id);
    if (index === 1) { return; }
    [sortedObjects[index], sortedObjects[index - 1]] = [sortedObjects[index - 1], sortedObjects[index]];
    const normalized = sortedObjects.map((obj, index) => ({
      ...obj, zIndex: index - 1,
    })
    );
    setObjects(normalized);
  };

  const duplicateObject = (id: number) => {
    const object = objects.find(
      (object) => object.id === id
    );
    const maxZ = Math.max(
      ...objects.map(o => o.zIndex));
    /*  const minZ = Math.min(
      ...objects.map(o => o.zIndex));*/
    if (!object) return null;
    const newObject = {
      ...object,
      id: Date.now(),
      x: object.x,
      y: object.y,
      width: object.width,
      heigth: object.height,
      zIndex: maxZ + 1,
    };
    setObjects([
      ...objects, newObject,
    ]);
    return newObject.id;
  };


  return (
    <div className="h-screen flex flex-col">
      <button
        onClick={() => {
          console.log(
            "selectedObjectId",
            selectedObjectId
          );

          if (selectedObjectId !== null) {
            sendBackword(selectedObjectId);
          }
        }}
      >
        Send To Back
      </button>
      <Toolbar />

      <div className="flex flex-1">
        <CanvasArea objects={objects}
          selectedObjectId={selectedObjectId}
          setSelectedObjectId={setSelectedObjectId}
          moveObject={MoveObject}
          isCtrlPressed={isCtrlPressed}
          ResizeObject={ResizeObject}
          duplicateObject={duplicateObject}
          bringToFront={bringToFront}
          sendToBack={sendToBack}
          bringForword={bringForword}
          sendBackword={sendBackword}
          
        />

        <Sidebar
        />
      </div>

      <BottomPanel addObject={addObject} />
    </div>
  );
}