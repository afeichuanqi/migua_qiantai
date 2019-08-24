/**
 * 路由组件出口文件
 * yezi 2018年6月24日
 */
import Loadable from 'react-loadable';
import Loading from './widget/Loading';
import Dashboard from './dashboard/Dashboard';
import UserAll from './users/UserAll';
import AdSetting from './setting/AdSetting';
import NewSetting from './setting/NewSetting';
import ColumnClass from './setting/ColumnClass';
import AllOrders from './orders/AllOrders';
import VipSetting from './setting/VipSetting';
import HotLabel from './setting/HotLabel';
// import Announcement from './setting/Announcement';
const AnnouncementBundle = Loadable({
    // 按需加载富文本配置
    loader: () => import('./setting/Announcement'),
    loading: Loading,
});

export default {
    Dashboard,
    // WysiwygBundle,

    // 所有用户表
    UserAll,
    AdSetting,
    NewSetting,
    //广告表
    AnnouncementBundle,
    ColumnClass,
    AllOrders,
    VipSetting,
    HotLabel
};
