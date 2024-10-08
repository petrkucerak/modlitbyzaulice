import Swal from "sweetalert2";

export async function createRequest(exportObj, userName) {
  // Function to split the array into chunks
  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  // Split the exportObj into chunks of, e.g., 20 streets per request
  const chunks = chunkArray(exportObj, 20);

  for (const chunk of chunks) {
    const body = JSON.stringify({
      content: chunk,
      username: userName,
    });

    const response = await fetch("https://api.modlitbyzaulice.cz/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    });

    const data = await response.json();
    if (data.status === "OK") {
      Swal.fire({
        title: "Barabáš!",
        text: `BOT Barabáš úspěšně vytvořil žádost. Branch name: ${data.branch_name}. Pull request here: <a href='https://github.com/petrkucerak/modlitbyzaulice/pull/${data.branch_name}' target='_blank'>View Pull Request</a>.`,
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
      break;
    }
  }
}
