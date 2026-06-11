import { ResizeHandleProps } from "./type";

export default function ResizeHandle({
    direction,
    onMouseDown,
}: ResizeHandleProps) {

    let positionClass = " ";
    if (direction === "right") {
        positionClass = "absolute border-2 border-blue-500  right-0 top-1/2 translate-x-1/2 -translate-y-1/2"
    }
    if (direction === "left") {
        positionClass = "absolute border-2 border-blue-500 left-0 top-1/2 -translate-x-1/2 -translate-y-1/2"
    }
     if (direction === "top") {
        positionClass = "absolute border-2 border-blue-500 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
    }
     if (direction === "bottom") {
        positionClass = "absolute border-2 border-blue-500 bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
    }
    if (direction === "bottom-right") {
        positionClass = "absolute border-2 border-blue-500 bottom-0 right-0 translate-x-1/2 translate-y-1/2"
    }
      if (direction === "bottom-left") {
        positionClass = "absolute border-2 border-blue-500 bottom-0 left-0 -translate-x-1/2 translate-y-1/2"
    }
      if (direction === "top-right") {
        positionClass = "absolute border-2 border-blue-500 right-0 top-0 translate-x-1/2 -translate-y-1/2"
    }
      if (direction === "top-left") {
        positionClass = "absolute border-2 border-blue-500 left-0 top-0 -translate-x-1/2 -translate-y-1/2"
    }
    return (
            <div
                onMouseDown={onMouseDown}
                className={`${positionClass} w-3 h-3 bg-white border border-blue-500 rounded-lg`}
            /> 
    );
}




