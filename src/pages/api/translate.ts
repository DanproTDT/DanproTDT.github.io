import type { APIRoute } from "astro";
export const prerender = false;
export const POST: APIRoute = async ({ request }) => {
    let payload;

    // Validar que el cuerpo sea JSON válido
    try {
        payload = await request.json();
    } catch (err) {
        return new Response(
            JSON.stringify({ error: "Entrada JSON inválida o vacía" }),
            {
                status: 400,
                headers: { "Content-Type": "application/json" }
            }
        );
    }

    const { text, target_lang } = payload || {};

    // Validar que los campos requeridos estén presentes
    if (!text || !target_lang) {
        return new Response(
            JSON.stringify({ error: "Faltan los campos 'text' o 'target_lang'" }),
            {
                status: 400,
                headers: { "Content-Type": "application/json" }
            }
        );
    }

    // Preparar solicitud a DeepL
    const res = await fetch("https://api-free.deepl.com/v2/translate", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "DeepL-Auth-Key 42eb5d84-2bc1-43e7-ac1d-0382954b3faf:fx" // Reemplaza con tu clave real
        },
        body: new URLSearchParams({
            text,
            target_lang: target_lang.toUpperCase()
        })
    });

    // Manejar errores de la API externa
    if (!res.ok) {
        const errorText = await res.text();
        return new Response(
            JSON.stringify({ error: "Error en la API de traducción", details: errorText }),
            {
                status: res.status,
                headers: { "Content-Type": "application/json" }
            }
        );
    }

    const data = await res.json();

    // Extraer traducción
    const translated = data.translations?.[0]?.text || text;

    return new Response(
        JSON.stringify({ translated }),
        {
            status: 200,
            headers: { "Content-Type": "application/json" }
        }
    );
};
