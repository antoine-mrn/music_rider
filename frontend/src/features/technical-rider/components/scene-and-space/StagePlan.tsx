import type { InstrumentCategoryWithInstruments } from "../../../instrument/types";
import RiderCard from "../RiderCard";
import InstrumentLibrary from "./InstrumentLibrary";
import Scene from "./Scene";

interface StagePlanProps {
    instrumentsList: InstrumentCategoryWithInstruments[];
}

export default function StagePlan({ instrumentsList }: StagePlanProps) {
    return (
        <RiderCard title="Plan de scène">
            <div className="flex flex-col gap-4 xl:flex-row xl:max-h-148">
                <InstrumentLibrary instrumentsList={instrumentsList} />
                <Scene className="flex-1" />
            </div>
        </RiderCard>
    );
}
