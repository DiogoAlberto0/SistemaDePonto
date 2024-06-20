export function validatePassword(password: string): boolean {
    const minLength = 10;
    const hasNumber = /[0-9]/;
    const hasLetter = /[a-zA-Z]/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>[\]\/\\+=-_'`~;|]/;

    if (password.length < minLength) {
        return false;
    }
    if (!hasNumber.test(password)) {
        return false;
    }
    if (!hasLetter.test(password)) {
        return false;
    }
    if (!hasSpecialChar.test(password)) {
        return false;
    }

    return true;
}