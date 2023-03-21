import { ethers } from "ethers";
import { createContext, FC, ReactElement } from "react";
import { LnrConfig } from "./LnrConfig";

type lnrProviderProps = {
    config: LnrConfig;
    children: ReactElement;
};

export const LnrContext = createContext<LnrConfig>({
    provider: ethers.providers.getDefaultProvider(1)
});

export const LnrConfigProvider: FC<lnrProviderProps> = (props) => {
    return (
        <LnrContext.Provider value={props.config}>
            {props.children}
        </LnrContext.Provider>
    );
};
