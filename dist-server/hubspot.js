const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN ?? "";
const HUBSPOT_BASE_URL = "https://api.hubapi.com";
function splitName(fullName) {
    const parts = fullName.trim().split(/\s+/);
    const firstname = parts[0] ?? "";
    const lastname = parts.slice(1).join(" ");
    return { firstname, lastname };
}
async function hubspotFetch(path, init) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    try {
        return await fetch(`${HUBSPOT_BASE_URL}${path}`, {
            ...init,
            signal: controller.signal,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
                ...init.headers,
            },
        });
    }
    finally {
        clearTimeout(timeout);
    }
}
/**
 * Creates or updates a HubSpot contact, keyed on email. Never throws —
 * logs on failure and returns whether the sync actually succeeded, so a
 * fire-and-forget caller (signup) can ignore the result while a caller that
 * must reflect real success/failure (the contact form) can use it.
 */
export async function upsertHubspotContact(fullName, email, company, jobTitle) {
    if (!HUBSPOT_ACCESS_TOKEN)
        return false;
    const { firstname, lastname } = splitName(fullName);
    const properties = { email, firstname, lastname };
    if (company)
        properties.company = company;
    if (jobTitle)
        properties.jobtitle = jobTitle;
    try {
        const searchRes = await hubspotFetch("/crm/v3/objects/contacts/search", {
            method: "POST",
            body: JSON.stringify({
                filterGroups: [
                    { filters: [{ propertyName: "email", operator: "EQ", value: email }] },
                ],
                properties: ["email"],
                limit: 1,
            }),
        });
        if (!searchRes.ok) {
            console.error("HubSpot contact search failed:", searchRes.status, await searchRes.text());
            return false;
        }
        const searchData = (await searchRes.json());
        const existingId = searchData.results?.[0]?.id;
        const upsertRes = existingId
            ? await hubspotFetch(`/crm/v3/objects/contacts/${existingId}`, {
                method: "PATCH",
                body: JSON.stringify({ properties }),
            })
            : await hubspotFetch("/crm/v3/objects/contacts", {
                method: "POST",
                body: JSON.stringify({ properties }),
            });
        if (!upsertRes.ok) {
            console.error("HubSpot contact upsert failed:", upsertRes.status, await upsertRes.text());
            return false;
        }
        return true;
    }
    catch (error) {
        console.error("HubSpot contact sync error:", error instanceof Error ? error.message : error);
        return false;
    }
}
