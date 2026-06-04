import { useEffect, useRef } from "react";
import { Stage, Layer, Circle } from "react-konva";

export default function Scene({ className }: { className?: string }) {
    const shapeRef = useRef(null);
    // useEffect(() => {
    //     // it will log `Konva.Circle` instance
    //     console.log(shapeRef.current);
    // });
    return (
        <Stage
            width={500}
            height={500}
            className={`bg-base-200 border border-base-300 shadow-sm bg-[radial-gradient(var(--color-base-300)_2px,transparent_2px)] bg-size-[24px_24px] rounded-lg ${className ?? ""}`}
        >
            <Layer>
                <Circle
                    ref={shapeRef}
                    x={500 / 2}
                    y={500 / 2}
                    radius={50}
                    fill="red"
                />
            </Layer>
        </Stage>
    );
}
