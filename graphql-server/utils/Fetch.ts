import axiod from "https://deno.land/x/axiod/mod.ts";
import { config as env } from "https://deno.land/x/dotenv/mod.ts";

interface RequestQuery {
  query: string
}

interface AxiosHeader {
  Authorization: string
  ['Content-Type']: string
}

interface AxiosConfig {
  url: string
  method: string
  headers: AxiosHeader
  data: string
}

export const request = ({ query }: RequestQuery): Promise<any> => {
  const config: AxiosConfig = {
    url: env().GITHUB_URL,
    method: 'post',
    headers: {
      'Authorization': `Bearer ${env().GITHUB_TOKEN}`,
      'Content-Type': 'application/json'
    },
    data: query
  }

  return new Promise((resolve, reject) => {
    axiod(config)
      .then((res) => {
        resolve(res.data)
      })
      .catch((e) => {
        console.log(e);
        reject(e)
      })
  })
}
