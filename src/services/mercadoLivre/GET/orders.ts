import redis from "@/src/redis";

export default async function getOrders(): Promise<{ status: Number, data?: any, errors?: any }> {
  const user: any = JSON.parse(await redis.get('1234') as string)
  const path = `${process.env.URL_ML}/orders/search?seller=${user.user_id}&order.status=paid`

  try {
    const response = await fetch(path as string, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${user.access_token}`
      } as HeadersInit
    });

    const res = await response.json();
    return { status: response.status, data: res, errors: undefined };
  } catch (error: any) {
    console.log(error)
    return { status: 500, data: undefined, errors: error };;
  }
}