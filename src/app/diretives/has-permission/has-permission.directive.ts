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
    if (this.checkPermission()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }


  private checkPermission() {
    let hasPermission = false;
    const permissoes = this.userService.permissions().authorities;
    let permissoesArray = [];
    permissoesArray = this.permissao;
    if( permissoes ){
      permissoes.forEach(map =>{
        let item = permissoesArray.find(i=>i==map.authority);
        if(item){
          hasPermission =  true;
        }
      });
    }
    return hasPermission;
  }

}
