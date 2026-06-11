import React from "react";
import { Direction } from "readline";

export type CanvasObject = {
    id: number;
    type: "shape";
    x: number;
    y: number;
    width:number,
    height:number,
};
export type MoveObject = (
    id: number,
    x: number,
    y: number,
) => void;

export type DuplicateObject = (
    id: number,
) => number | null ;

export type ResizeObject=(
    id:number,
    x:number,
    y:number,
    width:number,
    height:number,
)=>void;
 export type ResizeHandleProps={
    direction:string;
    onMouseDown:(e:React.MouseEvent<HTMLDivElement>)=>void;
 };
 export type ResizeStart={
    mouseX:number,
    mouseY:number,
    objectX:number,
    objectY:number,
    objectWidth:number,
    objectHeight:number,
 }