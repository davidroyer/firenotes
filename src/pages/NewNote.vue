<template>
  <q-page>
    <q-input v-model="note.title" type="text" label="Note Title" />
    <VueEditor v-model="note.content" useMarkdownShortcuts />
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="save" color="primary" @click="save" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { saveNote } from "boot/db";
export default {
  name: "NewNote",
  components: { VueEditor },
  data: () => ({
    note: {
      title: "",
      content: ""
    }
  }),

  methods: {
    async save() {
      const savedNote = await saveNote(this.note);
      // eslint-disable-next-line no-console
      console.log("TCL: save -> savedNote", savedNote);
    }
  }
};
</script>

<style lang="scss" scoped></style>
