export type Instrument = {
    id: number;
    label: string;
};

export type InstrumentWithCode = {
    id: number;
    code: string;
    label: string;
};

export type InstrumentCategoryWithInstruments = {
    id: number;
    code: string;
    label: string;
    Instruments: InstrumentWithCode[];
};
