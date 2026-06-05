export type CanvasObject = {
    id: number;
    type: "shape";
    x: number;
    y: number;
};
export type MoveObject = (
    id: number,
    x: number,
    y: number,
) => void;