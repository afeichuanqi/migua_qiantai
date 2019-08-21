import React from 'react';

import { Modal } from 'antd';
import { Descriptions, Badge } from 'antd';

class UserInfo extends React.PureComponent {
    state = { visible: false, data: {} };

    showModal = (data) => {
        this.setState({
            visible: true,
            data,
        });
    };

    handleOk = e => {
        // console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        const { data } = this.state;
        if (!data) {
            return null;
        }
        return (<Modal
                title="用户基本信息"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                width={900}
            >
                <Descriptions title="User Info" bordered>
                    <Descriptions.Item label="id">{data&&data.id}</Descriptions.Item>
                    <Descriptions.Item span={2} label="用户名">{data&&data.username}</Descriptions.Item>
                    <Descriptions.Item label="密码">{data&&data.password}</Descriptions.Item>
                    <Descriptions.Item span={2} label="邮箱">{data&&data.email}</Descriptions.Item>
                    <Descriptions.Item label="手机号码">{data&&data.phone_number}</Descriptions.Item>
                    <Descriptions.Item span={2} label="身份">{data&&data.identity==-1?'游客':'用户'}</Descriptions.Item>
                    <Descriptions.Item span={1} label="观看总次数">{data&&data.play_total_count}</Descriptions.Item>
                    <Descriptions.Item label="今日观看次数">{data&&data.play_count}</Descriptions.Item>
                    <Descriptions.Item span={2} label="下载次数">{data&&data.down_count}</Descriptions.Item>
                    <Descriptions.Item label="到期时间">{data&&data.vip_exp_datetime1}</Descriptions.Item>
                    <Descriptions.Item span={2} label="状态(无用)">{data&&data.status}</Descriptions.Item>
                    <Descriptions.Item label="创建时间">{data&&data.create_time1}</Descriptions.Item>
                    <Descriptions.Item span={2} label="更新时间">{data&&data.update_time}</Descriptions.Item>
                    <Descriptions.Item label="手机设备码" span={3}>
                        {data&&data.DeviceID}
                    </Descriptions.Item>
                    <Descriptions.Item  label="设备" span={1}>
                        {data&&data.Platforms}
                    </Descriptions.Item>
                    <Descriptions.Item label="邮箱绑定"> {data&&data.is_mail_bind==1?'已绑定':'未绑定'}</Descriptions.Item>
                    <Descriptions.Item label="推荐人">{data&&data.invite}</Descriptions.Item>
                    <Descriptions.Item span={3} label="无关紧要的东西">
                        Data disk type: MongoDB
                        <br />
                        Database version: 3.4
                        <br />
                        Package: dds.mongo.mid
                        <br />
                        Storage space: 10 GB
                        <br />
                        Replication_factor:3
                        <br />
                        Region: East China 1<br />
                    </Descriptions.Item>
                </Descriptions>
            </Modal>
        );
    }
}

export default UserInfo;