import React, { Component } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, notification, Button, Tag } from 'antd';
import { delHotLabel, setHotLabel, getHotLabel } from '../../axios';

const EditableContext = React.createContext();

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
        this.state = { data: [], editingKey: '', current: 1,loading:true };
        this.columns = [
            {
                title: 'id',
                dataIndex: 'id',
                width: '5%',
                // editable: true,
            },
            {
                title: '标签',
                dataIndex: 'name',
                width: '10%',
                editable: true,
                render: text => <Tag style={{ marginLeft: 3 }} color={'blue'}>
                    {text}
                </Tag>,
            },
            {
                title: '排序',
                dataIndex: 'sort_num',
                width: '20%',
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
                      <Popconfirm title="确定取消吗?" onConfirm={() => this.cancel(record.id, 500)}>
                        <a>取消</a>
                      </Popconfirm>
                    </span>
                    ) : (
                        <div>
                            <a disabled={editingKey !== ''} onClick={() => this.edit(record.id)}>
                                编辑
                            </a>
                            <Popconfirm title="确定删除吗?" onConfirm={() => {
                                const { id } = record;
                                if (id != 0) {
                                    delHotLabel({ id }).then(res => {
                                        if (res && res.status == 0) {
                                            this.getHotLabel();
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
                                    // NewData
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
        this.getHotLabel();
    }

    getHotLabel = () => {
        this.setState({
            loading:true,
        })
        getHotLabel().then(res => {
            if (res && res.status == 0) {

                const data = res.data;
                this.setState({
                    data,
                });
            }
            this.setState({
                loading:false,
            })
        });
    };

    isEditing = record => record.id === this.state.editingKey;

    cancel = (params1, params2, params3, params4) => {
        if (params2 !== 500) {
            this.setState({
                current: params1,
            });
        }
        // const { current, pageSize } = params1;
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
                // console.log(row, 'index111');
                setHotLabel({ ...row, id: item.id }).then(res => {
                    if (res) {
                        const { status, data } = res;
                        if (status == 0) {
                            // this.getLunboList();
                            newData.splice(index, 1, {
                                ...item,
                                ...row,
                            });
                            this.getHotLabel();
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
        if (this.state.data.length == 0) {
            return null;
        }
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
        console.log();
        return (

            <div>
                <EditableContext.Provider value={this.props.form}>
                    <div style={{ marginTop: 10 }}>
                        <span>vip价格配置</span>
                    </div>
                    <Button loading={this.state.loading} style={{ marginTop: 10, marginBottom: 10 }} type="primary"
                            onClick={() => {
                                const NewData = [...this.state.data];
                                NewData.push({
                                    id: 0,
                                    name: '',
                                    sort_num: '',
                                });
                                console.log('current', Math.ceil(this.state.data.length / 10));
                                this.setState({
                                    data: NewData,
                                    editingKey: 0,
                                    current: Math.ceil(this.state.data.length / 10),
                                });
                            }}

                    >
                        添加
                    </Button>
                    <Button loading={this.state.loading} style={{ marginTop: 10, marginBottom: 10 }} type="primary"
                            onClick={() => {
                                this.getHotLabel();
                            }}

                    >
                        刷新
                    </Button>
                    <Table
                        loading={this.state.loading}
                        components={components}
                        bordered
                        dataSource={this.state.data}
                        columns={columns}
                        rowClassName="editable-row"
                        pagination={{
                            onChange: this.cancel,
                            current: this.state.current,
                        }}
                    />
                </EditableContext.Provider>
            </div>
        );
    }
}

export default Form.create()(EditableTable);