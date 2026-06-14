import React from "react";
import BookLayout from "./BookLayout";
import { CanvasObject } from "./type";
import { MoveObject as MoveObjectType } from "./type";
import { DuplicateObject } from "./type";
import { ResizeObject } from "./type";
import { bringForword,bringToFront,sendBackword,sendToBack } from "./type";

type CanvasAreaProps = {
  objects: CanvasObject[];
  selectedObjectId: number | null;
  setSelectedObjectId: React.Dispatch<React.SetStateAction<number | null>>;
  moveObject: MoveObjectType;
  isCtrlPressed: boolean;
  duplicateObject: DuplicateObject;
  ResizeObject: ResizeObject;
  bringToFront: bringToFront
  sendToBack: sendToBack
  bringForword: bringForword
  sendBackword: sendBackword
  
};

export default function CanvasArea({
  objects, selectedObjectId, setSelectedObjectId, moveObject, isCtrlPressed, duplicateObject, ResizeObject, bringForword, bringToFront, sendBackword, sendToBack
}: CanvasAreaProps) {
  return (
    <div className="flex-1 bg-gray-200 flex items-center justify-center p-8">

      <BookLayout objects={objects}
        selectedObjectId={selectedObjectId}
        setSelectedObjectId={setSelectedObjectId}
        moveObject={moveObject}
        isCtrlPressed={isCtrlPressed}
        duplicateObject={duplicateObject}
        ResizeObject={ResizeObject}
        bringToFront={bringToFront}
        sendToBack={sendToBack}
        bringForword={bringForword}
        sendBackword={sendBackword}
        
      />

    </div>
  );
}


