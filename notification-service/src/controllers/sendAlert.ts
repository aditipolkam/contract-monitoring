import { Request, Response } from 'express';
import { EMAIL_TYPE } from '../interfaces/types';
import emailService from '../services/email.service';

const sendAlert = async (req: Request, res: Response) => {
  const { message, to, contractAddress } = req.body;
  try {
    const mailOptions = emailService.getMailOptions(to, EMAIL_TYPE.WARN, contractAddress, message);

    const send = await emailService.sendMessage(mailOptions);
    return res.status(200).json({ message: 'Ok', send });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default sendAlert;
