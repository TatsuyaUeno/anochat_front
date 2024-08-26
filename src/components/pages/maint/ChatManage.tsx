/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import Header from "../../layouts/Header";
import ChatList from "../chat_list/list/ChatList";
import { ChatListObj } from "../../../apiResponse";
import BigTitle from "../../commons/BigTitle";
import { API_PATH } from "../../../constants";
import { fetchWrapper } from "../../../fetchWrapper";


type Props = {

};

const ChatManage:React.FC<Props> = React.memo(() => {

    // チャットリスト
    const [chatList, setChatList] = useState<ChatListObj[]>();

    // 選択したチャットデータ
    const [selectedTitle, setSelectedTitle] = useState<string>("");
    const [selectedEventDate, setSelectedEventDate] = useState<string>("");

    useEffect(() => {
        // 初期表示データ取得
        fetchWrapper(API_PATH.CHAT_GET_LIST, "POST", null)
        .then(body => {
            setChatList(body);
        })
        .catch(err => {
            console.error(err);
        })
    }, []);

    /**
     * 新規作成ボタン
     */
    const clickNewCreate = () => {
        setSelectedTitle("新規作成");
        setSelectedEventDate("");
    }

    /**
     * チャット選択
     * @param row 選択行
     */
    const selectChatItem = (row: number) => {
        let selectChat = chatList && chatList[row];
        if (!selectChat) {
            console.error("チャット一覧の選択に失敗しました。行：" + row);
        } else {
            setSelectedTitle(selectChat.content);
            setSelectedEventDate(selectChat.date);
        }
    }

    /**
     * 登録ボタン
     */
    const registOrUpdate = () => {
        let param = {
            title: selectedTitle,
            eventDate: selectedEventDate
        }
        // チャット一覧登録APIを呼び出し
        fetchWrapper(API_PATH.CHAT_UPDATE_LIST, "POST", param)
        .then(body => {
            console.log(body);
        })
        .catch(err => {
            console.error(err);
        });
    }

    return (
        <div>
            {/* ヘッダー */}
            <Header title="チャット管理" />

            <div css={styles["chatManage"]}>
                {/* 選択 */}
                <div css={styles["selectChat"]}>
                    <div css={styles["newCreate"]}>
                        <BigTitle title="編集チャット選択" />
                        <button css={styles["createButton"]} onClick={ clickNewCreate }>新規作成</button>
                    </div>
                    <div>
                        { chatList &&
                            <ChatList param={chatList} selectChatList={ selectChatItem }/>
                        }
                    </div>
                </div>

                {/* 編集 */}
                <div css={styles["editChat"]}>
                    <BigTitle title="チャットデータ編集" />
                    {/* TODO:どうやって値を表示するか */}
                    <div css={styles["selectData"]}>
                        <div css={styles["selectValue"]}>選択中：　　{ selectedTitle }</div>
                        <div css={styles["selectValue"]}>{ selectedEventDate }</div>
                    </div>
                    <div css={styles["inputArea"]}>
                        <input type="text" placeholder="タイトルを入力してください"></input>
                        <input type="date" placeholder="日付を選択してください"></input>
                    </div>
                    <div css={styles["registerButtonArea"]}>
                        <button css={styles["createButton"]} onClick={ registOrUpdate }>登録</button>
                    </div>
                </div>
            </div>
            {test &&
            <div>{ test.name }</div>}
        </div>
    )
})

const styles = {
    chatManage: css`
        display: flex;
        margin-top: 64px;
        height: 100%;
    `,
    selectChat: css`
        flex-grow: 1;
        margin-left: 100px;
        margin-right: 40px;
        width: 50%;
    `,
    newCreate: css`
        display: flex;
        justify-content: space-between;
        margin-bottom: 50px;
    `,
    editChat: css`
        flex-grow: 1;
        margin-left: 40px;
        margin-right: 100px;
        width: 50%;
    `,
    createButton: css`
        margin: 0.3rem 0.5rem 0.3rem 0.5rem;
        appearance: none;
        border: 0;
        border-radius: 10px;
        background: #33437A;
        color: #fff;
        padding: 8px 16px;
        font-size: 16px;
        cursor: pointer;
    `,
    selectData: css`
        display: flex;
        justify-content: space-between;
        margin-bottom: 40px;
        margin-right: 40px;
    `,
    selectValue: css`
        margin: 0.3rem 0.5rem 0.3rem 2rem;
    `,
    inputArea: css`
        margin: 0.3rem 3rem 0.3rem 2rem;
        display: grid;
        input {
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
            line-height: 2rem;
            border-radius: 8px;
            outline: solid 1.5px #F4F5F6;
        }
        input:focus {
            outline: 0;
            border-color: #F4F5F6;
        }
    `,
    registerButtonArea: css`
        text-align: center;
    `
}

export default ChatManage;