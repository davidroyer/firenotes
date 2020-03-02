<template>
  <q-page :key="note._id">
    <q-input v-model="note.title" type="text" label="Note Title" />
    <VueEditor v-model="note.content" use-markdown-shortcuts />
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="save" color="primary" @click="save" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  name: "EditNote",
  components: { VueEditor },

  data: () => ({
    note: {
      title: "",
      content: ""
    }
  }),

  watch: {
    async $route(to) {
      this.note = await this.$getNote(to.params.id);
    }
  },

  async created() {
    this.note = await this.$getNote(this.$route.params.id);
  },

  methods: {
    async save() {
      await this.$updateNote(this.note);
      alert("Updated");
    }
  }
};
</script>

<style lang="scss" scoped></style>
