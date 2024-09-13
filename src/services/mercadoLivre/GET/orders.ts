export default async function getOrders(data: {
  user_id: string;
  access_token: string;
}): Promise<{ status: Number; data?: any; errors?: any }> {
  try {
    const path = `${process.env.URL_ML}/orders/search?seller=${data.user_id}&order.status=paid`;

    const response = await fetch(path as string, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${data.access_token}`,
      } as HeadersInit,
    });

    const res = await response.json();
    return { status: response.status, data: res, errors: undefined };
  } catch (error: any) {
    console.log(error);
    return { status: 500, data: undefined, errors: error };
  }
}
