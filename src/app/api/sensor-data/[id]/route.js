// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { createSQLDBConnection } from "../../../../../database/sqlDBConfig";

const connection = createSQLDBConnection();

import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;

  try {
    const query = `SELECT DISTINCT * FROM  ${id}`;

    const results = await executeQuery(query);

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error retrieving data:", error);
    return NextResponse.error("Error retrieving data");
  }
}

function executeQuery(query) {
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(results);
    });
  });
}
