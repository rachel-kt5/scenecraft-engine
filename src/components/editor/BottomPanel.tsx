type BottomPanelProps = {
    addObject: () => void;
};

export default function BottomPanel({
    addObject,
}: BottomPanelProps) {
    return (
        <div className="h-20 border-t flex items-center gap-4 px-4">
            <button
                onClick={addObject}
                className="px-4 py-2 bg-black text-white rounded"
            >
                Add Object
            </button>
        </div>
    );
}