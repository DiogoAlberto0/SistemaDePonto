export  function cleanPhoneNumber(phoneNumber: string): string {
    return phoneNumber.replace(/[()-]/g, '');
}