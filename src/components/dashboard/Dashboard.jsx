/**
 * Created by hao.cheng on 2017/5/3.
 */
import React from 'react';
import { Row, Col, Card, Timeline, Icon } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import EchartsViews from './EchartsViews';
import EchartsProjects from './EchartsProjects';
import b1 from '../../style/imgs/b1.jpg';
import { get7DayPlay, get50DayUser, getOherAppInfo } from '../../axios';
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1364082_e625h82hnpw.js',
});
class Dashboard extends React.Component {
    state = {
        day7xAxisData: [],
        day7seriesData: [],
        day50xAxisData: [],
        day50Data: [],
        otherInfo:{},

    };

    componentDidMount() {

        this.get7DayPlay();
        this.get50DayUser();
        this._getOherAppInfo();
    }

    _getOherAppInfo = () => {
        getOherAppInfo().then(res=>{
            if(res){
                this.setState({
                    otherInfo:res.data
                })
            }

        })
    };
    get50DayUser = () => {
        get50DayUser().then(res => {
            if(res){
                const { status, data } = res;
                if (status == 0) {
                    let xAxisData = [];
                    let Data = [];
                    for (let i = 0; i < data.length; i++) {
                        xAxisData.push(i);
                        Data.push(data[i].countValue);
                    }
                    this.setState({
                        day50xAxisData: xAxisData,
                        day50Data: Data,
                    });
                }
            }

        });
    };
    get7DayPlay = () => {
        get7DayPlay().then(res => {
            if(res){
                const { status, data } = res;
                if (status == 0) {
                    const year = new Date().getFullYear();

                    let day7xAxis = [];
                    let day7series = [];
                    for (let i = 0; i < data.length; i++) {
                        day7xAxis.push(year + '-' + data[i].countKey);
                        day7series.push(data[i].countValue + '');

                    }
                    console.log(day7xAxis, day7series, 'day7series');
                    this.setState({
                        day7xAxisData: day7xAxis,
                        day7seriesData: day7series,
                    });

                }
            }

        });
    };

    render() {
        const {otherInfo, day7xAxisData, day7seriesData, day50xAxisData, day50Data } = this.state;
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom/>
                <Row gutter={10}>
                    <Col className="gutter-row" md={4}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        {/*<Icon type="book" theme="twoTone" />*/}
                                        <Icon type="book" className="text-2x text-danger"/>
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">创建订单数</div>
                                        <h2>{otherInfo.noSucOrder}</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="carry-out" className="text-2x"/>
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">成功订单数</div>
                                        <h2>{otherInfo.SucOrder}</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={4}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="like" className="text-2x text-info"/>
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">点赞数</div>
                                        <h2>{otherInfo.upPraise }</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="dislike" className="text-2x text-success"/>
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">取消赞</div>
                                        <h2>{otherInfo.downPraise}</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={16}>
                        <div className="gutter-box">
                            <Card bordered={false} className={'no-padding'}>
                                <EchartsProjects day50xAxisData={day50xAxisData} day50Data={day50Data}/>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row gutter={10}>
                    <Col className="gutter-row" md={8}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="pb-m">
                                    <h3>任务</h3>
                                    <small>10个已经完成，2个待完成，1个正在进行中</small>
                                </div>
                                <span className="card-tool"><Icon type="sync"/></span>
                                <Timeline>
                                    <Timeline.Item color="green">新版本迭代会</Timeline.Item>
                                    <Timeline.Item color="green">完成网站设计初版</Timeline.Item>
                                    <Timeline.Item color="red">
                                        <p>联调接口</p>
                                        <p>功能验收</p>
                                    </Timeline.Item>

                                    <Timeline.Item color="#108ee9">
                                        <p>登录功能设计</p>
                                        <p>权限验证</p>
                                        <p>页面排版</p>
                                    </Timeline.Item>
                                </Timeline>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={8}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="pb-m">
                                    <h3>消息栏</h3>
                                </div>
                                <span className="card-tool"><Icon type="sync"/></span>
                                <ul className="list-group no-border">
                                    <li className="list-group-item">
                                        <span className="pull-left w-40 mr-m">
                                            <img src={b1} className="img-responsive img-circle" alt="test"/>
                                        </span>
                                        <div className="clear">
                                            <span className="block">鸣人</span>
                                            <span className="text-muted">终于当上火影了！</span>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <span className="pull-left w-40 mr-m">
                                            <img src={b1} className="img-responsive img-circle" alt="test"/>
                                        </span>
                                        <div className="clear">
                                            <span className="block">佐助</span>
                                            <span className="text-muted">吊车尾~~</span>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <span className="pull-left w-40 mr-m">
                                            <img src={b1} className="img-responsive img-circle" alt="test"/>
                                        </span>
                                        <div className="clear">
                                            <span className="block">小樱</span>
                                            <span className="text-muted">佐助，你好帅！</span>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <span className="pull-left w-40 mr-m">
                                            <img src={b1} className="img-responsive img-circle" alt="test"/>
                                        </span>
                                        <div className="clear">
                                            <span className="block">雏田</span>
                                            <span className="text-muted">鸣人君。。。那个。。。我。。喜欢你..</span>
                                        </div>
                                    </li>
                                </ul>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={8}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="pb-m">
                                    <h3>播放量统计</h3>
                                    <small>最近7天用户播放量</small>
                                </div>
                                <span onClick={this.get7DayPlay} className="card-tool"><Icon type="sync"/></span>
                                <EchartsViews day7xAxisData={day7xAxisData} day7seriesData={day7seriesData}/>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Dashboard;