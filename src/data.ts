const SERVER_NAME = "https://shfe-diplom.neto-server.ru/";

export default async function getData(
  postfix: string,
  options: RequestInit = {
    method: "GET",
  },
) {
  const data = await fetch(`${SERVER_NAME}${postfix}`, options)
    .then((response) => response.json())
    .then((data) => {
      console.log("\n\n\n\t\tTHEN DATA");

      console.table(data);
      

      if (data.success) {
        return data.result;
      }
    });

  return await data;
}
