import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { UserService } from '../../service/user.service';

@Directive({
  selector: '[hasPermission]'
})
export class HasPermissionDirective {

  private permissions = [];
  private permissao;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userService: UserService
  ) {}

  @Input()
  set hasPermission(val) {
    this.permissao = val;
    this.updateView();
  }

  private updateView() {
    this.viewContainer.clear();
    if (this.checkPermission()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }


  private checkPermission() {
    if (!Array.isArray(this.permissao) || this.permissao.length === 0) {
      return false;
    }

    const permissions = this.userService.permissions();
    if (!permissions || !Array.isArray(permissions.authorities)) {
      return false;
    }

    return permissions.authorities.some(item =>
      item &&
      this.permissao.indexOf(item.authority) !== -1
    );
  }

}
