import { useEffect, useRef } from "react";
import { Stage, Layer, Rect, Circle, Text } from "react-konva";

export default function Scene() {
    const shapeRef = useRef(null);
    useEffect(() => {
        // it will log `Konva.Circle` instance
        console.log(shapeRef.current);
    });
    return (
        <Stage width={500} height={500}>
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
