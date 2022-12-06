import { defineStore } from "pinia";
import router from "@/router";

export const useSessionStore = defineStore(
  "session",
  () => {
    const data = reactive({
      member: {},
      token: false,
    });

    function setSession(member, token) {
      data.member = member;
      data.token = token;
    }

    function isValid() {
      let token = data.token;
      // Vérifier qu'il existe un token
      if (!token) {
        router.push("/signin");
        return false;
      } else {
        let idUser = data.member.id;

        // Vérifier que le token est valide
        api
          .get("members/" + idUser + "/signedin?token=" + token)
          .then((response) => {
            if (!response.token) {
              router.push("/signin");
              return false;
            }
          });
        return true;
      }
    }

    return { isValid, data, setSession };
  },
  {
    persist: true,
  }
);
