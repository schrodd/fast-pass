export async function fetchHelper(method, route, body, authKey) {
  const config = {
    headers: new Headers({
      "content-type": "application/json",
      Authorization: `Bearer ${authKey}`,
    }),
    method,
  };
  if (body) config.body = JSON.stringify(body);
  return await fetch("http://localhost:3000" + route, config);
}