import React, { Component } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, notification, Button, Select } from 'antd';
import { getLunboList, setLunbo, delLunbo } from '../../../axios';
const { Option } = Select;
const EditableContext = React.createContext();
let columns1 = [];

class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber/>;
        }
        return <Input/>;
    };

    renderCell = ({ getFieldDecorator }) => {

        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            children,
            ...restProps
        } = this.props;
        console.log(dataIndex, 'dataIndex');
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item style={{ margin: 0 }}>
                        {getFieldDecorator(dataIndex, {
                            rules: [
                                {
                                    required: true,
                                    message: `Please Input ${title}!`,
                                },
                            ],
                            initialValue: record[dataIndex],
                        })(this.getInput())}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };

    render() {
        return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
    }
}

class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [], editingKey: '', loading: true };
        this.columns = [
            {
                title: 'id',
                dataIndex: 'id',
                width: '2%',
                // editable: true,
            },
            {
                title: '标题',
                dataIndex: 'title',
                width: '25%',
                editable: true,
            },
            {
                title: '封面url',
                dataIndex: 'coverpic',
                width: '15%',
                editable: true,
            },
            {
                title: '所属栏目',
                dataIndex: 'colunmName',
                width: '15%',
                editable: true,

            }, {
                title: '播放ID',
                dataIndex: 'playerId',
                width: '6%',
                editable: true,

            },
            {
                title: '操作',
                width: '20%',
                dataIndex: 'operation',
                render: (text, record) => {
                    const { editingKey } = this.state;
                    const editable = this.isEditing(record);
                    return editable ? (
                        <span>
                      <EditableContext.Consumer>
                        {form => (

                            <a
                                onClick={() => this.save(form, record.id)}
                                style={{ marginRight: 8 }}
                            >
                                保存
                            </a>

                        )}
                      </EditableContext.Consumer>
                      <Popconfirm title="确定取消吗?" onConfirm={() => this.cancel(record.id)}>
                        <a>取消</a>
                      </Popconfirm>
                    </span>
                    ) : (
                        <div>
                            <a disabled={editingKey !== ''} onClick={() => this.edit(record.id)}>
                                编辑
                            </a>
                            <Popconfirm title="确定删除吗?" onConfirm={() => {
                                // console.log(record, 'record');
                                const { id } = record;
                                if (id != 0) {
                                    delLunbo({ id }).then(res => {
                                        if (res && res.status == 0) {
                                            this.getLunboList();
                                            notification.open({
                                                message: '删除成功',
                                                description:
                                                    '删除插入成功',
                                                onClick: () => {
                                                    console.log('Notification Clicked!');
                                                },
                                            });
                                        }
                                    });
                                } else {
                                    const NewData = [...this.state.data];
                                    NewData.splice(this.state.data.length - 1, 1);
                                    this.setState({ data: NewData });
                                }
                            }}>
                                <a style={{ marginLeft: 10 }}>
                                    删除
                                </a>
                            </Popconfirm>
                        </div>

                    );
                },
            },
        ];
    }

    componentDidMount() {
        // console.log('我被调用');
        this.getLunboList(this.props.colunmName);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.colunmName != nextProps.colunmName) {
            // this.props.colunmName
            this.getLunboList(nextProps.colunmName);
        }
    }

    getLunboList = (colunmName) => {
        this.setState({
            loading: true,
        });
        getLunboList({ colunmName }).then(res => {
            // consol
            if (res && res.status == 0) {

                const data = res.data;
                this.setState({
                    data,
                });
            }
            this.setState({
                loading: false,
            });
        });
    };

    isEditing = record => record.id === this.state.editingKey;

    cancel = () => {
        this.setState({ editingKey: '' });
    };

    save(form, id) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            // console.log(form);
            const newData = [...this.state.data];

            const index = newData.findIndex(item => id === item.id);

            if (index > -1) {
                const item = newData[index];
                console.log(item, 'index111');
                setLunbo({ ...row, id: item.id }).then(res => {
                    if (res) {
                        const { status, data } = res;
                        if (status == 0) {
                            // this.getLunboList();
                            newData.splice(index, 1, {
                                ...item,
                                ...row,
                            });
                            this.getLunboList(this.props.colunmName);
                            this.setState({ data: newData, editingKey: '' });
                            notification.open({
                                message: '保存成功',
                                description:
                                    '保存成功',
                                onClick: () => {
                                    console.log('Notification Clicked!');
                                },
                            });
                        }
                    }
                });

            } else {
                newData.push(row);
                this.setState({ data: newData, editingKey: '' });
            }
        });
    }

    edit(id) {
        this.setState({ editingKey: id });
    }

    render() {
        // if (this.state.data.length == 0) {
        //     return null;
        // }
        const components = {
            body: {
                cell: EditableCell,
            },
        };

        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });
        columns1 = this.props.columns;
        return (
            <div>
                <EditableContext.Provider value={this.props.form}>
                    <div style={{ marginTop: 10 }}>
                        <span>轮播图设置</span>
                    </div>
                    <Button style={{ marginTop: 10, marginBottom: 10 }} type="primary"
                            onClick={() => {
                                const NewData = [...this.state.data];
                                NewData.push({
                                    id: 0,
                                    title: '',
                                    coverpic: '',
                                    playerId: '',
                                    colunmName: this.props.colunmName,
                                });
                                this.setState({
                                    data: NewData,
                                    editingKey: 0,
                                });
                            }}
                            loading={this.state.loading}

                    >
                        添加
                    </Button>
                    <Button style={{ marginTop: 10, marginBottom: 10 }} type="primary"
                            onClick={() => {
                                this.getLunboList(this.props.colunmName);

                            }}
                            loading={this.state.loading}

                    >
                        刷新
                    </Button>
                    {this.state.data.length > 0 && <Table
                        components={components}
                        bordered
                        dataSource={this.state.data}
                        columns={columns}
                        rowClassName="editable-row"
                        pagination={{
                            onChange: this.cancel,
                        }}
                        loading={this.state.loading}
                    />}

                </EditableContext.Provider>
            </div>
        );
    }
}

export default Form.create()(EditableTable);