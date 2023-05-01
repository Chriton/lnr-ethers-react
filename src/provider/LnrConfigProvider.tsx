import { ethers } from "ethers";
import { createContext, FC, ReactNode } from "react";
import { LnrConfig } from "./LnrConfig";

type lnrProviderProps = {
    config: LnrConfig;
    children: ReactNode;
};

export const LnrContext = createContext<LnrConfig>({
    provider: ethers.getDefaultProvider(1)
});

// prettier-ignore
export const LnrConfigProvider: FC<lnrProviderProps> = (props) => {
    return (
        <LnrContext.Provider value={props.config}>
            {props.children}
        </LnrContext.Provider>
    );
};
