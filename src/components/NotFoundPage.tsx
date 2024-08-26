
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { Link } from "react-router-dom";

type Props = {
};

const NotFoundPage:React.FC<Props> = React.memo(() => {
    return (
        <div css={styles["all"]}>
            <div css={styles["content"]}>Not Fonud Page.</div>
            <Link css={styles["link"]} to={'/list'}>チャット一覧ページへ</Link>
        </div>
    )
})

const styles = {
    all: css`
        text-align: center;
    `,
    content: css`
        font-size: 32px;
        margin-top: 32px;
        margin-bottom: 4px;
    `,
    link: css`
    `
}

export default NotFoundPage;