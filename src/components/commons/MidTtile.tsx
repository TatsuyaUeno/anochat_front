/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";

type Props = {
    title: string
};

const MidTitle: React.FC<Props> = React.memo(( {title} ) => {
    return (
        <div css={styles["title"]}>{ title }</div>
    )
})

const styles = {
    title: css`
        margin: 0.5rem 0.5rem 0.5rem 0.5rem;
        font-size: 18px;
    `
}

export default MidTitle;