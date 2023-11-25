import axios from "axios";

const eventBriteOrganizationId = process.env.EVENTBRITE_ORGANIZATION_ID;
const eventBriteToken = process.env.EVENTBRITE_API_PRIVATE_TOKEN;

export async function Events(req, res) {
    try {
        const response = await axios.get(`https://www.eventbriteapi.com/v3/organizations/${eventBriteOrganizationId}/events/`, {
            headers: {
                Authorization: `Bearer ${eventBriteToken}`
            }
        });
        console.log(response.data);
        res.status(200).json(response.data);
    } catch (error) {
        // Log the error and rethrow it
        console.error(error);
        res.status(400).json({ error: 'Request to retrieve events failed' })
    }
}