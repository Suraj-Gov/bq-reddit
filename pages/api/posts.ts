import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { BigQuery } from "@google-cloud/bigquery";
import { postRequestI } from "../../types";
import { privateKey, tableName } from "../../constants";

function onError(
  err: any,
  req: NextApiRequest,
  res: NextApiResponse,
  next: any
) {
  console.error(err.message);
  res.status(500).json({
    err,
  });
  res.end();
  // next();
}

const handler = nc<NextApiRequest, NextApiResponse>({ onError });

handler.post(async (req, res) => {
  // a simple post will get first 50 posts
  // I'm using post here, because I want to use req.body
  const bq = new BigQuery({
    projectId: "bigquery-reddit-319509",
    credentials: {
      type: "service_account",
      private_key: privateKey,
      client_email:
        "suraj-bigquery-reddit@bigquery-reddit-319509.iam.gserviceaccount.com",
      client_id: "102820823677474513072",
    },
  });
  const body: postRequestI = req.body;

  if (body.count) {
    const query = `select count(id) as count from ${tableName};`;
    const opts = {
      query,
      useLegacySql: false,
    };
    const [data] = await bq.query(opts);
    return res.status(200).json({ count: data[0].count });
  }

  let query = "";

  if (body.single) {
    query = `select id, created_utc, title, author, subr, ups, downs, permalink, thumbnail, url, ranked from ${tableName} where id = @id;`;
  } else {
    query = `select 
		id, created_utc, title, author, subr, ups, downs, permalink, thumbnail, url, ranked from \`bigquery-samples.reddit.full\` `;

    if (body.where && body.where.length == 2) {
      query += `where ${body.where[0]} = ${body.where[1]}`;
    }

    if (body.orderBy) {
      query += `order by ${body.orderBy} `;
      if (body.orderDir) {
        query += `${body.orderDir} `;
      }
    }

    query += `limit ${body.limit} offset ${body.offset};`;
  }

  console.log(query);
  const opts = {
    query,
    useLegacySql: false,
    params: body.single ? { id: body.id } : {},
  };

  const [rows] = await bq.query(opts);

  res.status(200).json({
    rows,
    query,
  });
});

export default handler;
