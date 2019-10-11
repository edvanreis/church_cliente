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
                'name': 'Permissões',
                'link': 'configuracoes/permissoes/pesquisar',
                'icon': 'vpn_key',
                'chip': false,
                'open': false,
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
   
    // {
    //     'name': 'Célula',
    //     'icon': 'group',
    //     'open': false,
    //     'link': false,
    //     'sub': [
    //         {
    //             'name': 'Cadastrar',
    //             'icon': 'group_add',
    //             'open': false,
    //             'link': 'forms/template_forms'
    //         },
    //         //                     {
    //         //                         'name': 'Reactive Forms',
    //         //                         'icon': 'text_fields',
    //         //                         'open'   : false,
    //         //                         'link':'forms/reactive_forms'
    //         //                     }
    //     ]
    // },
    // {
    //     'name': 'Igreja',
    //     'icon': 'account_balance',
    //     'open': false,
    //     'link': false,
    //     'sub': [
    //         {
    //             'name': 'Cadastrar',
    //             'icon': 'add_box',
    //             'open': false,
    //             'link': 'forms/template_forms'
    //         },
    //         //                     {
    //         //                         'name': 'Reactive Forms',
    //         //                         'icon': 'text_fields',
    //         //                         'open'   : false,
    //         //                         'link':'forms/reactive_forms'
    //         //                     }
    //     ]
    // },

    // {
    //     'name': 'Tables',
    //     'icon': 'list',
    //     'link': false,
    //     'open': false,
    //     'chip': { 'value': 2, 'color': 'accent' },
    //     'sub': [
    //         {
    //             'name': 'Fixed',
    //             'icon': 'filter_list',
    //             'link': 'tables/fixed',
    //             'open': false,
    //         },
    //         {
    //             'name': 'Feature',
    //             'icon': 'done_all',
    //             'link': 'tables/featured',
    //             'open': false,
    //         },
    //         {
    //             'name': 'Responsive Tables',
    //             'icon': 'filter_center_focus',
    //             'link': 'tables/responsive',
    //             'open': false,
    //         }
    //     ]

    // },
    // {
    //     'name': 'Guarded Routes',
    //     'icon': 'mode_edit',
    //     'link': '/auth/guarded-routes',
    //     'open': false,
    // }, {
    //     'name': 'Scrumboard',
    //     'open': false,
    //     'link': '/auth/scrumboard',
    //     'icon': 'grade',
    // }, {
    //     'name': 'Applications',
    //     'icon': 'view_module',
    //     'open': false,
    //     'link': false,
    //     'sub': [
    //         {
    //             'name': 'chat',
    //             'icon': 'chat',
    //             'link': 'chats/chat',
    //             'open': false,
    //         },
    //         {
    //             'name': 'mail',
    //             'icon': 'mail',
    //             'link': 'mail/mail',
    //             'open': false,
    //         },
    //         {
    //             'name': 'Editor',
    //             'icon': 'editor',
    //             'link': 'editor/editor',
    //             'open': false,
    //         }
    //     ]
    // }
    // , {
    //     'name': 'Pages',
    //     'icon': 'content_copy',
    //     'open': false,
    //     'link': false,
    //     'sub': [
    //         {
    //             'name': 'Login',
    //             'icon': 'work',
    //             'open': false,
    //             'link': '../login',
    //         }, {
    //             'name': 'Services',
    //             'icon': 'local_laundry_service',
    //             'open': false,
    //             'link': 'pages/services',
    //         }, {
    //             'name': 'Contact',
    //             'icon': 'directions',
    //             'open': false,
    //             'link': 'pages/contact'
    //         }
    //     ]
    // }
    // , {

    //     'name': 'Charts',
    //     'icon': 'pie_chart_outlined',
    //     'open': false,
    //     'link': false,
    //     'sub': [
    //         {
    //             'name': 'chartjs',
    //             'icon': 'view_list',
    //             'link': 'charts/chartjs',
    //             'open': false,

    //         },
    //         {
    //             'name': 'ngx-chart',
    //             'icon': 'show_chart',
    //             'open': false,
    //             'link': 'charts/ngx-charts',
    //         },
    //         {
    //             'name': 'nvd3',
    //             'icon': 'pie_chart',
    //             'open': false,
    //             'link': 'charts/nvd3-charts',
    //         }
    //     ]
    // }, {
    //     'name': 'maps',
    //     'icon': 'map',
    //     'open': false,
    //     'link': false,
    //     'sub': [
    //         {
    //             'name': 'google-map',
    //             'icon': 'directions',
    //             'link': 'maps/googlemap',
    //             'open': false,
    //         },
    //         {
    //             'name': 'leaflet-map',
    //             'icon': 'directions',
    //             'link': 'maps/leafletmap',
    //             'open': false,
    //         }
    //     ]
    // }
];
