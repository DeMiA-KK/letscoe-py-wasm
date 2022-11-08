/** @jsxImportSource @emotion/react  */

import { css } from "@emotion/react";
import React from "react";

type ConsoleProps = {
    output: string
}

export const PyConsole: React.FC<ConsoleProps> = (props) => {
    return (
        <>
            <p>{props.output}</p>
        </>
    )
}