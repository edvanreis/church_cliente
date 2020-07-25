import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../service/user.service';

declare interface MenuElement {
  name: string;
  icon: string;
  link: any;
  open: boolean;
  chip?: any;
  visible: boolean;
  sub?: MenuElement[];
}
@Component({
  selector: 'cdk-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

  @Input() iconOnly: boolean = false;

  menus: MenuElement[] = [
    { 'name': 'Dashboard', 'icon': 'dashboard', 'link': '/auth/dashboard', 'open': false, 'chip': { 'value': 1, 'color': 'accent' }, 'visible': this.userService.hasPermission("acesso_dashboard") },
    {
      'name': 'Visitantes', 'icon': 'emoji_emotions', 'link': false, 'open': false, 'visible': this.userService.hasPermission("acesso_visitantes"), 'sub': [
        { 'name': 'Pesquisar', 'link': 'visitante/pesquisar', 'icon': 'person_search', 'chip': false, 'open': false, 'visible': this.userService.hasPermission("acesso_visitantes") },
      ]
    },
    {
      'name': 'Membros', 'icon': 'person', 'link': false, 'open': false, 'visible': this.userService.hasPermission("acesso_membros"), 'sub': [
        { 'name': 'Pesquisar', 'link': 'membro/pesquisar', 'icon': 'person_search', 'chip': false, 'open': false, 'visible': this.userService.hasPermission("acesso_membros"), },
      ]
    },
    {
      'name': 'Igrejas', 'icon': 'location_city', 'link': false, 'open': false, 'visible': this.userService.hasPermission("acesso_igrejas"), 'sub': [
        { 'name': 'Ver todas', 'link': 'igreja/pesquisar', 'icon': 'reorder', 'chip': false, 'open': false, 'visible': this.userService.hasPermission("acesso_igrejas") },
      ]
    },
    {
      'name': 'Redes', 'icon': 'device_hub', 'link': false, 'open': false, 'visible': this.userService.hasPermission("acesso_redes"), 'sub': [
        { 'name': 'Pesquisar', 'link': 'rede/pesquisar', 'icon': 'search', 'chip': false, 'open': false, 'visible': this.userService.hasPermission("acesso_redes"), },
      ]
    },
    {
      'name': 'Células', 'icon': 'group', 'link': false, 'open': false, 'visible': this.userService.hasPermission("acesso_celulas"), 'sub': [
        { 'name': 'Pesquisar', 'link': 'celula/pesquisar', 'icon': 'search', 'chip': false, 'open': false, 'visible': this.userService.hasPermission("acesso_celulas"), },
      ]
    },
    {
      'name': 'Grupo de Trabalho', 'icon': 'work', 'link': false, 'open': false, 'visible': this.userService.hasPermission("acesso_grupo_trabalho"), 'sub': [
        { 'name': 'Pesquisar', 'link': 'grupo/pesquisar', 'icon': 'search', 'chip': false, 'open': false, 'visible': this.userService.hasPermission("acesso_grupo_trabalho"), },
      ]
    },
    {
      'name': 'Agendamentos', 'icon': 'calendar_today', 'link': false, 'open': false, 'visible': this.userService.hasPermission("acesso_agendamentos"), 'sub': [
        { 'name': 'Pesquisar', 'link': 'agendamentos/pesquisar', 'icon': 'date_range', 'chip': false, 'open': false, 'visible':  this.userService.hasPermission("acesso_agendamentos") }]
    },
    {
      'name': 'Lição', 'icon': 'school', 'link': false, 'open': false, 'visible': this.userService.hasPermission("acesso_licao") , 'sub': [
        { 'name': 'Pesquisar', 'link': 'licao/pesquisar', 'icon': 'search', 'chip': false, 'open': false, 'visible': this.userService.hasPermission("acesso_licao")  }]
    },
    {
      'name': 'Reunião', 'icon': 'account_tree', 'link': false, 'open': false, 'visible':  this.userService.hasPermission("acesso_reuniao") , 'sub': [
        { 'name': 'Reunião Célula', 'link': 'reuniao/pesquisar-reuniao-celula', 'icon': 'group', 'chip': false, 'open': false, 'visible':  this.userService.hasPermission("acesso_reuniao")  }]
    },
    {
      'name': 'Justificar Ausência', 'icon': 'calendar_today', 'link': false, 'open': false, 'visible': this.userService.hasPermission("acesso_justificar_ausencia") , 'sub': [
        { 'name': 'Pesquisar', 'link': 'justificar/pesquisar', 'icon': 'search', 'chip': false, 'open': false, 'visible': this.userService.hasPermission("acesso_justificar_ausencia")  }]
    },
    {
      'name': 'Relatórios', 'icon': 'archive', 'link': false, 'open': false, 'visible': this.userService.hasPermission("acesso_relatorios"), 'sub': [
        { 'name': 'Gerar Relatórios', 'link': 'relatorios/gerar', 'icon': 'save_alt', 'chip': false, 'open': false, 'visible': this.userService.hasPermission("acesso_relatorios") }]
    },
    {
      'name': 'Configuracões', 'icon': 'build', 'open': false, 'link': false, 'visible': this.userService.hasPermission("acesso_configuracoes") , 'sub': [
        { 'name': 'Usuario', 'link': 'usuario/pesquisar', 'icon': 'person', 'chip': false, 'open': false, 'visible': this.userService.hasPermission("acesso_configuracoes") , },
        { 'name': 'Perfil', 'link': 'perfil/pesquisar', 'icon': 'people', 'chip': false, 'open': false, 'visible': this.userService.hasPermission("acesso_configuracoes") , },
        { 'name': 'Permissões', 'link': 'permissoes/pesquisar', 'icon': 'vpn_key', 'chip': false, 'open': false, 'visible': this.userService.hasPermission("acesso_configuracoes") , },
      ]
    },


  ]

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

}
