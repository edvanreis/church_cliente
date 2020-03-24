export const menuElement = [
    {
        'name': 'Dashboard',
        'icon': 'dashboard',
        'link': '/auth/dashboard',
        'open': false,
        'chip': { 'value': 1, 'color': 'accent' },
        'visible': false
    },
    {
        'name': 'Visitantes',
        'icon': 'person',
        'link': false,
        'open': false,
        'visible': false,
        'sub': [
            {
                'name': 'Cadastrar',
                'link': 'visitante/cadastrar',
                'icon': 'person_add',
                'chip': false,
                'open': false,
                'visible': false,
            },
            {
                'name': 'Pesquisar',
                'link': 'visitante/pesquisar',
                'icon': 'search',
                'chip': false,
                'open': false,
                'visible': false,
            },
        ]
    },
    {
        'name': 'Membros',
        'icon': 'person',
        'link': false,
        'open': false,
        'visible': false,
        'sub': [
            {
                'name': 'Cadastrar',
                'link': 'membro/cadastrar',
                'icon': 'person_add',
                'chip': false,
                'open': false,
                'visible': false,
            },
            {
                'name': 'Pesquisar',
                'link': 'membro/pesquisar',
                'icon': 'search',
                'chip': false,
                'open': false,
                'visible': false,
            },
        ]
    },
    {
        'name': 'Igrejas',
        'icon': 'account_balance',
        'link': false,
        'open': false,
        'visible': false,
        'sub': [
            {
                'name': 'Ver todas',
                'link': 'igreja/pesquisar',
                'icon': 'reorder',
                'chip': false,
                'open': false,
                'visible': false,
            },
        ]
    },
    {
        'name': 'Redes',
        'icon': 'device_hub',
        'link': false,
        'open': false,
        'visible': false,
        'sub': [
            {
                'name': 'Cadastrar',
                'link': 'rede/pesquisar',
                'icon': 'add',
                'chip': false,
                'open': false,
                'visible': false,
            },
        ]
    },
    {
        'name': 'Células',
        'icon': 'group',
        'link': false,
        'open': false,
        'visible': false,
        'sub': [
            {
                'name': 'Pesquisar',
                'link': 'celula/cadastrar',
                'icon': 'search',
                'chip': false,
                'open': false,
                'visible': false,
            },
            // {
            //     'name': 'Pesquisar',
            //     'link': 'membro/pesquisar',
            //     'icon': 'search',
            //     'chip': false,
            //     'open': false,
            // },
        ]
    },
    {
        'name': 'Grupo de Trabalho',
        'icon': 'work',
        'link': false,
        'open': false,
        'visible': false, 
        'sub': [
            {
                'name': 'Pesquisar',
                'link': 'cargo/cadastrar',
                'icon': 'search',
                'chip': false,
                'open': false,
                'visible': false,
            },
            // {
            //     'name': 'Pesquisar',
            //     'link': 'membro/pesquisar',
            //     'icon': 'search',
            //     'chip': false,
            //     'open': false,
            // },
        ]
    },
    {
        'name': 'Agendamentos',
        'icon': 'calendar_today',
        'link': false,
        'open': false,
        'visible': false,
        'sub': [
            {
                'name': 'Pesquisar',
                'link': 'agendamentos/cadastrar',
                'icon': 'search',
                'chip': false,
                'open': false,
                'visible': false,
            },
            // {
            //     'name': 'Pesquisar',
            //     'link': 'membro/pesquisar',
            //     'icon': 'search',
            //     'chip': false,
            //     'open': false,
            // },
        ]
    },
     {
        'name': 'Configuracões',
        'icon': 'build',
        'open': false,
        'link': false,
        'visible': false,
        'sub': [
            {
                'name': 'Usuario',
                'link': 'usuario/pesquisar', 
                'icon': 'person',
                'chip': false,
                'open': false,
                'visible': false,
            },
            {
                'name': 'Perfil',
                'link': 'perfil/pesquisar', 
                'icon': 'people',
                'chip': false,
                'open': false,
                'visible': false,
            },
            {
                'name': 'Permissões',
                'link': 'permissoes/pesquisar', 
                'icon': 'vpn_key',
                'chip': false,
                'open': false,
                'visible': false,
            },
        ]
    },
    
];
