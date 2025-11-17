// fetch data from api & return it:
export async function fetchData(url: string) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Could not access resource");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

// const API_BASE = "https://localhost:5119";

// export async function apiGet(path: string) {
//     const res = await fetch(`${API_BASE}${path}`, {
//         credentials: "include", // if cookies
//         headers: { "Content-Type": "application/json" },
//     });

//     if (!res.ok) {
//         const text = await res.text();
//         throw new Error(`API error: ${res.status} - ${text}`);
//     }

//     return res.json();
// }
