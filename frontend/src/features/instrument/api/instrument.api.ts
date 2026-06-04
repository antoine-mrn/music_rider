import { apiClient } from "../../../lib/axios";
import type { Instrument, InstrumentCategoryWithInstruments } from "../types";

export const instrumentApi = {
    findAllInstrument: async () => {
        const { data } = await apiClient.get<Instrument[]>("instrument");
        return data;
    },
    findAllInstrumentsWithCategories: async () => {
        const { data } = await apiClient.get<
            InstrumentCategoryWithInstruments[]
        >("instrument/instruments-catalog");
        return data;
    },
};
