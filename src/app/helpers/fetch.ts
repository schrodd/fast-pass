// Every fetch must go authenticated, so to avoid repeating code every time (specifically, authorization headers) i made this.

interface FetchConfig {
  headers: Headers;
  method: string;
  body?: string;
}

export async function fetchHelper(
  method: string,
  route: string,
  authKey: string,
  body?: unknown
) {
  const config: FetchConfig = {
    headers: new Headers({
      "content-type": "application/json",
      Authorization: `Bearer ${authKey}`,
    }),
    method,
  };
  if (body !== undefined) config.body = JSON.stringify(body);
  return await fetch("http://localhost:3000" + route, config);
}
