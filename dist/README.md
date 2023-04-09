
# Lnr Ethers React

![npm](https://img.shields.io/npm/v/@linagee/lnr-ethers-react)
![npm bundle size](https://img.shields.io/bundlephobia/min/@linagee/lnr-ethers-react)
![npm](https://img.shields.io/npm/dw/@linagee/lnr-ethers-react)

![GitHub](https://img.shields.io/github/license/Linagee-Name-Registrar/lnr-ethers-react)
![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/Linagee-Name-Registrar/lnr-ethers-react)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# Requirements
- React >= 18.0.0

---

## Installation

Full documentation can be found here [docs.linagee.app](https://docs.linagee.app/docs/lnr-ethers-react/getting-started)


```bash
# with npm
npm install @linagee/lnr-ethers-react

# with yarn
yarn add @linagee/lnr-ethers-react
```

---

## Setup

#### Set LnrConfigProvider as a wrapper for your app

Example:
```typescript jsx

import { AppProps } from 'next/app';
import { ethers } from 'ethers';
import { LnrConfigProvider } from '@linagee/lnr-ethers-react';

function MyApp({ Component, pageProps }: AppProps) {
    const config = {
        provider: new ethers.providers.AlchemyProvider(1, process.env.REACT_APP_ALCHEMY_API
        ),
    };

    return (
        <LnrConfigProvider config={config}>
            <Component {...pageProps} />
        </LnrConfigProvider>
    );
}

export default MyApp;
```

You need to set REACT_APP_ALCHEMY_API in your .env file.
You can set any provider you want, but we recommend using Alchemy.

---

## Usage

Use the hooks in your components to get the data you need.

Example:

```typescript jsx
import React from "react";
import { useLnrGetAddress } from "@linagee/lnr-ethers-react";

function MyComponent() {
  const name = "0xhal.og";
  const { address, error, hasError, loading } = useLnrGetAddress(name);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (hasError) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Name: {name}</h2>
      <p>Address: {address}</p>
    </div>
  );
}

export default MyComponent;
```
