## Installation Steps

### **1. Clone the Repository**

Start by cloning the repository to your local machine:

```bash
git clone https://github.com/aditipolkam/contract-monitoring.git
cd contract-monitoring
npm install
```

### **2. Install Dependencies**

Navigate to the root directory of the repository and install the required dependencies for all services:

Terminal 1

```bash
cd bank-contract
npm install
```

Terminal 2

```bash
cd notification-service
npm install
```

Terminal 3

```bash
cd trigger-pause
npm install
```

This will install the necessary packages for the `Bank Contract`, `Trigger Pause Service`, and `Notification Service`.

### **3. Configure Environment Variables**

Create and configure environment variable files for the Notification Service. You may need to create a `.env` file in the `notification-service` or configure your environment variables as needed.

Ensure the following variables are set:

```bash
./notification-service/.env
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
ACCESS_TOKEN=<your-access-token>
REFRESH_TOKEN=<your-refresh-token>
FROM_EMAIL=<your-from-email-address>
```

You can get client id and client secret from a Google Oauth app, and an access token and refresh token by using this app to create an Oauth flow - [check this](https://developers.google.com/identity/protocols/oauth2/web-server#refresh).

### **4. Configure Smart Contracts**

Ensure that the `privateKey` to deploy contract from and `ownerEmail` to notify are correctly set in `global-config.json` or any other configuration files used for deployment.

### **5. Compile and Deploy Smart Contracts**

Navigate to the folder containing your smart contracts (e.g., `bank-contract`) and compile them:

```bash
npm run build
```

This will compile Typescript script files and will put them into `/dist` and Solidity contract files into `/artifacts`.

Start a hardhat node in another terminal

```bash
npx hardhat node
```

### **6. Start the Trigger Pause Service**

Navigate to the `trigger-pause` folder and start the service to begin listening for blockchain events:

```bash
npm run build
npm start
```

### **7. Start the Notification Service**

Navigate to the `notification-service` folder and start the service:

```bash
npm run build
npm start
```

This starts a service on `http://localhost:3000`

### Simulation

Comeback to the 1st terminal and deploy the initial version of the `Bank_V1` smart contract:

```bash
npx hardhat run --network localhost dist/scripts/deploy.js
```

Deposit some eth to the contract:

```bash
npx hardhat run --network localhost dist/scripts/deposit.js
```

Check balance of the contract and the depositors:

```bash
npx hardhat run --network localhost dist/scripts/check_balance.js
```

Deploy the attacker contract:

```bash
npx hardhat run --network localhost dist/scripts/deploy_attacker.js
```

Execute the attack:

```bash
npx hardhat run --network localhost dist/scripts/attack.js
```

Deploy the upgraded `Bank_V2` contract if needed:

```bash
npx hardhat run --network localhost dist/scripts/upgrade.js
```

Contract will be paused by the event processor when the attack is detected, you can use the following to unpause it

```bash
npx hardhat run --network localhost dist/scripts/unpause.js
```
