import { ICnpjUtils } from "../ICnpjUtils";



export class CnpjUtils implements ICnpjUtils {
    isValid(cnpj: string): boolean {
        // Remove qualquer pontuação do CNPJ
        cnpj = this.removePoints(cnpj)

        // Verifica se o CNPJ tem 14 dígitos
        if (cnpj.length !== 14) {
            return false;
        }

        // Verifica se todos os dígitos são iguais
        if (/^(\d)\1+$/.test(cnpj)) {
            return false;
        }

        // Calcula os dígitos verificadores
        const tamanho = cnpj.length - 2;
        const numeros = cnpj.substring(0, tamanho);
        const digitos = cnpj.substring(tamanho);
        const multiplicadores1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        const multiplicadores2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

        const calcularDigito = (base: string, multiplicadores: number[]) => {
            let soma = 0;
            for (let i = 0; i < base.length; i++) {
                soma += parseInt(base[i]) * multiplicadores[i];
            }
            const resto = soma % 11;
            return resto < 2 ? 0 : 11 - resto;
        };

        const digito1 = calcularDigito(numeros, multiplicadores1);
        const digito2 = calcularDigito(numeros + digito1, multiplicadores2);

        return digito1 == parseInt(digitos[0]) && digito2 == parseInt(digitos[1]);
    }
    format(cnpj: string): string {
        if (cnpj.length !== 14) {
            throw new Error("CNPJ deve ter 14 dígitos");
        }

        // Formata o CNPJ
        return `${cnpj.substring(0, 2)}.${cnpj.substring(2, 5)}.${cnpj.substring(5, 8)}/${cnpj.substring(8, 12)}-${cnpj.substring(12, 14)}`;

    }
    removePoints(cnpj: string): string {
        return cnpj.replace(/[.\-\/]/g, '');
    }
}