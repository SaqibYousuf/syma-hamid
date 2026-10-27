import "server-only";

/**
 * Bank account shown to customers after a workshop booking.
 * Set these in .env.local (or the hosting panel's environment variables).
 */
export function getBankDetails() {
  const details = {
    bankName: process.env.BANK_NAME || "",
    accountTitle: process.env.BANK_ACCOUNT_TITLE || "",
    accountNumber: process.env.BANK_ACCOUNT_NUMBER || "",
    iban: process.env.BANK_IBAN || "",
  };
  return Object.values(details).some(Boolean) ? details : null;
}
