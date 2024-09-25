export function cleanPhoneNumber(phoneNumber: string): string {
    return phoneNumber.replace(/[()\-\s]/g, '');
  }
  