import React, { useState, useRef } from "react";
import { CanvasObject } from "./type";
import { MoveObject } from "./type";

type BookLayoutProp = {
    objects: CanvasObject[];
    selectedObjectId: number | null;
    setSelectedObjectId: React.Dispatch<React.SetStateAction<number | null>>;
    moveObject: MoveObject;
};
export default function BookLayout(
    { objects, selectedObjectId, setSelectedObjectId, moveObject, }: BookLayoutProp) {
    console.log(selectedObjectId);
    const [draggedObjectId, setDraggedObjectId] = useState<number | null>(null);
    const bookref = useRef<HTMLDivElement>(null);

    const [dragOffset, setDragOffset] = useState({
        x: 0,
        y: 0,
    });

    return (<div ref={bookref}
        className="flex-1 bg-gray-200 flex items-center justify-center p-8"
        onMouseMove={(e) => {
            const rect = bookref.current?.getBoundingClientRect();
            if (draggedObjectId === null) return;
            e.stopPropagation();
            if (!rect) return;
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            moveObject(
                draggedObjectId,
                x - dragOffset.x,
                y - dragOffset.y,

            );
        }}
        onMouseUp={() => {
            setDraggedObjectId(null);
        }}>
        <div className="relative w-[80%] max-w-[1200px] aspect-[10/7] bg-white shadow-2xl">
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
                            setDragOffset({
                                x: mouseX - object.x,
                                y: mouseY - object.y,
                            });
                            console.log("drag start", object.id);
                            setDraggedObjectId(object.id)
                        }}
                        className={`absolute w-40 h-40 bg-blue-400 rounded-lg
                            ${selectedObjectId === object.id ? "shadow-[0_0_15px_5px_rgba(120,120,120,0.5)]" : ""}`}
                        style={{
                            left: object.x,
                            top: object.y
                        }}
                    />
                ))
            }

        </div>

    </div>);

}
