import { Pipe, PipeTransform } from '@angular/core';
import { CpfPipe } from './cpf.pipe';
import { CnpjPipe } from './cnpj.pipe';


@Pipe({
  name: 'cpfCnpj'
})
export class CpfCnpjPipe implements PipeTransform {

  private cpfPipe: CpfPipe;
  private cnpjPipe: CnpjPipe;

  /**
   * Construtor da classe.
   */
  constructor() {
    this.cpfPipe = new CpfPipe();
    this.cnpjPipe = new CnpjPipe();
  }

	/**
	 * Formata um CPF/CNPJ ou retorna seu valor passado caso inválido. 
     * O CPF/CNPJ informado deve ser composto por 11 ou 14 caracteres 
     * numéricos respectivamente.
	 *
	 * @param string cpfCnpj
	 * @return string
	 */
  transform(cpfCnpj: string): string {
    if (!cpfCnpj) {
      return '';
    }

    var cpfCnpjValor = cpfCnpj.replace(/\D/g, '');

    if (cpfCnpjValor.length === 11) {
      cpfCnpj = this.cpfPipe.transform(cpfCnpjValor);
    } else if (cpfCnpjValor.length === 14) {
      cpfCnpj = this.cnpjPipe.transform(cpfCnpjValor);
    }

    return cpfCnpj;
  }

}
