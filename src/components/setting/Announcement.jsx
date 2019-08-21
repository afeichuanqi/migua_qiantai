/**
 * Created by hao.cheng on 2017/4/26.
 */
import React, { Component } from 'react';
import { Row, Col, Card, Button, notification, Spin } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState, convertFromRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { getAnnouncement, setAnnouncement } from '../../axios';


class Announcement extends Component {
    state = {
        editorContentForTitle: '',
        editorContentForContent: '',
        editorStateForTitle: ``,
        editorStateForContent: '',
        loading: true,

    };

    onEditorChangeForTitle = (editorContentForTitle) => {
        this.onEditorChangeTitle = true;
        this.setState({
            editorContentForTitle,
        });
    };
    onEditorChangeForContent = (editorContentForContent) => {
        this.onEditorChangeContent = true;
        this.setState({
            editorContentForContent,
        });
    };
    componentDidMount() {

        this._updateNowEdit();
    }

    _updateNowEdit = () => {

        getAnnouncement().then(data => {
            if (data.status == 0) {
                const result = data.data;
                const title = result.title;
                const content = result.content;
                let html = title;
                let contentBlock = htmlToDraft(html);
                if (contentBlock) {
                    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                    const editorState = EditorState.createWithContent(contentState);
                    this.setState({
                        editorStateForTitle: editorState,
                        editorContentForTitle: title,
                    });

                }
                html = content;
                contentBlock = htmlToDraft(html);
                if (contentBlock) {
                    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                    const editorState = EditorState.createWithContent(contentState);

                    this.setState({ editorStateForContent: editorState, editorContentForContent: content });

                }


            } else {
                // this.setState({
                //     loading:false,
                // })
            }
            this.setState({
                loading: false,
            });

        });
    };
    _setServerContent = () => {
        this.setState({
            loading: true,
        });
        let title = draftToHtml(this.state.editorContentForTitle);
        let content = draftToHtml(this.state.editorContentForContent);
        if (!this.onEditorChangeTitle) title = this.state.editorContentForTitle;
        if (!this.onEditorChangeContent) content = this.state.editorContentForContent;


        setAnnouncement({ title, content }).then(data => {
            if (data.status == 0) {
                notification.open({
                    message: '修改公告成功',
                    description:
                        '更新或者插入成功',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                });
                // this._updateNowEdit();
            } else {
                notification.open({
                    message: '修改公告失败',
                    description:
                        '更新或者插入失败' + data.msg,
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                });
            }
            this.setState({
                loading: false,
            });
        });
    };
    onEditorStateForTitleChange = (editorStateForTitle) => {
        console.log('editorStateForTitle', editorStateForTitle);
        this.setState({
            editorStateForTitle,
        });
    };
    onEditorStateForContentChange = (editorStateForContent) => {
        this.setState({
            editorStateForContent,
        });
    };

    imageUploadCallBack = file => new Promise(
        (resolve, reject) => {
            const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
            xhr.open('POST', 'https://api.imgur.com/3/image');
            xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca');
            const data = new FormData(); // eslint-disable-line no-undef
            data.append('image', file);
            xhr.send(data);
            xhr.addEventListener('load', () => {
                const response = JSON.parse(xhr.responseText);
                resolve(response);
            });
            xhr.addEventListener('error', () => {
                const error = JSON.parse(xhr.responseText);
                reject(error);
            });
        },
    );

    render() {
        const { editorContentForTitle, editorContentForContent, editorStateForTitle, editorStateForContent } = this.state;
        return (
            <Spin tip="Loading..." spinning={this.state.loading}>
                <div className="gutter-example button-demo">
                    <BreadcrumbCustom first="软件配置" second="公告配置"/>
                    <Row gutter={16}>
                        <Col className="gutter-row" md={16}>
                            <div className="gutter-box">
                                <Card title="标题" bordered={false}>
                                    <Editor
                                        // initialEditorState={editorStateForTitle}
                                        editorState={editorStateForTitle}
                                        toolbarClassName="home-toolbar"
                                        wrapperClassName="home-wrapper"
                                        editorClassName="home-editor"
                                        style={{ backgroundColor: 'black' }}
                                        onEditorStateChange={this.onEditorStateForTitleChange}
                                        toolbar={{
                                            history: { inDropdown: true },
                                            inline: { inDropdown: false },
                                            list: { inDropdown: true },
                                            textAlign: { inDropdown: true },
                                            image: { uploadCallback: this.imageUploadCallBack },
                                        }}
                                        onContentStateChange={this.onEditorChangeForTitle}
                                        placeholder="请输入正文~~尝试@哦，有惊喜"
                                        spellCheck
                                        onFocus={() => {
                                            console.log('focus');
                                        }}
                                        onBlur={() => {
                                            console.log('blur');
                                        }}
                                        onTab={() => {
                                            console.log('tab');
                                            return true;
                                        }}
                                        localization={{ locale: 'zh', translations: { 'generic.add': 'Test-Add' } }}
                                        mention={{
                                            separator: ' ',
                                            trigger: '@',
                                            caseSensitive: true,
                                            suggestions: [
                                                { text: '蜜瓜', value: '蜜瓜视屏', url: 'href-a' },
                                                { text: 'AB', value: 'ABC', url: 'href-ab' },
                                                { text: 'ABC', value: 'ABCD', url: 'href-abc' },
                                                { text: 'ABCD', value: 'ABCDDDD', url: 'href-abcd' },
                                                { text: 'ABCDE', value: 'ABCDE', url: 'href-abcde' },
                                                { text: 'ABCDEF', value: 'ABCDEF', url: 'href-abcdef' },
                                                { text: 'ABCDEFG', value: 'ABCDEFG', url: 'href-abcdefg' },
                                            ],
                                        }}
                                    />

                                    <style>{`
                                    .home-editor {
                                        height:150px;
                                        background-color:#4EA5F6;
                                        
                                    }
                                `}</style>
                                </Card>
                            </div>

                        </Col>
                        <Col className="gutter-row" md={8}>
                            <Card title="标题同步转换HTML" bordered={false}>
                            <pre
                                width={40}>{this.onEditorChangeTitle ? draftToHtml(editorContentForTitle) : editorContentForTitle}</pre>
                            </Card>
                        </Col>
                        <Col className="gutter-row" md={16}>
                            <div className="gutter-box">
                                <Card title="内容" bordered={false}>
                                    <Editor
                                        editorState={editorStateForContent}
                                        toolbarClassName="home-toolbar"
                                        wrapperClassName="home-wrapper"
                                        editorClassName="home-editor1"
                                        onEditorStateChange={this.onEditorStateForContentChange}
                                        toolbar={{
                                            history: { inDropdown: true },
                                            inline: { inDropdown: false },
                                            list: { inDropdown: true },
                                            textAlign: { inDropdown: true },
                                            image: { uploadCallback: this.imageUploadCallBack },
                                        }}
                                        onContentStateChange={this.onEditorChangeForContent}
                                        placeholder="请输入正文~~尝试@哦，有惊喜"
                                        spellCheck
                                        onFocus={() => {
                                            console.log('focus');
                                        }}
                                        onBlur={() => {
                                            console.log('blur');
                                        }}
                                        onTab={() => {
                                            console.log('tab');
                                            return true;
                                        }}
                                        localization={{ locale: 'zh', translations: { 'generic.add': 'Test-Add' } }}
                                        mention={{
                                            separator: ' ',
                                            trigger: '@',
                                            caseSensitive: true,
                                            suggestions: [
                                                { text: '蜜瓜', value: '蜜瓜视频', url: 'href-a' },
                                                { text: 'AB', value: 'ABC', url: 'href-ab' },
                                                { text: 'ABC', value: 'ABCD', url: 'href-abc' },
                                                { text: 'ABCD', value: 'ABCDDDD', url: 'href-abcd' },
                                                { text: 'ABCDE', value: 'ABCDE', url: 'href-abcde' },
                                                { text: 'ABCDEF', value: 'ABCDEF', url: 'href-abcdef' },
                                                { text: 'ABCDEFG', value: 'ABCDEFG', url: 'href-abcdefg' },
                                            ],
                                        }}
                                    />

                                    <style>{`
                                    .home-editor1 {
                                        min-height: 300px;
                                        
                                    }
                                `}</style>
                                </Card>
                            </div>
                        </Col>
                        <Col className="gutter-row" md={8}>
                            <Card title="内容同步转换HTML" bordered={false}>
                            <pre
                                width={40}>{this.onEditorChangeContent ? draftToHtml(editorContentForContent) : editorContentForContent}</pre>
                            </Card>
                        </Col>
                        <Col style={{ marginTop: 10 }} className="" md={8}>
                            <Card title="提交到APP" bordered={false}>
                                <Button disabled={this.state.loading} loading={this.state.loading} type="primary"
                                        onClick={this._setServerContent} size={'large'}>发表</Button>
                            </Card>

                        </Col>

                    </Row>
                </div>
            </Spin>
        );
    }
}

export default Announcement;