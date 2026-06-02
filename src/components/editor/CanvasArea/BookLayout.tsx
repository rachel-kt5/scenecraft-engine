import React from "react";
import { CanvasObject } from "./type";

type BookLayoutProp = {
    objects: CanvasObject[];
    selectedObjectId: number | null;
    setSelectedObjectId: React.Dispatch<React.SetStateAction<number | null>>;
};
export default function BookLayout(
    { objects, selectedObjectId, setSelectedObjectId }: BookLayoutProp) {
console.log(selectedObjectId);
    return (<div className="flex-1 bg-gray-200 flex items-center justify-center p-8">

        <div className="relative w-[80%] max-w-[1200px] aspect-[10/7] bg-white shadow-2xl">
            <div className="absolute left-1/2 ml-[-15px] w-[2px] h-full bg-gray-500"></div>
            <div className="absolute left-1/2 ml-[15px] w-[2px] h-full bg-gray-500"></div>


            {
                objects.map((object) => (
                    <div
                        key={object.id}
                        onClick={() => setSelectedObjectId(object.id)}
                        className="absolute w-40 h-40 bg-blue-400 rounded-lg cursor-pointer"
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
