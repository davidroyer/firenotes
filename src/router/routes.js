const routes = [
  {
    path: "/",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      { path: "/new-note", component: () => import("pages/NewNote.vue") },
      // { path: "/edit-note", component: () => import("pages/EditNote.vue") }
      { path: "edit-note/:id", component: () => import("pages/EditNote.vue") }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
