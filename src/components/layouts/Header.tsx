/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react"
import { useNavigate } from "react-router-dom";

type Props = {
    title: string
};

/**
 * 共通部品のヘッダー
 */
const Header: React.FC<Props> = React.memo(( {title} ) => {
    // navigateAPI
    let navigate = useNavigate();

    // 戻るボタン
    const backBrowser = () => {
        // 前のページに遷移
        navigate(-1);
    };

    return (
        <div>
            <div css={styles["header"]}>
                <header>{title}
                    <img src="../static/images/icon_back_button.png" onClick={ backBrowser }/>
                </header>
            </div>
        </div>
    )
})


const styles = {
    header: css`
        // ヘッダー
        header {
            // 位置
            position: relative;
            height: 64px;
            padding-top: 24px;
            padding-bottom: 24px;
            text-align: center;
            background-color: #F0F2F8;
            // 文字
            font-size: 24px;
            color: #33437A;
            
            // 画像
            img {
                position: absolute;
                top: 20px;
                left: 20px;
                height: 20px;
                width: 20px;
                color: #33437A;
                cursor: pointer;
            }
        }
    `,
};

export default Header;