
# Lnr Ethers React

![npm](https://img.shields.io/npm/v/@chriton/lnr-ethers-react)
![npm bundle size](https://img.shields.io/bundlephobia/min/@chriton/lnr-ethers-react)
![npm](https://img.shields.io/npm/dw/@chriton/lnr-ethers-react)

![GitHub](https://img.shields.io/github/license/Chriton/lnr-ethers-react)
![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/Chriton/lnr-ethers-react)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

This repository represents the source code for the [lnr-ethers-react npm](https://www.npmjs.com/package/@chriton/lnr-ethers-react) package.

## Requirements

- To use the [lnr-ethers-react npm](https://www.npmjs.com/package/@chriton/lnr-ethers-react) package in your React project make sure you have at least React >= 18.0.0

---

## Updating/publishing the [npm](https://www.npmjs.com/) package

1. Make your desired changes in /src folder
2. Build the package that will be published on npm by running the following command in the root folder:
    ```bash
    npm run build
    ```
    This command will generate all the necessary files required to be published in the /dist folder (generated from the /src folder).

3. Update the npm package version in /dist/package.json file. You can do it manually or use one of the following commands:

    ```bash
    # Go into /dist folder and use one of the following commands to update the version
    # 1.0.0 -> 1.0.1
    npm version patch
    # 1.0.0 -> 1.1.0
    npm version minor
    # 1.0.0 -> 2.0.0
    npm version major
    ```
   
   You can also add a pre-release version by adding the following after the version number: -alpha.0, -beta.0, -rc.0, etc.
    We update /dist/package.json file because this is the file that will be published on npm.

4. Publish the package on npm
    ```bash
        # Go to the /dist folder and use the following to publish the package
        npm login
        npm publish --access public
    ```
   
    If you want to just dry run the publish command without actually publishing the package, use the following command:
    ```bash
        npm publish --dry-run
    ```
    Note that the package will be published with the version specified in /dist/package.json file and not the one in /src/package.json file.
    The package will be published in the location specified in /dist/package.json -> name field.

5. Push the changes to the repository
6. Optionally you can create a release on GitHub with the same version as the one you published on npm

---

## Package Installation & Setup in your React project

Full documentation can be found here [docs.linagee.app](https://docs.linagee.app/docs/lnr-ethers-react/getting-started)

### Installation

```bash
# with npm
npm install @chriton/lnr-ethers-react

# with yarn
yarn add @chriton/lnr-ethers-react
```

---

### Setup

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
