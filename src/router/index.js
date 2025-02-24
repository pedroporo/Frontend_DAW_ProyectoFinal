import InformeList from "@/components/InformeList.vue";
import { createRouter, createWebHistory } from "vue-router";
import PatientsView from "../views/PatientsView.vue";
import Patient from "../components/Patient.vue";
import HomeView from "../views/HomeView.vue";
import InformeView from "@/views/InformeView.vue";
import IncomingCallsView from "@/views/IncomingCallsView.vue";
import OutgoingCallsView from "@/views/OutgoingCallsView.vue";
import IncomingCallForm from "@/views/IncomingCallForm.vue";
import OutgoingCallForm from "@/views/OutgoingCallForm.vue";
import Contact from "@/components/Contact.vue";
import AlarmForm from "@/components/AlarmForm.vue";
import PatientForm from "@/components/PatientForm.vue";
import ContactForm from "@/components/ContactForm.vue";
import AccoutInfoView from "@/views/AccoutInfoView.vue";
// import GestionUsersView from "@/views/GestionUsersView.vue";
// import LoginGoogle from "@/components/LoginGoogle.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/patients",
      name: "patients",
      component: PatientsView,
    },
    {
      path: "/patient/:id",
      name: "patient",
      component: Patient,
    },
    {
      path: "/patientForm/:id?",
      name: "patientForm",
      component: PatientForm,
    },
    {
      path: "/",
      name: "home",
      // redirect: "/patients",
      component: HomeView,
    },
    /*     {
      path: '/login',
      name: 'login',
      component: LoginGoogle,
    }, */
    {
      path: "/informes",
      name: "informes",
      component: InformeList,
    },
    {
      path: "/informe/:tipoInforme",
      name: "informe",
      component: InformeView,
      props: true,
    },
    {
      path: "/incoming_calls",
      name: "incoming_calls",
      component: IncomingCallsView,
    },
    {
      path: "/outgoing_calls",
      name: "outgoing_calls",
      component: OutgoingCallsView,
    },
    {
      path: "/outgoingForm",
      name: "outgoingFormAdd",
      component: OutgoingCallForm,
    },
    {
      path: "/outgoingForm/:id",
      name: "outgoingFormEdit",
      component: OutgoingCallForm,
      props: true,
    },
    {
      path: "/incomingForm/:id?",
      name: "incomingForm",
      component: IncomingCallForm,
    },
    {
      path: "/outgoingForm/:id?",
      name: "outgoingForm",
      component: OutgoingCallForm,
    },
    {
      path: "/contactForm/:id?/:edit?",
      name: "contactForm",
      component: ContactForm,
    },
    /*     {
      path: '/gestionUsers',
      name: 'gestionUsers',
      component: GestionUsersView
    }, */
    {
      path: "/contact/:id?",
      name: "contact",
      component: Contact,
    },
    {
      path: "/alarmForm/:id/:zoneId",
      name: "alarmForm",
      component: AlarmForm,
      props: true,
    },
    {
      path: "/cuenta",
      name: "cuenta",
      component: AccoutInfoView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("auth_token");

  if (to.meta.requiresAuth && !token) {
    next("/"); // Redirige al home si no tiene token
  } else {
    next(); // Permite la navegación
  }
});

export default router;
