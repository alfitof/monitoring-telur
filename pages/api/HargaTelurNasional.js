const HargaTelurNasional = {
  2021: {
    Nasional: {
      January: 26417,
      February: 25772,
      March: 25191,
      April: 25708,
      May: 25811,
      June: 26041,
      July: 25717,
      August: 25536,
      September: 24042,
      October: 23473,
      November: 24892,
      December: 26818,
    },
    Aceh: {
      January: 24850,
      February: 22936,
      March: 22287,
      April: 21354,
      May: 22306,
      June: 23559,
      July: 23268,
      August: 23067,
      September: 21105,
      October: 20090,
      November: 23582,
      December: 25914,
    },
    // ... dan seterusnya untuk setiap provinsi
  },
  2022: {
    Nasional: {
      January: 28287,
      February: 24546,
      March: 25342,
      April: 26409,
      May: 27788,
      June: 29252,
      July: 29247,
      August: 30230,
      September: 30332,
      October: 28412,
      November: 28916,
      December: 31096,
    },
    Aceh: {
      January: 26691,
      February: 20072,
      March: 22177,
      April: 22446,
      May: 26600,
      June: 27305,
      July: 25730,
      August: 26924,
      September: 26705,
      October: 24153,
      November: 26651,
      December: 29655,
    },
    // ... dan seterusnya untuk setiap provinsi
  },
  2023: {
    Nasional: {
      January: 30570,
      February: 29361,
      March: 29445,
      April: 30194,
      May: 31127,
      June: 31909,
      July: 32124,
      August: 31772,
      September: 30326,
      October: 29420,
      November: 29281,
    },
    Aceh: {
      January: 27305,
      February: 24994,
      March: 25026,
      April: 25623,
      May: 26528,
      June: 28360,
      July: 27904,
      August: 27110,
      September: 25830,
      October: 24459,
      November: 25035,
      December: 25600,
    },
    // ... dan seterusnya untuk setiap provinsi
  },
  // ... dan seterusnya untuk setiap tahun
};

export default function handler(req, res) {
  const { year, provinsi } = req.query;

  if (!year) {
    return res.status(400).json({ error: "Year is required" });
  }

  const yearData = HargaTelurNasional[year];

  if (!yearData) {
    return res.status(404).json({ error: "Year not found" });
  }

  if (provinsi && !yearData[provinsi]) {
    return res
      .status(404)
      .json({ error: "Province not found for the given year" });
  }

  const prices = provinsi ? yearData[provinsi] : yearData.Nasional;

  res.status(200).json({ year, provinsi, prices });
}
