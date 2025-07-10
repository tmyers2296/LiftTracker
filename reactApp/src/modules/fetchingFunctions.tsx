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
