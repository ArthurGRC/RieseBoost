export default async function getRefreshToken(
  refreshToken: string,
): Promise<{ status: Number; data: undefined; errors: undefined }> {
  const path = `${process.env.URL_ML}/oauth/token`;

  try {
    const response = await fetch(path as string, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/x-www-form-urlencoded',
      } as HeadersInit,
      body: JSON.stringify({
        grant_type: 'refresh_token',
        client_id: process.env.NEXT_PUBLIC_APP_ID,
        client_secret: process.env.NEXT_PUBLIC_SECRET_KEY,
        refresh_token: refreshToken,
      }),
    });

    const res = await response.json();
    return { status: response.status, data: res, errors: undefined };
  } catch (err) {
    console.log(err);
    return { status: 500, data: undefined, errors: undefined };
  }
}
