import { NextRequest, NextResponse } from 'next/server';
import { log } from '@logtail/next';
import Customer from '@/database/models/Customer';
import { NOT_FOUND_USER, UNEXPECTED_ERROR } from '@/helpers/constants/errors';
import sendEmail from '@/src/services/BrevoMailer/POST/sendEmail';
import { generateTokenForData } from '@/src/helpers/JWT/decode';

export async function POST(req: NextRequest) {
  const res = NextResponse;
  const { email } = await req.json();
  
  try {
    const customer = await Customer.findOne({ 
      where: { email },
      attributes: ['password', 'id', 'name']
    });

    if (customer) {
      const { name, roles } = customer;

      const token = generateTokenForData({ name, email, roles});
      log.info('Generated password token confirmation')

      await customer.update({ password_password_confirmation_token: token })
      log.info('Updated password token confirmation')

      const emailBody = JSON.stringify({
        sender: { email: process.env.BREVO_SENDER, name: process.env.BREVO_CORPORATION_NAME },
        to: [{ email, name }],
        templateId: parseInt(process.env.BREVO_TEMPLATE_RESET_PASSWORD as string),
        params: {
          name, 
          url_redefinicao: `${req.nextUrl.origin}/forgotPassword/resetPassword?token=${token}`
        }
      });
  
      const { data, errors, status } = await sendEmail(emailBody)

      return res.json({ data, errors }, { status })
    }

    return res.json({ errors: [NOT_FOUND_USER], data: undefined }, { status: 404 });
  } catch (error: any) {
    log.error('Error - api sendEmail', { error });

    const mapedErrors = error.errors
    ? Object.keys(error.errors).map((key) => ({
        path: key,
        message: error.errors[key].message,
      }))
    : [UNEXPECTED_ERROR];

    return res.json({ errors: mapedErrors }, { status: 422 });
  }
}
