<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :breakpoint="780"
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Side Navigation</q-item-label>
        <q-item to="/">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/new-note" exact>
          <q-item-section avatar>
            <q-icon name="file_copy" />
          </q-item-section>
          <q-item-section>
            <q-item-label>New File</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/settings">
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Settings</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          v-for="note in this.$store.state.notes"
          :key="note._id"
          exact
          :to="`/edit-note/${note._id}`"
        >
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section>
            <q-item-label v-text="note.title" />
          </q-item-section>
        </q-item>
      </q-list>
      <pre>{{ this.$store.state.notes }}</pre>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MyLayout",

  data() {
    return {
      leftDrawerOpen: false
    };
  },
  async created() {
    const testGet = await this.$getNotes();
    // eslint-disable-next-line no-console
    console.log("TCL: created -> testGet", testGet);
    this.$store.dispatch("loadNotes");
  },

  methods: {
    logNote(note) {
      // eslint-disable-next-line no-console
      console.log("note", note);
    }
  }
};
</script>
