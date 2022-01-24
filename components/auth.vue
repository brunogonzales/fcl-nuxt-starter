<template>
  <div>
    <div>
      <transaction
        :transactionStatus="transactionStatus"
        :transactionInProgress="transactionInProgress"
      />

      <section v-if="user.loggedIn">
        <p>You are now logged in as: <UserAddress :address="user.addr" /></p>
        <button @click="unauthenticate">Log Out</button>
        <profile
          v-if="profile"
          :profile="profile"
          :updateProfile="updateProfile"
        />
        <p v-else>
          Create a profile and then click on Load Profile to see it here.
        </p>
        <section v-if="!profile">
          <h2>Controls</h2>
          <button :aria-busy="creatingProfile" @click="createProfile">
            Create Profile
          </button>
          <button :aria-busy="loadingProfile" @click="loadProfile">
            Load Profile
          </button>
        </section>
      </section>
      <div v-else>
        <p>Login to get started.</p>
        <button @click="login">Log In</button>
        <button @click="signup">Sign Up</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$fcl.currentUser.subscribe((user) => (this.user = user));
  },
  data() {
    return {
      loadingProfile: false,
      creatingProfile: false,
      // TODO: move to store
      user: {
        loggedIn: false,
      },
      transactionInProgress: false,
      transactionStatus: 1,
      profile: null,
    };
  },
  methods: {
    login() {
      this.$fcl.logIn();
    },
    unauthenticate() {
      this.$fcl.unauthenticate();
    },
    signup() {
      this.$fcl.signUp();
    },
    initTransactionState(txName) {
      this.transactionInProgress = true;
      this.transactionStatus = -1;
    },
    async createProfile() {
      this.creatingProfile = true;
      this.initTransactionState();
      let transactionId = false;
      try {
        transactionId = await this.$fcl.mutate({
          cadence: `
        import Profile from 0xProfile
        transaction {
          prepare(account: AuthAccount) {
            // Only initialize the account if it hasn't already been initialized
            if (!Profile.check(account.address)) {
              // This creates and stores the profile in the user's account
              account.save(<- Profile.new(), to: Profile.privatePath)
              // This creates the public capability that lets applications read the profile's info
              account.link<&Profile.Base{Profile.Public}>(Profile.publicPath, target: Profile.privatePath)
            }
          }
        }
      `,
          payer: this.$fcl.authz,
          proposer: this.$fcl.authz,
          authorizations: [this.$fcl.authz],
          limit: 50,
        });
        this.$fcl.tx(transactionId).subscribe((res) => {
          this.transactionStatus = res.status;
          if (res.status === 4) {
            setTimeout(() => (this.transactionInProgress = false), 2000);
          }
        });
      } catch (e) {
        this.transactionStatus = 99;
        console.log(e);
      }
      this.creatingProfile = false;
    },
    async loadProfile() {
      this.loadingProfile = true;
      let profileQueryResult = false;

      try {
        profileQueryResult = await this.$fcl.query({
          cadence: `
        import Profile from 0xProfile
  
        pub fun main(address: Address): Profile.ReadOnly? {
          return Profile.read(address)
        }
      `,
          args: (arg, t) => [arg(this.user.addr, t.Address)],
        });
        this.profile = profileQueryResult;
      } catch (e) {
        console.log(e);
      }
      this.loadingProfile = false;
    },
    async updateProfile(fields) {
      this.initTransactionState();
      try {
        const transactionId = await this.$fcl.mutate({
          cadence: `
        import Profile from 0xProfile
  
        transaction(name: String, color: String, info: String) {
          prepare(account: AuthAccount) {
            account
              .borrow<&Profile.Base{Profile.Owner}>(from: Profile.privatePath)!
              .setName(name)

            account
              .borrow<&Profile.Base{Profile.Owner}>(from: Profile.privatePath)!
              .setInfo(info)

            account
              .borrow<&Profile.Base{Profile.Owner}>(from: Profile.privatePath)!
              .setColor(color)
          }
        }
      `,
          args: (arg, t) => [
            arg(fields.name, t.String),
            arg(fields.color, t.String),
            arg(fields.info, t.String),
          ],
          payer: this.$fcl.authz,
          proposer: this.$fcl.authz,
          authorizations: [this.$fcl.authz],
          limit: 50,
        });
        this.$fcl.tx(transactionId).subscribe((res) => {
          this.transactionStatus = res.status;
          if (res.status === 4) {
            setTimeout(() => (this.transactionInProgress = false), 2000);
          }
        });
      } catch (e) {
        console.log(e);
        this.transactionStatus = 99;
      }
    },
  },
};
</script>