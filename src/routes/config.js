export default {
    menus: [
        // 菜单相关路由
        { key: '/app/dashboard/index', title: '首页', icon: 'mobile', component: 'Dashboard' },

        {
            key: '/app/users',
            title: '用户管理',
            icon: 'bars',
            subs: [
                { key: '/app/users/userAll', title: '用户表', component: 'UserAll' },
            ],
        },
        {
            key: '/app/setting',
            title: '软件配置',
            icon: 'bars',
            subs: [
                { key: '/app/setting/announcement', title: '公告配置', component: 'AnnouncementBundle' },
                { key: '/app/setting/adSetting', title: '广告配置', component: 'AdSetting' },
                { key: '/app/setting/newSetting', title: '最新配置', component: 'NewSetting' },
                { key: '/app/setting/columnClass', title: '首页栏目', component: 'ColumnClass' },
            ],
        },
    ],
    others: [], // 非菜单相关路由
};
