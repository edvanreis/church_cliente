import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../service/user.service';

declare interface MenuElement {
  name: string;
  icon: string;
  link: any;
  open: boolean;
  chip?:any;
  visible: boolean;
  sub?: MenuElement[];
}
@Component({
  selector: 'cdk-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

    @Input() iconOnly:boolean = false;

    menus: MenuElement[] = [
      // {'name': 'Dashboard','icon': 'dashboard','link': '/auth/dashboard','open': false,'chip': { 'value': 1, 'color': 'accent' }, 'visible': this.userService.hasPermission("")},
      {'name': 'Dashboard','icon': 'dashboard','link': '/auth/dashboard','open': false,'chip': { 'value': 1, 'color': 'accent' }, 'visible': true},
      {'name': 'Visitantes','icon': 'person','link': false,'open': false,'visible': true  , 'sub': [
            {'name': 'Cadastrar','link': 'visitante/cadastrar','icon': 'person_add','chip': false,'open': false,'visible': true  },
            {'name': 'Pesquisar','link': 'visitante/pesquisar','icon': 'search','chip': false,'open': false,'visible': true  },
        ]
      },
      {'name': 'Membros','icon': 'person','link': false,'open': false,'visible': true  , 'sub': [
            {'name': 'Cadastrar','link': 'membro/cadastrar','icon': 'person_add','chip': false,'open': false,'visible': true  },
            {'name': 'Pesquisar','link': 'membro/pesquisar','icon': 'search','chip': false,'open': false,'visible': true  ,},
        ]
      },
      {'name': 'Igrejas','icon': 'location_city','link': false,'open': false,'visible': true  ,'sub': [
            {'name': 'Ver todas','link': 'igreja/pesquisar','icon': 'reorder','chip': false,'open': false,'visible': true  },
        ]
      },
      {'name': 'Redes','icon': 'device_hub','link': false,'open': false,'visible': true  ,'sub': [
            {'name': 'Pesquisar','link': 'rede/pesquisar','icon': 'search','chip': false,'open': false,'visible': true  ,},
        ]
      },
      {'name': 'Células','icon': 'group','link': false,'open': false,'visible': true  ,'sub': [
            {'name': 'Pesquisar','link': 'celula/pesquisar','icon': 'search','chip': false,'open': false,'visible': true  ,},
        ]
      },
      {'name': 'Grupo de Trabalho','icon': 'work','link': false,'open': false,'visible': true  ,'sub': [
            {'name': 'Pesquisar','link': 'grupo/pesquisar','icon': 'search','chip': false,'open': false,'visible': true  ,},
        ]
      },
      {'name': 'Agendamentos','icon': 'calendar_today','link': false,'open': false,'visible': true,'sub': [
            {'name': 'Pesquisar','link': 'agendamentos/pesquisar','icon': 'date_range','chip': false,'open': false,'visible': true}]
      },
      {'name': 'Lição','icon': 'school','link': false,'open': false,'visible': true,'sub': [
        {'name': 'Pesquisar','link': 'licao/pesquisar','icon': 'search','chip': false,'open': false,'visible': true}]
      },
      {'name': 'Reunião','icon': 'account_tree','link': false,'open': false,'visible': true,'sub': [
        {'name': 'Reunião Célula','link': 'reuniao/pesquisar-reuniao-celula','icon': 'group','chip': false,'open': false,'visible': true}]
      },
      {'name': 'Justificar Ausencia','icon': 'calendar_today','link': false,'open': false,'visible': true,'sub': [
        {'name': 'Pesquisar','link': 'justificar/pesquisar','icon': 'search','chip': false,'open': false,'visible': true}]
      },
      {'name': 'Relatórios','icon': 'archive','link': false,'open': false,'visible': true,'sub': [
        {'name': 'Gerar Relatórios','link': 'relatorios/gerar','icon': 'save_alt','chip': false,'open': false,'visible': true}]
      },
      {'name': 'Configuracões','icon': 'build','open': false,'link': false,'visible': true  ,'sub': [
            {'name': 'Usuario','link': 'usuario/pesquisar', 'icon': 'person','chip': false,'open': false,'visible': true  ,},
            {'name': 'Perfil','link': 'perfil/pesquisar', 'icon': 'people','chip': false,'open': false,'visible': true  ,},
            {'name': 'Permissões','link': 'permissoes/pesquisar', 'icon': 'vpn_key','chip': false,'open': false,'visible': true  ,},
        ]
      },


    ]

    constructor(private userService: UserService) { }

    ngOnInit() {
    }

}
