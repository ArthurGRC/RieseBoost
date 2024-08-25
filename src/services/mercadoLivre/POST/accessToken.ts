export default async function getAccessToken(code: string): Promise<{ status: Number; data?: any; errors?: any }> {
  const path = `${process.env.URL_ML}/oauth/token`;

  try {
    const response = await fetch(path as string, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/x-www-form-urlencoded',
      } as HeadersInit,
      body: JSON.stringify({
        grant_type: 'authorization_code',
        client_id: process.env.NEXT_PUBLIC_APP_ID,
        client_secret: process.env.NEXT_PUBLIC_SECRET_KEY,
        code: code,
        redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
      }),
    });

    const res = await response.json();
    return { status: response.status, data: res, errors: undefined };
  } catch (error: any) {
    console.log(error);
    return { status: 500, data: undefined, errors: error };
  }
}
