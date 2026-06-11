import React, { useState, useRef } from "react";
import { CanvasObject, ResizeStart } from "./type";
import { MoveObject } from "./type";
import { DuplicateObject } from "./type";
import { ResizeObject } from "./type";
import { ResizeHandleProps } from "./type";
import ResizeHandle from "./ResizeHandle";
import { calculateLeftResize, calculateRightResize, calculateTopResize, calculateBottomResize, calculateCornerResize } from "./recuzeHelpres"



type BookLayoutProp = {
    objects: CanvasObject[];
    selectedObjectId: number | null;
    setSelectedObjectId: React.Dispatch<React.SetStateAction<number | null>>;
    moveObject: MoveObject;
    isCtrlPressed: boolean;
    duplicateObject: DuplicateObject;
    ResizeObject: ResizeObject;
};
export default function BookLayout(
    { objects, selectedObjectId, setSelectedObjectId, moveObject, isCtrlPressed, duplicateObject, ResizeObject }: BookLayoutProp) {


    const [draggedObjectId, setDraggedObjectId] = useState<number | null>(null);
    const bookref = useRef<HTMLDivElement>(null);
    const [resizingObjectId, setResizingObjectId] = useState<number | null>(null);
    const [aspectRatio, setAspectRatio] = useState(1);
    const [resizeDirection, setResizeDirection] = useState<string | null>(null);
    const [keepAspectRatio, setKeepAspectRatio] = useState(false);
    const [resizeStart, setResuzeStart] = useState<ResizeStart>({
        mouseX: 0,
        mouseY: 0,
        objectX: 0,
        objectY: 0,
        objectWidth: 0,
        objectHeight: 0,
    });
    const [dragOffset, setDragOffset] = useState({
        x: 0,
        y: 0,
    });
    const [resizeOffset, setResizeOffset] = useState({
        width: 0,
        height: 0,
    });
    const HandleResizeStart = (
        e: React.MouseEvent<HTMLDivElement>,
        object: CanvasObject,
        direction: string,
        keepAspectRatio: boolean,
    ) => {

        e.stopPropagation();
        setKeepAspectRatio(keepAspectRatio);
        setResizeDirection(direction);

        const rect = bookref.current?.getBoundingClientRect();
        if (!rect) return;
        const mouseW = e.clientX - rect.left;
        const mouseH = e.clientY - rect.top;
        setResuzeStart({
            mouseX: mouseW,
            mouseY: mouseH,
            objectX: object.x,
            objectY: object.y,
            objectWidth: object.width,
            objectHeight: object.height,
        });
        setAspectRatio(
            object.width / object.height
        );
        setResizeOffset({
            width: mouseW - object.width,
            height: mouseH - object.height,
        });

        setResizingObjectId(object.id);
    }
    return (<div ref={bookref}
        className="flex-1 bg-gray-200 flex items-center justify-center p-8"
        onMouseMove={(e) => {
            const rect = bookref.current?.getBoundingClientRect();
            if (!rect) return;

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const deltaX = x - resizeStart.mouseX;
            const deltaY = y - resizeStart.mouseY;


            if (resizingObjectId !== null) {
                const object = objects.find(
                    object => object.id === resizingObjectId
                );
                if (!object) return;
                const newWidth = x - resizeOffset.width;
                const newHeight = newWidth / aspectRatio;

                //const safeWidth = Math.max(newWidth, 40);
                //const safeHeight = Math.max(newHeight, 40);
                if (resizeDirection === "right") {
                    const result = calculateRightResize(x, resizeStart);
                    ResizeObject(
                        resizingObjectId,
                        object.x,
                        object.y,
                        result.width,
                        object.height
                    );
                }
                else if (resizeDirection === "bottom") {
                    const result = calculateBottomResize(y, resizeStart);
                    ResizeObject(
                        resizingObjectId,
                        object.x,
                        object.y,
                        object.width,
                        result.height,
                    );
                }

                else if (resizeDirection === "left") {
                    const result = calculateLeftResize(x, resizeStart);
                    ResizeObject(
                        resizingObjectId,
                        result.x,
                        object.y,
                        result.width,
                        object.height,
                    );
                }
                else if (resizeDirection === "top") {
                    const result = calculateTopResize(y, resizeStart);
                    ResizeObject(
                        resizingObjectId,
                        object.x,
                        result.y,
                        object.width,
                        result.height
                    );
                }
                else if (resizeDirection === "top-left") {
                    const leftResult = calculateLeftResize(x, resizeStart);
                    const size = calculateCornerResize(
                        leftResult.width,
                        aspectRatio
                    );
                    const y = resizeStart.objectY + (resizeStart.objectHeight - size.height);
                    ResizeObject(
                        resizingObjectId,
                        leftResult.x,
                        y,
                        size.width,
                        size.height
                    );
                }
                else if (resizeDirection === "top-right") {
                    const rightResult = calculateRightResize(x, resizeStart);
                    const size = calculateCornerResize(
                        rightResult.width,
                        aspectRatio
                    );
                    const y = resizeStart.objectY + (resizeStart.objectHeight - size.height);
                    ResizeObject(
                        resizingObjectId,
                        object.x,
                        y,
                        size.width,
                        size.height
                    );
                }
                else if (resizeDirection === "bottom-left") {
                    const leftResult = calculateLeftResize(x, resizeStart);
                    const size = calculateCornerResize(
                        leftResult.width,
                        aspectRatio
                    );
                    ResizeObject(
                        resizingObjectId,
                        leftResult.x,
                        object.y,
                        size.width,
                        size.height
                    );
                }
                else if (resizeDirection === "bottom-right") {
                    const rightResult = calculateRightResize(x, resizeStart);
                    const size = calculateCornerResize(
                        rightResult.width,
                        aspectRatio
                    );
                    ResizeObject(
                        resizingObjectId,
                        object.x,
                        object.y,
                        size.width,
                        size.height
                    );
                }
            }
            if (draggedObjectId === null) return;
            e.stopPropagation();

             moveObject(
                 draggedObjectId,
                 x - dragOffset.x,
                 y - dragOffset.y,
             );
          
           // const newX = x - dragOffset.x;
           // const newY = y - dragOffset.y;


        }}
        onMouseUp={() => {
            setDraggedObjectId(null);
            setResizingObjectId(null);
        }}>

        <div 
            className="relative w-[80%] max-w-[1200px] aspect-[10/7] bg-white shadow-2xl overflow-hidden">
            <div className="absolute left-1/2 ml-[-15px] w-[2px] h-full bg-gray-500"></div>
            <div className="absolute left-1/2 ml-[15px] w-[2px] h-full bg-gray-500"></div>
            {
                objects.map((object) => (
                    <div
                        key={object.id}
                        onClick={() => setSelectedObjectId(object.id)}
                        onMouseDown={(e) => {
                            const rect = bookref.current?.getBoundingClientRect();
                            if (!rect) return;
                            const mouseX = e.clientX - rect.left;
                            const mouseY = e.clientY - rect.top;
                            if (isCtrlPressed) {
                                duplicateObject(object.id)
                                const newObjectId = object.id;
                                setDraggedObjectId(newObjectId)
                            }
                            setDragOffset({
                                x: mouseX - object.x,
                                y: mouseY - object.y,
                            });

                            setDraggedObjectId(object.id)
                        }}
                        className={`absolute bg-pink-400 rounded-lg
                            ${selectedObjectId === object.id ? "border-2 border-dashed border-blue-500" : ""}`}
                        style={{
                            left: object.x,
                            top: object.y,
                            width: object.width,
                            height: object.height,
                        }}
                    >
                        {selectedObjectId === object.id && (
                            <>
                                <ResizeHandle direction="right"
                                    onMouseDown={(e) => {
                                        console.log("RIGHT");
                                        HandleResizeStart(e, object, "right", true)
                                    }}
                                />
                                <ResizeHandle direction="left"
                                    onMouseDown={(e) => {
                                        console.log("LEFT");
                                        HandleResizeStart(e, object, "left", true)
                                    }}
                                />
                                <ResizeHandle direction="top"
                                    onMouseDown={(e) => {
                                        console.log("TOP");
                                        HandleResizeStart(e, object, "top", true)
                                    }}
                                />
                                <ResizeHandle direction="bottom-right"
                                    onMouseDown={(e) => {
                                        console.log("BOTTOM");
                                        HandleResizeStart(e, object, "bottom-right", true)
                                    }}
                                />
                                <ResizeHandle direction="bottom-left"
                                    onMouseDown={(e) => {
                                        console.log("BOTTOMnnn");
                                        HandleResizeStart(e, object, "bottom-left", true)
                                    }}
                                />
                                <ResizeHandle direction="top-right"
                                    onMouseDown={(e) => {
                                        console.log("wwww");
                                        HandleResizeStart(e, object, "top-right", true)
                                    }}
                                />
                                <ResizeHandle direction="top-left"
                                    onMouseDown={(e) => {
                                        console.log("zzzzz");
                                        HandleResizeStart(e, object, "top-left", true)
                                    }}
                                />
                                <ResizeHandle direction="bottom"
                                    onMouseDown={(e) => {
                                        console.log("bbottttom");
                                        HandleResizeStart(e, object, "bottom", true)
                                    }}
                                />
                            </>
                        )}

                    </div>
                ))
            }

        </div>

    </div >);

}
