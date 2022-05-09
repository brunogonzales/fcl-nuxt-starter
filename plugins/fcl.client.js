import * as fcl from "@onflow/fcl";

fcl.config({
  "accessNode.api": "https://rest-testnet.onflow.org", // Mainnet: "https://rest.onflow.org"
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn", // Mainnet: "https://fcl-discovery.onflow.org/authn",
  "app.detail.title": "Kitty Items", // Shows user what dapp is trying to connect
  "app.detail.icon": "https://fcl-discovery.onflow.org/images/blocto.png", // shows image to the user to display your dapp brand
  "0xProfile": "0xba1132bc08f82fe2" // The account address where the smart contract lives
});

export default ({ app }, inject) => {
  inject("fcl", fcl);
};
