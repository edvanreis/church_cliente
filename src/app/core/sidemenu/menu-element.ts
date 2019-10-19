export const menus = [
    {
        'name': 'Dashboard',
        'icon': 'dashboard',
        'link': '/auth/dashboard',
        'open': false,
        'chip': { 'value': 1, 'color': 'accent' },
    },
    // {
    //     'name': 'Visitannte',
    //     'icon': 'person',
    //     'open': false,
    //     'link': false,
    //     'sub': [
    //         {
    //             'name': 'Cadastrar',
    //             'link': 'membro/cadastrar',
    //             'icon': 'person_add',
    //             'chip': false,
    //             'open': false,
    //         },
    //         {
    //             'name': 'Pesquisar',
    //             'link': 'membro/pesquisar',
    //             'icon': 'search',
    //             'chip': false,
    //             'open': false,
    //         },
    //     ]
    // },
    {
        'name': 'Membros',
        'icon': 'person',
        'link': false,
        'open': false,
        'sub': [
            {
                'name': 'Cadastrar',
                'link': 'membro/cadastrar',
                'icon': 'person_add',
                'chip': false,
                'open': false,
            },
            {
                'name': 'Pesquisar',
                'link': 'membro/pesquisar',
                'icon': 'search',
                'chip': false,
                'open': false,
            },
        ]
    },
     {
        'name': 'Configuracões',
        'icon': 'build',
        'open': false,
        'link': false,
        'sub': [
            {
                'name': 'Perfil',
                'link': 'perfil/pesquisar', 
                'icon': 'people',
                'chip': false,
                'open': false,
            },
            {
                'name': 'Permissões',
                'link': 'permissoes/pesquisar', 
                'icon': 'vpn_key',
                'chip': false,
                'open': false,
            },
        ]
    }
];
