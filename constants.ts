export const baseUrl = process.env.BASE_URL || "";
export const tableName = "bigquery-samples.reddit.full";
export const privateKey = process.env.PRIVATE_KEY?.replace(/\\n/gm, "\n") || "";
