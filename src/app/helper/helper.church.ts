

export class HelperChurch{

  static retirarFormatacao(cpf): string {
    if (cpf) {
      cpf = cpf.replace(".", "");
      cpf = cpf.replace(".", "");
      cpf = cpf.replace("-", "");
      return cpf;
    } else {
      return null
    }
  }

  // static retirarFormatacaoRG(cpf): string {
  //   if (cpf) {
  //     cpf = cpf.replace(".", "");
  //     cpf = cpf.replace(".", "");
  //     cpf = cpf.replace(".", "");
  //     return cpf;
  //   } else {
  //     return null
  //   }
  // }



}
