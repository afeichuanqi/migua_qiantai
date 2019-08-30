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
                { key: '/app/users/UserPlay', title: '播放记录', component: 'UserPlay' },
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
                { key: '/app/setting/vipSetting', title: 'VIP价格', component: 'VipSetting' },
                { key: '/app/setting/hotLabel', title: '热门标签', component: 'HotLabel' },
            ],
        },
        {
            key: '/app/orders',
            title: '订单管理',
            icon: 'bars',
            subs: [
                { key: '/app/orders/allOrders', title: ' 所有订单', component: 'AllOrders' },
            ],
        },{
            key: '/app/allVideos',
            title: '所有片库',
            icon: 'bars',
            subs: [
                { key: '/app/video/allVideos', title: ' 片库列表', component: 'AllVideos' },
            ],
        },
    ],
    others: [], // 非菜单相关路由
};
