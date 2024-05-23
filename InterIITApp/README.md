# InterIITApp

## Instructions to Run the Application

1. Download the `frontend` folder.
2. Execute the following commands in the terminal to run the webpage:

```javascript
cd ./frontend
npm run dev
```

Please note that this page will only work with the native currency of the Ethereum Blockchain, Ether, and not with actual money. The page is built using Vite + React, and Tailwind CSS.

## Functionality of the Page

- Deploy the smart contract by copying the code in the `.sol` file into an Ethereum network. Then, copy the address of the smart contract and add it to the `.env` file in the folder.
- Initially, the user who launches the contract will be set as the Admin.
- Whenever a user opens the page, an inbuilt Ethereum wallet (e.g., Metamask) will pop up and ask for sign-in.
- There will be two separate pages for the Patient and the Admin.
- The Admin can add more Admins.
- The Patient can only pay and view their records.
- The Patient cannot sign in to the Admin page.
- Whenever the user switches accounts, they will be redirected to the home page.
- If the Admin wants to edit the patient record, they can use the same "Add Patient" option to update the record of the patient.
