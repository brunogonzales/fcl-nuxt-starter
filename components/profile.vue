<template>
  <article class="card animate__animated animate__slideInDown" v-if="profile">
    <label for="address">
      Address
      <input
        type="text"
        id="address"
        name="address"
        v-model="fields.address"
        placeholder="Address"
        disabled
      />
    </label>
    <div class="grid">
      <label for="name">
        Name
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          v-model="fields.name"
        />
      </label>

      <label for="color">
        Favorite Color
        <input type="color" id="color" name="color" v-model="fields.color" />
      </label>
    </div>

    <label for="info">Bio</label>
    <textarea
      type="info"
      id="info"
      name="info"
      placeholder="Your personal info"
      v-model="fields.info"
    ></textarea>

    <button @click="() => updateProfile(fields)">Update Profile</button>
  </article>
</template>

<script>
export default {
  props: ["profile", "updateProfile"],
  data() {
    return {
      fields: {
        address: "",
        name: "",
        avatar: "",
        info: "",
      },
    };
  },
  mounted() {
    this.fields = { ...this.profile };
  },
  methods: {},
};
</script>

 