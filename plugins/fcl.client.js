import * as fcl from "@onflow/fcl";

fcl.config({
  "accessNode.api": "https://access-testnet.onflow.org", // Mainnet: "https://access-mainnet-beta.onflow.org"
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn", // Mainnet: "https://fcl-discovery.onflow.org/authn"
  "0xProfile": "0xba1132bc08f82fe2" // The account address where the smart contract lives
});

export default ({ app }, inject) => {
  inject("fcl", fcl);
};
