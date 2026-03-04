export const isAllowedEmail = (email) => {
  const domain = process.env.ALLOWED_EMAIL_DOMAIN || "abc.edu";
  return email?.toLowerCase().endsWith(`@${domain}`);
};
