import { log } from "@logtail/next";
import { handleResponse } from "@/services/REST";

export default async function sendEmail(body: string): Promise<{ status: Number; data?: any; errors?: any }> {
  const path = `${process.env.BREVO_PATH}/email`;

  try {
    const contentType = 'application/json'
    const response = await fetch(path as string, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        contentType,
        'api-key': process.env.BREVO_API_KEY
      } as HeadersInit,
      body,
    });

    const { status } = response;
    const data = await response.json();

    return handleResponse(
      {
        data,
        status,
        contentType,
      },
      path,
      null,
      {},
    );
  } catch (error: any) {
    log.error('Error - brevo api', error)
    return { status: 500, data: undefined, errors: error };
  }
}
