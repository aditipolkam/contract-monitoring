# Bank Contract with Reentrancy Attack Simulation, detecting exploits and reporting via email.

This documentation outlines a comprehensive system designed to simulate, detect, and respond to security exploits within a banking smart contract environment.

## `bank-contract`

**Overview:**
The `bank-contract` service manages the deployment and interaction of smart contracts used in the application. It includes all contracts and scripts required for deployment and interaction.

### Components

1. **Contracts:**

- **Bank_V1.sol**: The initial version of the banking smart contract, providing basic functionality for deposits, withdrawals, and balance management, with potential vulnerabilities for simulation.

- **Bank_V2.sol**: The upgraded version of the banking smart contract, incorporating improvements and fixes to address vulnerabilities identified in `Bank_V1`, including enhanced security measures.

- **AttackBank.sol**: A malicious smart contract designed to simulate reentrancy attacks and other exploits against the `Bank_V1` contract to test its vulnerability and response mechanisms.

2. **Scripts:**

- **deploy.ts**: Deploys the initial version of the `Bank_V1` smart contract to the blockchain, setting up the contract for further interactions and testing.

- **deposit.ts**: Executes deposit transactions into the `Bank_V1` contract, allowing users to add funds to their accounts.

- **check_balance.ts**: Retrieves and displays the balance of a specified account in the `Bank_V1` contract, providing insight into the current state of user funds.

- **withdraw.ts**: Facilitates withdrawal transactions from the `Bank_V1` contract, enabling users to remove funds from their accounts.

- **deploy_attacker.ts**: Deploys the `AttackBank` malicious contract to the blockchain, designed to simulate attacks against the `Bank_V1` contract.

- **attack.ts**: Executes the attack logic using the `AttackBank` contract, performing simulated exploits such as reentrancy attacks against the `Bank_V1` contract.

- **upgrade.ts**: Deploys the upgraded `Bank_V2` contract, incorporating fixes and improvements to address vulnerabilities present in `Bank_V1`.

### Dependencies

- Hardhat
- Ethers.js
- TypeScript

---

## `notification-service`

**Overview:**
The `notification-service` is responsible for sending alert emails when called from the `trigger-pause`. It formats the alert details and sends them to the designated recipients.

### Components

1. **Email Service:**

   **Overview:**
   The `sendAlert` function is an Express.js route handler designed to send alert emails. It receives details about the alert from the request body, constructs the email options, and sends the email using the `emailService`. If successful, it returns a success response; otherwise, it handles errors and returns an appropriate error message.

   #### Endpoint

   - **Base URL:** `http://localhost:3000/v1/`

   - **Method:** POST
   - **Route:** `/alerts`

   #### Request Body

   The function expects the following properties in the request body:

   - `message` (string): The content of the alert message to be included in the email.
   - `to` (string): The recipient’s email address.
   - `contractAddress` (string): The address of the smart contract related to the alert.

   #### Response

   - **Success (200 OK):**

     - **Body:**
       ```json
       {
         "message": "Ok",
         "send": <result of the email sending operation>
       }
       ```
     - The `send` field contains the result of the email sending operation, which may include details of the sent email or any response from the email service.

   - **Error (500 Internal Server Error):**
     - **Body:**
       ```json
       {
         "message": "Internal Server Error"
       }
       ```
     - Returned if an error occurs while attempting to send the email. The error is also logged to the console for debugging purposes.

   #### Functionality

   1. **Extracts Request Data:** Retrieves `message`, `to`, and `contractAddress` from the request body.
   2. **Constructs Email Options:** Uses the `emailService.getMailOptions` method to create the email options based on the provided data and alert type.
   3. **Sends Email:** Calls `emailService.sendMessage` with the constructed email options to send the alert email.

2. **Configuration:**
   The following environment variables are required in the .env file:

- `GOOGLE_CLIENT_ID=`: Client ID for Google API authentication.
- `GOOGLE_CLIENT_SECRET=`: Client secret for Google API authentication.
- `GOOGLE_REDIRECT_URI=`: Redirect URI for OAuth2 authentication.
- `ACCESS_TOKEN=`: Access token for sending emails.
- `REFRESH_TOKEN=`: Refresh token for renewing access tokens.
- `FROM_EMAIL=`: Email address from which the alerts will be sent.

Ensure these variables are properly configured in your environment to enable email notifications.

### Dependencies

- Nodemailer (or another email sending library)
- Email service configuration (SMTP server details)

---

## `trigger-pause`

**Overview:**
The `trigger-pause` service is a Node.js script that listens to blockchain events emitted by a smart contract. It processes specific events, such as `Deposit` and `Withdraw`, and calls appropriate services to handle these events. This service is designed to monitor contract activities in real-time and trigger actions based on detected events.

### Configuration

- **`endPoint`**: The URL of the Ethereum JSON-RPC provider (e.g., `http://127.0.0.1:8545`).
- **`contractAddress`**: The address of the smart contract being monitored, sourced from `contractConfig`.
- **`provider`**: An instance of `ethers.JsonRpcProvider` connected to the Ethereum network at the specified endpoint.
- **`contract`**: An instance of `ethers.Contract` connected to the smart contract at `contractAddress`, using the provided ABI.

### Functionality

1. **Event Listeners:**

   - **`Deposit` Event:**
     - **Handler:** `handleDeposit(from, value)`
     - **Description:** Triggered when a `Deposit` event is emitted by the smart contract. Calls `handleDeposit` with the `from` address and the deposited `value`.
   - **`Withdraw` Event:**
     - **Handler:** `handleWithdraw(receiver, value)`
     - **Description:** Triggered when a `Withdraw` event is emitted by the smart contract. Calls `handleWithdraw` with the `receiver` address and the withdrawn `value`.
   - **Wildcard Listener:**
     - **Handler:** Logs all other events for debugging purposes (currently commented out).

2. **Error Handling:**
   - **Errors during Execution:** Catches and logs errors encountered during the script execution. Sets the process exit code to 1 in case of an error.

### Dependencies

- **`ethers`**: Library for interacting with the Ethereum blockchain.
- **`ABI`**: JSON file containing the ABI of the smart contract.
- **`contractConfig`**: Configuration file providing the smart contract address.
- **`handleDeposit`**: Function to handle deposit events.
- **`handleWithdraw`**: Function to handle withdrawal events.

### Usage

- **Start Monitoring:** Run the script to begin listening for events from the specified smart contract.
- **Event Handling:** The script will automatically call `handleDeposit` and `handleWithdraw` as respective events are detected.

**Configuration:**

- **config.json**: Contains configuration details for deploying contracts, including network settings contract addresses and names.
