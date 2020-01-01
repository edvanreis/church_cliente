

export class HelperChurch{

  static retirarFormatacao(item): string {
    if (item) {
      item = item.replace(".", "");
      item = item.replace(".", "");
      item = item.replace("-", "");
      return item;
    } else {
      return null
    }
  }

  static retirarFormatacaoCNPJ(item): string {
    if (item) {
      item = item.replace(".", "");
      item = item.replace(".", "");
      item = item.replace("/", "");
      item = item.replace("-", "");
      return item;
    } else {
      return null
    }
  }



}
