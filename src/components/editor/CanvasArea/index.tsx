import React from "react";
import BookLayout from "./BookLayout";
import { CanvasObject } from "./type";
import { MoveObject as MoveObjectType} from "./type";
import { DuplicateObject } from "./type";


type CanvasAreaProps={
    objects:CanvasObject[];
    selectedObjectId:number|null;
    setSelectedObjectId:React.Dispatch<React.SetStateAction<number|null>>;
    moveObject: MoveObjectType;
    isCtrlPressed:boolean;
    duplicateObject:DuplicateObject;
};

export default function CanvasArea( {   
  objects,selectedObjectId,setSelectedObjectId, moveObject,isCtrlPressed,duplicateObject
}: CanvasAreaProps) {
  return (
    <div className="flex-1 bg-gray-200 flex items-center justify-center p-8">

      <BookLayout objects={objects}
      selectedObjectId={selectedObjectId} 
      setSelectedObjectId={setSelectedObjectId}
      moveObject={moveObject}
      isCtrlPressed={isCtrlPressed}
      duplicateObject={duplicateObject}
      />

    </div>
  );
}


 