import Swal from "sweetalert2";

export async function createRequest(exportObj, userName) {
  let content = [];
  exportObj.map((street) => {
    content.push({ unique_number: street.unique_number, name: street.name });
  });
  console.log(content);

  const body = `
   {
     "content": ${JSON.stringify(exportObj)},
     "username": "${userName}"
 }
   `;

  const response = await fetch("https://api.modlitbyzaulice.cz/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: body,
  });

  response.json().then((data) => {
    if (data.status === "OK") {
      Swal.fire({
        title: "Barabáš!",
        text: "BOT Barabáš úspěšně vytvořil žádost o přidání nově promodlených ulic. Žádost najdeš zde: <a href='https://github.com/petrkucerak/modlitbyzaulice/pulls' target='_blank'>https://github.com/petrkucerak/modlitbyzaulice/pulls</a>.",
        icon: "success",
        confirmButtonColor: "#3d8bc9",
      });
    } else {
      Swal.fire({
        title: "Barabáš!",
        text: "V procesu přidání nově promodlených ulic zaznamenal BOT Barabáš problém. Zkus to znovu zachvíli, případně kontaktuj administrátory.",
        icon: "error",
        confirmButtonColor: "#3d8bc9",
      });
    }
  });
}
