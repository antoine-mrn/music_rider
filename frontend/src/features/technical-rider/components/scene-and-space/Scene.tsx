import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Image } from "react-konva";
import mySVG from "../../../../assets/instruments/STRINGS/STRINGS.svg";

const VIRTUAL_W = 1200;
const VIRTUAL_H = 800;

export default function Scene({ className }: { className?: string }) {
    const [image, setImage] = useState<HTMLImageElement | null>(null);

    useEffect(() => {
        const img = new window.Image();
        img.src = mySVG;
        img.onload = () => setImage(img);
    }, []);

    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const img = new window.Image();
        img.src = mySVG;
        img.onload = () => setImage(img);
    }, []);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const observer = new ResizeObserver((entries) => {
            const { width, height } = entries[0].contentRect;
            setDimensions({ width, height });
        });

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const scale = Math.min(
        dimensions.width / VIRTUAL_W,
        dimensions.height / VIRTUAL_H,
    );

    return (
        <div className={`relative ${className ?? ""}`}>
            <div
                ref={containerRef}
                className="absolute inset-0 overflow-hidden rounded-lg bg-base-200 border border-base-300 shadow-sm bg-[radial-gradient(var(--color-base-300)_2px,transparent_2px)] bg-size-[24px_24px]"
            >
                <Stage
                    width={dimensions.width}
                    height={dimensions.height}
                    scaleX={scale}
                    scaleY={scale}
                >
                    <Layer>
                        {image && (
                            <Image
                                image={image}
                                x={100}
                                y={100}
                                width={75}
                                height={75}
                                draggable
                            />
                        )}
                    </Layer>
                </Stage>
            </div>
        </div>
    );
}
