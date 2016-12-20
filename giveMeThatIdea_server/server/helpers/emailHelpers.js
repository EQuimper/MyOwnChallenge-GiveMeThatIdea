import postmark from 'postmark';
import serverConfig from '../config/serverConfig';

const client = new postmark.Client(serverConfig.POSTMARK_API);

const from = 'no-reply@givemethatidea.com';
const supportUrl = 'quimperemanuel@gmail.com';

export const emailHelpers = (user, subject, text, resetToken, cb) => {
  let emailToSend = {};
  if (subject === 'GiveMeThatIdea - Forgot Password') {
    emailToSend = {
      From: from,
      To: user.local.email,
      TemplateId: 1166141,
      TemplateModel: {
        name: user.local.email,
        action_url: `http://localhost:3000/resetPassword/${resetToken}`,
        support_url: supportUrl
      }
    };
  } else if (subject === 'GiveMeThatIdea - New Password') {
    emailToSend = {
      From: from,
      To: user.local.email,
      TemplateId: 1166441,
      TemplateModel: {
        name: user.local.email,
        action_url: 'http://localhost:3000/login',
        support_url: supportUrl
      }
    };
  }
  return client.sendEmailWithTemplate(emailToSend, cb);
};

