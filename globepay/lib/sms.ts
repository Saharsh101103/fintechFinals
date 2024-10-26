// lib/sms.ts

type SMSTrigger = "KYC_APPROVAL" | "TRANSACTION_STATUS";

interface SMSPayload {
  phoneNumber: string;
  message: string;
  trigger: SMSTrigger;
}

export const sendSMSMock = ({ phoneNumber, message, trigger }: SMSPayload) => {
  console.log(`📲 [SMS MOCK] Trigger: ${trigger}`);
  console.log(`To: ${phoneNumber}`);
  console.log(`Message: ${message}`);
  console.log(`Timestamp: ${new Date().toISOString()}`);
};
