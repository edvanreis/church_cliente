

export class HelperChurch{

  static retirarFormatacaoCPF(cpf): string {
    if (cpf) {
      cpf = cpf.replace(".", "");
      cpf = cpf.replace(".", "");
      cpf = cpf.replace("-", "");
      return cpf;
    } else {
      return null
    }
  }


}
