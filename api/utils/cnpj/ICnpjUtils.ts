

export interface ICnpjUtils {
    isValid(cnpj: string): boolean;
    removePoints(cnpj: string): string;
    format(cnpj: string): string;
}