BEGIN TRANSACTION;
CREATE TABLE "argo_data" (
"n_prof" INTEGER,
  "n_param" INTEGER,
  "n_levels" INTEGER,
  "n_history" INTEGER,
  "n_calib" INTEGER,
  "data_type" TEXT,
  "format_version" TEXT,
  "handbook_version" TEXT,
  "reference_date_time" TEXT,
  "date_creation" TEXT,
  "date_update" TEXT,
  "platform_number" TEXT,
  "project_name" TEXT,
  "pi_name" TEXT,
  "station_parameters" TEXT,
  "cycle_number" REAL,
  "direction" TEXT,
  "data_centre" TEXT,
  "dc_reference" TEXT,
  "data_state_indicator" TEXT,
  "data_mode" TEXT,
  "platform_type" TEXT,
  "float_serial_no" TEXT,
  "firmware_version" TEXT,
  "wmo_inst_type" TEXT,
  "juld" TIMESTAMP,
  "juld_qc" TEXT,
  "juld_location" TIMESTAMP,
  "latitude" REAL,
  "longitude" REAL,
  "position_qc" TEXT,
  "positioning_system" TEXT,
  "profile_pres_qc" TEXT,
  "profile_temp_qc" TEXT,
  "profile_psal_qc" TEXT,
  "vertical_sampling_scheme" TEXT,
  "config_mission_number" REAL,
  "pres" REAL,
  "pres_qc" TEXT,
  "pres_adjusted" REAL,
  "pres_adjusted_qc" TEXT,
  "pres_adjusted_error" REAL,
  "temp" REAL,
  "temp_qc" TEXT,
imestamp"
- "latitude"
- "longitude"
- "pressure_dbar"
- "temperature_C"
- "salinity_PSU"
- "oxygen_umol_per_kg"
- "nitrate_umol_per_kg"
- "bgc_flag"
- "source_netcdf"

Here is the data:
{{{jsonData}}}

Analyze the user's question: '{{{question}}}'

First, provide a concise, natural language summary that directly answers the question based on the data.
Second, if the question asks for a trend, comparison, or data over time/depth, generate an array of data points suitable for a line chart. The array should be stored in the 'chartData' field. Each object in the array should have an 'x' for the independent variable (like time or depth) and a 'y' for the dependent variable (like temperature or salinity). Include a 'label' for each axis in the 'chartLabels' object.

If the data isn't suitable for a chart, return an empty 'chartData' array.
`,
});

const queryAndVisualizeDataFlow = ai.defineFlow(
  {
    name: 'queryAndVisualizeDataFlow',
    inputSchema: QueryAndVisualizeDataInputSchema,
    outputSchema: QueryAndVisualizeDataOutputSchema,
  },
  async (input: QueryAndVisualizeDataInput) => {
    const {output} = await prompt(input);
    return output!;
  }
);
