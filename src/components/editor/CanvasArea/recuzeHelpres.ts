import { ResizeStart } from "./type";

export function calculateLeftResize(
    mouseX: number,
    resizeStart: ResizeStart,
) {
    const deltaX = mouseX - resizeStart.mouseX;
    const newX = resizeStart.objectX + deltaX;
    const newWidth = resizeStart.objectWidth - deltaX;
    if(newWidth<=40){
    return {
       x:resizeStart.objectX+(resizeStart.objectWidth-40),
       width:40,
    };
    }
    return{
        x: newX,
        width:newWidth,
    };
}
export function calculateRightResize(
    mouseX: number,
    resizeStart: ResizeStart,
) {
    const deltaX = mouseX - resizeStart.mouseX;
    return {
        width: Math.max(resizeStart.objectWidth + deltaX, 40),
    };

}
export function calculateTopResize(
    mouseY: number,
    resizeStart: ResizeStart,
) {
    const deltaY = mouseY - resizeStart.mouseY;
    const newY = resizeStart.objectY + deltaY;
    const newHeight = resizeStart.objectHeight - deltaY;
    if(newHeight<=40){
    return {
        y:resizeStart.objectY + (resizeStart.objectHeight-40),
        height:40,
    };
    }
    return{
        y:newY,
        height:newHeight,
    };
}
export function calculateBottomResize(
    mouseY: number,
    resizeStart: ResizeStart,
) {
    const deltaY = mouseY - resizeStart.mouseY;
    return {
        height: Math.max(resizeStart.objectHeight + deltaY, 40),
    };

}
export function calculateCornerResize(
    width:number,
    aspecRatio: number,
) {
    return {
        width,
        height:width/aspecRatio,
    };

}