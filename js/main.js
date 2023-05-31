const API_KEY = "";
const form = document.getElementById("input-form");
const result = document.getElementById("result");
const copyBtn = document.getElementById("copy-btn");
const loaderContainer = document.getElementById("loader-container");

loaderContainer.style.display = "none"; // Oculta el contenedor del cargador inicialmente

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  loaderContainer.style.display = "block"; // Muestra el cargador

  const product = document.getElementById("product").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("description").value;

  const promptSpanish = `
  Producto: "${product}".
Precio: $${price}. 
Descripción proporcionada: "${description}".
Utiliza un gancho llamativo y emojis: [Escribe una oración o frase intrigante que capte la atención de los posibles compradores y agrega emojis relevantes para enfatizar].

Destaca las características principales del producto de manera breve y concisa: [Describe las características únicas y atractivas del producto en oraciones cortas y utiliza emojis para resaltar los puntos clave].

Crea una sensación de urgencia con emojis: [Utiliza un lenguaje emocionante y emojis que transmitan la necesidad de actuar rápidamente, como "¡Oferta por tiempo limitado! ⏰" o "¡Disponible solo hasta agotar existencias! 🚀"].

Agrega testimonios o reseñas positivas con emojis: [Incluye testimonios breves de clientes satisfechos junto con emojis que expresen satisfacción, como "😍 Los clientes están encantados con nuestro producto" o "👍 ¡Miles de personas satisfechas!"].

Proporciona información de contacto y emojis de llamada a la acción: [Indica cómo los interesados pueden comunicarse contigo para obtener más detalles o realizar la compra, utilizando emojis de mensajes, teléfono o enlaces directos].

Proporciona la descripción en inglés y en español.

No olvides mencionar en el resultado el nombre, precio y mejorar la descripción dada.
`;

  const promptEnglish = `
  Product: "${product}".
Price: $${price}. 
Provided description: "${description}".
Use a catchy hook and emojis: [Write an intriguing sentence or phrase that captures the attention of potential buyers and add relevant emojis to emphasize].

Highlight the key features of the product in a brief and concise manner: [Describe the unique and attractive characteristics of the product in short sentences and use emojis to highlight the key points].

Create a sense of urgency with emojis: [Use exciting language and emojis that convey the need to act quickly, such as "Limited-time offer! ⏰" or "Available only while supplies last! 🚀"].

Add positive testimonials or reviews with emojis: [Include brief testimonials from satisfied customers along with emojis that express satisfaction, such as "😍 Customers are thrilled with our product" or "👍 Thousands of satisfied people!"].

Provide contact information and call-to-action emojis: [Indicate how interested individuals can get in touch with you for more details or to make a purchase, using message, phone, or direct link emojis].

Provide the description in both English and Spanish.

Don't forget to mention the name, price, and improve the given description in the result.
`;

  try {
    // Consulta en español
    const responseSpanish = await fetch(
      "https://api.openai.com/v1/engines/text-davinci-003/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          prompt: promptSpanish,
          max_tokens: 1000, // Ajusta este valor según tus necesidades
          temperature: 0,
        }),
      }
    );

    // Consulta en inglés
    const responseEnglish = await fetch(
      "https://api.openai.com/v1/engines/text-davinci-003/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          prompt: promptEnglish,
          max_tokens: 1000, // Ajusta este valor según tus necesidades
          temperature: 0,
        }),
      }
    );

    if (responseSpanish.status !== 200 || responseEnglish.status !== 200) {
      alert(
        "Se ha producido un error al comunicarse con la API. Por favor, inténtalo de nuevo más tarde."
      );
      return;
    }

    const dataSpanish = await responseSpanish.json();
    const dataEnglish = await responseEnglish.json();

    const generatedTextSpanish = dataSpanish.choices[0].text.trim();
    const generatedTextEnglish = dataEnglish.choices[0].text.trim();

    const combinedResult = `Spanish Result:
${generatedTextSpanish}

English Result:
${generatedTextEnglish}`;

    result.value = combinedResult;
  } catch (error) {
    console.error("Error al obtener datos de la API:", error);
  } finally {
    loaderContainer.style.display = "none"; // Oculta el cargador
  }
});

copyBtn.addEventListener("click", () => {
  result.select();
  document.execCommand("copy");
});