-- CreateTable
CREATE TABLE "UserBandInstrument" (
    "userId" INTEGER NOT NULL,
    "bandId" INTEGER NOT NULL,
    "instrumentId" INTEGER NOT NULL,

    CONSTRAINT "UserBandInstrument_pkey" PRIMARY KEY ("userId","bandId","instrumentId")
);

-- AddForeignKey
ALTER TABLE "UserBandInstrument" ADD CONSTRAINT "UserBandInstrument_userId_bandId_fkey" FOREIGN KEY ("userId", "bandId") REFERENCES "UserBand"("userId", "bandId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBandInstrument" ADD CONSTRAINT "UserBandInstrument_instrumentId_fkey" FOREIGN KEY ("instrumentId") REFERENCES "Instrument"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
