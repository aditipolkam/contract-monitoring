import { createTransport, TransportOptions, SentMessageInfo } from 'nodemailer';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, ACCESS_TOKEN, REFRESH_TOKEN, FROM_EMAIL } from '../config/constants';
import { IMailOptions, EMAIL_TYPE } from '../interfaces/types';

const getMailOptions = (
  to_email: string,
  emailType: EMAIL_TYPE,
  contractAddress: string,
  issue: string,
): IMailOptions => {
  const from_email = FROM_EMAIL;
  let subject = '';
  let text = '';
  switch (emailType) {
    case EMAIL_TYPE.WARN:
      subject = `Urgent: Contract Security Alert`;
      text = `
      Greetings!,

      Your smart contract has been flagged for potential security issues and has been paused temporarily.

      **Contract Address:** ${contractAddress}
      **Issue Detected:** ${issue}

      **Actions to Take:**
      1. Review recent transactions and contract code.
      2. Consider deploying an upgrade.
      3. Contact a security expert if needed.
      4. Unpause the contract when fixed.

      Regards!
    `;
      break;
  }

  return {
    from: from_email,
    to: to_email,
    subject,
    text,
  };
};

const sendMessage = async (mailOptions: IMailOptions) => {
  try {
    //create transport for gmail
    const transport = createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: mailOptions.from,
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: ACCESS_TOKEN,
      },
    } as TransportOptions);

    const info: SentMessageInfo = await transport.sendMail(mailOptions);
    console.info(0, 'Email sent: ' + info.response);
    return true;
  } catch (error) {
    console.error(0, error);
    return false;
  }
};

export default {
  getMailOptions,
  sendMessage,
};
