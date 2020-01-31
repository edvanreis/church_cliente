

export class HelperChurch {

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

  static isBoolean(value): boolean {
    if (!value) {
      return false;
    } else {
      return true;
    }
  }

  static isNull(value) {
    if (!value) {
      return null;
    } else {
      return value;
    }
  }

  static isNotNull(value1, value2) {
    if (!value1) {
      return value2;
    } else {
      return value1;
    }
  }


}
